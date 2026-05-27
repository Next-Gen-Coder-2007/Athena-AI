from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import bcrypt

from app.database import SessionLocal
from app.models.user import User, UserRole
from app.schemas.auth_schemas import RegisterSchema, LoginSchema
from app.core.jwt import create_access_token, get_db, require_role

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
def register(user: RegisterSchema, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()

    role = UserRole(user.role) if user.role else UserRole.student

    new_user = User(
        full_name=user.name,
        email=user.email,
        username=user.username,
        password=hashed_password,
        role=role,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: LoginSchema, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    valid = bcrypt.checkpw(user.password.encode(), db_user.password.encode())
    if not valid:
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({"sub": str(db_user.id), "role": db_user.role.value})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.full_name,
            "email": db_user.email,
            "username": db_user.username,
            "role": db_user.role.value,
            "must_change_password": getattr(db_user, 'must_change_password', False),
        },
    }


@router.get("/users")
def get_users(_=Depends(require_role("admin")), db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
        {"id": u.id, "name": u.full_name, "email": u.email, "username": u.username, "role": u.role.value}
        for u in users
    ]



from app.core.jwt import get_current_user
import bcrypt
from fastapi import Body


@router.post('/change-password')
def change_password(payload: dict = Body(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_password = payload.get('current_password')
    new_password = payload.get('new_password')
    if not current_password or not new_password:
        raise HTTPException(status_code=400, detail='current_password and new_password required')

    if not bcrypt.checkpw(current_password.encode(), current_user.password.encode()):
        raise HTTPException(status_code=400, detail='Current password incorrect')

    hashed = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    current_user.password = hashed
    if hasattr(current_user, 'must_change_password'):
        current_user.must_change_password = False

    db.add(current_user)
    db.commit()
    return {"message": "Password updated"}
