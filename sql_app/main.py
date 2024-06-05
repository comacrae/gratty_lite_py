from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/items/")
def read_items(token: Annotated[str, Depends(oauth2_scheme)]):
  return {'token': token}


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id : int, db : Session = Depends(get_db)):
  db_user = crud.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")
  return db_user

@app.get("/users/{user_id}/posts", response_model = list[schemas.Post])
def read_post_by_author(user_id:int, db :Session = Depends(get_db)):
  db_posts = crud.get_posts_by_author(db, owner_id = user_id)
  return db_posts

@app.get("/users/{user_id}/post-items", response_model = list[str])
def read_post_items_by_author(user_id:int, db :Session = Depends(get_db)):
  db_post_items = crud.get_post_items_by_author(db, owner_id = user_id)
  return db_post_items


@app.get("/posts/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db:Session =Depends(get_db)):
  db_post = crud.get_post(db,post_id)
  if db_post is None:
    raise HTTPException(status_code = 404, detail = "Post not found")
  return db_post


@app.post("/posts",response_model=schemas.Post)
def create_post(post :schemas.PostCreate, db : Session = Depends(get_db)):
  db_post = crud.create_post(db,post)
  for post_text in post.post_texts:
    post_item_schema = schemas.PostItemCreate(text=post_text, post_id=db_post.id)
    crud.create_post_item(db,post_item_schema )
  return db_post

