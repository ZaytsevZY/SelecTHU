// components/layout/Navbar.tsx
"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";
import ColorModeToggle from "./ColorModeToggle";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      as={NextLink}
      href={href}
      px={2}
      py={1}
      rounded="md"
      bg={isActive ? "brand.100" : "transparent"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("brand.50", "brand.700"),
      }}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      shadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <HStack spacing={3}>
            <FaGraduationCap size="24px" />
            <Text fontSize="xl" fontWeight="bold">
              选课助手/模拟选课
            </Text>
          </HStack>
        </HStack>

        <HStack spacing={8} alignItems="center">
          <NavLink href="/main">模拟选课</NavLink>
          <NavLink href="/search">搜索课程</NavLink> {/* 新增搜索课程链接 */}
          <NavLink href="/profile">个人信息</NavLink>
          <ColorModeToggle />
          <Link href="/profile">
            <Avatar size="sm" />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}