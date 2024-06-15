from pydantic import BaseModel
from .post import Post

class UserBase(BaseModel):
  # email will be unique identifier, god help us
  email:str

class UserCreate(UserBase):
  pass

class UserPublic(BaseModel):
  id:int
  email: str

class User(UserBase):
  id: int
  username: str | None = ""
  email: str
  disabled: bool = False
  posts : list[Post] = []
  followers: list[UserPublic] = []
  following: list[UserPublic] = []

  class Config:
    from_attributes = True # used to be orm_mode
