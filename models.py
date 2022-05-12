from tortoise.models import Model
from tortoise import fields
from tortoise.contrib.pydantic import pydantic_model_creator

class Products(Model):

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=56)
    category = fields.CharField(max_length=56, null=False)
    inventory = fields.IntField(default=0)
    price = fields.DecimalField(max_digits=8, decimal_places=2, default=0.000)


class Purchasers(Model):

    id = fields.IntField(pk=True)
    purchase_date = fields.DateField(auto_now_add=True)
    number_items = fields.IntField(default=0)
    product = fields.ForeignKeyField("models.Products")
    supplier = fields.ForeignKeyField("models.Suppliers")


class Suppliers(Model):

    id = fields.IntField(pk=True)
    location = fields.CharField(max_length=56)


class Orders(Model):

    id = fields.IntField(pk=True)
    order_date = fields.DateField(auto_now_add=True)
    customer_name = fields.CharField(max_length=56, null=False)
    number_items = fields.IntField(default=0) 
    product = fields.ForeignKeyField("models.Products")


product_pydantic = pydantic_model_creator(Products, name="Products")
product_pydanticIn = pydantic_model_creator(Products, name="ProductIn", exclude_readonly=True) 

supplier_pydantic = pydantic_model_creator(Suppliers, name="Suppliers")
supplier_pydanticIn = pydantic_model_creator(Suppliers, name="SuppliersIn", exclude_readonly=True)

order_pydantic = pydantic_model_creator(Orders, name="Orders")
order_pydanticIn = pydantic_model_creator(Orders, name="Orders", exclude_readonly=True)

purchase_pydantic = pydantic_model_creator(Purchasers, name="Purchases")
purchase_pydanticIn = pydantic_model_creator(Purchasers, name="Purchases", exclude_readonly=True)