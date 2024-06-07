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