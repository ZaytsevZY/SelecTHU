from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

import db.v1.const as const
import db.v1.models as models

import hashlib


# 测试接口连接
@require_http_methods(["GET"])
def status(request):
    """
    测试接口连接
    """
    return JsonResponse({"status": 200, "msg": "connect successfully"})


# 查询培养方案
@require_http_methods(["GET"])
def get_curriculum(request):
    """
    根据专业年级查询培养方案

    :param request: 发送的请求（包含专业 `major<str>` 和年级 `grade<int>` ）
    :return: 返回的信息
    """
    major: str = request.GET.get("major")
    grade: int = request.GET.get("grade")

    # 检查输入合法性
    if major is None or grade is None:
        return JsonResponse(const.RESPONSE_400)
    # if major not in const.MAJOR_CHOICES or grade not in const.GRADE_CHOICES:
    #     return JsonResponse(const.RESPONSE_404)

    # 查询数据库
    curriculum = models.Curriculum.objects.filter(major=major, grade=grade).first()
    if not curriculum:
        return JsonResponse(const.RESPONSE_404)

    # 返回结果
    return JsonResponse({"status": 200, "curriculum": curriculum.courses})


@require_http_methods(["GET"])
def get_user(request):
    """
    查询用户信息

    :param request: 发送的请求（包含用户id）
    :return: 返回的信息
    （包含用户信息 `major<type = str>`,
    `session<type = int>`,
    `favorite<type = list>`,
    `decided<type = list>`,
    `curriculum<type = list>`
    ）
    """
    id_ = request.GET.get("id")

    # 检查输入合法性
    if id_ is None:
        return JsonResponse(const.RESPONSE_400)

    # 查询
    user = models.User.objects.filter(user_id=id_).first()
    if not user:
        return JsonResponse(const.RESPONSE_404)

    # 返回结果
    return JsonResponse(
        {
            "status": 200,
            "major": user.user_major,
            "session": user.user_session,
            "favorite": user.user_favorite,
            "decided": user.user_decided,
            "curriculum": user.user_curriculum.courses,
        }
    )


@require_http_methods(["GET"])
def get_courses(request):
    """
    查询课程列表

    :param request: 发送的请求
    :return: 返回的信息（包含字典列表 `courses<type = list[dict]>` ）
    """
    # 查询数据库
    courses = models.MainCourses.objects.all().values()
    if not courses:
        return JsonResponse(const.RESPONSE_404)

    # 返回结果
    return JsonResponse({"status": 200, "courses": list(courses)}, safe=False)


@require_http_methods(["GET"])
def get_course(request):
    """
    查询课程信息（单个）

    :param request: 发送的请求（包含课程识别码）
    :return: 返回的信息（包含字典 `course<type = dict>` ）
    """
    _id = request.GET.get("id")
    if _id is None:
        return JsonResponse(const.RESPONSE_400)

    course = models.MainCourses.objects.filter(course_id=_id).first()
    if not course:
        return JsonResponse(const.RESPONSE_404)

    return JsonResponse({"status": 200, "course": course})


@require_http_methods(["GET"])
def get_course_detail(request):
    """
    查询课程详细信息

    :param request: 发送的请求（包含课程识别码）
    :return: 返回的信息
    """
    pass


@require_http_methods(["POST"])
def add_curriculum(request):
    """
    添加培养方案

    :param request: 发送的请求（可能包含专业 `major<str>` 和年级 `grade<int>` ）
    :return: 返回的信息
    """
    major: str = request.POST.get("major")
    grade: int = request.POST.get("grade")
    courses: list = request.POST.get("courses")

    # 检查输入合法性
    if major is None or grade is None or courses is None:
        return JsonResponse(const.RESPONSE_400)

    # 创建sha256对象
    sha256 = hashlib.sha256()
    sha256.update(f"{major}{grade}".encode())
    id_ = sha256.hexdigest()

    # 检查是否已存在
    if models.Curriculum.objects.filter(id=id_).first():
        return JsonResponse({"status": 409, "msg": "curriculum already exists"})
    # 添加到数据库
    curriculum = models.Curriculum(id=id_, major=major, grade=grade, courses=courses)
    curriculum.save()

    # 返回结果
    return JsonResponse({"status": 200, "msg": "add curriculum successfully"})
