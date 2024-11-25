// app/components/search/CourseSelectionPage.tsx
"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CoursesTable from "./CoursesTable";
import SelectedCourseInfo from "./SelectedCourseInfo";

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

const CourseSelectionPage = () => {
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
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // 查找选中的课程
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
    <Flex>
      <Box flex="1" mr={4}>
        <CoursesTable 
          courses={courses} 
          onSelectCourse={setSelectedCourseId} 
          selectedCourseId={selectedCourseId}
          onAddCourse={handleAddCourse} // 传递 onAddCourse
        />
      </Box>
      <Box flex="1">
        <SelectedCourseInfo 
          course={selectedCourse} 
          onAddComment={handleAddComment}
        />
      </Box>
    </Flex>
  );
};

export default CourseSelectionPage;