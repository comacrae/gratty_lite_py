from sqlalchemy.orm import Session
from . import models, schemas

def get_user(db : Session, user_id : int):
  return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
  return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip : int = 0, limit: int = 100):
  return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db : Session, user: schemas.UserCreate):
  fake_hashed_password = user.password
  db_user = models.User(username = user.username, email=user.email, hashed_password=fake_hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

def get_post(db:Session, post_id: int):
  return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_posts_by_author(db:Session, owner_id: int):
  return db.query(models.Post).filter(models.Post.owner_id == owner_id).all()

""" TO DO 
def get_post_items_by_author(db:Session, owner_id: int):
  return db.query(models.Post).filter(models.Post.owner_id == owner_id).
"""


def create_post(db:Session, post : schemas.PostCreate):
  db_post = models.Post(owner_id = post.owner_id)
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

