from sqlalchemy import Boolean, Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship


from ..database import Base


class User(Base):


  __tablename__ = "users"

  id = Column(String, primary_key=True)
  username = Column(String,unique=True, nullable=True, default=None)
  email = Column(String,unique=True,index=True)
  disabled= Column(Boolean, default=False)

  posts = relationship("Post", back_populates="owner")

  following = relationship(
        'User', lambda: user_following,
        primaryjoin=lambda: User.id == user_following.c.user_id,
        secondaryjoin=lambda: User.id == user_following.c.following_id,
        backref='followers'
    )

  def __repr__(self):
    return "<User(id=%s email=%s)>" % (self.id, self.email)

user_following = Table(
  'user_following', Base.metadata,
  Column('user_id', Integer, ForeignKey(User.id), primary_key=True),
  Column('following_id', Integer, ForeignKey(User.id), primary_key=True)
)
