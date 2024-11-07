# SelecTHU 清华选课助手 后端部分

## 数据库部分
### 接口列表
1. 获取数据库状态：<span id="api-status"></span>
    - 接口：`/db/v1/status`
    - 请求方法: `GET`
    - 请求参数：无
    - 返回值: `{status: status_code}`
    - 说明: 返回数据库的状态信息，状态码定义见[状态码](#def-status_code)。
2. 获取全部课程列表：<span id="api-query-courses"></span>
    - 接口：`/db/v1/query/courses`
    - 请求方法: `GET`
    - 请求参数：无
    - 返回值: `{status: status_code, courses: List[course]}`
    - 说明: 返回所有课程简要信息（首页）的列表，其中 `course` 为课程的数据结构，具体定义见[课程数据结构（简）](#def-course-struct)。
3. 获取单条课程简要信息：<span id="api-query-course"></span>
    - 接口: `/db/v1/query/course`
    - 请求方法: `GET`
    - 请求参数：
      - `course_id`: 课程的唯一标识符（不是课程号，需要通过课程信息计算得到）
    - 返回值: `{status: status_code, course: course_data}`
    - 说明: 对应课程的简要信息。 `course_data` 为课程的详细信息，具体定义见[课程数据结构（简）](#def-course-struct)。
4. 获取课程详细信息：<span id="api-query-course-detail"></span>
    - 接口: `/db/v1/query/course/detail`
    - 请求方法: `GET`
    - 请求参数：
      - `course_id`: 课程的唯一标识符（不是课程号，需要通过课程信息计算得到）
    - 返回值: `{status: status_code, course: course_detail_data}`
    - 说明: 对应课程的详细信息。 `course_detail_data` 为课程的详细信息，具体定义见[课程数据结构（详）](#def-course-struct-detail)。
4. 获取培养方案信息：<span id="api-query-plan"></span>
    - 接口: `/db/v1/query/plan`
    - 请求方法: `GET`
    - 请求参数：
       - `major`: 专业名称（或院系名称）
       - `semester`: 学期
    - 返回值: `{status: status_code, plan: plan_data}`
    - 说明: 返回对应专业的培养方案信息。 `plan_data` 为培养方案的详细信息，具体定义见 `还没想好`。
5. <span style="color:rgb(255, 50, 50)">*TODO: 其他接口*</span>

### 数据库设计
1. 状态码 `status_code` 定义：<span id="def-status_code"></span>
    - `100`: 数据库状态正常，可以进行交互。（没有对数据库进行查询或修改操作，一般出现在[接口1](#api-status)）
    - `101`: 数据库状态异常，无法进行交互。（一般出现在[接口1](#api-status)）
    - `200`: 请求成功，返回数据正常。
    - <span style="color:rgb(255, 50, 50)">*TODO: 其他状态码*</span>
2. 课程数据结构（简） `course` 定义：<span id="def-course-struct"></span>
    - `course_id`: 课程的唯一标识符。
    - <span style="color:rgb(255, 50, 50)">*TODO: 其他定义*</span>
3. 课程数据结构（详） `course_detail` 定义：<span id="def-course-struct-detail"></span>
    - `course_id`: 课程的唯一标识符。
    - <span style="color:rgb(255, 50, 50)">*TODO: 其他定义*</span>
4. <span style="color:rgb(255, 50, 50)">*TODO: 其他定义*</span>