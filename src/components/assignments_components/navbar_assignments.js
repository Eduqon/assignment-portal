import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Avatar,
  Image,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

export function NavbarAssignments() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 10 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
          <Image src="/assets/newDesigns/Logo.png" w={20} />
        </Flex>
        <HStack spacing={5}>
          <Avatar />
        </HStack>
      </Flex>
    </Box>
  );
}
