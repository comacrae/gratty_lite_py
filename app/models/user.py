from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


from database import Base


class User(Base):

  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  username = Column(String, unique=True)
  email = Column(String,unique=True,index=True)
  hashed_password= Column(String(255))
  disabled= Column(Boolean, default=False)

  posts = relationship("Post", back_populates="owner")