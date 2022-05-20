from fastapi import FastAPI
import pydantic
from tortoise.contrib.fastapi import register_tortoise
from uuid import uuid4

from models import Product, product_pydantic, product_pydanticIn
from models import Warehouse, warehouse_pydantic, warehouse_pydanticIn
from models import Order, order_pydantic, order_pydanticIn

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


## MiddleWare
origins = [
    "*", 
    "http://0.0.0.0:8000",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {"Hello World"}


# =======================================================
# Warehouse Routes
# =======================================================


@app.post("/warehouse")
async def add_warehouse(warehouse_info: warehouse_pydanticIn):
    warehouse_obj = await Warehouse.create(**warehouse_info.dict(exclude_unset=True))
    response = await warehouse_pydantic.from_tortoise_orm(warehouse_obj)
    return {"status": "ok", "data": response}


@app.get("/warehouse")
async def get_warehouses():

    response = await warehouse_pydantic.from_queryset(Warehouse.all())
    return {"status": "ok", "data": response}


@app.get("/warehouse/{warehouse_id}")
async def get_warehouse(warehouse_id: int):

    response = await warehouse_pydantic.from_queryset_single(
        Warehouse.get(id=warehouse_id)
    )
    return {"status": "ok", "data": response}


@app.put("/warehouse/{warehouse_id}")
async def update_warehouse(warehouse_id: int, update_info: warehouse_pydanticIn):

    warehouse_obj = await Warehouse.get(id=warehouse_id)

    update_info = update_info.dict(exclude_unset=True)

    warehouse_obj.name = update_info["name"]
    warehouse_obj.location = update_info["location"]

    await warehouse_obj.save()

    response = await warehouse_pydantic.from_tortoise_orm(warehouse_obj)
    return {"status": "ok", "data": response}


@app.delete("/warehouse/{warehouse_id}")
async def delete_warehouse(warehouse_id: int):

    response = await Warehouse.filter(id=warehouse_id).delete()
    return {"status": "ok", "data": response}


# =======================================================
# Product Routes
# =======================================================


@app.post("/product/{warehouse_id}")
async def add_product(warehouse_id: int, product_info: product_pydanticIn):

    warehouse = await Warehouse.get(id=warehouse_id)
    product_info = product_info.dict(exclude_unset=True)
    product_obj = await Product.create(**product_info, warehouse_id=warehouse)
    response = await product_pydantic.from_tortoise_orm(product_obj)

    return {"status": "ok", "data": response}


@app.get("/product")
async def get_products():

    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok", "data": response}


@app.get("/product/{product_id}")
async def get_product(product_id: int):

    response = await product_pydantic.from_queryset_single(Product.get(id=product_id))
    return {"status": "ok", "data": response}


@app.put("/product/{product_id}")
async def update_product(product_id: int, update_info: product_pydanticIn):

    product_obj = await Product.get(id=product_id)

    update_info = update_info.dict(exclude_unset=True)

    product_obj.name = update_info["name"]
    product_obj.category = update_info["category"]
    product_obj.inventory = update_info["inventory"]
    product_obj.price = update_info["price"]

    await product_obj.save()

    response = await product_pydantic.from_tortoise_orm(product_obj)
    return {"status": "ok", "data": response}


@app.delete("/product/{product_id}")
async def delete_product(product_id: int):

    response = await Product.filter(id=product_id).delete()
    return {"status": "ok", "data": response}


# =======================================================
# Order Routes
# =======================================================


@app.post("/order/{product_id}")
async def add_order(product_id: int, order_info: order_pydanticIn):

    product = await Product.get(id=product_id)
    order_info = order_info.dict(exclude_unset=True)

    order_obj = await Order.create(**order_info, product_id=product)

    response = await order_pydantic.from_tortoise_orm(order_obj)
    return {"status": "ok", "data": response}


@app.get("/order")
async def get_orders():

    response = await order_pydantic.from_queryset(Order.all())
    return {"status": "ok", "data": response}


@app.get("/order/{order_id}")
async def get_order(order_id: int):

    response = await order_pydantic.from_queryset_single(Order.get(id=order_id))
    return {"status": "ok", "data": response}


@app.put("/order/{order_id}")
async def update_order(order_id: int, update_info: order_pydanticIn):

    order_obj = await Order.get(id=order_id)

    update_info = update_info.dict(exclude_unset=True)

    order_obj.order_date = update_info["order_date"]
    order_obj.customer_name = update_info["customer_name"]
    order_obj.number_items = update_info["number_items"]

    await order_obj.save()

    response = await order_pydantic.from_tortoise_orm(order_obj)
    return {"status": "ok", "data": response}


@app.delete("/order/{oder_id}")
async def delete_order(order_id: int):

    response = await Order.filter(id=order_id).delete()
    return {"status": "ok", "data": response}


register_tortoise(
    app,
    db_url="sqlite://sqlite-database.db",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
