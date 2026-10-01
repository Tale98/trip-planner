import os
from sqlalchemy import create_engine
from sqlmodel import SQLModel, Session
from typing import Annotated
from fastapi import Depends

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)
def create_all_tables():
    SQLModel.metadata.create_all(engine)
def get_session():
    with Session(engine) as session:
        yield session
SessionDep = Annotated[Session, Depends(get_session)]