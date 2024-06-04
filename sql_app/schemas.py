from pydantic import BaseModel

class PostItemBase(BaseModel):
  item : str | None = None

class PostItemCreate(PostItemBase):
  pass

class PostItem(PostItemBase):
  id: int 
  post_id: int

  class Config:
    orm_mode = True

class PostBase(BaseModel):
  pass

class PostCreate(PostBase):
  pass

class Post(PostBase):

  id: int
  owner_id: int
  items: list[PostItem] = []
  
  class Config:
    orm_mode = True

class SubscriberBase(BaseModel):
  pass

class SubscriberCreate(SubscriberBase):
  pass

class Subscriber(SubscriberBase):
  subscription_id : int
  subscriber_id : int
  
  class Config:
    orm_mode =True


class UserBase(BaseModel):
  email: str

class UserCreate(UserBase):
  password: str

class User(UserBase):
  id: int
  username: str
  is_active: bool
  posts = list[Post] = []
  subscribers = list[Subscriber] = []

  class Config:
    orm_mode = True



