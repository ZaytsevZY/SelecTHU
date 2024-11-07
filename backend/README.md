# SelecTHU 清华选课助手 后端部分

## 数据库部分
### 接口列表
1. 获取全部课程列表：
    - 接口：`/api/v1/courses`
    - 请求方法: `GET`
    - 返回值: `{status: status_code, data: List[Course]}`
    - 说明: 返回所有课程信息（首页）的列表，其中 `Course` 为课程的数据结构，具体定义见 `还没想好`。
2. 获取课程详细信息：
    - 接口: `/api/v1/course/<course_id>`
    - 请求方法: `GET`
    - 返回值: `{status: status_code, data: course_data}`
    - 说明: 对应课程的详细信息。其中 `course_id` 为课程的唯一标识符（不是课程号，需要通过课程信息计算得到），`course_data` 为课程的详细信息，具体定义见 `还没想好`。
3. TODO