from sqlalchemy import Column, String, Boolean, DateTime
from ..database import Base
import datetime

class Token(Base):
    __tablename__ = "token"
    username = Column(String)
    access_token = Column(String(450), primary_key=True)
    refresh_token = Column(String(450),nullable=False)
    status = Column(Boolean, default=True)
    created_date = Column(DateTime, default=datetime.datetime.now)