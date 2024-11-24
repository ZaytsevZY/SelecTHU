from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from django.core.files.storage import default_storage

from utils import generate_jwt, login_required

from db.v1 import utils as db_utils

@api_view(["POST"])
def login_default(request):
    """
    使用默认id登录
    """
    user_id = "12345678"
    payload = {"user_id": user_id}
    token = generate_jwt(payload)
    return Response({"status": 200, "jwt": token}, status=status.HTTP_200_OK)

@api_view(["POST"])
def login(request):
    """
    用户登录
    """
    user_id = request.data.get("user_id")
    if not user_id:
        return Response({"status": 400, "message": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    payload = {"user_id": user_id}
    token = generate_jwt(payload)
    return Response({"status": 200, "jwt": token}, status=status.HTTP_200_OK)

@api_view(["POST"])
@login_required
def logout(request, user_id):
    """
    用户登出
    """
    return Response({"status": 200}, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_user_info(request, user_id):
    """
    获取用户完整信息
    """
    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response({
        "status": 200,
        "user": {
            "nickname": user.nickname,
            "avatar": user.avatar,
            "courses-favorite": user.favorite,
            "courses-decided": user.decided,
            "curriculum": user.curriculum,
        }
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_user_info_basic(request, user_id):
    """
    获取用户基本信息
    """
    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response({
        "status": 200,
        "user": {
            "nickname": user.nickname,
            "avatar": user.avatar,
        }
    }, status=status.HTTP_200_OK)

@api_view(["POST"])
@login_required
def modify_user_info_basic(request, user_id):
    """
    修改用户基本信息
    """
    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    nickname = request.data.get("nickname", None)
    avatar = request.FILES.get("avatar", None)

    if nickname:
        user.nickname = nickname
    if avatar:
        if user.avatar:
            default_storage.delete(user.avatar.path)  # 删除旧头像
        user.avatar = avatar

    user.save()
    return Response({"status": 200}, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_selection_stage(request):
    """
    查询选课阶段
    """
    selection_stage = "预选"  # mock数据，实际应从数据库获取
    return Response({
        "status": 200,
        "selection-stage": selection_stage,
    }, status=status.HTTP_200_OK)


@api_view(["GET"])
@login_required
def get_curriculum(request, user_id):
    """
    查询培养方案
    """
    ##TODO：确定培养方案的用法
    return Response({
        "status": 200,
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def filter_courses(request):
    """
    筛选课程
    """
    #TODO：<db>，修改get_course函数，需要返回course_id
    filters = {
        "course_id": request.query_params.get("course_id", None),
        "code": request.query_params.get("code", None),
        "name": request.query_params.get("name", None),
        "teacher": request.query_params.get("teacher", None),
        "credit": request.query_params.get("credit", None),
        "period": request.query_params.get("period", None),
        "time": request.query_params.get("time", None),
        "department": request.query_params.get("department", None),
        "type": request.query_params.get("type", None),
        "search_mode": request.query_params.get("search_mode", "exact"),
    }

    courses = db_utils.get_course(filters)  # 假设db_utils有相关的筛选函数

    return Response({
        "status": 200,
        "courses-main": courses,
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_course_detail(request, course_id):
    """
    查询课程信息
    """
    course = db_utils.get_course_detail(course_id)
    if not course:
        return Response({"status": 404, "message": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response({
        "status": 200,
        "course": {
            "info": course.info,
            "score": course.score,
            "comments": course.comments,
        }
    }, status=status.HTTP_200_OK)

@api_view(["POST"])
@login_required
def modify_course_condition(request, user_id):
    """
    修改课程状态
    """
    #TODO：db增加接口
    course_id = request.data.get("course_id")
    cond = request.data.get("cond")

    if cond not in ["decided", "favorite", "dismiss"]:
        return Response({"status": 400, "message": "Invalid condition"}, status=status.HTTP_400_BAD_REQUEST)

    #TODO：这个地方还是很复杂的，要改
    success = db_utils.change_course_condition(user_id, course_id, cond)
    if not success:
        return Response({"status": 404, "message": "Course not found or error in status change"}, status=status.HTTP_404_NOT_FOUND)

    return Response({"status": 200}, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_courses_decided(request, user_id):
    """
    获取已选课程
    """
    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    course_ids = user.decided
    courses = []
    for course_id in course_ids:
        course = db_utils.get_course(id_= course_id)
        courses.append(course)
    return Response({
        "status": 200,
        "courses-decided": courses,
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
@login_required
def get_courses_favorite(request, user_id):
    """
    获取收藏课程
    """
    user = db_utils.get_user(user_id)
    if not user:
        return Response({"status": 404, "message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    course_ids = user.favorite
    courses = []
    for course_id in course_ids:
        course = db_utils.get_course(id_= course_id)
        courses.append(course)
    return Response({
        "status": 200,
        "courses-decided": courses,
    }, status=status.HTTP_200_OK)


@api_view(["POST"])
@login_required
def modify_course_level(request, user_id):
    """
    修改课程志愿
    """
    #TODO：<db修改>增加接口
    course_id = request.data.get("course_id")
    selection_type = request.data.get("selection_type")
