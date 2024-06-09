from sqlalchemy import select
from sqlalchemy.orm import Session
from .users import get_user
from .. import models

def create_following(db:Session, follower_id: int, followed_id:int):
  db_following_user: models.User = get_user(db, follower_id)
  db_followed_user:models.User = get_user(db,followed_id)
  if db_followed_user in db_following_user.following:
    return None
  db_following_user.following.append(db_followed_user)
  db.commit()
  db.refresh(db_following_user)
  return db_following_user

def delete_following(db:Session, follower_id:int, followed_id:int):
  db_following_user: models.User = get_user(db, follower_id)
  db_followed_user:models.User = get_user(db,followed_id)

  if db_followed_user not in db_following_user.following:
    return None
  db_following_user.following.remove(db_followed_user)
  db.commit()
  db.refresh(db_following_user)
  return db_following_user




  
