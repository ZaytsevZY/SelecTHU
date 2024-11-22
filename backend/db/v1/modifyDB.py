"""
数据库修改模块
定义并实现了数据库的修改操作的接口
"""

from database import *


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
            return const.RESPONSE_409

        # 添加培养方案
        if curriculum:
            curriculum_id = cal_curriculum_id(curriculum)
            curriculum_ = models.Curriculum.objects.filter(id=curriculum_id).exists()
            if not curriculum_:
                curriculum_ = models.Curriculum(id=curriculum_id, courses=curriculum)
                curriculum_.save()
            else:
                curriculum_ = models.Curriculum.objects.get(id=curriculum_id)

            # 添加到数据库
            user = models.User(user_id=id_, user_curriculum=curriculum_)
            user.save()
        else:
            user = models.User(user_id=id_)
            user.save()

        # 返回结果
        return {"status": 200, "msg": "add user successfully"}
    except Exception as e:
        return const.RESPONSE_500


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
            return const.RESPONSE_409

        # 添加到数据库
        curriculum = models.Curriculum(id=id_, courses=curriculum)
        curriculum.save()

        # 返回结果
        return {"status": 200, "msg": "add curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_500
