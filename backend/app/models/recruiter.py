from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class RecruiterProfile(Base):
    __tablename__ = "recruiters"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    company_id = Column(Integer, ForeignKey("companies.id"))

    position = Column(String)