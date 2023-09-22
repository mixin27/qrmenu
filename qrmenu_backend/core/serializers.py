from rest_framework import serializers
from . import models


# MenuItem
class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MenuItem
        fields = (
            "id",
            "name",
            "description",
            "price",
            "image",
            "is_available",
            "place",
            "category",
        )


# Category
class CategorySerializer(serializers.ModelSerializer):
    menu_items = MenuItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.Category
        fields = ("id", "name", "menu_items", "place")


# Place
class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Place
        fields = ("id", "name", "image")


# PlaceDetail
class PlaceDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = models.Place
        fields = ("id", "name", "image", "number_of_tables", "categories")
