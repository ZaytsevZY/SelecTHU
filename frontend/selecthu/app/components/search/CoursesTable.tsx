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
  IconButton,
  Text,
  Select,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Course {
  id: string;
  courseNumber: string;      // 新增：课程号
  sequenceNumber: string;    // 新增：课序号
  name: string;
  credits: number;           // 新增：学分
  department: string;
  time: string;
  instructor: string;
  teachingInfo: string;
  teacherInfo: string;
  comments: string[];
}

interface CoursesTableProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  selectedCourseId: string | null;
  onAddCourse: (courseId: string) => void; // 添加 onAddCourse
}

const CoursesTable: React.FC<CoursesTableProps> = ({
  courses,
  onSelectCourse,
  selectedCourseId,
  onAddCourse, // 接收 onAddCourse
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(20);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // 获取当前页的课程
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // 处理课程添加
  const handleAddCourse = (courseId: string) => {
    onAddCourse(courseId);
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      borderRadius="md"
      boxShadow="md"
    >
      {/* 课程表标题 */}
      <Text fontSize="lg" mb={4} fontWeight="bold">
        课程列表
      </Text>

      {/* 课程表 */}
      <Table variant="simple" border="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
        <Thead bg={useColorModeValue("gray.100", "gray.700")}>
          <Tr>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>操作</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>课程号-课序号</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>课程名称</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>学分</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>开课院系</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>授课教师</Th>
            <Th borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>上课时间</Th>
            <Th>选课情况</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentCourses.map((course) => (
            <Tr
              key={course.id}
              cursor="pointer"
              bg={
                selectedCourseId === course.id
                  ? useColorModeValue("gray.100", "gray.700")
                  : "transparent"
              }
              onClick={() => onSelectCourse(course.id)}
              _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
            >
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                <IconButton
                  icon={<AddIcon />}
                  size="sm"
                  colorScheme="green"
                  aria-label="添加课程"
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡以避免触发行点击
                    handleAddCourse(course.id);
                  }}
                />
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.courseNumber}-{course.sequenceNumber}
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.name}
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.credits}
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.department}
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.instructor}
              </Td>
              <Td borderRight="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
                {course.time}
              </Td>
              <Td>
                {/* 选课人数情况展示为色带（示例，实际可根据数据调整） */}
                <Box w="100px" h="8px" bg="green.400" borderRadius="md" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* 分页和每页显示数量选择 */}
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        {/* 分页信息 */}
        <Text>共 {totalPages} 页</Text>

        {/* 分页控制 */}
        <Stack direction="row" spacing={4} align="center">
          <IconButton
            aria-label="上一页"
            icon={<Text>&lt;</Text>}
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            isDisabled={currentPage === 1}
          />
          <Text>第 {currentPage} 页</Text>
          <IconButton
            aria-label="下一页"
            icon={<Text>&gt;</Text>}
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
          />
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