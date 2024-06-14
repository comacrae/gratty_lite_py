from typing import Annotated
from .. import schemas,database
from sqlalchemy.orm import Session

from fastapi import  Depends, HTTPException, status, Request

import os
import json
from fastapi_nextauth_jwt import NextAuthJWT
from fastapi_nextauth_jwt.exceptions import InvalidTokenError, TokenExpiredException, MissingTokenError

def read_auth_config(file_path:str = "./backend/security/auth_config.json"):
  cfg : dict = json.load(open(file_path, "r"))
  return cfg['SECRET_KEY'], cfg['NEXTAUTH_URL']

SECRET_KEY, NEXTAUTH_URL=  read_auth_config()

os.environ["NEXTAUTH_URL"] = NEXTAUTH_URL 

JWT = NextAuthJWT(secret='test',csrf_prevention_enabled=False )

async def jwt_wrapper(req: Request):
  missing_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials: Missing token", headers = {"WWW-Authenticate":"Bearer"})
  old_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token is expired. Log in again to obtain a new token", headers = {"WWW-Authenticate":"Bearer"})
  invalid_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token", headers = {"WWW-Authenticate":"Bearer"})
  jwt_dict:dict = {'valid' : False, 'result': None }
  try:
    jwt_dict['result'] = JWT.__call__(req) # returns parsed token
    jwt_dict['valid'] = True
  except InvalidTokenError:
    jwt_dict['result'] =invalid_token_exception
  except MissingTokenError:
    jwt_dict['result'] = missing_token_exception
  except TokenExpiredException:
    jwt_dict['result'] = old_token_exception
  finally:
    return jwt_dict
  
def create_user(id:str, email:str, db: Session = Depends(database.get_db)):
  try:
    user: schemas.UserCreate = schemas.UserCreate(id=id,  email=email)
  except:
    raise HTTPException(status_code=400, detail="Token didn't contain necessary info")
  db_user = database.users.get_user_by_email(db, email=user.email)
  if db_user:
      raise HTTPException(status_code=400, detail="Email already registered")
  return database.users.create_user(db=db, user=user)

async def get_current_user(jwt: Annotated[dict, Depends(jwt_wrapper)], db : Session = Depends(database.get_db)):
  if(jwt['valid'] == False): # if not valid
    return jwt['result'] # return HTTPException
  id: str = jwt['result']['sub']
  email:str = jwt['result']['email']
  user = database.users.get_user(db, id)

  if user is None: # if user is accessing FastAPI backend for first time, create user 
    user = create_user(id,email,db)
  return user

async def get_current_active_user(current_user: Annotated[schemas.User,Depends(get_current_user)]):
  if current_user.disabled:
    raise HTTPException(status_code=400, detail = "Inactive user")
  return current_user