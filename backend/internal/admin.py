from ..database import get_db
from .. import database, schemas, models
from fastapi import APIRouter, Depends, HTTPException

router = APIRouter(prefix='/admin')


@router.get("/view-all-users")
def read_users(db = Depends(get_db)):
  return db.query(models.User).all()


@router.post("/create-user/id/{user_id}/email/{user_email}")
def create_user(user_id: str, user_email:str, db = Depends(get_db)):
  user = schemas.user.UserCreate(id = user_id, email=user_email)
  return database.users.create_user(db=db, user=user)

@router.delete("/delete-user/{user_id}")
def delete_users(user_id:str, db = Depends(get_db)):
  return database.users.delete_user(db,user_id)

@router.delete("/wipe-users")
def delete_users( db = Depends(get_db)):
  return database.users.delete_all_users(db)

