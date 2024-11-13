# 保存一些可能用到的常量
# v1

# 培养方案键值（对应必限任）
CURRICULUM_KEYS: tuple = ("0", "1", "2")

# 哈希盐字符串
SALT: tuple = (
    "c4d038b4bed09fdb1471ef51ec3a32cd",  # 哈希盐1
    "84402604c73b70e552b4a109f656a4be",  # 哈希盐2
    "32150285b345c48aa3492f9212f61ca2",  # 哈希盐3
    "699226c443e0b2430dc029f67857f3c5",  # 哈希盐4
    "4823764668c7d7039deffd751473939c",  # 哈希盐5
    "cca2881c09f67c0817667ca13581c022",  # 哈希盐6
    "f7d0b4c7d6c4d5e2b8e5b7e3f1b4e3b4",  # 哈希盐7
)

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
