from sqlalchemy import Boolean, Column, ForeignKey, Integer,String, DateTime
from sqlalchemy.orm import relationship
import datetime


from ..database import Base

class Post(Base):

  __tablename__ = "posts"

  id = Column(Integer, primary_key = True)
  owner_id = Column(String, ForeignKey("users.id"))
  public = Column(Boolean, default= False)

  owner = relationship("User", back_populates="posts")
  items  = relationship("PostItem", back_populates="containing_post")
  created_date = Column(DateTime, default=datetime.datetime.now)