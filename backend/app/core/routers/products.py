from fastapi import APIRouter, HTTPException

from app.models import Product, product_pydantic, product_pydanticIn
from app.models import Warehouse, warehouse_pydantic, warehouse_pydanticIn

router = APIRouter( 
    prefix="/product", 
    tags=["product"],
    responses={404: {"description": "Not found"}}
)



# =======================================================
# Product Routes
# =======================================================


@router.post("/{warehouse_id}")
async def add_product(warehouse_id: int, product_info: product_pydanticIn):
    warehouse = await Warehouse.get(id=warehouse_id)

    product_info = product_info.dict(exclude_unset=True)
    product_obj = await Product.create(**product_info, warehouse_id=warehouse)
    response = await product_pydantic.from_tortoise_orm(product_obj)

    return {"status": "ok", "data": response}


@router.get("/")
async def get_products():

    response = await product_pydantic.from_queryset(Product.all())
    return {"status": "ok", "data": response}


@router.get("/{product_id}")
async def get_product(product_id: int):

    response = await product_pydantic.from_queryset_single(Product.get(id=product_id))
    return {"status": "ok", "data": response}


@router.put("/{product_id}")
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


@router.delete("/{product_id}")
async def delete_product(product_id: int):

    response = await Product.filter(id=product_id).delete()
    return {"status": "ok", "data": response}
