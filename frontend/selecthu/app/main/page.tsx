// app/main/page.tsx
"use client";

import { useState } from "react";
import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import StatusCard from "../components/main/StatusCard";
import CourseTable from "../components/main/CourseTable";
import TeachingPlan from "../components/main/TeachingPlan";
import CourseList from "../components/main/CourseList";

// 引入 React DnD 所需的模块
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Course } from "../types/course";

// 示例课程数据
const sampleCourses: Course[] = [
  {
    id: "1",
    name: "高等数学",
    teacher: "张教授",
    classroom: "教学楼A101",
    type: "必修",
    credits: 4,
    timeSlots: [
      { day: 1, start: 1, duration: 2 }, // 周一1-2节
      { day: 3, start: 3, duration: 3 }, // 周三3-5节
    ],
  },
  {
    id: "2",
    name: "线性代数",
    teacher: "李教授",
    classroom: "教学楼B202",
    type: "必修",
    credits: 3,
    timeSlots: [
      { day: 2, start: 4, duration: 2 }, // 周二4-5节
      { day: 4, start: 1, duration: 1 }, // 周四1节
    ],
  },
  // 可以添加更多课程
];

export default function MainPage() {
  // 管理可用课程列表（备选清单）
  const [availableCourses, setAvailableCourses] = useState<Course[]>(sampleCourses);

  // 管理已选课程列表（课程表中的课程）
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  // 添加课程到课程表的方法
  const addCourseToTable = (course: Course) => {
    // 检查课程是否已添加，避免重复添加
    if (!selectedCourses.some((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return (
    // 将整个应用包裹在 DndProvider 中，启用拖拽功能
    <DndProvider backend={HTML5Backend}>
      <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
        <Navbar />

        <Box p={4}>
          <Grid templateColumns="repeat(12, 1fr)" gap={4}>
            {/* 状态卡片区域 */}
            <GridItem colSpan={3}>
              <StatusCard title="志愿分配" content="第一轮志愿分配进行中..." />
            </GridItem>
            <GridItem colSpan={5}>
              <StatusCard title="选课阶段" content="预选阶段：2024-02-20 ~ 2024-02-25" />
            </GridItem>

            {/* 右侧区域占位 */}
            <GridItem colSpan={4} />

            {/* 课程表区域 */}
            <GridItem colSpan={8}>
              <CourseTable
                selectedCourses={selectedCourses}
                addCourseToTable={addCourseToTable}
              />
            </GridItem>

            {/* 右侧面板 */}
            <GridItem colSpan={4}>
              <Grid gap={4}>
                <TeachingPlan />
                <CourseList availableCourses={availableCourses} />
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </DndProvider>
  );
}