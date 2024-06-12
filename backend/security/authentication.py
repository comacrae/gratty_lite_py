from typing import Annotated
from .. import schemas,database
from sqlalchemy.orm import Session

from fastapi import  Depends, HTTPException, status

import json
from fastapi_nextauth_jwt import NextAuthJWT
from fastapi_nextauth_jwt.exceptions import InvalidTokenError, TokenExpiredException, MissingTokenError

def read_auth_config(file_path:str = "./backend/security/auth_config.json"):
  cfg : dict = json.load(open(file_path, "r"))
  return cfg['SECRET_KEY']
SECRET_KEY =  read_auth_config()

JWT = NextAuthJWT(secret=SECRET_KEY)


async def get_current_user(jwt: Annotated[dict, Depends(JWT)], db : Session = Depends(database.get_db)):
  missing_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers = {"WWW-Authenticate":"Bearer"})
  old_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token is expired. Log in again to obtain a new token", headers = {"WWW-Authenticate":"Bearer"})
  invalid_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token", headers = {"WWW-Authenticate":"Bearer"})
  invalid_user_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User does not exist", headers = {"WWW-Authenticate":"Bearer"})

  # check to see if access token is in expired tokens list

  try:
    username: str = jwt['name']
    user = database.users.get_user_by_username(db, username)
    if user is None:
      raise invalid_user_exception
    return user
  except InvalidTokenError:
    raise invalid_token_exception
  except MissingTokenError:
    raise missing_token_exception
  except TokenExpiredException:
    raise old_token_exception

async def get_current_active_user(current_user: Annotated[schemas.User,Depends(get_current_user)]):
  if current_user.disabled:
    raise HTTPException(status_code=400, detail = "Inactive user")
  return current_user
