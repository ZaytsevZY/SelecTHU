// app/search/page.tsx
"use client";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../components/layout/Navbar";
import FilterSection from "../components/search/FilterSection";
import SelectedFilters from "../components/search/SelectedFilters";
import CoursesTable from "../components/search/CoursesTable";
import SelectedCourseInfo from "../components/search/SelectedCourseInfo";

export default function SearchPage() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      {/* 导航栏 */}
      <Navbar />

      {/* 主内容区域 */}
      <Flex p={4}>
        <Grid
          templateColumns={{ base: "1fr", lg: "3fr 1fr" }}
          gap={4}
          w="100%"
        >
          {/* 左侧内容：筛选部分和课程表 */}
          <GridItem>
            {/* 筛选标准选择部分 */}
            <FilterSection />

            {/* 已选择的筛选标准展示部分 */}
            <SelectedFilters />

            {/* 课程表展示部分 */}
            <CoursesTable />
          </GridItem>

          {/* 右侧内容：选中课程信息 */}
          <GridItem>
            <SelectedCourseInfo />
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}