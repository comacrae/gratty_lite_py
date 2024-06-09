from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import timedelta
from sqlalchemy.orm import Session
from ..security import authenticate_user, create_access_token, create_refresh_token, oauth2_scheme, invalidate_token
from ..security import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_ACCESS_TOKEN_EXPIRE_MINUTES
from .. import schemas, database,models
from typing import Annotated


database.Base.metadata.create_all(bind=database.engine)

router = APIRouter(prefix="/auth")
@router.get("/tokens", response_model=list[schemas.token.TokenCreate])
def get_tokens(db:Session = Depends(database.get_db)):
  return database.tokens.read_tokens(db)


@router.post("/login")
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db:Session = Depends(database.get_db) ) -> schemas.Token:
 # try to auth user by checking db for user and matching password
  user = authenticate_user(form_data.username, form_data.password,db)
  if not user: # if user doesn't exist because password or username was wrong, raise error
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail= "Incorrect username or password",
      headers = {"WWW-Authenticate":"Bearer"}
    )

  #if valid user, create new access token

  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  refresh_token_expires = timedelta(minutes=REFRESH_ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
  refresh_token = create_refresh_token(data={"sub": user.username}, expires_delta=refresh_token_expires)
  database.tokens.create_token(db, user.username, access_token, refresh_token)
  return schemas.Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer")

@router.post("/logout",response_model=dict)
def logout(token:Annotated[OAuth2PasswordBearer, Depends(oauth2_scheme)], db: Session = Depends(database.get_db)):
 return invalidate_token(token, db) 

