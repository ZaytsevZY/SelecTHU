// components/main/CourseList.tsx
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Link,
  IconButton,
  useColorModeValue,
  Badge,
  chakra,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Course, TimeSlot } from "@/app/types/course";
import { useMemo } from "react";

// 引入 React DnD 所需的模块
import { useDrag } from "react-dnd";

// 定义拖拽类型
const ItemTypes = {
  COURSE: "course",
};

interface CourseListProps {
  availableCourses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
}

export default function CourseList({ availableCourses, addCourse, deleteCourse }: CourseListProps) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // 颜色数组
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

  // 创建颜色映射
  const courseColorMap = useMemo(() => {
    const map: { [courseId: string]: string } = {};
    availableCourses.forEach((course, index) => {
      map[course.id] = colors[index % colors.length];
    });
    return map;
  }, [availableCourses]);

  // 格式化时间段为可读字符串
  const formatTimeSlots = (timeSlots: TimeSlot[]): string => {
    const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    return timeSlots
      .map(
        (ts) =>
          `${weekDays[ts.day - 1]} ${ts.start}-${ts.start + ts.duration - 1}节`
      )
      .join(", ");
  };

  // 处理添加课程的函数
  const handleAdd = (course: Course) => {
    addCourse(course);
  };

  // 处理删除课程的函数
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
          {availableCourses.map((course) => {
            // 使用 useDrag 钩子，使课程项可以被拖拽
            const [{ isDragging }, drag] = useDrag({
              type: ItemTypes.COURSE,
              item: { course },
              collect: (monitor) => ({
                isDragging: monitor.isDragging(),
              }),
            });

            // 创建一个 ref，并将 drag 方法应用到该 ref 上
            const rowRef = React.useRef<HTMLTableRowElement>(null);
            drag(rowRef);

            return (
              <chakra.tr
                key={course.id}
                ref={rowRef} // 将 ref 绑定到 chakra.tr
                opacity={isDragging ? 0.5 : 1} // 拖拽时改变透明度
                cursor="move" // 鼠标悬停时显示移动手势
              >
                <Td>
                  <Badge
                    colorScheme="teal"
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg={courseColorMap[course.id]}
                    color="white"
                  >
                    {course.name}
                  </Badge>
                </Td>
                <Td>{course.teacher}</Td>
                <Td>{course.type}</Td>
                <Td isNumeric>{course.credits}</Td>
                <Td>{formatTimeSlots(course.timeSlots)}</Td>
                <Td>
                  {/* 添加“添加”按钮 */}
                  <IconButton
                    aria-label="添加课程"
                    icon={<AddIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="green"
                    onClick={() => handleAdd(course)}
                    mr={2}
                  />
                  {/* 添加“删除”按钮 */}
                  <IconButton
                    aria-label="删除课程"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDelete(course.id)}
                  />
                </Td>
              </chakra.tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}