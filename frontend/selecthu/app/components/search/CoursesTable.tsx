// app/components/search/CoursesTable.tsx
"use client";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Text,
  Select,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useColorModeValue } from '@chakra-ui/react';

const CoursesTable = () => {
  // 假设有一个课程列表
  const [courses, setCourses] = useState<any[]>([]); // 替换为实际的课程数据类型
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(20);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // 获取当前页的课程
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // 处理课程添加
  const handleAddCourse = (courseId: string) => {
    // 实现添加课程到选中列表的逻辑
    console.log("添加课程ID:", courseId);
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4} borderRadius="md" boxShadow="md">
      {/* 课程表标题 */}
      <Text fontSize="lg" mb={4} fontWeight="bold">
        课程列表
      </Text>

      {/* 课程表 */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>操作</Th>
            <Th>课程名称</Th>
            <Th>开课院系</Th>
            <Th>开课时间</Th>
            <Th>授课教师</Th>
            <Th>选课人数情况</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentCourses.map((course) => (
            <Tr key={course.id}>
              <Td>
                <IconButton
                  icon={<AddIcon />}
                  size="sm"
                  colorScheme="green"
                  aria-label="添加课程"
                  onClick={() => handleAddCourse(course.id)}
                />
              </Td>
              <Td>{course.name}</Td>
              <Td>{course.department}</Td>
              <Td>{course.time}</Td>
              <Td>{course.instructor}</Td>
              <Td>
                {/* 选课人数情况展示为色带 */}
                <Box
                  w="100px"
                  h="8px"
                  bg="green.400"
                  borderRadius="md"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* 分页和每页显示数量选择 */}
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        {/* 分页信息 */}
        <Text>
          共 {totalPages} 页
        </Text>

        {/* 分页控制 */}
        <Stack direction="row" spacing={4} align="center">
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            上一页
          </Button>
          <Text>第 {currentPage} 页</Text>
          <Button
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            下一页
          </Button>
          <Select
            width="100px"
            value={coursesPerPage}
            onChange={(e) => setCoursesPerPage(Number(e.target.value))}
          >
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </Select>
        </Stack>
      </Flex>
    </Box>
  );
};

export default CoursesTable;