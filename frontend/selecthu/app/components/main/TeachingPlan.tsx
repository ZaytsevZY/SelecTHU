// components/main/TeachingPlan.tsx
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
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Course } from "@/app/types/course";
  
  // 示例数据
  const samplePlanCourses: Course[] = [
    {
      id: "1",
      name: "高等数学",
      type: "必修",
      credits: 4,
    },
    {
      id: "2",
      name: "线性代数",
      type: "必修",
      credits: 3,
    },
    // 可以添加更多课程
  ];
  
  export default function TeachingPlan() {
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
  
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
          <Text fontSize="lg" fontWeight="bold">教学计划</Text>
          <Link fontSize="sm" color="brand.500">查看</Link>
        </Flex>
  
        <Text fontSize="sm" mb={4}>计算机科学与技术 2023级 第二学期</Text>
  
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>课程名</Th>
              <Th>课程属性</Th>
              <Th isNumeric>学分数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {samplePlanCourses.map((course) => (
              <Tr key={course.id}>
                <Td>{course.name}</Td>
                <Td>{course.type}</Td>
                <Td isNumeric>{course.credits}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }