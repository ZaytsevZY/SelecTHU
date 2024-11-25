// app/search/page.tsx
"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import FilterSection, { Filter } from "../components/search/FilterSection";
import SelectedFilters from "../components/search/SelectedFilters";
import CoursesTable from "../components/search/CoursesTable";
import SelectedCourseInfo from "../components/search/SelectedCourseInfo";

interface Course {
  id: string;
  name: string;
  department: string;
  time: string;
  instructor: string;
  teachingInfo: string;
  teacherInfo: string;
  comments: string[];
}

export default function SearchPage() {
  // 管理已选择的筛选条件
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

  // 添加筛选条件的处理函数
  const addFilter = (filter: Filter) => {
    // 如果已存在同类型的筛选条件，则替换
    if (!selectedFilters.some((f) => f.type === filter.type)) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(
        selectedFilters.map((f) => (f.type === filter.type ? filter : f))
      );
    }
  };

  // 移除筛选条件的处理函数
  const removeFilter = (type: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f.type !== type));
  };

  // 初始化课程数据，包括高等数学和软件工程
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "math101",
      name: "高等数学",
      department: "数学与统计学院",
      time: "周一 08:00-10:00",
      instructor: "李四",
      teachingInfo: "教室：理学楼201",
      teacherInfo: "电子邮箱：lisi@example.com",
      comments: [
        "课程内容深入，适合打好数学基础。",
        "老师讲解详细，有助于理解复杂概念。",
      ],
    },
    {
      id: "sweng201",
      name: "软件工程",
      department: "计算机学院",
      time: "周三 14:00-16:00",
      instructor: "王五",
      teachingInfo: "教室：软件楼303",
      teacherInfo: "电子邮箱：wangwu@example.com",
      comments: [
        "实用性强，项目实践丰富。",
        "课程安排合理，适合提升编程技能。",
      ],
    },
    // 可以根据需要添加更多课程
  ]);

  // 管理选中的课程 ID
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // 查找选中的课程对象
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) || null;

  // 处理添加评论
  const handleAddComment = (courseId: string, comment: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, comments: [...course.comments, comment] }
          : course
      )
    );
  };

  // 处理添加课程（示例：可以将课程添加到选课列表，具体实现根据需求）
  const handleAddCourse = (courseId: string) => {
    console.log("添加课程ID:", courseId);
    // 实现添加课程到选中列表的逻辑
    // 例如，您可以维护一个选课列表状态，并在这里更新
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      {/* 导航栏 */}
      <Navbar />

      {/* 页面标题（可选） */}
      <Box p={4}>
        <Heading>课程选择</Heading>
      </Box>

      {/* 主内容区域 */}
      <Flex p={4}>
        <Grid
          templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
          gap={4}
          w="100%"
        >
          {/* 左侧内容：筛选部分和课程表 */}
          <GridItem>
            {/* 筛选部分 */}
            <FilterSection
              selectedFilters={selectedFilters}
              addFilter={addFilter}
            />

            {/* 已选择的筛选标准展示部分 */}
            <SelectedFilters
              selectedFilters={selectedFilters}
              removeFilter={removeFilter}
            />

            {/* 课程表展示部分 */}
            <CoursesTable
              courses={courses}
              onSelectCourse={setSelectedCourseId}
              selectedCourseId={selectedCourseId}
              onAddCourse={handleAddCourse} // 传递 onAddCourse
            />
          </GridItem>

          {/* 右侧内容：选中课程信息 */}
          <GridItem>
            <SelectedCourseInfo
              course={selectedCourse}
              onAddComment={handleAddComment}
            />
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}