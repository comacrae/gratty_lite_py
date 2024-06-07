from pydantic import BaseModel
from post_item import PostItem

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
