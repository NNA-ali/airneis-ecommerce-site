from rest_framework import serializers  # Importation de la classe serializers de Django REST framework
from .models import CarouselImage  # Importation du modèle CarouselImage

# Importation des modèles de l'application store
from store.models import Category, Product, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, ProductFaq, Review, Notification, Coupon, Contact

# Importation du modèle Vendor de l'application vendor
from vendor.models import Vendor

# Sérialiseur pour le modèle Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

# Sérialiseur pour le modèle Gallery
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

# Sérialiseur pour le modèle Specification
class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

# Sérialiseur pour le modèle Size
class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

# Sérialiseur pour le modèle Color
class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

# Sérialiseur pour le modèle Product
class ProductSerializer(serializers.ModelSerializer):
    # Sérialisation des relations Many-to-Many et ForeignKey
    gallery = GallerySerializer(many=True, read_only=True)  # Sérialiseur imbriqué pour les images de la galerie
    color = ColorSerializer(many=True, read_only=True)  # Sérialiseur imbriqué pour les couleurs
    specification = SpecificationSerializer(many=True, read_only=True)  # Sérialiseur imbriqué pour les spécifications
    size = SizeSerializer(many=True, read_only=True)  # Sérialiseur imbriqué pour les tailles
    
    class Meta:
        model = Product  # Spécifie le modèle à sérialiser
        fields = [
            'id',
            'title',
            'image',
            'description',
            'category',
            'price',
            'old_price',
            'shipping_amount',
            'stock_qty',
            'in_stock',
            'status',
            'featured',
            'views',
            'rating',
            'vendor',
            'gallery',
            'color',
            'specification',
            'size',
            'product_rating',
            'rating_count',
            'pid',
            'slug',
            'date',
        ]  # Liste des champs à sérialiser

    def __init__(self, *args, **kwargs):
        super(ProductSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle Cart
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(CartSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle CartOrderItem
class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartOrderItem  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(CartOrderItemSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle CartOrder
class CartOrderSerializer(serializers.ModelSerializer):
    orderitem = CartOrderItemSerializer(many=True, read_only=True)  # Sérialiseur imbriqué pour les items de commande
    
    class Meta:
        model = CartOrder  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(CartOrderSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle ProductFaq
class ProductFaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFaq  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(ProductFaqSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle Vendor
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle Review
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(ReviewSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes



    

# Sérialiseur pour le modèle Coupon
class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(CouponSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle Notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification  # Spécifie le modèle à sérialiser
        fields = "__all__"  # Sérielisation de tous les champs du modèle

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)  # Appel au constructeur parent

        # Personnalisation de la profondeur de sérialisation en fonction de la méthode de requête
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0  # Sérialisation peu profonde pour les requêtes POST
        else:
            self.Meta.depth = 3  # Sérialisation plus profonde pour les autres requêtes

# Sérialiseur pour le modèle CarouselImage
class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage  # Spécifie le modèle à sérialiser
        fields = ['id', 'title', 'image']  # Sérielisation des champs spécifiés

# Sérialiseur personnalisé pour le modèle Contact
class ContactSerializer(serializers.Serializer):
    user = serializers.EmailField(required=True)  # Champ email obligatoire
    message = serializers.CharField(required=True, max_length=2000)  # Champ de texte pour le message, obligatoire et avec une longueur maximale
    full_name = serializers.CharField(required=True)  # Champ texte pour le nom complet, obligatoire
