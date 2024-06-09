from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


from ..database import Base

class PostItem(Base):

  __tablename__ = "post_items"

  id= Column(Integer, primary_key=True)
  post_id = Column(Integer, ForeignKey("posts.id"))
  text = Column(String(255))

  containing_post = relationship("Post", back_populates="items")