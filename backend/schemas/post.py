from pydantic import BaseModel, PastDatetime
from .post_item import PostItem

class PostBase(BaseModel):
  owner_id: str
  public: bool = False

class PostCreate(PostBase):
  post_texts : list[str] = []

class Post(PostBase):
  id: int
  items: list[PostItem] = []
  #created_date: PastDatetime
  
  class Config:
    from_attributes = True
