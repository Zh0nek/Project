from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.conf import settings
from django.contrib.auth import get_user_model

class Category(models.Model):
    name = models.CharField(max_length=200, null=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return '{}'.format(self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Product(models.Model):
    name = models.CharField(max_length=500, null=True)
    price = models.FloatField(default=0, null=True)
    description = models.TextField(default='', null=True)
    count = models.IntegerField(default=0, null=True)
    is_active = models.BooleanField(default=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    image = models.TextField(default='1', null=True)

    # cartitem = models.ForeignKey(Cart, default=None, on_delete=models.CASCADE)
    def __str__(self):
        return '{}'.format(self.name)

    def to_json(self):
        return {
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'count': self.count,
            'category': self.category,
            'image': self.image,
        }


class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.TextField(default='', null=True)
    body = models.TextField(default='', null=True)

    def to_json(self):
        return {
            'id': self.id,
            'product': self.product,
            'user': self.user,
            'title': self.title,
            'body': self.body,
        }


class Profile(models.Model):
    products = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def to_json(self):
        return {
            'id': self.id,
            'products': self.products,
            'user': self.user,
        }
