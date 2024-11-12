from django.db import models


# 培养方案表
class Curriculum(models.Model):
    """
    培养方案表

    :id: 培养方案的sha256值（主键）
    :courses: 课程列表
    """

    # id_ = models.AutoField(primary_key=True, name="id")  # 自增id（主键）
    _id = models.CharField(primary_key=True, max_length=64, name="id")  # id（主键）（使用sha256）
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
    

# 用户表（总表）
class User(models.Model):
    """
    用户表（总表）

    :id: 学号（用户唯一标识）（主键）
    :favorite: 收藏课程
    :decided: 已选课程
    :curriculum: 培养方案（外键）
    """

    # 个人基本信息
    user_id = models.CharField(
        max_length=12, primary_key=True, unique=True, name="id"
    )  # 学号（用户唯一标识）（主键）

    user_curriculum = models.ForeignKey(to=Curriculum, on_delete=models.DO_NOTHING, name="curriculum")  # 培养方案

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
    score = models.FloatField(name="score")  # 课程评分
    comments = models.JSONField(name="comments")  # 课程评价
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
        abstract = True


# 课程分表1
class CoursesDetailsTable1(CoursesDetails):
    class Meta:
        db_table = "courses_details_table_1"


# 课程分表2
class CoursesDetailsTable2(CoursesDetails):
    class Meta:
        db_table = "courses_details_table_2"


# 课程分表3
class CoursesDetailsTable3(CoursesDetails):
    class Meta:
        db_table = "courses_details_table_3"


# 课程分表4
class CoursesDetailsTable4(CoursesDetails):
    class Meta:
        db_table = "courses_details_table_4"


# 课程分表5
class CoursesDetailsTable5(CoursesDetails):
    class Meta:
        db_table = "courses_details_table_5"


# 课程总表
class MainCourses(models.Model):
    """
    课程总表，保存课程主要信息

    :id: 课程识别码（主键）
    :code: 课程代码
    :name: 课程名称

    TODO: 完善表结构

    :link: 详细信息指向表
    """

    id_ = models.CharField(
        max_length=64, primary_key=True, name="id"
    )  # 课程识别码（主键）

    # 课程信息
    code = models.CharField(max_length=16, name="code")  # 课程代码
    name = models.CharField(max_length=64, name="name")  # 课程名称

    # 详细信息指向表
    link = models.IntegerField(name="link")  # 详细信息指向表（序号）

    class Meta:
        db_table = "main_courses"

    def delete(self, using = ..., keep_parents = ...):
        # 需要先删除详细信息表中的数据
        link_mapping = {
            1: CoursesDetailsTable1,
            2: CoursesDetailsTable2,
            3: CoursesDetailsTable3,
            4: CoursesDetailsTable4,
            5: CoursesDetailsTable5,
        }
        model_class = link_mapping.get(self.link, None)
        if model_class:
            model_class.objects.filter(id=self.id_).delete()
        else:
            raise ValueError("Invalid link value")
        
        return super().delete(using, keep_parents)
