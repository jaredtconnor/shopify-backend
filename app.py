from urllib import response
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from models import Products, product_pydantic, product_pydanticIn

app = FastAPI()


@app.get("/")
def index():
    return {"Hello World"}


@app.post("/product")
async def add_product(product_info: product_pydantic):
    product_obj = await Products.create(**product_info.dict(exclude_unset=True))
    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "ok", "data": response}


@app.get("/product")
async def get_products():

    response = await product_pydantic.from_queryset(Products.all())
    return {"status": "ok", "data": response}


@app.get("/product/{product_id}")
async def get_product(product_id: int):

    response = await product_pydantic.from_queryset_single(Products.get(id=product_id))
    return {"status": "ok", "data": response}


@app.put("/product/{product_id}")
async def update_product(product_id: int, update_info: product_pydantic):

    product = await Products.get(id=product_id)

    updated_product = update_info.dict(exclude_unset=True)

    product.name = update_info["name"]
    product.category = update_info["category"]
    product.inventory = update_info["inventory"]
    product.price = update_info["price"]

    await Products.save()

    respone = await product_pydantic.from_tortoise_orm(product)
    return {"status": "ok", "data": response}


@app.delete("/product/{product_id}") 
async def delete_product(product_id: int): 

    response = await Products.filter(id = product_id).delete()
    return {"status": "ok", "data": response}




register_tortoise(
    app,
    db_url="sqlite://sqlite-database.db",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
