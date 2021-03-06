from fastapi import FastAPI

from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware

from app.core.routers import products, warehouses
from app.config import db_config, api_config

from tortoise import Tortoise 

## MiddleWare
origins = [
    "*", 
]

app = FastAPI(
    title=api_config.API_NAME,
    version=api_config.API_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_tortoise(
    app,
    db_url="sqlite://data.db",
    modules={"models": ["app.models"]},
    generate_schemas=True,
    add_exception_handlers=True
)


app.include_router(products.router)
app.include_router(warehouses.router)

@app.get("/") 
async def root(): 
    return {"message": "Hello there!"}
