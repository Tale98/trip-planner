import bcrypt
import os
from fastapi import HTTPException
from datetime import timedelta, datetime
import jwt
JWT_KEY = os.getenv("JWT_KEY")
TOKEN_LIFETIME_SECONDS = int(os.getenv("TOKEN_LIFETIME_SECONDS", 86400))
DECODE = "utf-8"
def hash_password(raw_password: str) -> str:
    sult = bcrypt.gensalt()
    return bcrypt.hashpw(raw_password.encode(DECODE), sult).decode(DECODE)

def verify_password(raw_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(raw_password.encode(DECODE), hashed_password.encode(DECODE))

def jwt_encode(sub: dict, expires_delta: timedelta = timedelta(seconds=TOKEN_LIFETIME_SECONDS)) -> str:
    payload = sub | {
        "exp": datetime.utcnow() + expires_delta,
    }
    return jwt.encode(payload, JWT_KEY, algorithm="HS256")
def jwt_decode(token: str) -> dict:
    try:
        decoded_payload = jwt.decode(token, JWT_KEY, algorithms=["HS256"])
        if datetime.utcnow() > datetime.fromtimestamp(decoded_payload["exp"]):
            raise HTTPException(status_code=401, detail="Token expired")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
    return decoded_payload