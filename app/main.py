from fastapi import Depends, FastAPI
from .routers import auth, users, posts, post_items, subscriptions

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(post_items.router)
app.include_router(subscriptions.router)

@app.get("/")
async def index():
  return({"message": "Hello world"})