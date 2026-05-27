from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.routes.auth import router as auth_router
from app.routes.admin import router as admin_router
from app.database import SessionLocal
from app.models.user import User, UserRole
import bcrypt

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(admin_router)

@app.get("/")
def home():
    return {
        "message": "FastAPI Server Running"
    }


def create_default_admin():
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.username == 'admin').first()
        if existing:
            return

        password = 'adminpass'
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        admin_user = User(
            full_name='Administrator',
            email='admin@example.com',
            username='admin',
            password=hashed,
            role=UserRole.admin,
            is_active=True,
        )

        db.add(admin_user)
        db.commit()
        print('Default admin user created: username=admin password=adminpass')
    finally:
        db.close()


create_default_admin()