"""
数据库查询模块
定义并实现了数据库查询操作的接口
"""

from database import *


# 测试接口连接
def db_status():
    """
    测试接口连接
    """
    return {"status": 200, "msg": "connect successfully"}


# 查询培养方案
def get_curriculum(id_: str):
    """
    查询培养方案

    :param `id_`: 用户id（不叫id是避免与关键字冲突）
    :return: 返回的信息（在请求正确的情况下包含培养方案 `curriculum<type = list>` ）
    """

    # 检查输入合法性
    if isinstance(id_, str) is False:
        return const.RESPONSE_400
    try:
        # 查询
        user = models.User.objects.get(user_id=id_)
        if not user:
            return const.RESPONSE_404
        curriculum = {}
        if user.user_curriculum:
            user_curriculum_id = user.user_curriculum
            curriculum = models.Curriculum.objects.get(id=user_curriculum_id).values("courses")

        # 返回结果
        return {"status": 200, "curriculum": curriculum}
    except Exception as e:
        return const.RESPONSE_500


# 查询培养方案是否存在
def get_curriculum_existance(curriculum: dict):
    """
    查询培养方案是否存在

    :param `curriculum`: 培养方案
    :return: 返回的信息（在请求正确的情况下包含布尔值 `value<type = bool>` ）
    """

    # 检查输入合法性
    if isinstance(curriculum, dict) is False:
        return const.RESPONSE_400

    try:
        # 计算id
        id_ = cal_curriculum_id(curriculum)
        # 查询数据库
        curriculum = models.Curriculum.objects.filter(id=id_).exists()
        return {"status": 200, "value": curriculum}
    except Exception as e:
        return const.RESPONSE_500


# 查询用户信息
def get_user(id_: str):
    """
    查询用户信息

    :param `id_`: 用户id（学号）
    :return: 返回的信息
    （包含用户信息
    `nickname<type = str>`，
    `avatar<type = str>` （为图片路径），
    `favorite<type = list>`,
    `decided<type = list>`,
    `curriculum<type = list>`
    ）
    """
    # 检查输入合法性
    if isinstance(id_, str) is False:
        return const.RESPONSE_400
    try:
        # 查询
        user = models.User.objects.filter(user_id=id_).first()
        if not user:
            return const.RESPONSE_404
        avatar_url = user.user_avatar.url
        curriculum = {}
        if user.user_curriculum:
            user_curriculum_id = user.user_curriculum
            user_curriculum = models.Curriculum.objects.filter(id=user_curriculum_id).values("courses")
            if user_curriculum.exists():
                curriculum = user_curriculum.first()
            
        # 返回结果
        return {
            "status": 200,
            "nickname": user.user_nickname,
            "avatar": avatar_url,
            "favorite": user.user_favorite,
            "decided": user.user_decided,
            "curriculum": curriculum,
        }
    except Exception as e:
        return const.RESPONSE_500


# 查询课程列表
def get_courses(count: int = -1):
    """
    查询课程列表（指定数量）

    :param `count`: 查询数量（默认为-1，即全部查询）
    :return: 返回的信息（在请求正确的情况下包含字典列表 `courses<type = list[dict]>` ）
    """
    if isinstance(count, int) is False:
        return const.RESPONSE_400
    
    try:
        courses = []
        if count == -1:
            # 查询数据库
            courses = models.MainCourses.objects.all().values(
                "id",
                "code",
                "name",
                "teacher",
                "credit",
                "period",
                "time",
                "department",
                "type",
                "selection",
            )
            if not courses:
                return const.RESPONSE_404
        else:
            # 判断count是否合法（是否超过数据库中的数据数量）
            if count <= 0 or count > models.MainCourses.objects.count():
                return const.RESPONSE_400
            
            # 查询数据库
            courses = models.MainCourses.objects.all().values(
                "id",
                "code",
                "name",
                "teacher",
                "credit",
                "period",
                "time",
                "department",
                "type",
                "selection",
            )[:count]
            if not courses:
                return const.RESPONSE_404

        # 返回结果
        return {"status": 200, "courses": list(courses)}
    except Exception as e:
        return const.RESPONSE_500


# 按条件搜索课程简要信息
def get_course(
    id_: str = None,
    code: str = None,
    name: str = None,
    teacher: str = None,
    credit: int = None,
    period: int = None,
    time: dict = None,
    department: str = None,
    type_: str = None,
    search_mode: str = "exact",
):
    """
    按条件搜索课程简要信息

    :param `id_`: 课程识别码
    :param `code`: 课程代码
    :param `name`: 课程名称
    :param `teacher`: 教师名称
    :param `credit`: 学分
    :param `period`: 学时
    :param `time`: 开课时间
    :param `department`: 开课院系
    :param `type_`: 课程类型
    :param `search_mode`: 搜索模式（默认为`exact` - 精确搜索，可选： `fuzzy` - 模糊搜索，`exclude` - 排除搜索）

    :return: 返回的信息（包含字典 `course<type = list[dict]>` ）
    """
    if search_mode not in const.SEARCH_MODE:
        return const.RESPONSE_400
    try:
        # 查询数据库
        # 先获取所有课程
        course_list = models.MainCourses.objects.all()
        if search_mode == "exact" or search_mode == "fuzzy":
            if id_ is not None:
                course_list = course_list.filter(id=id_)
            if code is not None:
                course_list = course_list.filter(code=code)
            if name is not None:
                if search_mode == "exact":
                    course_list = course_list.filter(name=name)
                else:
                    # 模糊搜索，得到的搜索字符串形如"%n%a%m%e%"，得到的正则化结果形如".*n.*a.*m.*e.*"
                    # 此处name为举例，实际为待搜索的字符串
                    query_name = "%".join(name)
                    course_list = course_list.filter(name__icontains=query_name)
            if teacher is not None:
                course_list = course_list.filter(teacher=teacher)
            if credit is not None:
                course_list = course_list.filter(credit=credit)
            if period is not None:
                course_list = course_list.filter(period=period)
            if department is not None:
                course_list = course_list.filter(department=department)
            if type_ is not None:
                course_list = course_list.filter(type=type_)
        elif search_mode == "exclude":
            if id_ is not None:
                course_list = course_list.exclude(id=id_)
            if code is not None:
                course_list = course_list.exclude(code=code)
            if name is not None:
                course_list = course_list.exclude(name=name)
            if teacher is not None:
                course_list = course_list.exclude(teacher=teacher)
            if credit is not None:
                course_list = course_list.exclude(credit=credit)
            if period is not None:
                course_list = course_list.exclude(period=period)
            if department is not None:
                course_list = course_list.exclude(department=department)
            if type_ is not None:
                course_list = course_list.exclude(type=type_)

        if course_list.exists() is False:
            return {"status": 200, "course": []}

        # 不返回link字段和id字段
        course_list = course_list.values(
            "id",
            "code",
            "name",
            "teacher",
            "credit",
            "period",
            "time",
            "department",
            "type",
            "selection",
        )
        course_list = list(course_list)
        # 手动筛选time字段
        if time is not None:
            for i in range(len(course_list)):
                week_type = course_list[i]["time"]["type"]
                if week_type == time["type"]:
                    # 无需筛选
                    if len(time["data"]) == 0:
                        continue

                    # 筛选
                    week = time["data"][0]
                    for index in range(0, len(course_list[i]["time"]["data"])):
                        course_time = course_list[i]["time"]["data"][index]
                        # 该课程时间在筛选时间内，符合条件
                        if (
                            week["w0"] <= course_time["w0"]
                            and week["w1"] >= course_time["w1"]
                            and week["d"] == course_time["d"]
                            and week["t0"] <= course_time["t0"]
                            and week["t1"] >= course_time["t1"]
                        ):
                            continue

                course_list.pop(i)

        return {"status": 200, "course": course_list}
    except:
        return const.RESPONSE_500


# 查询课程详细信息（通过课程信息）
def get_course_detail_by_info(code: str, name: str, teacher: str):
    """
    查询课程详细信息

    :param `code`: 课程号
    :param `name`: 课程名
    :param `teacher`: 教师名

    :return: 返回的信息（包含 详细信息 `details<type = dict>` ）
    """
    if code is None or name is None or teacher is None:
        return const.RESPONSE_400
    
    try:
        id_ = cal_course_id(code, name, teacher)
        # 查询数据库
        course = (
            models.CoursesDetails.objects.filter(id=id_)
            .values("id", "info", "score", "comments")
        )

        # 课程不存在
        if course.exists() is False:
            return const.RESPONSE_404

        # 如果有多个结果，说明发生错误
        if course.count() > 1:
            return const.RESPONSE_500
        
        details = course.first()

        return {"status": 200, "details": details}
    except:
        return const.RESPONSE_500


# 查询课程详细信息（通过课程id）
def get_course_detail_by_id(id_: str):
    """
    查询课程详细信息

    :param `id_`: 课程id
    :return: 返回的信息（包含 详细信息 `details<type = dict>` ）
    """
    if id_ is None:
        return const.RESPONSE_400
    
    try:
        # 查询数据库
        course = (
            models.CoursesDetails.objects.filter(id=id_)
            .values("id", "info", "score", "comments")
        )

        # 课程不存在
        if course.exists() is False:
            return const.RESPONSE_404

        # 如果有多个结果，说明发生错误
        if course.count() > 1:
            return const.RESPONSE_500

        details = course.first()

        return {"status": 200, "details": details}
    except:
        return const.RESPONSE_500