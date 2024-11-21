# 后端api部分
## *注意：后端api部分模型和接口实现正在调整，以下接口列表暂不能作为最终使用判断！！！*
## 简要说明
- 目录结构
  ```
  api
  ├── v1
  │   ├── __init__.py
  │   ├── utils.py
  │   ├── urls.py
  │   ├── views.py
  ├── __init__.py
  ├── README.md
  └── urls.py
  ```

## 接口列表
### v1版本

#### 账户管理
1. **默认用户登陆**<span id="login_default"></span>
  - 接口：`/api/v1/login_default/`
  - 请求类型：`POST`
  - 请求参数：无
  - 返回值：`{"status": <int>, "jwt": <str>,}`
  - 说明：测试接口，无需任何输入，直接登陆默认用户，发送请求时需要带上jwt头，不需要额外指定user_id

2. **用户登陆**<span id="login"></span>
  - 接口：`/api/v1/login/`
  - 请求类型：`POST`
  - 请求参数：
    - `user_id<str>`：用户id
  - 返回值：`{"status": <int>, "jwt": <str>,}`
  - 说明：利用账号密码验证后登陆

3. **用户登出**<span id="logout"></span>
  - 接口：`/api/v1/logout/<user_id>/`
  - 请求类型：`POST`
  - 请求参数：无
  - 返回值：`{"status": <int>,}`
  - 说明：登出指定账号

#### 用户信息管理

1. **获取用户完整信息**<span id="get_user_info"></span>
  - 接口：`/api/v1/user/<user_id>/`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：
    ```json
    {
      "status": <int>,
      "user": 
      {
        "nickname": <str>, 
        "avatar": <str>,
        "favorite": <list>, 
        "decided": <list>,
        "curriculum": <dict>,
      },
    }
    ```
  - 说明：获取完整的用户信息，作为前端实现的一种alternative

2. **获取用户基本信息**<span id="get_user_info_basic"></span>
  - 接口：`/api/v1/user-basic/<user_id>/`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：
    ```json
    {
      "status": <int>, 
      "user": 
      {
        "nickname": <str>, 
        "avatar": <str>,
      },
    }
    ```
  - 说明：获取用户的基本信息，可能用在个人主页部分

3. **修改用户基本信息**<span id="modify_user_info_basic"></span>
  - 接口：`/api/v1/user-basic/<user_id>/update/`
  - 请求类型：`POST`
  - 请求参数：
    - `nickname<str>`（可选）：昵称
    - `avatar<file>`（可选）：用户的新头像，类型为文件，上传图片。
  - 返回值：`{"status": <int>,}`
  - 说明：修改用户的基本信息，可能用在个人主页部分

#### 选课管理

1. **获取选课阶段**<span id="get_selection_stage"></span>
  - 接口：`/api/v1/selection-stage`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：`{"status": <int>, "selection-stage": <str>,}`
  - 说明：获取当前选课阶段

2. **获取培养方案**<span id="get_curriculum"></span>
  - 接口：`/api/v1/curriculum/<user_id>/`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：`{"status": <int>, "curriculum": <list>,}`
  - 说明：获取用户培养方案

3. **筛选获取课程**<span id="filter_courses"></span>
  - 接口：`/api/v1/courses/`
  - 请求类型：`GET`
  - 请求参数：
      -"course_id": <str>（可选）
      -"code": <str>（可选）
      -"name": <str>（可选）
      -"teacher": <str>（可选）
      -"credit": <int>（可选）
      -"period": <int>（可选）
      -"time": <dict>（可选）
      -"department": <str>（可选）
      -"type": <str>（可选）
      -"search_mode": <str>（可选，在"exact"精确搜索, "fuzzy"模糊搜索, "exclude"排除搜索三选一，默认exact）
  - 返回值：`{"status": <int>, "courses-main": <list>,}`
  - 说明：根据筛选条件返回所有符合条件课程的基本信息

4. **获取课程详细信息**<span id="get_course_detail"></span>
  - 接口：`/api/v1/course-detail/<course_id>/`
  - 请求类型：`POST`
  - 请求参数：
    - `course_id<str>`：课程id
  - 返回值：`{"status": <int>, "course-detail": <dict>,}`
  - 说明：获取指定id课程的详细信息

5. **课程状态切换**<span id="change_course_condition"></span>
  - 接口：`/api/v1/change-course-condition/<user_id>/`
  - 请求类型：`POST`
  - 请求参数：
    - `course_id<str>`：课程id
    - `cond<str>`：目标状态（在"decided", "favorite", "dismiss"三选一）
  - 返回值：`{"status": <int>,}`
  - 说明：改变此用户下某个课程的被选状态，一个请求只处理一个课程，前端做好冲突检测等合法性判断之后再发送请求

6. **获取已选课程**<span id="get_courses_decided"></span>
  - 接口：`/api/v1/courses-decided/<user_id>/`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：`{"status": <int>, "courses-decided": <list>,}`
  - 说明：获取用户的已选课程，可以用于逻辑判断和课表显示等

7. **获取收藏课程**<span id="get_courses_favorite"></span>
  - 接口：`/api/v1/courses-favorite/<user_id>/`
  - 请求类型：`GET`
  - 请求参数：无
  - 返回值：`{"status": <int>, "courses-favorite": <list>,}`
  - 说明：获取用户的收藏课程

8. **修改课程志愿**<span id="change_course_wish"></span>
  - 接口：`/api/v1/change-course-wish/<user_id>`
  - 请求类型：`POST`
  - 请求参数：无
    - `wish<int>`：目标志愿顺序（1，2，3）
  - 返回值：`{"status": <int>,}`
  - 说明：修改用户指定课程的志愿，前端做好处理后再将结果传递给后端（比如前端将一个徽章从一门课移到另一门课，则发送两个修改课程志愿的请求）

### 附加说明
#### 一些数据的内部结构
  - course_main（用到的接口：/user/, /courses/, /courses-decided/, /courses-favorite/）
    ```json
    {
      "course_id": <str>,
      "code": <str>,
      "name": <str>,
      "teacher": <str>,
      "credit": <int>,
      "period": <int>,
      "time": <dict>,
      "department": <str>,
      "type": <str>,
      "selection": <dict>,
    }
    ```
  - course_detail（用到的接口：/course-detail/）（**尚未最终确定**）
    ```json
    {
      "course_id": <str>,
      "info": 
      {

      },
      "score": <float>,
      "comments": 
      [
        {
          "comment_time": <str>,
          "comment_score": <int>,
          "comment": <str>,
        },
        ...
      ],
    }
    ```

  - selection（course_main，course_detail中）
    ```json
    {
      "total": <int>,
      "bx1": <int>, 
      "bx2": <int>, 
      "bx3": <int>, 
      "xx1": <int>, 
      "xx2": <int>, 
      "xx3": <int>, 
      "rx0": <int>,  
      "rx1": <int>,
      "rx2": <int>,
      "rx3": <int>,
    }
    ```

  - curriculum（**尚未最终确定**）
    ```json
    {
      "bx": [
        <course_code: str>,
        ...
      ],
      "xx": [
        <course_code: str>,
        ...
      ],
      "rx": [
        <course_code: str>,
        ...
      ],
      "cx": [
        <course_code: str>,
        ...
      ],
      ...
    }
    ```

### 问题与思路

- **选课冲突解决**:
  - 列表页面提供“选课”按钮，如果冲突则弹出提示，询问是否添加到备选。
  - 课表页面【待实现】。
- **列表页面标注已选课程**:
  - 说明：标注用户已选的课程，方便区分已选和未选课程。
