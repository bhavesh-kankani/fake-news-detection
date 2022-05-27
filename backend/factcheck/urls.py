from django.urls import path
from .views import *

urlpatterns = [
    path("link/", check_link),
    path("text/", check_text),
]