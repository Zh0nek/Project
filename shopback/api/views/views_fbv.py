from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import *
from api.models import *
from django.shortcuts import get_object_or_404


# Create your views here.
@api_view(['GET', 'POST'])
def products_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = request.data
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'error': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response({'errors': serializer.errors})
    elif request.method == 'DELETE':
        product.delete()
        return Response({'deleted': True})


@api_view(['GET'])
def category_product(request, pk):
    if request.method == 'GET':
        # products = Product.objects.filter(category_id=pk)
        try:
            products = Category.objects.get(id=pk).product_set.all()
        except:
            return Response({"Message": "ObjectDoesNotExist"})
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(["GET"])
def user(request, username):
    if request.method == "GET":
        try:
            user = User.objects.get(username=username)
        except:
            return Response({"Message": "ObjectDoesNotExist"})

        serializer = UserSerializer(user)
        return Response(serializer.data)
