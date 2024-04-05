from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from userauths import views as userauths_views
from store import views as store_views


urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/',TokenRefreshView.as_view()),
    path('user/register/',userauths_views.RegisterView.as_view()),
    path('user/password-reset/<email>/',userauths_views.PasswordResetEmailVerify.as_view()),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view()),

    #Store Endpoint
    path('category/',store_views.CategoryListAPIView.as_view()),
    path('products/',store_views.ProductListAPIView.as_view()),
    path('products/<slug>/',store_views.ProductDetailAPIView.as_view()),
    path('cart-view/',store_views.CartAPIView.as_view()),
]