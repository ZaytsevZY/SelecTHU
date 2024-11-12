// components/ui/provider.tsx
"use client"

import { ChakraProvider } from "@chakra-ui/react"  // 改为从 @chakra-ui/react 导入
import { ReactNode } from "react"

interface ProviderProps {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  )
}