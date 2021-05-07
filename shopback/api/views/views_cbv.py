import json
from django.shortcuts import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from api.serializers import *
from api.serializers import CategorySerializer
from rest_framework import generics
from api.models import *
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class CategoryListAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(id=pk)
        except Category.DoesNotExist as e:
            raise Http404

    def get(self, request, pk=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(instance=category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk=None):
        category = self.get_object(pk)
        category.delete()
        return Response({'message': 'deleted'}, status=200)


class CommentListAPIView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        if request.query_params.get('product_id') is None:
            feedbacks = Comment.objects.all()
        else:
            try:
                feedbacks = Product.objects.get(id=request.query_params.get('product_id'))
                feedbacks = feedbacks.comment_set.all()
            except:
                raise Http404
                # return Response({"message": "ObjectDoesNotExist"})
        serializer = CommentSerializer(feedbacks, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetailAPIView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        try:
            return Comment.objects.get(id=pk)
        except Comment.DoesNotExist as e:
            raise Http404

    def get(self, request, product_id=None, pk=None):
        feedbacks = self.get_object(pk)
        serializer = CommentSerializer(feedbacks)
        return Response(serializer.data)

    def put(self, request, product_id=None, pk=None):
        feedback = self.get_object(pk)
        serializer = CommentSerializer(instance=feedback, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, product_id=None, pk=None):
        feedback = self.get_object(pk)
        feedback.delete()
        return Response({'message': 'deleted'}, status=204)


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk=None):
        items = Profile.objects.filter(user_id=pk)
        serializer = ProfileSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
