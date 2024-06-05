from pydantic import BaseModel

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
  pass

class PostCreate(PostBase):
  post_texts : list[str] = []
  pass

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
  is_active: bool
  posts : list[Post] = []

  class Config:
    orm_mode = True



