from sqlalchemy import Column, Integer, String, Enum, Boolean
import enum

from app.database import Base

class UserRole(str, enum.Enum):
    student = "student"
    recruiter = "recruiter"
    admin = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    is_active = Column(Boolean, default=True)
    must_change_password = Column(Boolean, default=False)