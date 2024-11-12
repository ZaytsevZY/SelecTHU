import Image from "next/image";
import { Button } from "@/components/ui/button"
import { HStack } from "@chakra-ui/react"

export default function Home() {
  return (
    <HStack>
      <Button> Click me </Button>
      <Button> Click me </Button>
    </HStack>
  );
}
