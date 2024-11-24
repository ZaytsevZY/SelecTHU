"""
常量定义
定义了会在其他函数中使用的常量
v1版本
"""

from app.settings import BASE_DIR

import dotenv
import os


dotenv.load_dotenv(BASE_DIR / ".env")

# 培养方案键值（对应必限任）
CURRICULUM_KEYS: tuple = ("0", "1", "2")

# 哈希盐字符串
# 放入.env文件中
# 11.22迭代：将SALT放入.env文件中并动态加载
_SALT_COUNT = int(os.getenv("SALT_COUNT", 7))
SALT: tuple = tuple(os.getenv(f"SALT_{i}", "") for i in range(1, _SALT_COUNT + 1))

# 搜索类型
SEARCH_MODE: tuple = ("exact", "exclude", "fuzzy")


# 周次定义
class TIME_WEEK:
    ODD: int = (1,)  # 单周
    EVEN: int = (2,)  # 双周
    OTHER: int = (3,)  # 其他


# 志愿类型定义
# 一个完整的志愿应该是两位字符串，第一位为志愿类型，第二位为志愿级别
# 如：b0、x1、r2、t3
class SELECTION_TYPE:
    ST_B: str = ("b",)  # 必修
    ST_X: str = ("x",)  # 限选
    ST_R: str = ("r",)  # 任选
    ST_T: str = ("t",)  # 体育
    LEVEL: tuple = ("0", "1", "2", "3")  # 志愿级别


# 响应
RESPONSE_400: dict = {
    "status": 400,
    "msg": "Bad Request",
}  # 400错误响应：请求错误

RESPONSE_404: dict = {
    "status": 404,
    "msg": "Not Found",
}  # 404错误响应：资源未找到

RESPONSE_409: dict = {
    "status": 409,
    "msg": "Conflict",
}  # 409错误响应：资源冲突

RESPONSE_500: dict = {
    "status": 500,
    "msg": "Internal Server Error",
}  # 500错误响应：服务器内部错误
