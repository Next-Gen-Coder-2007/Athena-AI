from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.company import Company
from app.models.recruiter import RecruiterProfile
from app.models.student import Student
from app.models.user import User, UserRole
from app.schemas.admin_schemas import (
    CompanyCreateSchema,
    CompanyUpdateSchema,
    StudentCreateSchema,
    StudentUpdateSchema,
    RecruiterCreateSchema,
    RecruiterUpdateSchema,
    RecruiterLinkSchema,
)

from app.core.jwt import require_role

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(require_role("admin"))],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/students")
def create_student(student: StudentCreateSchema, db: Session = Depends(get_db)):
    # Always create a new User alongside student
    if not (student.name and student.email and student.password):
        raise HTTPException(status_code=400, detail="Provide name, email and password to create a new user")

    # derive username if not provided
    username = student.username or student.email.split('@')[0]
    existing_user = db.query(User).filter((User.username == username) | (User.email == student.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")

    import bcrypt as _bcrypt
    hashed = _bcrypt.hashpw(student.password.encode(), _bcrypt.gensalt()).decode()

    user = User(full_name=student.name, email=student.email, username=username, password=hashed, role=UserRole.student, must_change_password=True)
    db.add(user)
    db.commit()
    db.refresh(user)

    existing = db.query(Student).filter(Student.user_id == user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student profile already exists")

    new_student = Student(
        user_id=user.id,
        college_name=student.college_name,
        department=student.department,
        graduation_year=student.graduation_year,
        cgpa=student.cgpa,
        github_url=student.github_url,
        linkedin_url=student.linkedin_url,
        skills_summary=student.skills_summary,
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {"message": "Student profile created successfully", "student_id": new_student.id}


@router.put("/students/{student_id}")
def update_student(
    student_id: int,
    student: StudentUpdateSchema,
    db: Session = Depends(get_db),
):
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    update_data = student.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_student, field, value)

    db.commit()
    db.refresh(db_student)

    return {"message": "Student profile updated successfully"}


@router.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    db_student = db.query(Student).filter(Student.id == student_id).first()
    if not db_student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    db.delete(db_student)
    db.commit()

    return {"message": "Student profile deleted successfully"}


@router.get("/students")
def list_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    return [
        {
            "id": student.id,
            "user_id": student.user_id,
            "college_name": student.college_name,
            "department": student.department,
            "graduation_year": student.graduation_year,
            "cgpa": student.cgpa,
            "github_url": student.github_url,
            "linkedin_url": student.linkedin_url,
            "skills_summary": student.skills_summary,
        }
        for student in students
    ]


@router.post("/recruiters")
def create_recruiter(recruiter: RecruiterCreateSchema, db: Session = Depends(get_db)):
    # Always create a new User alongside recruiter
    if not (recruiter.name and recruiter.email and recruiter.password):
        raise HTTPException(status_code=400, detail="Provide name, email and password to create a new user")

    # derive username if not provided
    username = recruiter.username or recruiter.email.split('@')[0]
    # if email already exists, refuse (can't attach new user with same email)
    existing_by_email = db.query(User).filter(User.email == recruiter.email).first()
    if existing_by_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    # if username exists, auto-generate a unique one by appending numbers
    existing_username = db.query(User).filter(User.username == username).first()
    generated_username = username
    if existing_username:
        i = 1
        while True:
            cand = f"{username}{i}"
            if not db.query(User).filter(User.username == cand).first():
                generated_username = cand
                break
            i += 1
    else:
        generated_username = username

    import bcrypt as _bcrypt
    hashed = _bcrypt.hashpw(recruiter.password.encode(), _bcrypt.gensalt()).decode()

    user = User(full_name=recruiter.name, email=recruiter.email, username=generated_username, password=hashed, role=UserRole.recruiter, must_change_password=True)
    db.add(user)
    db.commit()
    db.refresh(user)

    existing = db.query(RecruiterProfile).filter(RecruiterProfile.user_id == user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Recruiter profile already exists")

    # coerce empty-string company_id to None or int
    comp_id = recruiter.company_id
    if isinstance(comp_id, str) and comp_id.strip() == '':
        comp_id = None
    elif isinstance(comp_id, str):
        try:
            comp_id = int(comp_id)
        except ValueError:
            comp_id = None

    new_recruiter = RecruiterProfile(
        user_id=user.id,
        company_id=comp_id,
        position=recruiter.position,
    )

    db.add(new_recruiter)
    db.commit()
    db.refresh(new_recruiter)

    return {"message": "Recruiter profile created successfully", "recruiter_id": new_recruiter.id, "created_username": generated_username}


@router.get('/username-suggest')
def suggest_username(username: str, db: Session = Depends(get_db)):
    base = username
    if not base:
        raise HTTPException(status_code=400, detail='username query param required')
    if not db.query(User).filter(User.username == base).first():
        return {"suggestion": base}
    i = 1
    while True:
        cand = f"{base}{i}"
        if not db.query(User).filter(User.username == cand).first():
            return {"suggestion": cand}
        i += 1


@router.post('/recruiters/link')
def link_recruiter(payload: RecruiterLinkSchema, db: Session = Depends(get_db)):
    # require either user_id or username
    if not (payload.user_id or payload.username):
        raise HTTPException(status_code=400, detail='Provide user_id or username to link')

    user = None
    if payload.user_id:
        user = db.query(User).filter(User.id == payload.user_id).first()
    else:
        user = db.query(User).filter(User.username == payload.username).first()

    if not user:
        raise HTTPException(status_code=404, detail='User not found')

    existing = db.query(RecruiterProfile).filter(RecruiterProfile.user_id == user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail='Recruiter profile already exists for this user')

    comp_id = payload.company_id
    if isinstance(comp_id, str) and comp_id.strip() == '':
        comp_id = None
    elif isinstance(comp_id, str):
        try:
            comp_id = int(comp_id)
        except ValueError:
            comp_id = None

    new_recruiter = RecruiterProfile(user_id=user.id, company_id=comp_id, position=payload.position)
    db.add(new_recruiter)
    db.commit()
    db.refresh(new_recruiter)

    return {"message": "Recruiter linked successfully", "recruiter_id": new_recruiter.id}


@router.put("/recruiters/{recruiter_id}")
def update_recruiter(recruiter_id: int, recruiter: RecruiterUpdateSchema, db: Session = Depends(get_db)):
    db_recruiter = db.query(RecruiterProfile).filter(RecruiterProfile.id == recruiter_id).first()
    if not db_recruiter:
        raise HTTPException(status_code=404, detail="Recruiter profile not found")

    update_data = recruiter.dict(exclude_unset=True)
    # coerce company_id if present
    if 'company_id' in update_data:
        comp_id = update_data.get('company_id')
        if isinstance(comp_id, str) and comp_id.strip() == '':
            update_data['company_id'] = None
        elif isinstance(comp_id, str):
            try:
                update_data['company_id'] = int(comp_id)
            except ValueError:
                update_data['company_id'] = None
    for field, value in update_data.items():
        setattr(db_recruiter, field, value)

    db.commit()
    db.refresh(db_recruiter)

    return {"message": "Recruiter profile updated successfully"}


@router.delete("/recruiters/{recruiter_id}")
def delete_recruiter(recruiter_id: int, db: Session = Depends(get_db)):
    db_recruiter = db.query(RecruiterProfile).filter(RecruiterProfile.id == recruiter_id).first()
    if not db_recruiter:
        raise HTTPException(status_code=404, detail="Recruiter profile not found")

    db.delete(db_recruiter)
    db.commit()

    return {"message": "Recruiter profile deleted successfully"}


@router.get("/recruiters")
def list_recruiters(db: Session = Depends(get_db)):
    recruiters = db.query(RecruiterProfile).all()
    return [
        {
            "id": r.id,
            "user_id": r.user_id,
            "company_id": r.company_id,
            "position": r.position,
        }
        for r in recruiters
    ]


@router.post("/companies")
def create_company(company: CompanyCreateSchema, db: Session = Depends(get_db)):
    existing_company = db.query(Company).filter(Company.name == company.name).first()
    if existing_company:
        raise HTTPException(status_code=400, detail="Company already exists")

    new_company = Company(
        name=company.name,
        website=company.website,
        industry=company.industry,
        description=company.description,
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return {"message": "Company created successfully", "company_id": new_company.id}


@router.put("/companies/{company_id}")
def update_company(
    company_id: int,
    company: CompanyUpdateSchema,
    db: Session = Depends(get_db),
):
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    update_data = company.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_company, field, value)

    db.commit()
    db.refresh(db_company)

    return {"message": "Company updated successfully"}


@router.delete("/companies/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=404, detail="Company not found")

    recruiters = db.query(RecruiterProfile).filter(RecruiterProfile.company_id == company_id).all()
    for recruiter in recruiters:
        recruiter.company_id = None

    db.delete(db_company)
    db.commit()

    return {"message": "Company deleted successfully"}


@router.post("/companies/{company_id}/recruiters/{recruiter_id}")
def assign_recruiter_to_company(
    company_id: int,
    recruiter_id: int,
    db: Session = Depends(get_db),
):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    recruiter = db.query(RecruiterProfile).filter(RecruiterProfile.id == recruiter_id).first()
    if not recruiter:
        raise HTTPException(status_code=404, detail="Recruiter not found")

    recruiter.company_id = company_id
    db.commit()
    db.refresh(recruiter)

    return {"message": "Recruiter assigned to company successfully"}


@router.delete("/companies/{company_id}/recruiters/{recruiter_id}")
def remove_recruiter_from_company(
    company_id: int,
    recruiter_id: int,
    db: Session = Depends(get_db),
):
    recruiter = db.query(RecruiterProfile).filter(RecruiterProfile.id == recruiter_id).first()
    if not recruiter:
        raise HTTPException(status_code=404, detail="Recruiter not found")

    if recruiter.company_id != company_id:
        raise HTTPException(status_code=400, detail="Recruiter not linked to this company")

    recruiter.company_id = None
    db.commit()
    db.refresh(recruiter)

    return {"message": "Recruiter removed from company successfully"}


@router.get("/companies")
def list_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return [
        {
            "id": company.id,
            "name": company.name,
            "website": company.website,
            "industry": company.industry,
            "description": company.description,
        }
        for company in companies
    ]
