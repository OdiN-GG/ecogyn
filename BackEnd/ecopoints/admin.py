from django.contrib import admin
from .models import WasteType, EcoPoint

@admin.register(WasteType)
class WasteTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nameType')
    search_fields = ('nameType',)
    ordering = ('nameType',)

@admin.register(EcoPoint)
class EcoPointAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'isMunicipal')
    list_filter = ('city', 'state', 'isMunicipal')
    search_fields = ('name', 'address', 'city', 'state')
    filter_horizontal = ('wasteTypes',)
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'isMunicipal')
        }),
        ('Localização', {
            'fields': ('address', 'city', 'state', 'latitude', 'longitude')
        }),
        ('Detalhes', {
            'fields': ('openingHours', 'imageUrl', 'wasteTypes')
        }),
    )
