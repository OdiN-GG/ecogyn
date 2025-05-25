from rest_framework import serializers
from .models import WasteType, EcoPoint

class WasteTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteType
        fields = ['id', 'nameType']

class EcoPointSerializer(serializers.ModelSerializer):
    wasteTypes = WasteTypeSerializer(many=True, read_only=True)

    class Meta:
        model = EcoPoint
        fields = [
            'id', 'name', 'address', 'city', 'state',
            'latitude', 'longitude', 'wasteTypes',
            'description', 'openingHours', 'imageUrl',
            'isMunicipal'
        ] 