from django.shortcuts import render
from rest_framework import viewsets
from .models import WasteType, EcoPoint
from .serializers import WasteTypeSerializer, EcoPointSerializer

# Create your views here.

class WasteTypeViewSet(viewsets.ModelViewSet):
    queryset = WasteType.objects.all()
    serializer_class = WasteTypeSerializer

class EcoPointViewSet(viewsets.ModelViewSet):
    queryset = EcoPoint.objects.all()
    serializer_class = EcoPointSerializer
