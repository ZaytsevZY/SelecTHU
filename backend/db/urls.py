from django.urls import path
from django.urls import include

urlpatterns = [
    path('v1/', include('db.v1.urls')),
]