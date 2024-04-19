from django.shortcuts import render
from store.models import CarouselImage
from store.serializers import CarouselImageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Image


from rest_framework import generics

class CarouselImageView(generics.ListAPIView):
    queryset = CarouselImage.objects.all()
    serializer_class = CarouselImageSerializer

class ImageView(APIView):
    def get(self, request, image_id):
        image = Image.objects.get(pk=image_id)
        image_path = image.image.path
        with open(image_path, "rb") as f:
            return Response(f.read(), content_type="image/jpeg") # ou "image/png" selon le format
