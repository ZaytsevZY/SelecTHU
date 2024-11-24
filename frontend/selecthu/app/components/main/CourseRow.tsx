import React, { useRef, useEffect } from "react";
import {
  Td,
  Badge,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Course, TimeSlot } from "@/app/types/course";

import { useDrag, DragSourceMonitor } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const ItemTypes = {
  COURSE: "course",
};

interface CourseRowProps {
  course: Course;
  courseColor: string;
  formatTimeSlots: (timeSlots: TimeSlot[]) => string;
  handleAdd: (course: Course) => void;
  handleDelete: (courseId: string) => void;
}

export default function CourseRow({
  course,
  courseColor,
  formatTimeSlots,
  handleAdd,
  handleDelete,
}: CourseRowProps) {
  // 使用 useDrag 钩子
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.COURSE,
    item: { course },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 抑制默认的拖拽预览
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const rowRef = useRef<HTMLTableRowElement>(null);
  drag(rowRef);

  return (
    <chakra.tr
      key={course.id}
      ref={rowRef}
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
    >
      <Td>
        <Badge
          colorScheme={courseColor} // 使用传递的颜色方案
          px={2}
          py={1}
          borderRadius="md"
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
        {/* 添加和删除按钮 */}
        <IconButton
          aria-label="添加课程"
          icon={<AddIcon />}
          size="sm"
          variant="ghost"
          colorScheme="green"
          onClick={() => handleAdd(course)}
          mr={2}
        />
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
}