"""
URL configuration for the backend project.

The `urlpatterns` list routes URLs to views. For more information, please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views:
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views:
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf:
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# Import necessary modules and functions
from django.contrib import admin  # Admin interface for managing the site
from django.urls import path, include  # Functions for defining URL patterns
from django.conf import settings  # Access to project settings
from django.conf.urls.static import static  # Serve static and media files during development
from rest_framework import permissions  # Permissions classes for DRF
from drf_yasg.views import get_schema_view  # Swagger schema view for API documentation
from drf_yasg import openapi  # Module for defining OpenAPI schema

# Define the schema view for the Swagger API documentation
schema_view = get_schema_view(
    openapi.Info(
        title="E-commerce Backend APIs",  # Title of the API documentation
        default_version="v1",  # API version
        description="This is the documentation for the backend API",  # Description of the API
        terms_of_service="http://mywebsite.com/policies/",  # Link to terms of service
        contact=openapi.Contact(email="asidev2324.groupe3@mewo-campus.fr"),  # Contact email for API support
        license=openapi.License(name="NNA License"),  # License information for the API
    ),
    public=True,  # Indicates the schema is publicly accessible
    permission_classes=(permissions.AllowAny,)  # Allows any user to access the schema view
)

# Define the URL patterns for the project
urlpatterns = [
   # Documentation URL for the Swagger UI
   path("", schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),
   
   # Admin interface URL
   path('admin/', admin.site.urls),
   
   # Include API URLs from the 'api' app under the 'api/v1/' path
   path('api/v1/', include('api.urls')),
]

# Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve static files during development
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
