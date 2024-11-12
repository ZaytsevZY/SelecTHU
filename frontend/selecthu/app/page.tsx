"use client"
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Avatar
} from "@chakra-ui/react"
import { SearchIcon, BellIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* 导航栏 */}
      <Flex
        as="nav"
        position="fixed"
        w="full"
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        h="16"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        zIndex="1000"
      >
        <Flex alignItems="center">
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<HamburgerIcon />}
          />
          <Heading size="md" ml={2}>SelecTHU</Heading>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <IconButton
            variant="ghost"
            aria-label="notifications"
            icon={<BellIcon />}
          />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
            >
              <Avatar size="sm" name="User Name" />
            </MenuButton>
            <MenuList>
              <MenuItem>个人信息</MenuItem>
              <MenuItem>设置</MenuItem>
              <MenuItem>退出登录</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* 侧边栏 - 移动端 */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>菜单</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              <Button variant="ghost">课程列表</Button>
              <Button variant="ghost">已选课程</Button>
              <Button variant="ghost">课表</Button>
              <Button variant="ghost">通知</Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* 主要内容 */}
      <Container maxW="container.xl" pt="20">
        <Grid
          templateColumns={{ base: '1fr', md: '200px 1fr' }}
          gap={6}
          p={4}
        >
          {/* 侧边栏 - 桌面端 */}
          <Box
            display={{ base: 'none', md: 'block' }}
            bg={bgColor}
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={3}>
              <Button variant="ghost">课程列表</Button>
              <Button variant="ghost">已选课程</Button>
              <Button variant="ghost">课表</Button>
              <Button variant="ghost">通知</Button>
            </VStack>
          </Box>

          {/* 内容区 */}
          <VStack align="stretch" spacing={6}>
            {/* 搜索框 */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input placeholder="搜索课程..." />
            </InputGroup>

            {/* 课程表格 */}
            <Box
              bg={bgColor}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              overflowX="auto"
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>课程名称</Th>
                    <Th>教师</Th>
                    <Th>时间</Th>
                    <Th>地点</Th>
                    <Th>学分</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {[1, 2, 3].map((i) => (
                    <Tr key={i}>
                      <Td>
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold">计算机科学导论 {i}</Text>
                          <Tag size="sm" colorScheme="green">必修</Tag>
                        </VStack>
                      </Td>
                      <Td>张教授</Td>
                      <Td>周一 1-2节</Td>
                      <Td>一教101</Td>
                      <Td>3.0</Td>
                      <Td>
                        <Button size="sm" colorScheme="blue">
                          选课
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </Grid>
      </Container>
    </Box>
  )
}