"""
表结构定义
定义了数据库表的结构，包括培养方案表、用户表、课程详细信息表、课程总表
"""

from django.db import models


# 用户表（总表）
class User(models.Model):
    """
    用户表（总表）

    :id: 学号（用户唯一标识）（主键）
    :nickname: 用户昵称
    :avatar: 用户头像
    :favorite: 收藏课程
    :decided: 已选课程
    :curriculum: 培养方案（外键）
    """

    # 个人基本信息
    user_id = models.CharField(
        max_length=12, primary_key=True, unique=True, name="id"
    )  # 学号（用户唯一标识）（主键）
    user_nickname = models.CharField(max_length=64, name="nickname")  # 用户昵称
    user_avatar = models.ImageField(
        name="avatar", blank=True, default="default_avater.png", upload_to="avatar/"
    )  # 用户头像

    user_curriculum = models.CharField(
        max_length=64, name="curriculum", default="", blank=True
    )  # 培养方案

    # 课程信息（列表）
    user_favorite = models.JSONField(
        name="favorite", blank=True, default=[]
    )  # 收藏课程
    # 内部结构：
    # [
    #     <course_id: str>,
    #     ...
    # ]
    user_decided = models.JSONField(name="decided", blank=True, default=[])  # 已选课程
    # 内部结构：
    # [
    #     {
    #        course_id: <course_id: str>,
    #        selection_type: <selection_type: str>
    #     },
    #     ...
    # ]

    class Meta:
        db_table = "user"


# 培养方案表
class Curriculum(models.Model):
    """
    培养方案表

    :id: 培养方案的sha256值（主键）
    :courses: 课程列表
    """

    # id_ = models.AutoField(primary_key=True, name="id")  # 自增id（主键）
    _id = models.CharField(
        primary_key=True, max_length=64, name="id"
    )  # id（主键）（使用sha256）
    # # 识别信息（专业、年级）
    # major = models.CharField(max_length=20, name="major", null=True)  # 专业
    # semester = models.IntegerField(name="semester", null=True)  # 学期

    # 课程信息（列表）
    courses = models.JSONField(name="courses")  # 课程列表
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

    class Meta:
        db_table = "curriculum"


# 课程详细信息表
class CoursesDetails(models.Model):
    """
    课程分表，保存课程详细信息（抽象基类）

    :id: 课程识别码（主键）
    :info: 课程详细信息
    :score: 课程评分
    :comments: 课程评价
    """

    id_ = models.CharField(
        max_length=64, primary_key=True, name="id"
    )  # 课程识别码（主键）

    # 课程信息
    info = models.JSONField(name="info")  # 课程详细信息
    # 内部结构：
    # {
    #     TODO: 完善表结构
    # }
    score = models.FloatField(name="score", blank=True, default=-1)  # 课程评分
    comments = models.JSONField(name="comments", blank=True, default=[])  # 课程评价
    # 内部结构：
    # [
    #     {
    #         "comment_time": <comment_time: str>,
    #         "comment_score": <comment_score: int>,
    #         "comment": <comment: str>,
    #     },
    #     ...
    # ]

    class Meta:
        db_table = "courses_details"


# 课程总表
class MainCourses(models.Model):
    """
    课程总表，保存课程主要信息

    :id: 课程识别码（主键）
    :code: 课程代码
    :name: 课程名称
    :teacher: 教师名称
    :credit: 学分
    :period: 学时
    :time: 开课时间
    :department: 开课院系
    :type: 课程类型
    :selection: 选课情况

    TODO: 完善表结构

    :link: 详细信息指向表
    """

    id_ = models.CharField(
        max_length=64, primary_key=True, name="id"
    )  # 课程识别码（主键）

    # 课程信息
    code = models.CharField(max_length=16, name="code")  # 课程代码
    name = models.CharField(max_length=64, name="name")  # 课程名称
    teacher = models.CharField(max_length=32, name="teacher")  # 教师名称
    credit = models.IntegerField(name="credit")  # 学分
    period = models.IntegerField(name="period")  # 学时
    time = models.CharField(max_length=64, name="time")  # 开课时间
    department = models.CharField(max_length=64, name="department")  # 开课院系
    type_ = models.CharField(max_length=64, name="type")  # 课程类型
    selection = models.JSONField(name="selection")  # 选课情况
    # 内部结构：
    # {
    #     "total": <total: int>,  # 总人数
    #     "bx1": <b1: int>,  # 必选1志愿人数
    #     "bx2": <b2: int>,  # 必选2志愿人数
    #     "bx3": <b3: int>,  # 必选3志愿人数
    #     "xx1": <x1: int>,  # 限选1志愿人数
    #     "xx2": <x2: int>,  # 限选2志愿人数
    #     "xx3": <x3: int>,  # 限选3志愿人数
    #     "rx0": <r0: int>,  # 任选0志愿人数（特殊优先志愿）
    #     "rx1": <r1: int>,  # 任选1志愿人数
    #     "rx2": <r2: int>,  # 任选2志愿人数
    #     "rx3": <r3: int>,  # 任选3志愿人数
    # }

    # 详细信息指向表
    link = models.OneToOneField(
        to=CoursesDetails, on_delete=models.CASCADE, name="link"
    )  # 详细信息指向表

    class Meta:
        db_table = "main_courses"
