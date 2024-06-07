from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated


router = APIRouter()


@router.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user : Annotated[schemas.User, Depends(get_current_active_user)]):
  return current_user

@router.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    user.password = get_password_hash(user.password)
    return crud.create_user(db=db, user=user)


@router.get("/users/", response_model=list[schemas.UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@router.get("/users/{user_id}", response_model=schemas.UserPublic)
def read_user(user_id : int, db : Session = Depends(get_db)):
  db_user = crud.get_user(db, user_id)
  if db_user is None:
    raise HTTPException(status_code = 404, detail = "User not found")
  return db_user