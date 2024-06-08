from ..database import Base, engine, get_db
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlalchemy.orm import Session
from ..security import authenticate_user, create_access_token
from ..security import ACCESS_TOKEN_EXPIRE_MINUTES
from .. import schemas
from typing import Annotated


Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/auth")

@router.post("/token")
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db:Session = Depends(get_db) ) -> schemas.Token:
  user = authenticate_user(form_data.username, form_data.password,db)
  if not user:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail= "Incorrect username or password",
      headers = {"WWW-Authenticate":"Bearer"}
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
  return schemas.Token(access_token=access_token, token_type="bearer")