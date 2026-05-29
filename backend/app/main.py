from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import os
import traceback

from app.database import Base
from app.database import engine

from app.routes.auth import router as auth_router
from app.routes.admin import router as admin_router
from app.database import SessionLocal
from app.models.user import User, UserRole
import bcrypt

Base.metadata.create_all(bind=engine)

app = FastAPI()

# configure logging
log_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'logs'))
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, 'routes.log')
logger = logging.getLogger('backend')
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s %(levelname)s %(message)s')
fh = logging.FileHandler(log_file)
fh.setFormatter(formatter)
sh = logging.StreamHandler()
sh.setFormatter(formatter)
if not logger.handlers:
    logger.addHandler(fh)
    logger.addHandler(sh)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request start: {request.method} {request.url}")
    try:
        body_bytes = await request.body()
        if body_bytes:
            try:
                body_text = body_bytes.decode('utf-8')
            except Exception:
                body_text = str(body_bytes)
            logger.info(f"Request body for {request.method} {request.url}: {body_text}")

        # recreate request stream for downstream handlers
        async def receive():
            return {"type": "http.request", "body": body_bytes}

        req = Request(request.scope, receive)
        response = await call_next(req)
        logger.info(f"Request complete: {request.method} {request.url} - {response.status_code}")
        return response
    except Exception as exc:
        logger.exception(f"Unhandled exception processing request {request.method} {request.url}: {exc}")
        raise


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Log full traceback
    tb = traceback.format_exc()
    logger.error(f"Unhandled exception on {request.method} {request.url}: {exc}\n{tb}")
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})

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