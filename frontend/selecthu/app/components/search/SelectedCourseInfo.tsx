// app/components/search/SelectedCourseInfo.tsx
"use client";

import {
  Box,
  Divider,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

interface Course {
  name: string;
  department: string;
  time: string;
  instructor: string;
  teachingInfo: string;
  teacherInfo: string;
}

const SelectedCourseInfo = () => {
  // 假设有一个选中的课程对象
  const [selectedCourse, setSelectedCourse] = useState<Course | null>({
    // 示例数据
    name: "数据结构",
    department: "计算机学院",
    time: "周一 10:00-12:00",
    instructor: "张三",
    teachingInfo: "教室：软件楼101",
    teacherInfo: "电子邮箱：zhangsan@example.com",
  });
  const [comments, setComments] = useState<string[]>([
    "这门课内容丰富，非常有趣！",
    "老师讲解清晰，助教也很负责任。",
  ]);
  const [newComment, setNewComment] = useState("");

  // 处理评论发送
  const handleSendComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  if (!selectedCourse) {
    return (
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Text>请选择一门课程以查看详细信息。</Text>
      </Box>
    );
  }

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      borderRadius="md"
      boxShadow="md"
      height="100%"
    >
      {/* 课程信息部分 */}
      <VStack align="start" spacing={2} mb={4}>
        <Heading size="md">课程信息</Heading>
        <Text>
          <strong>课程名称：</strong>
          {selectedCourse.name}
        </Text>
        <Text>
          <strong>开课院系：</strong>
          {selectedCourse.department}
        </Text>
        <Text>
          <strong>开课时间：</strong>
          {selectedCourse.time}
        </Text>
        <Text>
          <strong>授课教师：</strong>
          {selectedCourse.instructor}
        </Text>
        <Text>
          <strong>授课信息：</strong>
          {selectedCourse.teachingInfo}
        </Text>
        <Text>
          <strong>教师信息：</strong>
          {selectedCourse.teacherInfo}
        </Text>
      </VStack>

      <Divider />

      {/* 课程评价部分 */}
      <VStack align="start" spacing={4} mt={4}>
        <Heading size="md">课程评价</Heading>
        {/* 展示已有评价 */}
        {comments.map((comment, index) => (
          <Box
            key={index}
            bg={useColorModeValue("gray.100", "gray.700")}
            p={2}
            borderRadius="md"
            w="100%"
          >
            {comment}
          </Box>
        ))}

        {/* 添加评价 */}
        <VStack align="start" w="100%">
          <Input
            placeholder="请输入评论内容"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleSendComment}>
            发送
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SelectedCourseInfo;