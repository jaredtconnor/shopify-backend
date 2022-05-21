from types import WrapperDescriptorType
from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator


class Product(Model):

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=56, null=False)
    category = fields.CharField(max_length=56)
    inventory = fields.IntField(default=0)
    price = fields.DecimalField(max_digits=8, decimal_places=2, default=0.000)

    warehouse_id = fields.ForeignKeyField("models.Warehouse", related_name="located_warehouse")


class Warehouse(Model):

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=56, null=False)
    location = fields.CharField(max_length=56)



product_pydantic = pydantic_model_creator(Product, name="Product")
product_pydanticIn = pydantic_model_creator(Product, name="ProductIn", exclude_readonly=True)

warehouse_pydantic = pydantic_model_creator(Warehouse, name="Warehouse")
warehouse_pydanticIn = pydantic_model_creator(Warehouse, name="WarehouseIn", exclude_readonly=True)