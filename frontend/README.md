# SelecTHU前端开发过程文档

Using Chakra UI in Next.js (App)

## 文件结构介绍（未完成）

app/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        // 导航栏组件
│   │   └── ColorModeToggle.tsx  // 暗色模式切换按钮
│   └── main/
│       ├── CourseTable.tsx   // 课程表组件
│       ├── StatusCard.tsx    // 状态卡片组件（志愿分配和选课阶段）
│       ├── TeachingPlan.tsx  // 教学计划组件
│       └── CourseList.tsx    // 课程备选清单组件
├── main/
│   └── page.tsx             // 主页面
└── types/
    └── course.ts            // 类型定义

## TODO

### 界面问题：

近期：

- 完善界面
- 志愿分配操作
- 卡片拖拽操作
- 备选清单修改
- 单课程多时段处理

后期：

- 二级选课界面如何处理
- 多课程同时间如何处理

## 一些可能的问题
