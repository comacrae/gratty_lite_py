from sqlalchemy import select
from sqlalchemy.orm import Session
from models.user import *
from models.post import *
from models.post_item import *
from schemas import *

def get_user(db : Session, user_id : int):
  return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
  return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
  return db.query(User).filter(User.email == email).first()

def get_users(db: Session, skip : int = 0, limit: int = 100):
  return db.query(User).offset(skip).limit(limit).all()

def create_user(db : Session, user: schemas.UserCreate):
  hashed_password = user.password
  db_user = models.User(username = user.username, email=user.email, hashed_password=hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user


def get_public_post(db:Session, user_id:int,post_id: int):
  stmt = select(models.Post).where(models.Post.owner_id == user_id).where(models.Post.id == post_id).where(models.Post.public == True)
  db_post = db.execute(stmt).first()

  return  None if db_post is None else db_post[0]

def get_any_post(db:Session, post_id: int, requesting_id : int):
  stmt = select(models.Post).where(models.Post.owner_id == requesting_id).where(models.Post.id == post_id)
  db_post = db.execute(stmt).first()
  return  None if db_post is None else db_post[0]

def get_public_posts_by_author(db:Session, owner_id: int, skip: int = 0, limit:int = 100):
  stmt = select(models.Post).where(models.Post.owner_id == owner_id).where(models.Post.public == True).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def get_all_posts_by_author(db:Session, owner_id: int, skip: int = 0, limit:int = 100):
  stmt = select(models.Post).where(models.Post.owner_id == owner_id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def get_public_post_items_by_author(db:Session, owner_id: int, skip: int = 0, limit:int = 100):
  stmt = select(models.PostItem.text).where(models.Post.owner_id == owner_id).where(models.Post.public == True).where(models.PostItem.post_id == models.Post.id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def get_all_post_items_by_author(db:Session, owner_id: int ,skip: int = 0, limit:int = 100):
  stmt = select(models.PostItem.text).where(models.Post.owner_id == owner_id).where(models.PostItem.post_id == models.Post.id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def create_post(db:Session, post : schemas.PostCreate):
  db_post = models.Post(owner_id = post.owner_id, public = post.public)
  db.add(db_post)
  db.commit()
  db.refresh(db_post)
  return db_post

def create_post_item(db:Session, post_item : schemas.PostItemCreate):
  db_post_item = models.PostItem(post_id = post_item.post_id, text = post_item.text) 
  db.add(db_post_item)
  db.commit()
  db.refresh(db_post_item)
  return db_post_item
