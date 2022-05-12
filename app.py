from urllib import response
from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise

from models import Products, product_pydantic, product_pydanticIn
from models import Suppliers, supplier_pydantic, supplier_pydanticIn
from models import Orders, order_pydantic, order_pydanticIn
from models import Purchasers, purchase_pydantic, purchase_pydanticIn

app = FastAPI()


@app.get("/")
def index():
    return {"Hello World"}


# =======================================================
# Product Routes
# =======================================================


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

    update_info = update_info.dict(exclude_unset=True)

    product.name = update_info["name"]
    product.category = update_info["category"]
    product.inventory = update_info["inventory"]
    product.price = update_info["price"]

    await Products.save()

    respone = await product_pydantic.from_tortoise_orm(product)
    return {"status": "ok", "data": response}


@app.delete("/product/{product_id}")
async def delete_product(product_id: int):

    response = await Products.filter(id=product_id).delete()
    return {"status": "ok", "data": response}


# =======================================================
# Supplier Routes
# =======================================================


@app.post("/supplier")
async def add_supplier(supplier_info: supplier_pydantic):
    supplier_obj = await Suppliers.create(**supplier_info.dict(exclude_unset=True))
    response = await supplier_pydantic.from_tortoise_orm(supplier_obj)
    return {"status": "ok", "data": response}


@app.get("/supplier")
async def get_suppliers():

    response = await supplier_pydantic.from_queryset(Suppliers.all())
    return {"status": "ok", "data": response}


@app.get("/supplier/{supplier_id}")
async def get_supplier(supplier_id: int):

    response = await supplier_pydantic.from_queryset_single(
        Suppliers.get(id=supplier_id)
    )
    return {"status": "ok", "data": response}


@app.put("/supplier/{supplier_id}")
async def update_supplier(supplier_id: int, update_info: supplier_pydantic):

    supplier = await Suppliers.get(id=supplier_id)

    update_info = update_info.dict(exclude_unset=True)

    supplier.location = update_info["location"]

    await Suppliers.save()

    respone = await supplier_pydantic.from_tortoise_orm(supplier)
    return {"status": "ok", "data": response}


@app.delete("/supplier/{supplier_id}")
async def delete_supplier(supplier_id: int):

    response = await Suppliers.filter(id=supplier_id).delete()
    return {"status": "ok", "data": response}


# =======================================================
# Order Routes
# =======================================================


@app.post("/order")
async def add_order(order_info: order_pydantic):
    order_obj = await order_pydantic.create(**order_info.dict(exclude_unset=True))
    response = await order_pydantic.from_tortoise_orm(order_obj)
    return {"status": "ok", "data": response}


@app.get("/order")
async def get_orders():

    response = await order_pydantic.from_queryset(Orders.all())
    return {"status": "ok", "data": response}


@app.get("/order/{order_id}")
async def get_order(order_id: int):

    response = await order_pydantic.from_queryset_single(Orders.get(id=order_id))
    return {"status": "ok", "data": response}


@app.put("/order/{order_id}")
async def update_order(order_id: int, update_info: order_pydantic):

    order = await Orders.get(id=order_id)

    update_info = update_info.dict(exclude_unset=True)

    order.order_date = update_info["order_date"]
    order.customer_name = update_info["customer_name"]
    order.number_items = update_info["number_items"]

    await Orders.save()

    respone = await order_pydantic.from_tortoise_orm(order)
    return {"status": "ok", "data": response}


@app.delete("/order/{oder_id}")
async def delete_order(order_id: int):

    response = await Orders.filter(id=order_id).delete()
    return {"status": "ok", "data": response}


# =======================================================
# Purchase Routes
# =======================================================


@app.post("/purchase")
async def add_purchase(purchase_info: purchase_pydantic):
    purchase_obj = await purchase_pydantic.create(
        **purchase_info.dict(exclude_unset=True)
    )
    response = await purchase_pydantic.from_tortoise_orm(purchase_obj)
    return {"status": "ok", "data": response}


@app.get("/purchase")
async def get_purchases():

    response = await purchase_pydantic.from_queryset(Purchasers.all())
    return {"status": "ok", "data": response}


@app.get("/purchase/{purhcase_id}")
async def get_purchase(purchase_id: int):

    response = await purchase_pydantic.from_queryset_single(
        Purchasers.get(id=purchase_id)
    )
    return {"status": "ok", "data": response}


@app.put("/purchase/{purchase_id}")
async def update_purchase(purchase_id: int, update_info: purchase_pydantic):

    purchase = await Purchasers.get(id=purchase_id)

    update_info = update_info.dict(exclude_unset=True)

    purchase.purchase_date = update_info["purchase_date"]
    purchase.number_items = update_info["number_items"]

    await Purchasers.save()

    respone = await purchase_pydantic.from_tortoise_orm(purchase)
    return {"status": "ok", "data": response}


@app.delete("/purchase/{purchase_id}")
async def delete_purchase(purchase_id: int):

    response = await Purchasers.filter(id=purchase_id).delete()
    return {"status": "ok", "data": response}


register_tortoise(
    app,
    db_url="sqlite://sqlite-database.db",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
