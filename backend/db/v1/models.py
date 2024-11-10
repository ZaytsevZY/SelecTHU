from django.db import models


# 用户表（总表）
class User(models.Model):
    """
    用户表（总表）

    :id: 学号（用户唯一标识）（主键）
    :major: 专业
    :session: 入学年份
    :favorite: 收藏课程
    :decided: 已选课程
    """
    # 个人基本信息
    user_id = models.CharField(
        max_length=12, primary_key=True, unique=True, name="id"
    )  # 学号（用户唯一标识）（主键）（可能需要加密处理？）
    user_major = models.CharField(max_length=20, name="major")  # 专业
    user_session = models.IntegerField(name="session")  # 入学年份

    # 课程信息（列表）
    user_favorite = models.JSONField(name="favorite")  # 收藏课程
    # 内部结构：
    # [
    #     <course_id: str>,
    #     ...
    # ]
    user_decided = models.JSONField(name="decided")  # 已选课程
    # 内部结构：
    # [
    #     {
    #        course_id: <course_id: str>,
    #        level: <level: int>
    #     },
    #     ...
    # ]

    class Meta:
        db_table = "user"

    def __str__(self):
        return f"<{self.user_id}: {self.user_major}, {self.user_session}>"


# 培养方案表
class Curriculum(models.Model):
    """
    培养方案表

    :id: 自增id（主键）
    :major: 专业
    :grade: 年级
    :courses: 课程列表
    """
    _id = models.AutoField(primary_key=True, name="id")  # 自增id（主键）

    # 识别信息（专业、年级）
    major = models.CharField(max_length=20, name="major")  # 专业
    grade = models.IntegerField(name="grade")  # 年级

    # 课程信息（列表）
    courses = models.JSONField(name="courses")  # 课程列表
    # 内部结构：
    # [
    #     <course_code: str>,
    #     ...
    # ]

    class Meta:
        db_table = "curriculum"

    def __str__(self):
        return f"<{self.major}, {self.grade}>"
