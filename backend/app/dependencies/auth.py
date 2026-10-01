from fastapi import dependencies, Depends
from dependencies.database import SessionDep
from utils.auth import jwt_decode
from models.users import User
from sqlmodel import select
from fastapi import HTTPException, Cookie
from typing import Annotated

def get_current_user(session:SessionDep, access_token: Annotated[str | None, Cookie()]=None):
    if not access_token:
        raise HTTPException(status_code=401, detail="Token not found")
    decoded_payload = jwt_decode(access_token)
    user_exists = session.exec(select(User).where(User.id == int(decoded_payload["id"]))).first()
    if not user_exists:
        raise HTTPException(status_code=401, detail="Invalid token from query")
    return user_exists
    
CurrentUserDep = Annotated[User, Depends(get_current_user)]