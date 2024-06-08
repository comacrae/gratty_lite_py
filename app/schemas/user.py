from pydantic import BaseModel
from .post import Post

class UserBase(BaseModel):
  username: str
  email: str

class UserCreate(UserBase):
  password: str

class UserPublic(BaseModel):
  id: int
  username: str

class User(UserBase):
  id: int
  username: str
  disabled: bool
  posts : list[Post] = []
  followers: list[UserPublic] = []
  following: list[UserPublic] = []

  class Config:
    from_attributes = True # used to be orm_mode
