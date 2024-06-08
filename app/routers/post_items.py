from typing import Annotated
from ..database import get_db, post_items
from fastapi import APIRouter, Depends
from .. import schemas
from ..security import get_current_active_user
from sqlalchemy.orm import Session

router = APIRouter(prefix="/post-items")

@router.get("/users/me/", response_model=list[str])
def read_own_items(current_user:Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(get_db), skip:int = 0, limit: int = 100):
  return  post_items.get_all_post_items_by_author(db=db, owner_id=current_user.id, skip=skip, limit=limit)

@router.get("/users/{owner_id}/", response_model=list[str])
def read_own_items(owner_id:int, db : Session = Depends(get_db), skip:int = 0, limit: int = 100):
  return  post_items.get_public_post_items_by_author(db=db, owner_id=owner_id, skip=skip, limit=limit)