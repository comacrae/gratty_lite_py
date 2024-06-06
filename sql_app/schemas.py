from pydantic import BaseModel
from typing import Union

class PostItemBase(BaseModel):
  text : str | None = None
  post_id: int

class PostItemCreate(PostItemBase):
  pass

class PostItem(PostItemBase):
  id: int 

  class Config:
    orm_mode = True

class PostBase(BaseModel):
  owner_id: int
  public: bool = False

class PostCreate(PostBase):
  post_texts : list[str] = []

class Post(PostBase):
  id: int
  items: list[PostItem] = []
  
  class Config:
    orm_mode = True


class UserBase(BaseModel):
  username: str
  email: str

class UserCreate(UserBase):
  password: str

class User(UserBase):
  id: int
  username: str
  disabled: bool
  posts : list[Post] = []

  class Config:
    orm_mode = True

class UserPublic(BaseModel):
  id: int
  username: str

class Token(BaseModel):
  access_token: str
  token_type: str

class TokenData(BaseModel):
  username : Union[str,None] = None



