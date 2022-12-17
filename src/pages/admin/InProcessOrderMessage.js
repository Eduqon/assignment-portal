import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";

function InProcessOrderMessage() {
  return (
    <>
      <Box
        display={"block"}
        borderWidth="1px"
        borderRadius="md"
        width={"sm"}
        marginTop={"20px"}
      >
        <Box p={4} bgColor="gray.200">
          <HStack>
            <Heading fontSize={"xl"}> In-Process Orders </Heading>{" "}
          </HStack>{" "}
        </Box>{" "}
        <VStack
          alignItems={"start"}
          justifyContent={"space-between"}
          margin={3}
          minH={"sm"}
          maxH={"sm"}
        >
          <VStack
            overflowY={"scroll"}
            alignItems={"start"}
            width={"100%"}
          ></VStack>{" "}
        </VStack>{" "}
      </Box>{" "}
    </>
  );
}

export default InProcessOrderMessage;
