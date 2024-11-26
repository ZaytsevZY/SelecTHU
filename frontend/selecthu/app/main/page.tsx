// app/main/page.tsx
"use client";

import {
  Box,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import StatusCard from "../components/main/StatusCard";
import CourseTable from "../components/main/CourseTable";
import TeachingPlan from "../components/main/TeachingPlan";
import CourseList from "../components/main/CourseList";

export default function MainPage() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Navbar />
      
      <Box p={4}>
        <Grid
          templateColumns="repeat(12, 1fr)"
          gap={4}
        >
          {/* 状态卡片区域 */}
          <GridItem colSpan={3}>
            <StatusCard
              title="志愿分配"
              content="第一轮志愿分配进行中..."
            />
          </GridItem>
          <GridItem colSpan={5}>
            <StatusCard
              title="选课阶段"
              content="预选阶段：2024-02-20 ~ 2024-02-25"
            />
          </GridItem>
          
          {/* 右侧区域占位 */}
          <GridItem colSpan={4} />
          
          {/* 课程表区域 */}
          <GridItem colSpan={8}>
            <CourseTable />
          </GridItem>
          
          {/* 右侧面板 */}
          <GridItem colSpan={4}>
            <Grid gap={4}>
              <TeachingPlan />
              <CourseList />
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}