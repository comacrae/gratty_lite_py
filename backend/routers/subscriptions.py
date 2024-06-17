from typing import Annotated
from ..security import get_current_active_user, jwt_wrapper
from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, database

router = APIRouter(prefix="/subscriptions", dependencies=[Depends(jwt_wrapper)])

@router.get("/followers/user/me", response_model = list[schemas.UserPublic])
def read_followers_me( current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_user = database.users.get_user(db, user_id=current_user.id)
  if db_user is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_user.followers

@router.get("/following/user/me", response_model = list[schemas.UserPublic])
def read_following_me( current_user : Annotated[schemas.User, Depends(get_current_active_user)], db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_user = database.users.get_user(db, user_id=current_user.id)
  if db_user is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_user.following

@router.get("/followers/user/{user_id}", response_model = list[schemas.UserPublic])
def read_followers_by_user_id( user_id:int, db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_user = database.users.get_user(db, user_id=user_id)
  if db_user is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_user.followers


@router.get("/following/user/{user_id}", response_model = list[schemas.UserPublic])
def read_following_by_user_id( user_id:int, db :Session = Depends(database.get_db), skip: int = 0, limit: int = 100):
  db_user = database.users.get_user(db, user_id=user_id)
  if db_user is None:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="User not found")
  return db_user.following



@router.post("/follow/user/{user_id}", response_model= list[schemas.UserPublic])
def create_follow_me(user_id:int,current_user : Annotated[schemas.User, Depends(get_current_active_user)], db:Session = Depends(database.get_db)):
  if user_id == current_user.id:
    raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="User cannot self-follow")
  followed_user: schemas.UserPublic = database.users.get_user(db,user_id)
  if followed_user is None:
    raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="User does not exist")
  if followed_user in current_user.following:
    raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="User is already followed")
  following_user = database.subscriptions.create_following(db, follower_id=current_user.id, followed_id=user_id)
  return following_user.following

@router.delete("/unfollow/user/{user_id}", response_model= list[schemas.UserPublic])
def delete_follow_me(user_id:int,current_user : Annotated[schemas.User, Depends(get_current_active_user)], db:Session = Depends(database.get_db)):
  if user_id == current_user.id:
    raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="User cannot self-follow")
  following_user = database.subscriptions.delete_following(db, follower_id=current_user.id, followed_id=user_id)
  if following_user is None:
    raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail="User is not followed")
  return following_user.following
