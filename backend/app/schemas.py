from pydantic import BaseModel
from pydantic import EmailStr

class RegisterSchema(BaseModel):

    name: str
    email: EmailStr
    username: str
    password: str


class LoginSchema(BaseModel):

    username: str
    password: str