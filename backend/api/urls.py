from django.urls import path
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CarouselImageView, ImageURLView, ImageView
from django.conf import settings

from userauths import views as userauths_views
from store import views as store_views
from customer import views as customer_views







urlpatterns = [
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view()),
    path('user/token/refresh/',TokenRefreshView.as_view()),
    path('user/register/',userauths_views.RegisterView.as_view()),
    path('user/password-reset/<email>/',userauths_views.PasswordResetEmailVerify.as_view()),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view()),
    path('user/profile/<user_id>/', userauths_views.ProfileView.as_view()),

    #Store Endpoint
    path('category/',store_views.CategoryListAPIView.as_view()),
    path('products/',store_views.ProductListAPIView.as_view()),
    path('products/<slug>/',store_views.ProductDetailAPIView.as_view()),
    path('cart-view/',store_views.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListView.as_view()),
    path('cart-list/<str:cart_id>/', store_views.CartListView.as_view()),
    path('cart-detail/<str:cart_id>/<int:user_id>/', store_views.CartDetailView.as_view()),
    path('cart-detail/<str:cart_id>/', store_views.CartDetailView.as_view()),
    path('carousel/', CarouselImageView.as_view(), name='carousel-list'),
    path('image/', ImageURLView.as_view(), name="image-view"),
    path('create-order/', store_views.CreateOrderAPIView.as_view()),
    path('checkout/<order_oid>/', store_views.CheckoutView.as_view()),
    path('coupon/',store_views.CouponAPIView.as_view()),
    path('search/',store_views.SearchProductAPIView.as_view()),
    path('filter-products/', store_views.FilterProductAPIView.as_view(), ),
    path('all-materials/', store_views.AllMaterialsAPIView.as_view()),
    path('all-categories/', store_views.AllCategoriesAPIView.as_view()),

    # path('policy/',store_views.PolicyAPIView.as_view()),
    # payment Endpoints
    path('stripe-checkout/<order_oid>/',store_views.StripeCheckoutView.as_view()),
    path('payment-success/<order_oid>/',store_views.PaymentSuccessView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/', store_views.CartItemDeleteAPIView.as_view()),
    path('contact/', store_views.ContactAPIView.as_view()),
    #Customer Endpoints
    
    path('customer/orders/<user_id>/', customer_views.OrdersAPIView.as_view()),
    path('customer/order/<user_id>/<order_oid>/', customer_views.OrderDetailAPIView.as_view()),
    path('customer/notification/<user_id>/', customer_views.CustomerNotification.as_view()),
    path('customer/notification/<user_id>/<noti_id>/', customer_views.MarCustomerNotificationAsSeen.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/', store_views.CartItemDeleteAPIView.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
