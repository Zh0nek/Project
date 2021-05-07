from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from api.models import *
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=300)

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data['name'])
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.save()
        return instance


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(write_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'count', 'description', 'price', 'category_id', 'category', 'image']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'id', 'username')
        extra_kwargs = {'password': {'write_only': True}, 'id': {'read_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        username = validated_data.get("username")
        user = User(username=username)
        user.set_password(password)
        user.save()
        return user


class CommentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=300)
    body = serializers.CharField(max_length=300)
    product_id = serializers.IntegerField()
    user_id = serializers.IntegerField()

    def create(self, validated_data):
        try:
            validated_product = Product.objects.get(id=validated_data['product_id'])
            validated_user = User.objects.get(id=validated_data['user_id'])
        except:
            raise ObjectDoesNotExist
        comment = Comment.objects.create(title=validated_data['title'],
                                         body=validated_data['body'],
                                         user=validated_user,
                                         product=validated_product)
        return comment

    def update(self, instance, validated_data):
        # instance.name = validated_data.get('title', 'body')
        instance.title = validated_data.get('title')
        instance.body = validated_data.get('body')

        instance.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
