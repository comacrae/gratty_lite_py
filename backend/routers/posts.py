from fastapi import APIRouter, Depends, HTTPException,status
from typing import Annotated
from ..security import get_current_active_user, jwt_wrapper
from .. import schemas, database, models

from sqlalchemy.orm import Session

router = APIRouter(prefix="/posts", dependencies=[Depends(jwt_wrapper)])


@router.get("/{post_id}", response_model = schemas.Post)
def read_post(post_id:int, db :Session = Depends(database.get_db)):
  db_post = database.posts.get_public_post(db, post_id=post_id)

  if db_post is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post not found")
  return db_post

@router.get("/user/me", response_model = list[schemas.Post])
def read_posts_me( current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_posts = database.posts.get_all_posts_by_author(db=db, owner_id = current_user.id, skip=skip, limit=limit)
  if db_posts is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_posts

@router.get("/user/me/{post_id}", response_model = schemas.Post)
def read_posts_me( post_id:int, current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db)):
  db_post = database.posts.get_any_post(db=db,post_id=post_id, requesting_id = current_user.id )
  if db_post is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post not found")
  return db_post

@router.get("/user/{user_id}", response_model = list[schemas.Post])
def read_posts_by_author( user_id:int, db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_user = database.users.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")

  db_posts = database.posts.get_public_posts_by_author(db=db, owner_id = db_user.id, skip=skip, limit=limit)
  if db_posts is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_posts


def create_post_items(post_id:int,post_texts:list[str],db:Session = Depends(database.get_db)):
  for post_text in post_texts:
    post_item_schema = schemas.PostItemCreate(text=post_text, post_id=post_id)
    database.post_items.create_post_item(db,post_item_schema )
  return

@router.post("/user/me",response_model=schemas.Post)
def create_post(post: schemas.PostCreate, current_user : Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(database.get_db)):
  db_post = database.posts.create_post(db=db, owner_id = current_user.id, post=post)
  create_post_items(post_id = db_post.id, post_texts=post.post_texts,db=db)
  return db_post

@router.put("/update/{post_id}", response_model=schemas.Post)
def update_post(post_id:int, current_user : Annotated[schemas.User, Depends(get_current_active_user)], new_post: schemas.PostCreate, db : Session = Depends(database.get_db)):
  db_post : models.Post = database.posts.update_post(db,post_id, requesting_id=current_user.id, new_post=new_post)
  db_post.items = [] # delete prior post items
  create_post_items(post_id = db_post.id, post_texts=new_post.post_texts,db=db)
  if db_post is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post not found")
  return db_post

@router.delete("/delete/{post_id}")
def read_posts_me(post_id:int, current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db)):
  if database.posts.delete_post(db, post_id, current_user.id):
    return {}
  else:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post not found")