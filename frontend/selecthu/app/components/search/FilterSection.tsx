// app/components/search/FilterSection.tsx
"use client";

import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from '@chakra-ui/react';

const FilterSection = () => {
  // 设置筛选条件状态
  const [filterType, setFilterType] = useState("");

  // 根据选择的筛选条件显示相应的输入框
  const renderFilterInput = () => {
    switch (filterType) {
      case "courseName":
        return (
          <FormControl>
            <FormLabel>课程名称</FormLabel>
            <Input placeholder="请输入课程名称" />
          </FormControl>
        );
      case "department":
        return (
          <FormControl>
            <FormLabel>开课院系</FormLabel>
            <Select placeholder="选择院系">
              <option value="computer">计算机学院</option>
              <option value="electrical">电气学院</option>
              <option value="mechanical">机械学院</option>
              {/* 其他院系选项 */}
            </Select>
          </FormControl>
        );
      case "courseAttribute":
        return (
          <FormControl>
            <FormLabel>课程属性</FormLabel>
            <Select placeholder="选择课程属性">
              <option value="mandatory">必修</option>
              <option value="elective">选修</option>
              {/* 其他属性选项 */}
            </Select>
          </FormControl>
        );
      case "classTime":
        return (
          <FormControl>
            <FormLabel>开课时间</FormLabel>
            <Input type="datetime-local" />
          </FormControl>
        );
      case "instructor":
        return (
          <FormControl>
            <FormLabel>授课教师</FormLabel>
            <Input placeholder="请输入教师姓名" />
          </FormControl>
        );
      default:
        return null;
    }
  };

  // 处理添加筛选条件
  const handleAddFilter = () => {
    // 实现添加筛选条件的逻辑，如更新已选择的筛选条件列表
    console.log("添加筛选条件:", filterType);
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4} borderRadius="md" boxShadow="md" mb={4}>
      <Stack direction="row" spacing={4} align="center">
        {/* 筛选条件选择 */}
        <FormControl maxW="200px">
          <FormLabel>筛选标准</FormLabel>
          <Select
            placeholder="选择筛选标准"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="courseName">课程名称</option>
            <option value="department">开课院系</option>
            <option value="courseAttribute">课程属性</option>
            <option value="classTime">开课时间</option>
            <option value="instructor">授课教师</option>
          </Select>
        </FormControl>

        {/* 根据选择的筛选标准显示输入框 */}
        {renderFilterInput()}

        {/* 添加筛选条件按钮 */}
        <Button colorScheme="blue" onClick={handleAddFilter}>
          添加
        </Button>
      </Stack>
    </Box>
  );
};

export default FilterSection;