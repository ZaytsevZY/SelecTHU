// components/main/CourseList.tsx
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
  } from "@chakra-ui/react";
  import { DeleteIcon } from "@chakra-ui/icons";
  import { Course } from "@/app/types/course";
  
  // 示例数据
  const sampleSelectedCourses: (Course & { schedule: string })[] = [
    {
      id: "1",
      name: "高等数学",
      teacher: "张教授",
      type: "必修",
      credits: 4,
      schedule: "周一 1-2节",
    },
    {
      id: "2",
      name: "线性代数",
      teacher: "李教授",
      type: "必修",
      credits: 3,
      schedule: "周二 3-4节",
    },
    // 可以添加更多课程
  ];
  
  export default function CourseList() {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
  
    const handleDelete = (courseId: string) => {
      // 实现删除课程的逻辑
      console.log("删除课程:", courseId);
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
          <Text fontSize="lg" fontWeight="bold">备选清单</Text>
          <Link fontSize="sm" color="brand.500">查看</Link>
        </Flex>
  
        <Table size="sm">
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
            {sampleSelectedCourses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.name}</Td>
                <Td>{course.teacher}</Td>
                <Td>{course.type}</Td>
                <Td isNumeric>{course.credits}</Td>
                <Td>{course.schedule}</Td>
                <Td>
                  <IconButton
                    aria-label="删除课程"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => handleDelete(course.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }