from typing import Optional
from pydantic import BaseModel, EmailStr


class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    username: str
    password: str
    role: Optional[str] = "student"


class LoginSchema(BaseModel):
    username: str
    password: str
