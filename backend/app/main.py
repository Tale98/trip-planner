from fastapi import FastAPI
from contextlib import asynccontextmanager
from dependencies.database import create_all_tables
from api.v1.auth.router import router as auth_router
@asynccontextmanager
async def lifespan(app:FastAPI):
    create_all_tables()
    print("All tables created")
    yield
    ## after closing
app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)
@app.get("/health")
def read_health():
    return {"status": "ok"}