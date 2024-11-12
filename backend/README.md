# SelecTHU 清华选课助手 后端部分
## 实现框架
- 语言：Python 3.12
- 框架：Django 5.1
- 数据库：PostgreSQL 17

## 数据库部分
### *注意：数据库部分模型和接口实现正在调整，以下接口列表暂不能作为最终使用判断！！！*
### 简要说明
- 数据库使用 PostgreSQL 作为后端数据库，通过 Django ORM 进行操作。
- 数据库提供的接口以 `/db` 为前缀，仅供后端使用，在代理时不会暴露给前端。

### ~~接口列表~~
#### v1版本（对应路由： `/db/v1` ）
1. **获取用户信息**<span id="query_user"></span>
    - 接口: `/db/v1/query/user`
    - 请求方法: `GET`
    - 请求参数:
        - `id<str>`: 用户学号
    - 返回值: `{ "status": <int>, "favorite": <list>, "decided": <dict>, "curriculum": <dict> }`
    - 说明: 查询用户信息，包括用户的收藏、决定项和培养方案。

2. **获取全部课程列表**<span id="query_courses"></span>
    - 接口名: `/db/v1/query/courses`
    - 请求方法: `GET`
    - 请求参数: 无
    - 返回值: `{ "status": <int>, "courses": <list> }`
    - 说明: 查询全部课程列表。

3. **查询课程信息（单个）**<span id="query_course"></span>
    - 接口名: `/db/v1/query/course`
    - 请求方法: `GET`
    - 请求参数:
        -  *（待定）* 
    - 返回值: `{ "status": <int>, "course": <dict> }`
    - 说明: 查询单个课程的信息 *（未实现）* 。

4. **查询课程详细信息**<span id="query_course_detail"></span>
    - 接口名: `/db/v1/query/course/detail`
    - 请求方法: `GET`
    - 请求参数:
        -  *（待定）* 
    - 返回值: `{ "status": <int>, "detail": <dict> }`
    - 说明: 查询课程的详细信息 *（未实现）* 。

5. **添加用户**<span id="add_user"></span>
    - 接口名: `/db/v1/add/user`
    - 请求方法: `POST`
    - 请求参数:
        - `id<string>`: 用户学号
        - `curriculum<dict>`: 培养方案
    - 返回值: `{ "status": <int>, "msg": <str> }`
    - 说明: 添加用户 *（未实现）* 。

6. **添加培养方案**<span id="add_curriculum"></span>
    - 接口名: `/db/v1/add/curriculum`
    - 请求方法: `POST`
    - 请求参数:
        - `curriculum<dict>`: 培养方案列表
    - 返回值: `{ "status": <int>, "msg": <str> }`
    - 说明: 添加培养方案。

7. **查询培养方案是否存在**<span id="query_curriculum_existance"></span>
    - 接口名: `/db/v1/query/curriculum/existance`
    - 请求方法: `GET`
    - 请求参数:
        - `curriculum<dict>`: 培养方案
    - 返回值: `{ "status": <int>, "msg": <str>, "value": <bool> }`
    - 说明: 查询培养方案是否存在，根据培养方案的内容哈希值判断。判断结果以 `value` 字段返回。