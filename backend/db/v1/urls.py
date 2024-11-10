from django.urls import path

import db.v1.views as views


urlpatterns = [
    path("status", views.test, name="status_v1"),
    path("query/curriculum", views.get_curriculum, name="get_curriculum_v1"),
]