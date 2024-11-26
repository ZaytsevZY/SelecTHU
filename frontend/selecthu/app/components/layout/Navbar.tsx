// frontend/selecthu/app/components/layout/Navbar.tsx

"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGraduationCap } from "react-icons/fa";
import ColorModeToggle from "./ColorModeToggle"; // 暗色模式切换按钮
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      as={NextLink}
      href={href}
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("brand.50", "brand.700"),
      }}
    >
      {children}
    </Link>
  );
};

// 定义用户信息的接口
interface User {
  nickname: string;
  avatar: string; // base64字符串或图片URL
  department: string;
  grade: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 从localStorage中获取用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // 清除localStorage中的用户信息
    localStorage.removeItem("user");
    // 跳转到登录界面
    router.push("/");
  };

  // 如果用户信息不存在，设置默认昵称为 "User"
  const nickname = user?.nickname || "User";
  const avatarSrc = user?.avatar || "/default-avatar.png"; // 设置默认头像路径

  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* 左侧 logo 和标题 */}
        <HStack spacing={8} alignItems="center">
          <HStack spacing={3}>
            <FaGraduationCap size="24px" />
            <Text fontSize="xl" fontWeight="bold">
              选课助手/模拟选课
            </Text>
          </HStack>
        </HStack>

        {/* 右侧导航链接和用户信息 */}
        <HStack spacing={4} alignItems="center">
          <NavLink href="/main">模拟选课</NavLink>
          <NavLink href="/search">搜索课程</NavLink>
          <NavLink href="/profile">个人信息</NavLink>
          <ColorModeToggle />
          {/* 用户头像和昵称 */}
          <HStack spacing={2}>
            {/* 头像链接到个人信息页 */}
            <Link as={NextLink} href="/profile">
              <Avatar size="sm" src={avatarSrc} name={nickname} />
            </Link>
            {/* 昵称链接到个人信息页 */}
            <Link as={NextLink} href="/profile">
              <Text cursor="pointer">{nickname}</Text>
            </Link>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}