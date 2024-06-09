from pydantic import BaseModel

class PostItemBase(BaseModel):
  text : str | None = None
  post_id: int

class PostItemCreate(PostItemBase):
  pass

class PostItemUpdate(BaseModel):
  text : str | None = None

class PostItem(PostItemBase):
  id: int 

  class Config:
    from_attributes = True