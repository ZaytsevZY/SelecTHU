// app/components/search/SelectedFilters.tsx
"use client";

import {
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from '@chakra-ui/react';

const SelectedFilters = () => {
  // 已选择的筛选条件列表
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // 处理删除筛选条件
  const handleRemoveFilter = (filter: string) => {
    setSelectedFilters(selectedFilters.filter((f) => f !== filter));
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4} borderRadius="md" boxShadow="md" mb={4}>
      <Wrap>
        {selectedFilters.map((filter) => (
          <WrapItem key={filter}>
            <Tag
              size="md"
              variant="subtle"
              colorScheme="purple"
              borderRadius="full"
            >
              <TagLabel>{filter}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveFilter(filter)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default SelectedFilters;