from pydantic import BaseModel
from .post import Post

class UserBase(BaseModel):
  id : str
  email:str

class UserCreate(UserBase):
  pass

class UserPublic(BaseModel):
  id:str
  username: str | None

class User(UserBase):
  id: str
  username: str | None = ""
  email: str
  disabled: bool = False
  posts : list[Post] = []
  followers: list[UserPublic] = []
  following: list[UserPublic] = []

  class Config:
    from_attributes = True # used to be orm_mode
