from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

app = FastAPI()


@app.get("/")
def index():
    return {"Hello World"}


register_tortoise(
    app,
    db_url="sqlite://sqlite-database.db",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
