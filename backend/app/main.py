from fastapi import FastAPI
from contextlib import asynccontextmanager
from dependencies.database import create_all_tables, SessionDep
from api.v1.auth.router import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
@asynccontextmanager
async def lifespan(app:FastAPI):
    create_all_tables()
    print("All tables created", flush=True)
    ## before start ##
    yield
    ## after closing
app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)

origins = [
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def read_health():
    return {"status": "ok"}