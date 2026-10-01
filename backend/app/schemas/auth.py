from pydantic import BaseModel, Field
from pydantic import EmailStr

class UserBase(BaseModel):
    username: str = Field(...,min_length=3,max_length=32)

class UserRegister(UserBase):
    email: EmailStr
    password: str = Field(...,min_length=6,max_length=64)

class UserLogin(UserBase):
    password: str = Field(...,min_length=6,max_length=64)

