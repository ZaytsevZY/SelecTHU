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

    :param id_: 培养方案id（不叫id是避免与关键字冲突）
    :return: 返回的信息（在请求正确的情况下包含培养方案 `curriculum<type = list>` ）
    """

    # 检查输入合法性
    if id_ is None:
        return const.RESPONSE_400

    # 查询
    user = models.User.objects.filter(user_id=id_).first()
    if not user:
        return const.RESPONSE_404

    # 返回结果
    return {"status": 200, "curriculum": user.user_curriculum.courses}


# 查询培养方案是否存在
def get_curriculum_existance(curriculum: dict):
    """
    查询培养方案是否存在

    :param curriculum: 培养方案
    :return: 返回的信息（在请求正确的情况下包含布尔值 `value<type = bool>` ）
    """

    # 检查输入合法性
    if curriculum is None:
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

    :param request: 发送的请求（包含用户id）
    :return: 返回的信息
    （包含用户信息
    `favorite<type = list>`,
    `decided<type = list>`,
    `curriculum<type = list>`
    ）
    """
    # 检查输入合法性
    if id_ is None:
        return const.RESPONSE_400

    # 查询
    user = models.User.objects.filter(user_id=id_).first()
    if not user:
        return const.RESPONSE_404

    curriculum = user.user_curriculum.courses if user.user_curriculum else None
    # 返回结果
    return {
        "status": 200,
        "favorite": user.user_favorite,
        "decided": user.user_decided,
        "curriculum": curriculum,
    }


# 查询课程列表
def get_courses():
    """
    查询课程列表

    :return: 返回的信息（在请求正确的情况下包含字典列表 `courses<type = list[dict]>` ）
    """
    # 查询数据库
    courses = models.MainCourses.objects.all().values(
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

    # 返回结果
    return {"status": 200, "courses": list(courses)}


# 按条件搜索课程简要信息
def get_course(**kwargs):
    """
    按条件搜索课程简要信息

    :param kwargs: 查询条件，为不定长参数
    可选参数：
        - `id<str>` 课程识别码
        - `code<str>` 课程代码
        - `name<str>` 课程名称
        - `teacher<str>` 教师名称
        - `credit<int>` 学分
        - `period<int>` 学时
        - `time<str>` 开课时间
        - `department<str>` 开课院系
        - `type<str>` 课程类型

    :return: 返回的信息（包含字典 `course<type = list[dict]>` ）
    """
    # 先排除掉空值
    for key, value in kwargs.items():
        if value is None:
            kwargs.pop(key)

    # 再排除掉不合法的键值
    for key in kwargs.keys():
        if key == "link":
            kwargs.pop(key)
            continue
        # 如果不在字段中，删除
        flag = False
        for field in models.MainCourses._meta.fields:
            if key == field.name:
                flag = True
                break
        if flag is False:
            kwargs.pop(key)

    # 查询数据库
    # 不返回link字段和id字段
    course = models.MainCourses.objects.filter(**kwargs).values(
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
    if course is None:
        return {"status": 200, "course": []}

    return {"status": 200, "course": list(course)}


# 查询课程详细信息
def get_course_detail(**kwargs):
    """
    查询课程详细信息

    :param kwargs: 查询条件，为不定长参数
    可选参数：
        - `id<str>` 课程识别码
        - `code<str>` 课程代码
        - `name<str>` 课程名称
        - `teacher<str>` 教师名称
        - `credit<int>` 学分
        - `period<int>` 学时
        - `time<str>` 开课时间
        - `department<str>` 开课院系
        - `type<str>` 课程类型
    
    :return: 返回的信息（包含 详细信息 `details<type = dict>` ）
    """
    # 先排除掉空值
    for key, value in kwargs.items():
        if value is None:
            kwargs.pop(key)

    # 再排除掉不合法的键值
    for key in kwargs.keys():
        if key == "link":
            kwargs.pop(key)
            continue
        # 如果不在字段中，删除
        flag = False
        for field in models.MainCourses._meta.fields:
            if key == field.name:
                flag = True
                break
        if flag is False:
            kwargs.pop(key)

    # 查询数据库
    course = models.MainCourses.objects.filter(**kwargs)
    if course is None:
        return const.RESPONSE_404
    if course.count() > 1:
        return const.RESPONSE_500
    course = course.first()
    details = {
        "info": course.link.info,
        "score": course.link.score,
        "comments": course.link.comments,
    }
    
    return {"status": 200, "details": details}
    

