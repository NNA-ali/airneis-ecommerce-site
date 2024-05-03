from django.shortcuts import render
from userauths.models import User
from store.models import Category,Tax, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Wishlist, Notification, Coupon
from store.serializers import ProductSerializer, CategorySerializer, CartSerializer, CartOrderSerializer, CartOrderItemSerializer, CouponSerializer
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
from rest_framework import generics


from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal
class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class= CategorySerializer
    permission_classes=[AllowAny]

class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailAPIView(generics.RetrieveAPIView):
    
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs['slug']
        return Product.objects.get(slug=slug)
    
class CartAPIView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        payload = request.data

        print(payload)

        product_id = payload['product_id']
        user_id = payload['user_id']
        qty = payload['qty']
        price = payload['price']
        shipping_amount = payload['shipping_amount']
        country = payload['country']
        size = payload['size']
        color = payload['color']
        cart_id = payload['cart_id']

        product = Product.objects.filter(status="published", id=product_id).first()
        if user_id != "undefined":
            user = User.objects.filter(id=user_id).first()
        else:
            user = None
        
        tax = Tax.objects.filter(country=country).first()
        if tax:
            tax_rate = tax.rate / 100
            
        else:
            tax_rate = 0

        cart = Cart.objects.filter(cart_id=cart_id, product=product).first() 

        if cart:
            cart.product = product
            cart.user = user
            cart.qty = qty
            cart.price= price
            cart.sub_total = Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = Decimal(cart.sub_total) * Decimal(tax_rate)
            
            cart.color= color
            cart.size= size
            cart.country = country
            cart.cart_id= cart_id

            cart.total = cart.sub_total + cart.shipping_amount + cart.tax_fee
            cart.save()
             
            return Response ({'message':"cart updated Successfully"}, status=status.HTTP_200_OK)
        
        else:
            cart = Cart()
            cart.product = product
            cart.user = user
            cart.qty = qty
            cart.price= price
            cart.sub_total = Decimal(price) * int(qty)
            cart.shipping_amount = Decimal(shipping_amount) * int(qty)
            cart.tax_fee = Decimal(price) * Decimal(tax_rate) * int(qty)

            cart.color= color
            cart.size= size
            cart.country = country
            cart.cart_id= cart_id

            cart.total = cart.sub_total + cart.shipping_amount + cart.tax_fee
            cart.save()
            return Response ({'message':"cart Created Successfully"}, status=status.HTTP_201_CREATED)
        

class CartListView(generics.ListAPIView): 
    serializer_class = CartSerializer
    permission_classes = (AllowAny,) 
    queryset = Cart.objects.all()

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)    
        return queryset
    
class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer  
    permission_classes = (AllowAny,)  
    lookup_field = "cart_id"

    def get_queryset(self):
        cart_id = self.kwargs['cart_id']
        user_id = self.kwargs.get('user_id')

        if user_id is not None:
            user = User.objects.get(id=user_id)
            queryset = Cart.objects.filter(user=user, cart_id=cart_id)
        else:
            queryset = Cart.objects.filter(cart_id=cart_id)    
        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        total_shipping = 0.0
        total_tax = 0.0
        total_sub_total = 0.0
        total_total = 0.0

        for cart_item in queryset:
            total_shipping += float(self.calculate_shipping(cart_item))
            total_tax += float(self.calculate_tax(cart_item))
            total_sub_total += float(self.calculate_sub_total(cart_item))
            total_total += float(self.calculate_total(cart_item))
          
        data = {
            'shipping': total_shipping,
            'tax': total_tax,
            'sub_total': total_sub_total,
            'total': total_total,
        }
        return Response(data)

    def calculate_shipping(self, cart_item):
        return cart_item.shipping_amount 

    def calculate_tax(self, cart_item):
        return cart_item.tax_fee  

    def calculate_sub_total(self, cart_item):
        return cart_item.sub_total  

    def calculate_total(self, cart_item):
        return cart_item.total 
    


    
class CartItemDeleteAPIView(generics.DestroyAPIView): 
    serializer_class = CartSerializer
    lookup_field = 'cart_id'  
    permission_classes = [AllowAny]

    def get_object(self):
     cart_id = self.kwargs['cart_id']
     item_id = self.kwargs['item_id']
     user_id = self.kwargs.get('user_id')

     if user_id:
         user = User.objects.get(id=user_id)
         cart = Cart.objects.get(id=item_id, user=user)
     else:
        cart = Cart.objects.get(id=cart_id)    

     return cart

class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    queryset = CartOrder.objects.all()
    permission_classes = [AllowAny]


    def create(self, request):
        payload = request.data

        full_name = payload['full_name']
        mobile = payload['mobile']
        email = payload ['email']
        address = payload['address']
        city = payload['city']
        state = payload['state']
        country = payload['country']
        cart_id = payload['cart_id']
        user_id = payload['user_id']
        print("user_id ===", user_id)

        try:
            user = User.objects.get(id=user_id)
        except:
            user = None

        print("user ===", user)        

        cart_items = Cart.objects.filter(cart_id=cart_id)        

        total_shipping = Decimal(0.00)
        total_tax = Decimal(0.00)
        total_sub_total = Decimal(0.00)
        total_initial_total = Decimal(0.00)
        total_total = Decimal(0.00)
        

        order = CartOrder.objects.create(

            full_name=full_name,
            email= email,
            mobile=mobile,
            address=address,
            city=city,
            state=state,
            country=country,

        )

        for c in cart_items:
            CartOrderItem.objects.create(
                order=order,
                product=c.product,
                vendor=c.product.vendor,
                qty=c.qty,
                size=c.size,
                price=c.price,
                sub_total=c.sub_total,
                shipping_amount=c.shipping_amount,
                tax_fee=c.tax_fee,
                total=c.total,
                initial_total=c.total,
            )

            total_shipping += Decimal(c.shipping_amount)
            total_tax += Decimal(c.tax_fee)
            total_sub_total += Decimal(c.sub_total)
            total_initial_total += Decimal(c.total)
            total_total += Decimal(c.total)

            order.vendor.add(c.product.vendor)

        order.sub_total = total_sub_total
        order.shipping_amount = total_shipping 
        order.tax_fee = total_tax
        order.initial_total = total_initial_total   
        order.total = total_total

        order.save()

        return Response({"message": "Order Created successfully", "order_oid":order.oid}, status=status.HTTP_201_CREATED)   


class CheckoutView(generics.RetrieveAPIView):
    serializer_class = CartOrderSerializer
    lookup_field = 'order_oid'
    permission_classes = [AllowAny]

    def get_object(self):
        order_oid = self.kwargs['order_oid']
        order = CartOrder.objects.get(oid=order_oid)

        return order

class CouponAPIView(generics.CreateAPIView):
     serializer_class = CouponSerializer
     queryset = Coupon.objects.all()
     permission_classes = [AllowAny]

     def create(self,request):
         payload = request.data

         order_oid = payload['order_oid']
         coupon_code = payload['coupon_code']

         order = CartOrder.objects.get(oid=order_oid)
         coupon = Coupon.objects.filter(code=coupon_code).first()

         if coupon:
             order_items = CartOrderItem.objects.filter(order=order, vendor=coupon.vendor)
             if order_items:
                 for i in order_items:
                     if not coupon in i.coupon.all():
                         discount = i.total * coupon.discount / 100

                         i.total -= discount
                         i.sub_total -= discount
                         i.coupon.add(coupon)
                         i.saved += discount

                         order.total -= discount
                         order.sub_total -= discount
                         order.saved += discount

                         i.save()
                         order.save()

                         return Response({"message":"coupon Activated", "icon":"success"}, status=status.HTTP_200_OK)
                     
                     else:
                         return Response({"message":"coupon Already Activated", "icon":"warning"}, status=status.HTTP_200_OK)
             else:
                 return Response ( {"message":"Order Item Does Not Exists", "icon":"error"}, status=status.HTTP_200_OK) 
         else:
             return Response ({"message":"Coupon Does Not Exists","icon":"error"}, status=status.HTTP_200_OK)
                 
                     
            