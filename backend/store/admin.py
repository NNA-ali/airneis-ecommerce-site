from django.contrib import admin

from store.models import Product, Tax, Category, Gallery , Specification, Size, Color, Cart, CartOrder, CartOrderItem, Notification, ProductFaq, Review, Coupon, Wishlist

class GalleryInline(admin.TabularInline):
    model = Gallery

class SpecificationInline(admin.TabularInline):
    model = Specification

class SizeInline(admin.TabularInline):
    model = Size

class ColorInline(admin.TabularInline):
    model = Color




class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'price','get_length','get_width','category','shipping_amount','stock_qty','in_stock','vendor','featured']
    #list_editable = ['in_stock','featured']
    list_filter =['date']
    search_fields =['title']
    inlines = [GalleryInline, SpecificationInline, SizeInline, ColorInline]

    def get_length(self, obj):
        sizes = Size.objects.filter(product=obj)
        length = ', '.join([str(size.length) for size in sizes])  # Conversion en chaîne de caractères
        return length

    get_length.short_description = 'Length'

    def get_width(self, obj):
        sizes = Size.objects.filter(product=obj)
        width = ', '.join([str(size.width) for size in sizes])  # Conversion en chaîne de caractères
        return width

    get_width.short_description = 'Width'

class CartOrderItemsAdmin(admin.ModelAdmin):
    list_filter = ['delivery_couriers', 'applied_coupon']
    list_editable = ['date']
    list_display = ['order_id', 'vendor', 'product' ,'qty', 'price', 'sub_total', 'shipping_amount' , 'tax_fee', 'total' , 'delivery_couriers', 'applied_coupon', 'date']
   
class CartOrderAdmin(admin.ModelAdmin):
    
    search_fields = ['oid', 'full_name', 'email', 'mobile']
    
    list_filter = ['payment_status', 'order_status']
    list_display = ['oid', 'buyer', 'payment_status', 'order_status' ,'total' ,'date']

class CartAdmin(admin.ModelAdmin):
    list_display = ['product', 'cart_id', 'qty', 'price', 'sub_total' , 'shipping_amount', 'tax_fee', 'total', 'country', 'size', 'color', 'date']


class ProductFaqAdmin(admin.ModelAdmin):
    list_editable = [ 'active', 'answer']
    list_display = ['user', 'question', 'answer' ,'active']

class CouponAdmin(admin.ModelAdmin):
    #inlines = [CouponUsersInlineAdmin]
    list_editable = ['code', 'active', ]
    list_display = ['vendor' ,'code', 'discount', 'active', 'date']

class ProductReviewAdmin(admin.ModelAdmin):
    list_editable = ['active']
    list_editable = ['active']
    list_display = ['user', 'product', 'review', 'reply' ,'rating', 'active']

class NotificationAdmin(admin.ModelAdmin):
    list_editable = ['seen']
    list_display = ['order', 'seen', 'user', 'vendor', 'date']



admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(CartOrder, CartOrderAdmin)
admin.site.register(CartOrderItem)
admin.site.register(ProductFaq, ProductFaqAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(Wishlist)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Review, ProductReviewAdmin)
admin.site.register(Tax)
