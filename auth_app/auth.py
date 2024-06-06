from typing import Annotated, Union
from sql_app import schemas
from sql_app.crud import get_user_by_username
from sql_app.database import get_db
from sqlalchemy.orm import Session

from fastapi import  Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm

from datetime import datetime, timedelta, timezone
import jwt
import json
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

def read_auth_config(file_path:str = "./auth_app/auth_config.json"):
  cfg : dict = json.load(open(file_path, "r"))
  return cfg.values()
SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES = read_auth_config()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password : str, hashed_password : str):
  return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(plain_password : str):
  return pwd_context.hash(plain_password)

def authenticate_user(username: str, password:str, db : Session):
  user = get_user_by_username(db,username)
  if not user:
    return False
  if not verify_password(password, user.hashed_password):
    return False
  return user

def create_access_token(data: dict, expires_delta: Union[timedelta,None] = None ):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.now(timezone.utc) +expires_delta
  else:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode.update({"exp":expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY,algorithm=ALGORITHM)
  return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db : Session = Depends(get_db)):
  credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials", headers = {"WWW-Authenticate":"Bearer"})
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise credentials_exception
    token_data = schemas.TokenData(username=username)
  except InvalidTokenError: 
    raise credentials_exception
  user = get_user_by_username(db, token_data.username)
  if user is None:
    raise credentials_exception
  return user


async def get_current_active_user(current_user: Annotated[schemas.User,Depends(get_current_user)]):
  if current_user.disabled:
    raise HTTPException(status_code=400, detail = "Inactive user")
  return current_user





