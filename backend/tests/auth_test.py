from utils.auth import hash_password, verify_password
import logging
import httpx2
from dependencies.database import engine
from sqlmodel import select, Session
from models.users import User
log = logging.getLogger(__name__)
def test_hash_password():
    log.info("Hash password")
    hashed = hash_password("password")
    log.info(f"Hashed password: {hashed}")
    log.info("Verify password")
    assert verify_password("password", hashed) is True
    log.info("Verify wrong password")
    assert verify_password("wrong_password", hashed) is False

def test_auth():
    username = "testuser"
    password = "password"
    email = "testuser@example.com"
    body = {
        "username": username,
        "email": email,
        "password": password
    }
    log.info("Register user")
    response = httpx2.post("http://localhost:8000/auth/register", json=body)
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 200
    log.info("register again")
    response = httpx2.post("http://localhost:8000/auth/register", json=body)
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 400
    log.info("login")
    log.info("test wrong password")
    response = httpx2.post("http://localhost:8000/auth/login", json={
        "username": username,
        "password": "wrong_password"
    })
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 400
    log.info("test correct password without activate")
    response = httpx2.post("http://localhost:8000/auth/login", json={
        "username": username,
        "password": password
    })
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 401
    log.info(f"Activate user")
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        user.is_active = True
        session.add(user)
        session.commit()
        session.refresh(user)
    log.info("test correct password activated user")
    response = httpx2.post("http://localhost:8000/auth/login", json={
        "username": username,
        "password": password
    })
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 200
    log.info("verify token")
    response = httpx2.get("http://localhost:8000/auth/me", cookies=response.cookies)
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 200
    log.info("test logout")
    response = httpx2.get("http://localhost:8000/auth/logout", cookies=response.cookies)
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 200
    log.info("verify token")
    response = httpx2.get("http://localhost:8000/auth/me", cookies=response.cookies)
    log.info(f"Recieved response: {response.json}")
    assert response.status_code == 401