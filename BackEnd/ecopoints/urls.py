from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WasteTypeViewSet, EcoPointViewSet

router = DefaultRouter()
router.register(r'waste-types', WasteTypeViewSet)
router.register(r'ecopoints', EcoPointViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 