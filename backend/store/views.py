from django.shortcuts import render, redirect
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from userauths.models import User
from store.models import Category, Contact,Tax, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review,  Notification, Coupon , Contact
from store.serializers import ContactSerializer, ProductSerializer, CategorySerializer, CartSerializer, CartOrderSerializer, CartOrderItemSerializer, CouponSerializer, NotificationSerializer,ContactSerializer
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
from rest_framework import generics
from rest_framework.views import APIView


from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal

import stripe
import requests

stripe.api_key = "sk_test_51PCeRQH1sta5VsnZNRXTbW9jrDoPSMX4ufLQ9HdlNXnjnxZin1S9C9a85JDrDefgmblFRm1uuqOfRshEbv5GJqr500Oymcrr4V"

def send_notification(user=None, vendor=None, order=None, order_item=None):
    Notification.objects.create(
        user=user,
        vendor=vendor,
        order=order,
        order_item=order_item

    )
    

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

     print("CARTID : ", cart_id)
     print("USERID : ", user_id)
     print("ITEMID : ", item_id)

     if user_id:
         user = User.objects.get(id=user_id)
         cart = Cart.objects.get(id=item_id, user=user)
     else:
        cart = Cart.objects.get(cart_id=cart_id)

     return cart

class CreateOrderAPIView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    queryset = CartOrder.objects.all()
    permission_classes = [AllowAny]


    def create(self, request):
        payload = request.data

        print("PAYLOAD : ", payload)

        full_name = payload['full_name']
        mobile = payload['mobile']
        email = payload ['email']
        address = payload['address']
        # buyer = payload['buyer']
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
            buyer=user,
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


class StripeCheckoutView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer
    permission_classes = [AllowAny]
    queryset = CartOrder.objects.all()

    def create(self, *args, **kwargs):
        order_oid = self.kwargs['order_oid']
        order = CartOrder.objects.filter(oid=order_oid).first()

        if not order:
            return Response({"message": "Order Not Found"},status=status.HTTP_404_NOT_FOUND)

        try:
            checkout_session = stripe.checkout.Session.create(
              customer_email=order.email,
              payment_method_types=['card'],
              line_items=[
                {
                    'price_data':{
                        'currency':'usd',
                        'product_data':{
                            'name':order.full_name,
                        },
                        'unit_amount': int(order.total *100)
                    },
                    'quantity':1,
                }
              ],
              mode='payment',
               success_url='http://localhost:5173/payment-success/'+ order.oid +'?session_id={CHECKOUT_SESSION_ID}',
                cancel_url='http://localhost:5173/payment-failed/?session_id={CHECKOUT_SESSION_ID}',
            )

            order.stripe_session_id = checkout_session.id
            order.save()

            print("CHECKOUT_SESSION_URL : ", checkout_session.url)
            return redirect(checkout_session.url)
        
        except stripe.error.StripeError as e:
            return Response({"error": f"Something went wrong while creating the checkout session:{str(e)} "})
                     

class PaymentSuccessView(generics.CreateAPIView):
    serializer_class = CartOrderSerializer  
    permission_classes = [AllowAny]
    queryset = CartOrder.objects.all()

    def create(self, request, *args, **kwargs):
        payload = request.data

        order_oid = payload['order_oid']
        session_id = payload['session_id']

        order = CartOrder.objects.get(oid=order_oid)
        order_items = CartOrderItem.objects.filter(order=order)


        if session_id != 'null':
            session = stripe.checkout.Session.retrieve(session_id)

            if session.payment_status == "paid":
                if order.payment_status == "pending":
                   order.payment_status = 'paid'
                   order.save()
                   
                   #send notification to customers
                   if order.buyer != None:
                       send_notification(user=order.buyer, order=order)

                   # SEND NOTIFICATION TO VENDORS

                   for o in order_items:
                       send_notification(vendor=o.vendor, order=order, order_item=o)    

                   #send email to buyer
                   context = {
                       'order': order,
                       'orer_items': order_items,
                   }   

                   subject = "Order Placed Successfully"
                   text_body = render_to_string("email/customer_order_confirmation.txt", context)
                   html_body = render_to_string("email/customer_order_confirmation.html", context)

                   msg = EmailMultiAlternatives(
                       subject=subject,
                       from_email=settings.FROM_EMAIL,
                       to=[order.email],
                       body=text_body
                   )

                   msg.attach_alternative(html_body, "text/html")
                   msg.send()

                   return Response({"message":"Payment Successfull"}) 
                else:
                   return Response({"message":"Already Paid"}) 
            elif session.payment_status == "unpaid":    
                return Response({"message":"your Invoice is unpaid"})
            elif session.payment_status == "cancelled":    
                return Response({"message":"your Invoice was cancelled"})
            else:
                return Response({"message":"An Error Occured, Try Again.."})

        else:
            session = None 

class ContactAPIView(APIView):
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Données validées
            full_name = serializer.validated_data['full_name']
            message = serializer.validated_data['message']
            print("IS AUTHENC /", request.user.is_authenticated)
            # user = request.user if request.user.is_authenticated else None  # Gérer le cas où l'utilisateur n'est pas connecté
            user = User.objects.get(email=serializer.validated_data['user'])
            # Créez une instance de Contact et enregistrez-la dans la base de données
            Contact.objects.create(user=user, full_name=full_name, message=message)
            
            return Response({"success": True, "message": "Message sent successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

class SearchProductAPIView(generics.ListCreateAPIView):

    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query= self.request.GET.get("query")
        products = Product.objects.filter(status="published", title__icontains=query)
        return products

class FilterProductAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Initialisation du queryset pour les produits publiés
        queryset = Product.objects.filter(status="published")

        # Récupération des paramètres de filtrage de la requête
        min_price = request.GET.get('min_price')
        max_price = request.GET.get('max_price')
        materials = request.GET.getlist('materials')  # Liste des matériaux sélectionnés
        in_stock = request.GET.get('in_stock')
        categories = request.GET.get('categories')

        # Logs pour le débogage
        print(f"Filtrage avec - min_price: {min_price}, max_price: {max_price}, materials: {materials}, in_stock: {in_stock}, categories: {categories}")

        # Appliquer les filtres
        if min_price is not None and min_price != '':
            queryset = queryset.filter(price__gte=min_price)
            print(f"Produits après filtrage min_price ({min_price}): {queryset.count()}")

        if max_price is not None and max_price != '':
            queryset = queryset.filter(price__lte=max_price)
            print(f"Produits après filtrage max_price ({max_price}): {queryset.count()}")

        if materials:
            # Si des matériaux sont spécifiés, filtrer les produits contenant ces matériaux
            queryset = queryset.filter(material__in=materials)
            print(f"Produits après filtrage materials ({materials}): {queryset.count()}")

        if in_stock is not None and in_stock.lower() == 'true':
            # Filtrer uniquement les produits en stock
            queryset = queryset.filter(stock_qty__gt=0)  # Assurez-vous d'utiliser le champ correct pour le stock
            print(f"Produits après filtrage in_stock (true): {queryset.count()}")

        if categories:
            category_titles = categories.split(',')
            queryset = queryset.filter(category__title__in=category_titles)
            print(f"Produits après filtrage categories ({category_titles}): {queryset.count()}")

        # Sérialiser les produits filtrés
        serializer = ProductSerializer(queryset, many=True)
        print(f"Nombre total de produits après tous les filtres: {queryset.count()}")

        # Retourner la réponse JSON
        return Response(serializer.data)


        
        
        
    

class AllMaterialsAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Récupérer tous les matériaux distincts des produits
        materials = Product.objects.values_list('material', flat=True).distinct()
        # Renvoie la liste des matériaux dans une réponse JSON
        return Response({"materials": list(materials)})  


class AllCategoriesAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        # Récupérer toutes les catégories distinctes des produits
        categories = []
        categories_id = Product.objects.values_list('category', flat=True).distinct()
        for id in categories_id:
            category = Category.objects.get(id=id)
            categories.append(category.title)

        return Response({"categories": list(categories)})              
