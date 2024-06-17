from datetime import datetime
from pydantic import BaseModel
from .post_item import PostItem

class PostBase(BaseModel):
  public: bool = False

class PostCreate(PostBase):
  post_texts : list[str] = []

class Post(PostBase):
  owner_id:int 
  id: int
  items: list[PostItem] = []
  time_created: datetime
  
  class Config:
    from_attributes = True
