from sqlalchemy import Boolean, Column, ForeignKey, Integer,String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from ..database import Base

class Post(Base):

  __tablename__ = "posts"

  id = Column(Integer, primary_key = True)
  owner_id = Column(Integer, ForeignKey("users.id"))
  public = Column(Boolean, default= False)

  owner = relationship("User", back_populates="posts")
  items  = relationship("PostItem", back_populates="containing_post", cascade="all, delete")
  time_created = Column(DateTime(timezone=True), server_default=func.now())