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
  getCourseColor: (courseId: string) => string;
}

export default function CourseTable({
  selectedCourses,
  addCourseToTable,
  getCourseColor,
}: CourseTableProps) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  // 添加拖拽中的课程ID状态
  const [draggedCourseId, setDraggedCourseId] = React.useState<string | null>(null);

  // 时间段显示（节次从1-15）
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
    "第十一节 (18:00-18:45)",
    "第十二节 (18:50-19:35)",
    "第十三节 (19:40-20:25)",
    "第十四节 (20:30-21:15)",
    "第十五节 (21:20-22:05)",
  ];

  const weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

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

  // 获取课程的颜色
  const getColor = (courseId: string) => {
    return getCourseColor(courseId);
  };

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
          {timeSlots.map((_, slotIndex) => (
            // 移除了 height 属性
            <Tr key={`slot-${slotIndex}`}>
              <Td
                fontSize="xs"
                border="1px solid"
                borderColor={borderColor}
                textAlign="center"
                height="60px" // 为节次列设置默认高度
              >
                {`${slotIndex + 1}`}
              </Td>
              {weekDays.map((_, dayIndex) => {
                if (!shouldRenderCell(dayIndex + 1, slotIndex + 1)) {
                  return null;
                }

                const course = getCourse(dayIndex + 1, slotIndex + 1);
                const rowSpan = getRowSpan(dayIndex + 1, slotIndex + 1);
                const color = course ? getColor(course.id) : "gray";

                return (
                  <Td
                    key={`cell-${dayIndex}-${slotIndex}`}
                    p={0}
                    rowSpan={rowSpan}
                    textAlign="center"
                    border="1px solid"
                    borderColor={borderColor}
                    verticalAlign="top"
                    // 为空白单元格设置默认高度
                    height={course ? undefined : "60px"}
                  >
                    {course && shouldShowCourse(dayIndex + 1, slotIndex + 1) ? (
                      <CourseBlock
                        course={course}
                        color={color}
                        duration={rowSpan} // 传递持续时间
                        setDraggedCourseId={setDraggedCourseId}
                        draggedCourseId={draggedCourseId}
                      />
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
  duration: number; // 新增持续时间属性
  setDraggedCourseId: (id: string | null) => void;
  draggedCourseId: string | null;
}

function CourseBlock({
  course,
  color,
  duration,
  setDraggedCourseId,
  draggedCourseId,
}: CourseBlockProps) {
  // 使用 useDrag 钩子
  const [, drag, preview] = useDrag(() => ({
    type: ItemTypes.COURSE,
    item: () => {
      // 在这里设置拖拽中的课程ID
      setDraggedCourseId(course.id);
      return { course };
    },
    // 拖拽结束时，清除拖拽中的课程ID
    end: () => {
      setDraggedCourseId(null);
    },
  }));

  // 抑制默认的拖拽预览
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  // 创建一个 ref
  const boxRef = useRef<HTMLDivElement>(null);
  drag(boxRef);

  // 使用 useColorModeValue，根据主题模式选择适当的颜色
  const bgColor = useColorModeValue(`${color}.100`, `${color}.700`);
  const textColor = useColorModeValue("black", "white");

  // 判断当前课程是否正在被拖拽
  const isBeingDragged = draggedCourseId === course.id;

  // 计算课程块的高度
  const slotHeight = 60; // 每节课的高度，可以根据需要调整
  const totalHeight = duration * slotHeight;

  return (
    <Box
      ref={boxRef}
      p={2}
      bg={bgColor}
      borderRadius="none"
      minHeight={`${totalHeight}px`} // 设置最小高度
      width="100%"
      fontSize="xs"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      opacity={isBeingDragged ? 0 : 1}
      color={textColor}
    >
      <Text fontWeight="bold">{course.name}</Text>
      <Text>{course.teacher}</Text>
      <Text>{course.classroom}</Text>
    </Box>
  );
}