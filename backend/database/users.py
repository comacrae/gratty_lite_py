from sqlalchemy import select
from sqlalchemy.orm import Session
from .. import models, schemas

def get_user(db : Session, user_id : int):
  return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
  return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
  return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip : int = 0, limit: int = 100):
  return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db : Session, user: schemas.UserCreate):
  db_user = models.User(email =user.email, id=user.id)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

def delete_user(db: Session, user_id: int):
  db_user = get_user(db, user_id)
  if db_user is None:
    return None
  try:
    db.delete(db_user)
    db.commit()
    return True
  except:
    db.rollback()
    return False

def delete_all_users(db:Session):
  try:
    db.query(models.User).delete()
    db.commit()
    return True
  except:
    db.rollback()
    return False

 
