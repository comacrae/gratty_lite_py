from sqlalchemy import Boolean, Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship


from ..database import Base


class User(Base):

  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  username = Column(String, unique=True)
  email = Column(String,unique=True,index=True)
  hashed_password= Column(String(255))
  disabled= Column(Boolean, default=False)

  posts = relationship("Post", back_populates="owner")

  following = relationship(
        'User', lambda: user_following,
        primaryjoin=lambda: User.id == user_following.c.user_id,
        secondaryjoin=lambda: User.id == user_following.c.following_id,
        backref='followers'
    )

user_following = Table(
  'user_following', Base.metadata,
  Column('user_id', Integer, ForeignKey(User.id), primary_key=True),
  Column('following_id', Integer, ForeignKey(User.id), primary_key=True)
)