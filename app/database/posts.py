from sqlalchemy import select
from sqlalchemy.orm import Session
from .. import models, schemas


def get_public_post(db:Session,post_id: int):
  stmt = select(models.Post).where(models.Post.id == post_id).where(models.Post.public == True)
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

def create_post(db:Session, post : schemas.PostCreate):
  db_post = models.Post(owner_id = post.owner_id, public = post.public)
  db.add(db_post)
  db.commit()
  db.refresh(db_post)
  return db_post

