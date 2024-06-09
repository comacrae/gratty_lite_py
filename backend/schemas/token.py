from pydantic import BaseModel
from typing import Union
import datetime

class Token(BaseModel):
  access_token: str
  refresh_token:str
  token_type: str

class TokenData(BaseModel):
  username : Union[str,None] = None

class TokenCreate(BaseModel):
  username : str
  access_token:str
  refresh_token:str
  status:bool
  created_date:datetime.datetime
