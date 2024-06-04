from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.schema import PrimaryKeyConstraint

from .database import Base

class User(Base):

  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  username = Column(String, unique=True)
  email = Column(String,unique=True,index=True)
  hashed_password= Column(String)
  is_active= Column(Boolean, default=True)

  posts = relationship("Post", back_populates="owner")
  subscriptions = relationship("User", back_populates="subscribers")

class Post(Base):

  __tablename__ = "posts"

  id = Column(Integer, primary_key = True)
  owner_id = Column(Integer, ForeignKey("users.id"))

  owner = relationship("User", back_populates="posts")
  items  = relationship("PostItem", back_populates="containing_post")

class PostItem(Base):

  __tablename__ = "post_items"

  id= Column(Integer, primary_key=True)
  post_id = Column(Integer, ForeignKey("posts.id"))
  item = Column(String, max_length=255)

  containing_post = relationship(Post, back_populates="items")

class Subscription(Base):

  __tablename__ = "subscriptions"

  subscription_id = Column(Integer, ForeignKey("user.id")) # user who is being followed
  subscriber_id = Column(Integer, ForeignKey("user.id")) # the following user
  
  subcribers = relationship("User", back_populates="subscriptions")

  __table_args__ = (
    PrimaryKeyConstraint('subscription_id','subscriber_id')
  )
  

