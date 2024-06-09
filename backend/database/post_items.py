from sqlalchemy import select
from sqlalchemy.orm import Session
from .. import models, schemas

def get_post_item_by_id(db:Session, post_item_id:int):
  stmt = select(models.post_item.PostItem).where(models.post_item.PostItem.id == post_item_id)
  results =  db.scalars(stmt).all() 
  return None if results is None else results[0]

def get_public_post_items_by_author(db:Session, owner_id: int, skip: int = 0, limit:int = 100):
  stmt = select(models.PostItem.text).where(models.Post.owner_id == owner_id).where(models.Post.public == True).where(models.PostItem.post_id == models.Post.id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def get_all_post_items_by_author(db:Session, owner_id: int ,skip: int = 0, limit:int = 100):
  stmt = select(models.PostItem.text).where(models.Post.owner_id == owner_id).where(models.PostItem.post_id == models.Post.id).offset(skip).limit(limit)
  return db.scalars(stmt).all()

def create_post_item(db:Session, post_item : schemas.PostItemCreate):
  db_post_item = models.PostItem(post_id = post_item.post_id, text = post_item.text) 
  db.add(db_post_item)
  db.commit()
  db.refresh(db_post_item)
  return db_post_item

def delete_post_item(db:Session, post_item_id:int, requesting_id:int):
  db_post_item : models.PostItem = get_post_item_by_id(db, post_item_id)
  db.delete(db_post_item)
  db.commit()
  return True
