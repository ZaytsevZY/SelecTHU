// app/info/other/page.tsx
"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

export default function OtherPage() {
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        maxWidth="600px"
        textAlign="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          其他
        </Text>
        <Text>
          这里是其他相关信息的详细内容。
        </Text>
      </Box>
    </Flex>
  );
}