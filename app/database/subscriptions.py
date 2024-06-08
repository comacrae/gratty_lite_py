from sqlalchemy import select
from sqlalchemy.orm import Session
from .users import get_user
from .. import models

def read_followers(db:Session, user_id:int, skip:int= 0,limit:int = 100):
  stmt = select(models.User.followers).where(models.User.id == user_id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def read_following(db:Session, user_id:int, skip:int= 0,limit:int = 100):
  stmt = select(models.User.following).where(models.User.id == user_id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def create_following(db:Session, follower_id: int, followed_id:int):
  db_following_user: models.User = get_user(db, follower_id)
  db_followed_user:models.User = get_user(db,followed_id)
  db_following_user.following.append(db_followed_user)
  db.commit()
  db.refresh(db_following_user)
  return db_following_user




  
