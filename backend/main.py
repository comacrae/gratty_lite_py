from fastapi import Depends, FastAPI, Request
from .database import engine, Base
from .internal import admin
from .routers import users, posts, post_items, subscriptions
from .security import jwt_wrapper
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = [ "http://localhost:3000/login",
           "http://localhost:3000",
           "http://127.0.0.1:3000"]


app.add_middleware(CORSMiddleware, allow_origins=origins, allow_origin_regex="http://localhost.*",allow_credentials=True,allow_methods=["*"],allow_headers=["*"])
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(post_items.router)
app.include_router(subscriptions.router)

@app.get("/")
async def return_jwt(jwt : Annotated[dict, Depends(jwt_wrapper)]):
  return jwt

    


