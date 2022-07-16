from django.urls import path, include
from .views import *

urlpatterns = [
    path("", list, name='list_of_MOS'),
    path("<int:pk>", detail, name='detail_of_MOS'),
    path("<int:pk>/wiki", wiki, name='wiki'),
    path("update/mos", update_mos),
    path("update/recurit", update_recurit),
]