from typing import Annotated, Union
from .. import schemas, models, database
from sqlalchemy.orm import Session

from fastapi import  Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

import datetime
import jwt
import json
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

def read_auth_config(file_path:str = "./backend/security/auth_config.json"):
  cfg : dict = json.load(open(file_path, "r"))
  return cfg.values()
SECRET_KEY, SECRET_REFRESH_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES ,REFRESH_ACCESS_TOKEN_EXPIRE_MINUTES = read_auth_config()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def verify_password(plain_password : str, hashed_password : str):
  return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(plain_password : str):
  return pwd_context.hash(plain_password)

def authenticate_user(username: str, password:str, db : Session):
  user : models.User = database.users.get_user_by_username(db,username)
  if not user:
    return False
  if not verify_password(password, user.hashed_password):
    return False
  return user


def create_access_token(data: dict, expires_delta: Union[datetime.timedelta,None] = None ) -> str:
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.datetime.now(datetime.timezone.utc) +expires_delta
  else:
    expire = datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp":expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
  return encoded_jwt

def create_refresh_token(data: dict, expires_delta: Union[datetime.timedelta,None] = None ) -> str:
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.datetime.now(datetime.timezone.utc) +expires_delta
  else:
    expire = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=REFRESH_ACCESS_TOKEN_EXPIRE_MINUTES)
  to_encode.update({"exp":expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_REFRESH_KEY,algorithm=ALGORITHM)
  return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db : Session = Depends(database.get_db)):
  credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers = {"WWW-Authenticate":"Bearer"})
  old_token_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token is expired. Log in again to obtain a new token", headers = {"WWW-Authenticate":"Bearer"})

  # check to see if access token is in expired tokens list
  matching_invalid_db_token = database.tokens.read_invalid_token(token,db) 
  if matching_invalid_db_token is not None:
    raise old_token_exception

  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise credentials_exception
    
    
    token_data: schemas.TokenData = schemas.TokenData(username=username)
  except InvalidTokenError: 
    raise credentials_exception
  user = database.users.get_user_by_username(db, token_data.username)
  if user is None:
    raise credentials_exception
  return user

async def get_current_active_user(current_user: Annotated[schemas.User,Depends(get_current_user)]):
  if current_user.disabled:
    raise HTTPException(status_code=400, detail = "Inactive user")
  return current_user

def invalidate_token(token: Annotated[str, Depends(oauth2_scheme)], db:Session):
  credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers = {"WWW-Authenticate":"Bearer"})
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise credentials_exception
    token_data: schemas.TokenData = schemas.TokenData(username=username)
  except InvalidTokenError: 
    raise credentials_exception
  token_record = database.tokens.read_tokens(db)

  info = []

  for record in token_record:
    if (datetime.datetime.utcnow() - record.created_date).days >1:
            info.append(record.username)
  if len(info) != 0:
    existing_tokens = database.tokens.delete_tokens_by_username(db,info)
  success = database.tokens.update_token_by_access_token_and_username(username=username, access_token=token, db=db)
  if success:
    return {'message':"Logout successful"}
  else:
    return {'message':"Logout failed"}

  



