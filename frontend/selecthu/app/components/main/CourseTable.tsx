// components/main/CourseTable.tsx
import React, { useEffect, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  chakra,
  Box,
} from "@chakra-ui/react";
import { Course } from "@/app/types/course";

// 引入 React DnD 所需的模块
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

// 定义拖拽类型
const ItemTypes = {
  COURSE: "course",
};

interface CourseTableProps {
  selectedCourses: Course[];
  addCourseToTable: (course: Course) => void;
}

export default function CourseTable({
  selectedCourses,
  addCourseToTable,
}: CourseTableProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  // 时间段显示
  const timeSlots = [
    "第一节 (8:00-8:45)",
    "第二节 (8:50-9:35)",
    "第三节 (9:50-10:35)",
    "第四节 (10:40-11:25)",
    "第五节 (11:30-12:15)",
    "第六节 (13:30-14:15)",
    "第七节 (14:20-15:05)",
    "第八节 (15:20-16:05)",
    "第九节 (16:10-16:55)",
    "第十节 (17:00-17:45)",
  ];

  const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

  // 颜色数组
  const colors = [
    "blue.50",
    "green.50",
    "red.50",
    "yellow.50",
    "purple.50",
    "teal.50",
    "orange.50",
    "pink.50",
    "cyan.50",
    "gray.50",
  ];

  // 创建一个颜色映射对象
  const courseColorMap: { [courseId: string]: string } = {};

  // 获取课程的颜色，如果未分配则分配一个新颜色
  const getCourseColor = (courseId: string): string => {
    if (!courseColorMap[courseId]) {
      const colorIndex = Object.keys(courseColorMap).length % colors.length;
      courseColorMap[courseId] = colors[colorIndex];
    }
    return courseColorMap[courseId];
  };

  // 根据时间段获取课程
  const getCourse = (day: number, slot: number): Course | undefined => {
    return selectedCourses.find((course) =>
      course.timeSlots.some(
        (ts) =>
          ts.day === day &&
          slot >= ts.start &&
          slot < ts.start + ts.duration
      )
    );
  };

  // 检查是否应该显示课程卡片
  const shouldShowCourse = (day: number, slot: number): boolean => {
    const course = getCourse(day, slot);
    if (!course) return false;
    return course.timeSlots.some((ts) => ts.day === day && ts.start === slot);
  };

  // 获取单元格的 rowSpan 值
  const getRowSpan = (day: number, slot: number): number => {
    const course = getCourse(day, slot);
    if (!course) return 1;
    const timeSlot = course.timeSlots.find(
      (ts) => ts.day === day && ts.start === slot
    );
    return timeSlot ? timeSlot.duration : 1;
  };

  // 判断是否应该渲染单元格
  const shouldRenderCell = (day: number, slot: number): boolean => {
    const course = getCourse(day, slot);
    if (!course) return true;
    return course.timeSlots.some((ts) => ts.day === day && ts.start === slot);
  };

  // 使用 useDrop 钩子，使课程表可以作为拖拽的放置目标
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.COURSE,
    drop: (item: { course: Course }) => {
      addCourseToTable(item.course);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 创建一个 ref，并将 drop 方法应用到该 ref 上
  const boxRef = React.useRef<HTMLDivElement>(null);
  drop(boxRef);

  return (
    <chakra.div
      ref={boxRef}
      bg={bgColor}
      p={2}
      borderRadius="lg"
      shadow="sm"
      border="1px"
      borderColor={borderColor}
      overflowX="auto"
    >
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th width="80px" border="1px solid" borderColor={borderColor}>
              节次
            </Th>
            {weekDays.map((day) => (
              <Th
                key={day}
                textAlign="center"
                border="1px solid"
                borderColor={borderColor}
              >
                {day}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {timeSlots.map((time, slotIndex) => (
            <Tr key={`slot-${slotIndex}`} height="60px">
              <Td
                fontSize="xs"
                border="1px solid"
                borderColor={borderColor}
                textAlign="center"
              >
                {`${slotIndex + 1}`}
              </Td>
              {weekDays.map((_, dayIndex) => {
                if (!shouldRenderCell(dayIndex + 1, slotIndex + 1)) {
                  return null;
                }

                const course = getCourse(dayIndex + 1, slotIndex + 1);
                const rowSpan = getRowSpan(dayIndex + 1, slotIndex + 1);
                const color = course ? getCourseColor(course.id) : "gray.200";

                return (
                  <Td
                    key={`cell-${dayIndex}-${slotIndex}`}
                    p={0}
                    rowSpan={rowSpan}
                    textAlign="center"
                    border="1px solid"
                    borderColor={borderColor}
                    verticalAlign="middle"
                  >
                    {course && shouldShowCourse(dayIndex + 1, slotIndex + 1) ? (
                      <CourseBlock course={course} color={color} />
                    ) : null}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </chakra.div>
  );
}

// 课程块组件
interface CourseBlockProps {
  course: Course;
  color: string;
}

function CourseBlock({ course, color }: CourseBlockProps) {
  // 使用 useDrag 钩子
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.COURSE,
    item: { course },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [course]);

  // 抑制默认的拖拽预览
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // 创建一个 ref
  const boxRef = useRef<HTMLDivElement>(null);
  drag(boxRef);

  return (
    <Box
      ref={boxRef}
      p={2}
      bg={color}
      borderRadius="none"
      height="100%"
      width="100%"
      fontSize="xs"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      opacity={isDragging ? 0 : 1} // 拖拽时隐藏原课程块
    >
      <Text fontWeight="bold">{course.name}</Text>
      <Text>{course.teacher}</Text>
      <Text>{course.classroom}</Text>
    </Box>
  );
}