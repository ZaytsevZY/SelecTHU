from django.test import TestCase
from db.v1.queryDB import db_status, get_user, get_curriculum, get_courses
from db.v1.modifyDB import add_user, add_course

import db.v1.const as const


class QueryDBTestCase(TestCase):
    def setUp(self):
        add_user("valid_user")
        res1 = add_course({
            "code": "1000016",
            "number": "01",
            "name": "计算机网络",
            "teacher": "罗伯特"
        })
        res2 = add_course({
            "code": "1000017",
            "number": "02",
            "name": "计算机组成原理",
            "teacher": "无敌喵喵拳",
        })
        if res1["status"] != 200 or res2["status"] != 200:
            print("[ERROR] Failed to add courses")
            raise Exception("Failed to add courses")
        return super().setUp()
    
    def test_db_status(self):
        # 测试db_status函数是否正确返回连接状态
        response = db_status()
        self.assertEqual(response["status"], 200)
        self.assertEqual(response["msg"], "connect successfully")

    def test_get_user_not_found(self):
        # 测试get_user函数在用户不存在时的返回
        response = get_user("nonexistent_user")
        self.assertEqual(response, const.RESPONSE_404)

    def test_get_curriculum_valid_user(self):
        # 测试get_curriculum函数对有效用户的返回
        response = get_curriculum("valid_user")
        self.assertEqual(response["status"], 200)
        self.assertIn("curriculum", response)

    def test_get_curriculum_invalid_user(self):
        # 测试get_curriculum函数对无效用户的返回
        response = get_curriculum("invalid_user")
        self.assertEqual(response, const.RESPONSE_404)

    def test_get_courses_default(self):
        # 测试get_courses函数默认情况下返回全部课程
        response = get_courses()
        self.assertEqual(response["status"], 200)
        self.assertIsInstance(response["courses"], list)

    def test_get_courses_specific_count(self):
        # 测试get_courses函数按指定数量返回课程
        response = get_courses(count=2)
        self.assertEqual(response["status"], 200)
        self.assertEqual(len(response["courses"]), 2)


class ModifyDBTestCase(TestCase):
    def test_add_user_success(self):
        # 测试add_user函数成功添加用户时的返回
        response = add_user(user_id="testuser")
        self.assertEqual(response["status"], 200)
        self.assertEqual(response["msg"], "add user successfully")

    def test_add_user_conflict(self):
        # 测试add_user函数在用户已存在时的返回
        add_user(user_id="testuser")
        response = add_user(user_id="testuser")
        self.assertEqual(response, const.RESPONSE_409)

    def test_add_user_with_curriculum(self):
        # 测试add_user函数添加带培养方案的用户
        curriculum = {"0": ["data0"], "1": ["data1"], "2": ["data2"]}
        response = add_user(user_id="testuser2", curriculum=curriculum)
        self.assertEqual(response["status"], 200)
        self.assertEqual(response["msg"], "add user successfully")

    def test_add_user_invalid_input(self):
        # 测试add_user函数在输入无效时的返回
        response = add_user(user_id=12345)
        self.assertEqual(response, const.RESPONSE_400)
