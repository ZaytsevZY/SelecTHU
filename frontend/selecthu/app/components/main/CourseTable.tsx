// components/main/CourseTable.tsx
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { TimeSlot } from "@/app/types/course";
  
  // 简化时间段显示
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
  
  // 示例数据
  const sampleCourses: TimeSlot[] = [
    {
      day: 1,
      start: 1,
      duration: 2,
      course: {
        id: "1",
        name: "高等数学",
        teacher: "张教授",
        classroom: "教学楼A101",
        type: "必修",
        credits: 4
      }
    },
    // 可以添加更多课程
  ];
  
  export default function CourseTable() {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const bgColor = useColorModeValue("white", "gray.800");
    const courseBgColor = useColorModeValue("blue.50", "blue.900");
  
    // 根据时间段获取课程
    const getCourse = (day: number, slot: number) => {
      return sampleCourses.find(
        course => 
          course.day === day && 
          slot >= course.start && 
          slot < course.start + course.duration
      );
    };
  
    // 检查是否应该显示课程卡片
    const shouldShowCourse = (day: number, slot: number) => {
      const course = getCourse(day, slot);
      return course && course.start === slot;
    };
  
    // 获取单元格的rowSpan
    const getRowSpan = (day: number, slot: number) => {
      const course = getCourse(day, slot);
      return course && course.start === slot ? course.duration : 1;
    };
  
    // 判断是否应该渲染单元格
    const shouldRenderCell = (day: number, slot: number) => {
      const course = getCourse(day, slot);
      if (!course) return true;
      return slot === course.start;
    };
  
    return (
      <Box
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
              <Th width="80px">节次</Th>
              {weekDays.map((day) => (
                <Th key={day} textAlign="center">{day}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {timeSlots.map((time, slotIndex) => (
              <Tr key={`slot-${slotIndex}`} height="60px">
                <Td fontSize="xs">
                  {`${slotIndex + 1}`}
                </Td>
                {weekDays.map((_, dayIndex) => {
                  if (!shouldRenderCell(dayIndex + 1, slotIndex + 1)) {
                    return null;
                  }
                  
                  const course = getCourse(dayIndex + 1, slotIndex + 1);
                  const rowSpan = getRowSpan(dayIndex + 1, slotIndex + 1);
  
                  return (
                    <Td
                      key={`cell-${dayIndex}-${slotIndex}`}
                      p={1}
                      rowSpan={rowSpan}
                      textAlign="center"
                    >
                      {course && shouldShowCourse(dayIndex + 1, slotIndex + 1) ? (
                        <Box
                          p={2}
                          bg={courseBgColor}
                          borderRadius="md"
                          height="100%"
                          fontSize="xs"
                        >
                          <Text fontWeight="bold">{course.course.name}</Text>
                          <Text>{course.course.teacher}</Text>
                          <Text>{course.course.classroom}</Text>
                        </Box>
                      ) : null}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }