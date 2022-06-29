from django.urls import path, include
from .views import *

urlpatterns = [
    path("hello/", HelloAPI),
    path("update", update),
    path("list", list),
]