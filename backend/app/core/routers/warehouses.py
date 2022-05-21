
from fastapi import APIRouter, HTTPException

from app.models import Product, product_pydantic, product_pydanticIn
from app.models import Warehouse, warehouse_pydantic, warehouse_pydanticIn

router = APIRouter( 
    prefix="/warehouse", 
    tags=["warehouse"],
    responses={404: {"description": "Not found"}}
)

# =======================================================
# Warehouse Routes
# =======================================================


@router.post("/")
async def add_warehouse(warehouse_info: warehouse_pydanticIn):

    warehouse_obj = await Warehouse.create(**warehouse_info.dict(exclude_unset=True))
    response = await warehouse_pydantic.from_tortoise_orm(warehouse_obj)
    return {"status": "ok", "data": response}


@router.get("/")
async def get_warehouses():

    response = await warehouse_pydantic.from_queryset(Warehouse.all())
    return {"status": "ok", "data": response}


@router.get("/{warehouse_id}")
async def get_warehouse(warehouse_id: int):

    response = await warehouse_pydantic.from_queryset_single(
        Warehouse.get(id=warehouse_id)
    )
    return {"status": "ok", "data": response}


@router.put("/{warehouse_id}")
async def update_warehouse(warehouse_id: int, update_info: warehouse_pydanticIn):

    warehouse_obj = await Warehouse.get(id=warehouse_id)

    update_info = update_info.dict(exclude_unset=True)

    warehouse_obj.name = update_info["name"]
    warehouse_obj.location = update_info["location"]

    await warehouse_obj.save()

    response = await warehouse_pydantic.from_tortoise_orm(warehouse_obj)
    return {"status": "ok", "data": response}


@router.delete("/{warehouse_id}")
async def delete_warehouse(warehouse_id: int):

    response = await Warehouse.filter(id=warehouse_id).delete()
    return {"status": "ok", "data": response}

