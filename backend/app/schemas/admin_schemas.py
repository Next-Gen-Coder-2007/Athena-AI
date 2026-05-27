from typing import Optional

from pydantic import BaseModel


class StudentCreateSchema(BaseModel):
    # Create a user along with student (user fields required)
    name: str
    email: str
    username: Optional[str] = None
    password: str
    college_name: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills_summary: Optional[str] = None


class StudentUpdateSchema(BaseModel):
    college_name: Optional[str] = None
    department: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills_summary: Optional[str] = None


class CompanyCreateSchema(BaseModel):
    name: str
    website: Optional[str] = None
    industry: Optional[str] = None
    description: Optional[str] = None
    # recruiter association removed; add recruiters after company creation


class CompanyUpdateSchema(BaseModel):
    name: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    description: Optional[str] = None
    # recruiter association removed


class RecruiterCreateSchema(BaseModel):
    # Create a user along with recruiter (user fields required)
    name: str
    email: str
    username: Optional[str] = None
    password: str
    company_id: Optional[int] = None
    position: Optional[str] = None


class RecruiterUpdateSchema(BaseModel):
    company_id: Optional[int] = None
    position: Optional[str] = None
