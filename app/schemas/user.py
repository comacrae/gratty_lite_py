from pydantic import BaseModel
from post import Post

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