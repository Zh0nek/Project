from django.urls import path
from api.views.views_fbv import*
from api.views.views_cbv import*
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('login/', obtain_jwt_token),
    path('user/<str:username>/', user),
    path('products/', products_list),
    path('products/<int:product_id>/', product_detail),
    path('categories/', CategoryListAPIView.as_view()),
    path('categories/<int:pk>/', CategoryDetailAPIView.as_view()),
    path('categories/<int:pk>/products/', category_product),
    path('comments/', CommentListAPIView.as_view()),
    path('comments/<int:pk>/', CommentDetailAPIView.as_view()),
    path('cart/<int:pk>', ProfileAPIView.as_view()),
]
