from fastapi import FastAPI
import typing

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id:int):
  return {"item_id":item_id}

