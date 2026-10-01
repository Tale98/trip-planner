from fastapi import APIRouter, HTTPException, Response
from schemas.auth import UserRegister, UserLogin
from dependencies.database import get_session, SessionDep
from dependencies.auth import CurrentUserDep
from models.users import User
from utils.auth import hash_password, verify_password, jwt_encode, TOKEN_LIFETIME_SECONDS
from sqlmodel import select
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
    )
@router.post("/register")
def register(user:UserRegister,session:SessionDep):
    ## verrify username ##
    user_exists = session.exec(select(User).where(User.username == user.username)).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Username already exists")
    ## verrify email ##
    user_exists = session.exec(select(User).where(User.email == user.email)).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="Email already exists")
    hashed_password = hash_password(user.password)
    ## create user ##
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {
        "message": "User created successfully",
    }

@router.post("/login")
def login(user:UserLogin,session:SessionDep, response: Response):
    ## verify username ##
    user_exists = session.exec(select(User).where(User.username == user.username)).first()
    if not user_exists:
        raise HTTPException(status_code=400, detail="username or password incorrect")
    ## verify password ##
    if not verify_password(user.password, user_exists.hashed_password):
        raise HTTPException(status_code=400, detail="username or password incorrect")
    ## generate token ##
    token = jwt_encode({"id": user_exists.id})
    ## set jwt cookie ##
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False, ## need to change to true in production
        samesite="lax", ## need to change to strict in production
        max_age=TOKEN_LIFETIME_SECONDS,
        path="/",
    )
    return {
        "message": "User logged in successfully",
    }
@router.get('/me')
def get_me(session:SessionDep, user: CurrentUserDep):
    return {
        "user_id": user.id
    }

@router.get("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    return {
        "message": "User logged out successfully"
    }