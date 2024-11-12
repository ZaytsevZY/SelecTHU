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
    return JsonResponse({"status": 200, "msg": "connect successfully"})


# 计算培养方案id
def cal_curriculum_id(courses: dict) -> str:
    """
    计算培养方案id

    :param courses: 课程列表
    :return: 培养方案id
    """

    source_str: str = ""
    # courses排序，防止哈希校验失败
    # 内部结构：
    # {
    #     key1: [
    #         <course_code: str>,
    #         ...
    #     ],
    #     key2: [
    #         <course_code: str>,
    #         ...
    #     ],
    #     key3: [
    #         <course_code: str>,
    #         ...
    #     ],
    # }
    # 排序规则：按照课程代码排序
    for index in range(len(const.CURRICULUM_KEYS)):
        key = const.CURRICULUM_KEYS[index]
        if key not in courses.keys():
            raise   # 课程列表不完整
        courses[key].sort()
        source_str += "".join(courses[key])
        source_str += const.SALT[index]
        
    # 创建sha256对象
    import hashlib
    sha256 = hashlib.sha256()  # 创建sha256对象
    sha256.update(source_str.encode("utf-8"))  # 更新
    id_ = sha256.hexdigest()  # 计算id

    return id_


# 查询培养方案
@require_http_methods(["GET"])
def get_curriculum(request):
    """
    查询培养方案

    :param request: 发送的请求（包含学号）
    :return: 返回的信息（包含培养方案 `curriculum<type = list>` ）
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
    return JsonResponse({"status": 200, "curriculum": user.user_curriculum.courses})


# 查询培养方案是否存在
@require_http_methods(["GET"])
def curriculum_existance(request):
    """
    查询培养方案是否存在

    :param request: 发送的请求（包含培养方案）
    :return: 返回的信息
    """
    curriculum = request.GET.get("curriculum", None)

    # 检查输入合法性
    if curriculum is None:
        return JsonResponse(const.RESPONSE_400)
    
    try:
        # 计算id
        id_ = cal_curriculum_id(curriculum)
        # 查询数据库
        curriculum = models.Curriculum.objects.filter(id=id_).first()
        if not curriculum:
            return JsonResponse({"status": 200, "msg": "curriculum not exists", "value": False})
        else:
            return JsonResponse({"status": 200, "msg": "curriculum exists", "value": True})
    except Exception as e:
        return JsonResponse(const.RESPONSE_400)


@require_http_methods(["GET"])
def get_user(request):
    """
    查询用户信息

    :param request: 发送的请求（包含用户id）
    :return: 返回的信息
    （包含用户信息
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

    :param request: 发送的请求（包含课程识别码）？ 待修改
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
def add_user(request):
    """
    添加用户
    
    :param request: 发送的请求（包含专业 `major<str>` 和学期 `semester<int>` ）
    :return: 返回的信息
    """
    pass


@require_http_methods(["POST"])
def add_curriculum(request):
    """
    添加培养方案

    :param request: 发送的请求（包含课程列表 `curriculum<dict<list>>` ）
    :return: 返回的信息
    """
    curriculum: list = request.POST.get("curriculum", None)

    # 检查输入合法性
    if isinstance(curriculum, dict) is False:
        return JsonResponse(const.RESPONSE_400)

    try:
        # 计算id
        id_ = cal_curriculum_id(curriculum)
        # 检查是否已存在
        if models.Curriculum.objects.filter(id=id_).first():
            return JsonResponse({"status": 409, "msg": "curriculum already exists"})
        
        # 添加到数据库
        curriculum = models.Curriculum(id=id_, courses=curriculum)
        curriculum.save()

        # 返回结果
        return JsonResponse({"status": 200, "msg": "add curriculum successfully"})
    except Exception as e:
        return JsonResponse(const.RESPONSE_400)
