from tortoise.models import Model
from tortoise import fields


class Products(Model):

    id = fields.IntField(pk=True)
    category = fields.CharField(max_length=56, null=False)
    inventory = fields.IntField(default=0)
    price = fields.DecimalField(max_digits=8, decimal_places=2, default=0.000)


class Purchasers(Model):

    id = fields.IntField(pk=True)
    number_items = fields.IntField(default=0)


class Suppliers(Model):

    id = fields.IntField(pk=True)
    location = fields.CharField(max_length=56)


class Orders(Model):

    id = fields.IntField(pk=True)
    order_date = fields.DateField(auto_now_add=True)
    customer_name = fields.CharField(max_length=56, null=False)
    number_items = fields.IntField(default=0)