// app/components/search/SelectedFilters.tsx
"use client";

import {
  Box,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Filter } from "./FilterSection";

interface SelectedFiltersProps {
  selectedFilters: Filter[];
  removeFilter: (type: string) => void;
}

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ selectedFilters, removeFilter }) => {
  // 根据筛选类型获取显示标签
  const getFilterLabel = (type: string): string => {
    switch (type) {
      case "courseName":
        return "课程名称";
      case "department":
        return "开课院系";
      case "courseAttribute":
        return "课程属性";
      case "classTime":
        return "开课时间";
      case "instructor":
        return "授课教师";
      default:
        return type;
    }
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      borderRadius="md"
      boxShadow="md"
      mb={4}
    >
      <Stack direction="row" spacing={4} wrap="wrap">
        {selectedFilters.map((filter) => (
          <Box
            key={filter.type}
            bg={useColorModeValue("gray.100", "gray.700")}
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <Text fontSize="sm" mr={2}>
              {getFilterLabel(filter.type)}：{filter.value}
            </Text>
            <IconButton
              size="sm"
              icon={<CloseIcon />}
              aria-label={`删除${getFilterLabel(filter.type)}`}
              onClick={() => removeFilter(filter.type)}
              variant="ghost"
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default SelectedFilters;