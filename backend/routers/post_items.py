from typing import Annotated
from ..database import get_db, post_items
from fastapi import APIRouter, Depends,HTTPException, status
from .. import schemas
from ..security import get_current_active_user, jwt_wrapper
from sqlalchemy.orm import Session

router = APIRouter(prefix="/post-items", dependencies=[Depends(jwt_wrapper)])

@router.get("/users/me/", response_model=list[str])
def read_own_items(current_user:Annotated[schemas.User, Depends(get_current_active_user)], db : Session = Depends(get_db), skip:int = 0, limit: int = 100):
  return  post_items.get_all_post_items_by_author(db=db, owner_id=current_user.id, skip=skip, limit=limit)

@router.get("/users/{owner_id}/", response_model=list[str])
def read_user_items(owner_id:int, db : Session = Depends(get_db), skip:int = 0, limit: int = 100):
  return  post_items.get_public_post_items_by_author(db=db, owner_id=owner_id, skip=skip, limit=limit)

@router.delete("/delete/{post_item_id}")
def delete_own_item(current_user:Annotated[schemas.User, Depends(get_current_active_user)], post_item_id:int, db : Session = Depends(get_db)):
  if post_items.delete_post_item(db, post_item_id, requesting_id = current_user.id):
    return {}
  else:
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail="Post item does not exist")
