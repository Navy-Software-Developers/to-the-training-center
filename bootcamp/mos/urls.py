from django.urls import path, include
from .views import *

urlpatterns = [
    path("", list, name='list_of_MOS'),
    path("<int:pk>", detail, name='detail_of_MOS'),
    path("<int:pk>/wiki", wiki, name='wiki'),
    path("<int:pk>/like", like, name='like'),
    path("likes", likes, name='likes'),
    path("points", points, name='points'),
    path("update/mos", update_mos),
    path("update/recurit", update_recurit),
    path("update/point", update_point),
    path("update/mmapoint", update_mmapoint),
    path("<str:query>", search, name='mos_search'),
]