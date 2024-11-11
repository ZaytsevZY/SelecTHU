from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

import db.v1.const as const
import db.v1.models as models


# 测试接口连接
@require_http_methods(["GET"])
def status(request):
    """
    测试接口连接
    """
    return JsonResponse({
        "status": 200,
        "message": "connect successfully"
    })


# 查询培养方案
@require_http_methods(["GET"])
def get_curriculum(request):
    """
    查询培养方案

    :param request: 发送的请求（包含专业major\<str>和年级grade\<int>）
    :return: 返回的信息
    """
    major: str = request.GET.get("major")
    grade: int = request.GET.get("grade")

    # 检查输入合法性
    if major is None or grade is None:
        return JsonResponse(const.RESPONSE_400)
    if major not in const.MAJOR_CHOICES or grade not in const.GRADE_CHOICES:
        return JsonResponse(const.RESPONSE_404)
    
    # 查询数据库
    curriculum = models.Curriculum.objects.filter(major=major, grade=grade)
    if not curriculum:
        return JsonResponse(const.RESPONSE_404)
    
    # 返回结果
    return JsonResponse({
        "status": 200,
        "curriculum":  curriculum.courses
    })


@require_http_methods(["GET"])
def get_user(request):
    """
    查询用户信息

    :param request: 发送的请求（包含用户id）
    :return: 返回的信息
    """
    id_ = request.GET.get("id")

    # 检查输入合法性
    if id_ is None:
        return JsonResponse(const.RESPONSE_400)
    
    # 查询
    user = models.User.objects.filter(user_id=id_)
    if not user:
        return JsonResponse(const.RESPONSE_404)
    
    # 返回结果
    return JsonResponse({
        "status": 200,
        "major": user.user_major,
        "session": user.user_session,
        "favorite": user.user_favorite,
        "decided": user.user_decided
    })



@require_http_methods(["GET"])
def get_courses(request):
    """
    查询课程列表

    :param request: 发送的请求
    :return: 返回的信息
    """
    # 查询数据库
    courses = models.MainCourses.objects.all().values()

    if not courses:
        return JsonResponse(const.RESPONSE_404)
    
    # 返回结果
    return JsonResponse({
        "status": 200,
        "courses": list(courses)
    })


@require_http_methods(["GET"])
def get_course(request):
    pass


@require_http_methods(["GET"])
def get_course_detail(request):
    pass