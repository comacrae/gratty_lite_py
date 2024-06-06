from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from . import crud, models, schemas
from .database import get_db, engine

from auth_app.auth import *

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post("/token")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db:Session = Depends(get_db) ) -> schemas.Token:
  user = authenticate_user(form_data.username, form_data.password,db)
  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail= "Incorrect username or password",
      headers = {"WWW-Authenticate":"Bearer"}
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
  return schemas.Token(access_token=access_token, token_type="bearer")


@app.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return current_user

@app.get("/users/me/posts", response_model=list[schemas.Post])
def read_own_posts(current_user:Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(get_db)):
  return  crud.get_all_posts_by_author(db=db, owner_id=current_user.id)

@app.get("/users/me/post/{post_id}", response_model=schemas.Post)
def read_own_post(post_id:int, current_user:Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(get_db)):
  db_post =  crud.get_any_post(db=db, post_id=post_id, requesting_id = current_user.id)
  if db_post is None:
    raise HTTPException(status_code = 404, detail = "Post not found")
  return db_post

@app.get("/users/me/post-items", response_model=list[str])
def read_own_items(current_user:Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(get_db)):
  return  crud.get_all_post_items_by_author(db=db, owner_id=current_user.id, get_private=True)


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    user.password = get_password_hash(user.password)
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.UserPublic)
def read_user(user_id : int, db : Session = Depends(get_db)):
  db_user = crud.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")
  return db_user

@app.get("/users/{user_id}/posts", response_model = list[schemas.Post])
def read_posts_by_author(user_id:int, db :Session = Depends(get_db)):
  db_posts = crud.get_public_posts_by_author(db, owner_id = user_id)
  if db_posts is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_posts

@app.get("/users/{user_id}/posts/{post_id}", response_model = schemas.Post)
def read_post_by_author(user_id:int, post_id:int, db :Session = Depends(get_db)):
  db_post = crud.get_public_post(db,user_id= user_id, post_id=post_id)
  if db_post is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post not found")
  return db_post


@app.post("/users/me/posts",response_model=schemas.Post)
def create_post(post :schemas.PostCreate, db : Session = Depends(get_db)):
  db_post = crud.create_post(db,post)
  for post_text in post.post_texts:
    post_item_schema = schemas.PostItemCreate(text=post_text, post_id=db_post.id)
    crud.create_post_item(db,post_item_schema )
  return db_post