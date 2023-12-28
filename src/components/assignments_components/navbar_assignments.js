import {
  Box,
  Flex,
  Avatar,
  Image,
  useColorModeValue,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

export function NavbarAssignments() {
  const [signOut, setSignOut] = useState(false);
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
          <Image
            src="/assets/newDesigns/assignment-santa-logo.webp"
            w={"10rem"}
            alt="assignment santa logo"
          />
        </Flex>
        <HStack
          spacing={5}
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
        >
          <Avatar onClick={() => setSignOut(true)} cursor={"pointer"} />
          <Box>
            {signOut && (
              <Button>
                <Link href="/">Sign Out</Link>
              </Button>
            )}
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}
