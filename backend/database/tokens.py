from sqlalchemy import select, delete
from sqlalchemy.orm import Session
from .. import models, schemas

def create_token(db:Session, username:str, access_token:str, refresh_token:str):
  db_token = models.Token(username=username, access_token=access_token, refresh_token=refresh_token)
  db.add(db_token)
  db.commit()
  db.refresh(db_token)
  return db_token

def read_tokens(db:Session):
  return db.query(models.Token).all()

def read_invalid_token(token:str, db:Session):
  return db.query(models.Token).where(models.Token.access_token==token, models.Token.status==False).first()

def delete_tokens_by_username(old_tokens:list[str], db:Session):
  existing_tokens = db.query(models.Token).where(models.Token.username.in_(old_tokens)).delete()
  db.commit()
  return existing_tokens

def update_token_by_access_token_and_username(username:str, access_token:str, db:Session):
  existing_token = db.query(models.Token).filter(models.Token.username == username, models.Token.access_token==access_token).first()
  if existing_token:
    existing_token.status = False
    db.add(existing_token)
    db.commit()
    db.refresh(existing_token)
    return existing_token
  else:
    return None


def delete_all_tokens(db:Session):
  stmt = delete(models.Token)
  db.execute(stmt)
  db.commit()
  return True