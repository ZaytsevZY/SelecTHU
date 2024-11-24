import db.v1.const as const
import db.v1.models as models

import hashlib


# 计算培养方案id
def cal_curriculum_id(courses: dict) -> str:
    """
    计算培养方案id

    :param courses: 课程列表
    :return: 培养方案id
    """
    try:
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
                raise  # 课程列表不完整
            courses[key].sort()
            source_str += "".join(courses[key])
            source_str += const.SALT[index]

        # 创建sha256对象
        sha256 = hashlib.sha256()  # 创建sha256对象
        sha256.update(source_str.encode("utf-8"))  # 更新
        id_ = sha256.hexdigest()  # 计算id

        return id_
    except:
        raise  # 计算错误


def calculate_course_id(code: str, name: str, teacher: str) -> str:
    """
    计算课程id（使用课程代码、课程名称、教师名作为依据）

    :param code: 课程号
    :param name: 课程名
    :param teacher: 教师名
    :return: 课程id
    """
    try:
        assert (
            code is not None and name is not None and teacher is not None
        )  # 参数不完整
        source_str: str = ""

        # 课程信息
        # 使用code, name, teacher字段作为计算id的依据
        source_str = (
            f"{code}{const.SALT[5]}{name}{const.SALT[4]}{teacher}"
        )

        # 创建sha256对象
        sha256 = hashlib.sha256()  # 创建sha256对象
        sha256.update(source_str.encode("utf-8"))  # 更新
        id_ = sha256.hexdigest()  # 计算id

        return id_
    except:
        raise  # 计算错误
