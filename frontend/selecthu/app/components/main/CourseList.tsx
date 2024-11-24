// components/main/CourseList.tsx

import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { Course, TimeSlot } from "@/app/types/course";
import { useMemo } from "react";

import CourseRow from "./CourseRow"; // Import the new component

interface CourseListProps {
  availableCourses: Course[];
  addCourseToTable: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
}

export default function CourseList({
  availableCourses,
  addCourseToTable,
  deleteCourse,
}: CourseListProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Colors for courses
  const colors = [
    "blue.500",
    "green.500",
    "red.500",
    "yellow.500",
    "purple.500",
    "teal.500",
    "orange.500",
    "pink.500",
    "cyan.500",
    "gray.500",
  ];

  // Map course IDs to colors
  const courseColorMap = useMemo(() => {
    const map: { [courseId: string]: string } = {};
    availableCourses.forEach((course, index) => {
      map[course.id] = colors[index % colors.length];
    });
    return map;
  }, [availableCourses]);

  const formatTimeSlots = (timeSlots: TimeSlot[]): string => {
    const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    return timeSlots
      .map(
        (ts) =>
          `${weekDays[ts.day - 1]} ${ts.start}-${ts.start + ts.duration - 1}节`
      )
      .join(", ");
  };

  const handleAdd = (course: Course) => {
    addCourseToTable(course);
  };

  const handleDelete = (courseId: string) => {
    deleteCourse(courseId);
  };

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          备选清单
        </Text>
        <Link fontSize="sm" color="brand.500">
          查看
        </Link>
      </Flex>

      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>课程名</Th>
            <Th>授课教师</Th>
            <Th>课程属性</Th>
            <Th isNumeric>学分数</Th>
            <Th>上课时间</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {availableCourses.map((course) => (
            <CourseRow
              key={course.id}
              course={course}
              courseColor={courseColorMap[course.id]}
              formatTimeSlots={formatTimeSlots}
              handleAdd={handleAdd}
              handleDelete={handleDelete}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}