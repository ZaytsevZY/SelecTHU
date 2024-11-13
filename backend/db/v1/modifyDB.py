from database import *


def add_user(request):
    """
    添加用户

    :param request: 发送的请求（包含专业 `major<str>` 和学期 `semester<int>` ）
    :return: 返回的信息
    """
    pass


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
        if models.Curriculum.objects.filter(id=id_).first():
            return const.RESPONSE_409

        # 添加到数据库
        curriculum = models.Curriculum(id=id_, courses=curriculum)
        curriculum.save()

        # 返回结果
        return {"status": 200, "msg": "add curriculum successfully"}
    except Exception as e:
        return const.RESPONSE_400
