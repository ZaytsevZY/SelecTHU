from django.urls import path

import db.v1.views as views


urlpatterns = [
    path("test", views.test, name="test_url_v1"),
    path("query/curriculum", views.get_curriculum, name="get_curriculum_v1"),
]