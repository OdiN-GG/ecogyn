from django.db import models
import uuid

class WasteType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nameType = models.CharField(max_length=100)

    def __str__(self):
        return self.nameType

class EcoPoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    latitude = models.FloatField()
    longitude = models.FloatField()
    wasteTypes = models.ManyToManyField(WasteType)
    description = models.TextField()
    openingHours = models.CharField(max_length=100)
    imageUrl = models.URLField()
    isMunicipal = models.BooleanField(default=False)

    def __str__(self):
        return self.name
