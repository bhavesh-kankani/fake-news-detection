from django.urls import path
from .views import *

url_patterns = [
    path("link/", check_link),
    path("text/", check_text),
]