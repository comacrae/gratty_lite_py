from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from .. import schemas, database
from ..security import get_current_active_user, jwt_wrapper

from sqlalchemy.orm import Session


router = APIRouter(prefix="/users", dependencies=[Depends(jwt_wrapper)])

@router.get("/", response_model=list[schemas.UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    users = database.users.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/me", response_model=schemas.User)
def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return current_user

@router.get("/me/info", response_model=schemas.UserInfo)
def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return schemas.UserInfo(email=current_user.email, num_posts=len(current_user.posts), followers=current_user.followers, following=current_user.following)


@router.get("/me/id", response_model=int)
def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return current_user.id 

@router.get("/{user_id}", response_model=schemas.UserPublic)
def read_user(user_id : int, db : Session = Depends(database.get_db)):
  db_user = database.users.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")
  return db_user


@router.delete("/delete/me")
def delete_user_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(database.get_db)):
  result =  database.users.delete_user(db, current_user.id)
  if result is None:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Current user not found in database")
  if result == True:
    return # success
  else:
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Current user not deleted; Database rolled back")