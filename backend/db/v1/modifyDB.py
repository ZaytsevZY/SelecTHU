"""
数据库修改模块
定义并实现了数据库的修改操作的接口
"""

from database import *


# 新建用户
def add_user(id_: str, curriculum: dict = None) -> dict:
    """
    添加用户
    - 注意：该函数添加用户时，若培养方案不存在则会自动添加培养方案

    :param id_: 用户id（学号）
    :param curriculum: 培养方案

    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(id_, str) is False:
        return const.RESPONSE_400

    try:
        # 检查是否已存在
        if models.User.objects.filter(user_id=id_).exists():
            # 返回结果：资源冲突（用户已存在）
            return const.RESPONSE_409

        # 添加培养方案
        curriculum_id = None
        if curriculum:
            curriculum_id = cal_curriculum_id(curriculum)
            curriculum_ = models.Curriculum.objects.filter(id=curriculum_id).exists()
            if not curriculum_:
                curriculum_ = models.Curriculum(id=curriculum_id, courses=curriculum)
                curriculum_.save()
            else:
                curriculum_ = models.Curriculum.objects.get(id=curriculum_id)

            # 添加到数据库
            user = models.User(user_id=id_, user_curriculum=curriculum_id)
            user.save()
        else:
            user = models.User(user_id=id_)
            user.save()

        # 返回结果
        return {"status": 200, "msg": "add user successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 添加培养方案
def add_curriculum(curriculum: dict) -> dict:
    """
    添加培养方案

    :param curriculum: 培养方案
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(curriculum, dict) is False:
        return const.RESPONSE_400

    try:
        # 计算id
        id_ = cal_curriculum_id(curriculum)
        # 检查是否已存在
        if models.Curriculum.objects.filter(id=id_).exists():
            # 返回结果：资源冲突（培养方案已存在）
            return const.RESPONSE_409

        # 添加到数据库
        curriculum = models.Curriculum(id=id_, courses=curriculum)
        curriculum.save()

        # 返回结果：添加成功
        return {"status": 200, "msg": "add curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 添加已选课程
def add_course_to_decided(user_id: str, course_id: str, selection_type: str = ""):
    """
    添加用户已选课程

    :param user_id: 用户id
    :param course_id: 课程识别码
    :param selection_type: 选课类型
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(user_id, str) is False or isinstance(course_id, str) is False:
        return const.RESPONSE_400

    try:
        # 检查用户是否存在
        if not models.User.objects.filter(user_id=user_id).exists():
            return const.RESPONSE_404

        # 添加课程
        user = models.User.objects.get(user_id=user_id)
        for course in user.user_decided:
            if course["course_id"] == course_id:
            # 返回结果：资源冲突（课程已存在）
                return const.RESPONSE_409

        user.user_decided.append({"course_id": course_id, "selection_type": selection_type})
        user.save()

        # 返回结果：添加成功
        return {"status": 200, "msg": "add course to decided successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 添加备选课程
def add_course_to_favorite(user_id: str, course_id: str):
    """
    添加用户备选课程
    
    :param user_id: 用户id
    :param course_id: 课程识别码
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(user_id, str) is False or isinstance(course_id, str) is False:
        return const.RESPONSE_400

    try:
        # 检查用户是否存在
        if not models.User.objects.filter(user_id=user_id).exists():
            return const.RESPONSE_404

        # 添加课程
        user = models.User.objects.get(user_id=user_id)
        if course_id not in user.user_favorite:
            user.user_favorite.append(course_id)
            user.save()

            # 返回结果：添加成功
            return {"status": 200, "msg": "add course to favorite successfully"}
        else:
            # 返回结果：资源冲突（课程已存在）
            return const.RESPONSE_409
    except Exception as e:
        return const.RESPONSE_500


# 移除已选课程
def remove_course_from_decided(user_id: str, course_id: str):
    pass


# 移除备选课程
def remove_course_from_favorite(user_id: str, course_id: str):
    """
    移除用户备选课程
    
    :param user_id: 用户id
    :param course_id: 课程识别码
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(user_id, str) is False or isinstance(course_id, str) is False:
        return const.RESPONSE_400

    try:
        # 检查用户是否存在
        if not models.User.objects.filter(user_id=user_id).exists():
            return const.RESPONSE_404

        # 移除课程
        user = models.User.objects.get(user_id=user_id)
        if course_id in user.user_favorite:
            user.user_favorite.remove(course_id)
            user.save()

            # 返回结果：移除成功
            return {"status": 200, "msg": "remove course from favorite successfully"}
        else:
            # 返回结果：资源不存在（课程不存在）
            return const.RESPONSE_404
    except Exception as e:
        return const.RESPONSE_500


# 修改志愿分配
def change_course_level():
    pass


# 修改用户信息
def change_user_info():
    pass


# 移除用户
def remove_user():
    pass


# 添加课程评价和评分
def add_course_comment():
    pass


# 删除所有课程评价和评分
def remove_all_course_comment():
    pass


# 添加课程信息
def add_course():
    pass


# 删除课程信息
def remove_course():
    pass


# 修改课程简要信息
def change_course_main():
    pass


# 修改课程详细信息
def change_course_detail():
    pass


# 删除培养方案（根据id）
def remove_curriculum_by_id(id_: str):
    """
    删除培养方案（根据id）

    :param id_: 培养方案id
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(id_, str) is False:
        return const.RESPONSE_400

    try:
        # 检查是否存在
        if not models.Curriculum.objects.filter(id=id_).exists():
            return const.RESPONSE_404

        # 删除
        models.Curriculum.objects.filter(id=id_).delete()

        # 返回结果
        return {"status": 200, "msg": "remove curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 删除培养方案（根据课程）
def remove_curriculum_by_curriculum(curriculum: dict):
    """
    删除培养方案（根据课程）

    :param curriculum: 培养方案
    :return: 返回的信息
    """
    # 检查输入合法性
    if isinstance(curriculum, dict) is False:
        return const.RESPONSE_400

    try:
        # 计算id
        id_ = cal_curriculum_id(curriculum)
        # 检查是否存在
        if not models.Curriculum.objects.filter(id=id_).exists():
            return const.RESPONSE_404

        # 删除
        models.Curriculum.objects.filter(id=id_).delete()

        # 返回结果
        return {"status": 200, "msg": "remove curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 删除所有课程信息
def remove_all_course():
    """
    删除所有课程信息
    """
    try:
        # 删除
        models.MainCourses.objects.all().delete()

        # 返回结果
        return {"status": 200, "msg": "remove all course successfully"}
    except Exception as e:
        return const.RESPONSE_500


# 删除所有培养方案信息
def remove_all_curriculum():
    """
    删除所有培养方案信息
    """
    try:
        # 删除
        models.Curriculum.objects.all().delete()

        # 返回结果
        return {"status": 200, "msg": "remove all curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_500
