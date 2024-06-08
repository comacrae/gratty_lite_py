from typing import Annotated
from ..security import get_current_active_user
from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, database

router = APIRouter(prefix="/subscriptions")

@router.get("/followers/user/me", response_model = list[schemas.UserPublic])
def read_followers_me( current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_followers = database.subscriptions.read_followers(db=db, user_id=current_user.id, skip=skip, limit=limit)
  if db_followers is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_followers

@router.get("/following/user/me", response_model = list[schemas.UserPublic])
def read_following_me( current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_followers = database.subscriptions.read_following(db=db, user_id=current_user.id, skip=skip, limit=limit)
  if db_followers is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_followers

@router.get("/followers/user/{user_id}", response_model = list[schemas.UserPublic])
def read_followers_by_user_id( user_id:int, db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_followers = database.subscriptions.read_followers(db=db, user_id=user_id, skip=skip, limit=limit)
  if db_followers is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_followers


@router.get("/following/user/{user_id}", response_model = list[schemas.UserPublic])
def read_following_by_user_id( user_id:int, db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_followers = database.subscriptions.read_following(db=db, user_id=user_id, skip=skip, limit=limit)
  if db_followers is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_followers



@router.get("/follow/user/{user_id}", response_model= list[schemas.UserPublic])
def create_follow_me(user_id:int,current_user : Annotated[schemas.User, Depends(get_current_active_user)], db:Session = Depends(database.get_db)):
  following_user = database.subscriptions.create_following(db, follower_id=current_user.id, followed_id=user_id)
  return following_user.following
