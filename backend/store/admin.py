from django.contrib import admin  # Importation du module admin de Django

# Importation des modèles à enregistrer dans l'interface d'administration
from store.models import Product, Tax, Category, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, Notification, ProductFaq, Review, Coupon,  Contact

# Définition d'une classe Inline pour gérer les images d'un produit dans l'admin
class GalleryInline(admin.TabularInline):
    model = Gallery  # Modèle à inclure en ligne

# Définition d'une classe Inline pour gérer les spécifications d'un produit dans l'admin
class SpecificationInline(admin.TabularInline):
    model = Specification  # Modèle à inclure en ligne

# Définition d'une classe Inline pour gérer les tailles d'un produit dans l'admin
class SizeInline(admin.TabularInline):
    model = Size  # Modèle à inclure en ligne

# Définition d'une classe Inline pour gérer les couleurs d'un produit dans l'admin
class ColorInline(admin.TabularInline):
    model = Color  # Modèle à inclure en ligne

# Configuration de l'interface d'administration pour le modèle Product
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'get_length', 'get_width', 'category', 'shipping_amount', 'stock_qty', 'in_stock', 'vendor', 'featured']  # Colonnes à afficher dans la liste
    # list_editable = ['in_stock', 'featured']  # Colonnes éditables directement dans la liste (désactivé ici)
    list_filter = ['date']  # Ajout de filtres pour la date
    search_fields = ['title']  # Champs de recherche
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline]  # Ajout des inlines pour les images, spécifications, tailles et couleurs

    # Fonction pour obtenir la longueur des tailles du produit
    def get_length(self, obj):
        sizes = Size.objects.filter(product=obj)  # Récupération des tailles liées au produit
        length = ', '.join([str(size.length) for size in sizes])  # Conversion des longueurs en chaîne de caractères
        return length

    get_length.short_description = 'Length'  # Nom de la colonne affichée pour la longueur

    # Fonction pour obtenir la largeur des tailles du produit
    def get_width(self, obj):
        sizes = Size.objects.filter(product=obj)  # Récupération des tailles liées au produit
        width = ', '.join([str(size.width) for size in sizes])  # Conversion des largeurs en chaîne de caractères
        return width

    get_width.short_description = 'Width'  # Nom de la colonne affichée pour la largeur

# Configuration de l'interface d'administration pour le modèle CartOrderItem
class CartOrderItemsAdmin(admin.ModelAdmin):
    list_filter = ['delivery_couriers', 'applied_coupon']  # Ajout de filtres pour les courriers de livraison et les coupons appliqués
    list_editable = ['date']  # Colonne éditable directement dans la liste pour la date
    list_display = ['order_id', 'vendor', 'product', 'qty', 'price', 'sub_total', 'shipping_amount', 'tax_fee', 'total', 'delivery_couriers', 'applied_coupon', 'date']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle CartOrder
class CartOrderAdmin(admin.ModelAdmin):
    search_fields = ['oid', 'full_name', 'email', 'mobile']  # Champs de recherche
    list_filter = ['payment_status', 'order_status']  # Ajout de filtres pour le statut de paiement et le statut de commande
    list_display = ['oid', 'buyer', 'payment_status', 'order_status', 'total', 'date']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle Cart
class CartAdmin(admin.ModelAdmin):
    list_display = ['product', 'cart_id', 'qty', 'price', 'sub_total', 'shipping_amount', 'tax_fee', 'total', 'country', 'size', 'color', 'date']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle ProductFaq
class ProductFaqAdmin(admin.ModelAdmin):
    list_editable = ['active', 'answer']  # Colonnes éditables directement dans la liste pour l'état actif et la réponse
    list_display = ['user', 'question', 'answer', 'active']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle Coupon
class CouponAdmin(admin.ModelAdmin):
    # inlines = [CouponUsersInlineAdmin]  # Inlines potentiels pour les utilisateurs de coupons (désactivé ici)
    list_editable = ['code', 'active']  # Colonnes éditables directement dans la liste pour le code et l'état actif
    list_display = ['vendor', 'code', 'discount', 'active', 'date']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle Review
class ProductReviewAdmin(admin.ModelAdmin):
    list_editable = ['active']  # Colonne éditable directement dans la liste pour l'état actif
    list_display = ['user', 'product', 'review', 'reply', 'rating', 'active']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle Notification
class NotificationAdmin(admin.ModelAdmin):
    list_editable = ['seen']  # Colonne éditable directement dans la liste pour l'état vu
    list_display = ['order', 'seen', 'user', 'vendor', 'date']  # Colonnes à afficher dans la liste

# Configuration de l'interface d'administration pour le modèle Contact
class ContactAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'user', 'message', 'date']  # Colonnes à afficher dans la liste
    search_fields = ['full_name', 'message']  # Champs de recherche
    list_filter = ['date']  # Ajout de filtres pour la date

# Enregistrement des modèles dans l'interface d'administration
admin.site.register(Category)  # Enregistrement du modèle Category
admin.site.register(Product, ProductAdmin)  # Enregistrement du modèle Product avec la configuration personnalisée ProductAdmin
admin.site.register(Cart)  # Enregistrement du modèle Cart
admin.site.register(CartOrder, CartOrderAdmin)  # Enregistrement du modèle CartOrder avec la configuration personnalisée CartOrderAdmin
admin.site.register(CartOrderItem)  # Enregistrement du modèle CartOrderItem
admin.site.register(ProductFaq, ProductFaqAdmin)  # Enregistrement du modèle ProductFaq avec la configuration personnalisée ProductFaqAdmin
admin.site.register(Coupon, CouponAdmin)  # Enregistrement du modèle Coupon avec la configuration personnalisée CouponAdmin

admin.site.register(Notification, NotificationAdmin)  # Enregistrement du modèle Notification avec la configuration personnalisée NotificationAdmin
admin.site.register(Review, ProductReviewAdmin)  # Enregistrement du modèle Review avec la configuration personnalisée ProductReviewAdmin
admin.site.register(Tax)  # Enregistrement du modèle Tax
admin.site.register(Contact, ContactAdmin)  # Enregistrement du modèle Contact avec la configuration personnalisée ContactAdmin
