from rest_framework import generics
from . import models, serializers


# Place
class PlaceList(generics.ListCreateAPIView):
    serializer_class = serializers.PlaceSerializer

    def get_queryset(self):
        return models.Place.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PlaceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PlaceDetailSerializer
    queryset = models.Place.objects.all()


# Category
class CategoryList(generics.CreateAPIView):
    serializer_class = serializers.CategorySerializer


class CategoryDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


# MenuItem
class MenuItemList(generics.CreateAPIView):
    serializer_class = serializers.MenuItemSerializer


class MenuItemDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.MenuItemSerializer
    queryset = models.MenuItem.objects.all()
