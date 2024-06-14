from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from .. import schemas, database
from ..security import get_current_active_user, jwt_wrapper

from sqlalchemy.orm import Session


router = APIRouter(prefix="/users")

@router.get("/", response_model=list[schemas.UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    users = database.users.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return current_user

@router.get("/{user_id}", response_model=schemas.UserPublic)
def read_user(user_id : int, db : Session = Depends(database.get_db)):
  db_user = database.users.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")
  return db_user

@router.post("/register", response_model=schemas.User)
def create_user(db: Session = Depends(database.get_db), jwt = Annotated[dict,Depends(jwt_wrapper)]):
  try:
    user: schemas.UserCreate = schemas.UserCreate(id=jwt.sub,  email=jwt.user.sub);
  except:
    raise HTTPException(status_code=400, detail="Token didn't contain necessary info")
  db_user = database.users.get_user_by_email(db, email=user.email)
  if db_user:
      raise HTTPException(status_code=400, detail="Email already registered")
  return database.users.create_user(db=db, user=user)

@router.delete("/delete")
def delete_user_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(database.get_db)):
  if database.users.delete_user(db, current_user.id):
    return True
  else:
    return False