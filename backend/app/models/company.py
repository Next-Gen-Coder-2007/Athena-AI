from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, unique=True, nullable=False)

    website = Column(String)
    industry = Column(String)

    description = Column(Text)