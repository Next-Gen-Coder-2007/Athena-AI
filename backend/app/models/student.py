from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    college_name = Column(String)
    department = Column(String)

    graduation_year = Column(Integer)
    cgpa = Column(Float)

    github_url = Column(String)
    linkedin_url = Column(String)

    skills_summary = Column(String)