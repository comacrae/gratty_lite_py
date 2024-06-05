from typing import List
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, UniqueConstraint, Table
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.schema import PrimaryKeyConstraint

from .database import Base


class User(Base):

  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  username = Column(String, unique=True)
  email = Column(String,unique=True,index=True)
  hashed_password= Column(String(255))
  is_active= Column(Boolean, default=True)

  posts = relationship("Post", back_populates="owner")

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
  text = Column(String(255))

  containing_post = relationship(Post, back_populates="items")
