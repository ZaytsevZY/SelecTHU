// app/page.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // 处理登录按钮点击事件
  const handleLogin = () => {
    // 在这里添加实际的登录逻辑
    // 登录成功后跳转到主界面
    router.push("/main");
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="brand.50"  // 使用浅蓝色背景
    >
      <Box
        bg="white"
        p={8}
        maxWidth="400px"
        borderRadius="md"
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" textAlign="center" mb={4} color="brand.500">
            登录
          </Text>
          <FormControl id="account" isRequired>
            <FormLabel>账号</FormLabel>
            <Input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="请输入账号"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>密码</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
            />
          </FormControl>
          <Flex alignItems="center" justifyContent="space-between">
            <Checkbox
              isChecked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              colorScheme="purpleAccent"
            >
              记住密码
            </Checkbox>
          </Flex>
          <Button colorScheme="brand" onClick={handleLogin}>
            登录
          </Button>
          <Flex
            mt={4}
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Link href="/info/about" m={1}>
              关于我们
            </Link>
            <Link href="/info/contact" m={1}>
              联系我们
            </Link>
            <Link href="/info/help" m={1}>
              帮助中心
            </Link>
            <Link href="/info/privacy" m={1}>
              隐私条款
            </Link>
            <Link href="/info/agreement" m={1}>
              用户协议
            </Link>
            <Link href="/info/other" m={1}>
              其他
            </Link>
          </Flex>
          <Text textAlign="center" color="gray.500" fontSize="sm" mt={2}>
            @清华大学软件学院
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}