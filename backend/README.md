# SelecTHU 清华选课助手 后端部分
## 实现框架
- 语言：Python 3.12
- 框架：Django 5.1
- 数据库：PostgreSQL 17

## 数据库部分
### *注意：数据库部分模型和接口实现正在调整，以下接口列表暂不能作为最终使用判断！！！*
### 简要说明
- 数据库使用 PostgreSQL 作为后端数据库，通过 Django ORM 进行操作。

### ~~接口列表~~
#### v1版本
- 使用方法：导入包 `import db.v1.utils as db_utils`
  
##### 数据库查询
1. **查询数据库状态**<span id="db_status"></span>
    - 对应函数: `db_utils.db_status`
    - 请求参数: 无
    - 返回值: `{ "status": <int>, "msg": <str> }`
    - 说明: 查询数据库状态。

2. **查询培养方案**<span id="get_curriculum"></span>
    - 对应函数: `db_utils.get_curriculum`
    - 请求参数: `{ "id_": <str> }`
    - 返回值: `{ "status": <int>, "curriculum": <list> }`
    - 说明: 查询培养方案。

3. **查询培养方案是否存在**<span id="get_curriculum_existance"></span>
    - 对应函数: `db_utils.get_curriculum_existance`
    - 请求参数: `{ "curriculum": <dict> }`
    - 返回值: `{ "status": <int>, "value": <bool> }`
    - 说明: 查询培养方案是否存在。

4. **查询用户信息**<span id="get_user"></span>
    - 对应函数: `db_utils.get_user`
    - 请求参数: `{ "id_": <str> }`
    - 返回值: `{ "status": <int>, "favorite": <list>, "decided": <list>, "curriculum": <list> }`
    - 说明: 查询用户信息。

5. **查询课程列表**<span id="get_courses"></span>
    - 对应函数: `db_utils.get_courses`
    - 请求参数: 无
    - 返回值: `{ "status": <int>, "courses": <list[dict]> }`
    - 说明: 查询课程列表。

6. **按条件搜索课程简要信息**<span id="get_course"></span>
    - 对应函数: `db_utils.get_course`
    - 请求参数: `{ <查询条件> }`
    - 返回值: `{ "status": <int>, "course": <list[dict]> }`
    - 说明: 按条件搜索课程简要信息。

7. **查询课程详细信息**<span id="get_course_detail"></span>
    - 对应函数: `db_utils.get_course_detail`
    - 请求参数: `{ <查询条件> }`
    - 返回值: `{ "status": <int>, "details": <dict> }`
    - 说明: 查询课程详细信息。

##### 数据库修改
1. **添加用户**<span id="add_user"></span>
    - 对应函数: `db_utils.add_user`
    - 请求参数: `{ "major": <str>, "semester": <int> }`
    - 返回值: `{ "status": <int>, "msg": <str> }`
    - 说明: 添加用户。

2. **添加培养方案**<span id="add_curriculum"></span>
    - 对应函数: `db_utils.add_curriculum`
    - 请求参数: `{ "curriculum": <dict> }`
    - 返回值: `{ "status": <int>, "msg": <str> }`
    - 说明: 添加培养方案。