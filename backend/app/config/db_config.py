from fastapi import FastAPI
from tortoise import Tortoise
from tortoise.contrib.fastapi import register_tortoise

SQLITE_DB_URL = "sqlite://data.db"