from django.urls import path

import db.v1.views as views


urlpatterns = [
    path("status", views.test, name="status_v1"),
    path("query/curriculum", views.get_curriculum, name="get_curriculum_v1"),
    path("query/user", views.get_user, name="get_user_v1"),
    path("query/courses", views.get_courses, name="get_courses_v1"),
    path("query/course", views.get_course, name="get_course_v1"),
    path("query/course/detail", views.get_course_detail, name="get_course_detail_v1"),
]