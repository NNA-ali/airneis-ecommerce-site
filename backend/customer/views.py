from django.shortcuts import render, redirect  # Import des fonctions de rendu et de redirection
from django.conf import settings  # Import des paramètres de configuration
from django.core.mail import EmailMultiAlternatives  # Import pour envoyer des emails avec plusieurs alternatives
from django.template.loader import render_to_string  # Import pour rendre les templates en chaîne de caractères
from userauths.models import User  # Import du modèle utilisateur
from store.models import (  # Import des modèles du store
    Category, Contact, Tax, Product, Gallery, Specification, Size, 
    Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, 
    Wishlist, Notification, Coupon
)
from store.serializers import (  # Import des serializers du store
    ProductSerializer, CategorySerializer, CartSerializer, 
    CartOrderSerializer, CartOrderItemSerializer, CouponSerializer, 
    NotificationSerializer, ContactSerializer
)
from rest_framework.permissions import IsAuthenticated  # Import des permissions pour les vues
from decimal import Decimal  # Import pour les calculs décimaux
from rest_framework import generics  # Import des vues génériques de DRF
from rest_framework.views import APIView  # Import des vues basées sur les classes de DRF
from rest_framework import generics, status  # Import des classes génériques et des statuts de réponse de DRF
from rest_framework.permissions import AllowAny, IsAuthenticated  # Import des permissions de DRF
from rest_framework.response import Response  # Import des réponses de DRF

import stripe  # Import du module Stripe pour les paiements
import requests  # Import du module requests pour les requêtes HTTP

# Vue générique pour lister les commandes passées par un utilisateur spécifique
class OrdersAPIView(generics.ListAPIView):
    serializer_class = CartOrderSerializer  # Utilisation du serializer CartOrderSerializer
    permission_classes = [AllowAny]  # Permission pour autoriser l'accès à tout le monde

    def get_queryset(self):
        # Récupérer l'ID de l'utilisateur à partir des arguments de la vue
        user_id = self.kwargs['user_id']
        # Obtenir l'utilisateur correspondant à l'ID
        user = User.objects.get(id=user_id)
        # Filtrer les commandes de cet utilisateur où le statut de paiement est "payé"
        orders = CartOrder.objects.filter(buyer=user, payment_status="paid")
        return orders
    

# Vue générique pour obtenir les détails d'une commande spécifique
class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CartOrderSerializer  # Utilisation du serializer CartOrderSerializer
    permission_classes = [AllowAny]  # Permission pour autoriser l'accès à tout le monde

    def get_object(self):
        # Récupérer l'ID de l'utilisateur à partir des arguments de la vue
        user_id = self.kwargs['user_id']
        # Récupérer l'ID de la commande à partir des arguments de la vue
        order_oid = self.kwargs['order_oid']
        
        # Obtenir l'utilisateur correspondant à l'ID
        user = User.objects.get(id=user_id)
        # Obtenir la commande correspondant à l'utilisateur et à l'ID de commande
        order = CartOrder.objects.get(buyer=user, oid=order_oid)
        return order
    

# Vue générique pour lister les notifications non lues d'un utilisateur spécifique
class CustomerNotification(generics.ListAPIView):
    serializer_class = NotificationSerializer  # Utilisation du serializer NotificationSerializer
    permission_classes = [AllowAny]  # Permission pour autoriser l'accès à tout le monde

    def get_queryset(self):
        # Récupérer l'ID de l'utilisateur à partir des arguments de la vue
        user_id = self.kwargs['user_id']
        # Obtenir l'utilisateur correspondant à l'ID
        user = User.objects.get(id=user_id)
        # Filtrer les notifications non lues de cet utilisateur
        return Notification.objects.filter(user=user, seen=False)
    

# Vue générique pour marquer une notification comme vue
class MarCustomerNotificationAsSeen(generics.RetrieveAPIView):
    serializer_class = NotificationSerializer  # Utilisation du serializer NotificationSerializer
    permission_classes = [AllowAny]  # Permission pour autoriser l'accès à tout le monde

    def get_object(self):
        # Récupérer l'ID de l'utilisateur à partir des arguments de la vue
        user_id = self.kwargs['user_id']
        # Récupérer l'ID de la notification à partir des arguments de la vue
        noti_id = self.kwargs['noti_id']

        # Obtenir l'utilisateur correspondant à l'ID
        user = User.objects.get(id=user_id)
        # Obtenir la notification correspondant à l'ID et à l'utilisateur
        noti = Notification.objects.get(id=noti_id, user=user)

        # Si la notification n'est pas déjà marquée comme vue, la marquer comme vue
        if noti.seen != True:
            noti.seen = True
            noti.save()  # Enregistrer la modification dans la base de données
        return noti
