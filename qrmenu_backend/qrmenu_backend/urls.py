from django.contrib import admin
from django.urls import path, include

from core import views

urlpatterns = [
    # admin
    path("admin/", admin.site.urls),
    # auth
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    # places
    path("api/places/", views.PlaceList.as_view()),
    path("api/places/<pk>", views.PlaceDetail.as_view()),
    # categories
    path("api/categories/", views.CategoryList.as_view()),
    path("api/categories/<pk>", views.CategoryDetail.as_view()),
    # categories
    path("api/menu_items/", views.MenuItemList.as_view()),
    path("api/menu_items/<pk>", views.MenuItemDetail.as_view()),
]
