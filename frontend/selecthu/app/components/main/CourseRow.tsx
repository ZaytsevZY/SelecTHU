// components/main/CourseRow.tsx

import React from "react";
import {
  Td,
  Badge,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Course, TimeSlot } from "@/app/types/course";

import { useDrag } from "react-dnd";

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
  // Use the useDrag Hook
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.COURSE,
    item: { course },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const rowRef = React.useRef<HTMLTableRowElement>(null);
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
          colorScheme="teal"
          px={2}
          py={1}
          borderRadius="md"
          bg={courseColor}
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
        {/* Add and Delete buttons */}
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