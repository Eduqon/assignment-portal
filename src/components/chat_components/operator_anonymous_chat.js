import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../services/firebase";
import { ChatIcon, AddIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  VStack,
  Box,
  Heading,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AdminAnonymousChat(props) {
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState("");

  async function assignOperator() {
    let userEmail = localStorage.getItem("userEmail");
    setUserId(userEmail);
    try {
      const chatName = props.clientId + "_" + userEmail;
      const chat_data = onSnapshot(doc(db, "chat", chatName), (doc) => {
        setChat(doc.data().conversation);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Popover placement="top-start">
      <PopoverTrigger>
        <IconButton
          onClick={async () => {
            await assignOperator();
          }}
          colorScheme="blue"
          size="lg"
          icon={<ChatIcon />}
        />
      </PopoverTrigger>
      <PopoverContent width={"md"} overflowY="scroll">
        <VStack alignItems={"start"} maxH={"500px"}>
          <Box p={2} bgColor="gray.200" width={"100%"}>
            <Heading fontSize={"xl"}>Chat with Client</Heading>
          </Box>
          {chat.length === 0 ? (
            <Box>
              <Text>Connecting with Client...</Text>
            </Box>
          ) : (
            chat.map((messageItem, index) => (
              <VStack
                alignItems={
                  messageItem.user === userId ? "flex-end" : "flex-start"
                }
                padding="2"
                width="100%"
                flexGrow={1}
              >
                <Box
                  display={"flex"}
                  justifyContent={
                    messageItem.user === userId ? "flex-end" : "flex-start"
                  }
                  flexDirection="column"
                  width={"100%"}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: `${
                        messageItem.user === userId ? "flex-end" : "flex-start"
                      }`,
                    }}
                  >
                    {messageItem.user === userId ? (
                      <>
                        <Avatar
                          bg="#dc3545"
                          name="Sherlin"
                          src="/assets/avtar/woman1.png"
                          color={"#fff"}
                          size={"sm"}
                        />
                        <Text marginLeft="1" color="gray.500">
                          Sherlin
                        </Text>
                      </>
                    ) : (
                      <Avatar bg="teal.500" size={"sm"} />
                    )}
                  </span>
                  <Box
                    display={
                      messageItem.type === "TEXT" || "MEDIA" ? "flex" : "none"
                    }
                    alignSelf={
                      messageItem.user === userId ? "flex-end" : "flex-start"
                    }
                    flexWrap={true}
                    padding={2}
                    borderRadius={"md"}
                    maxWidth="70%"
                    bgColor={
                      messageItem.user === userId ? "blue.100" : "green.100"
                    }
                    key={index}
                  >
                    <VStack maxWidth="100%" overflowWrap={"break-word"}>
                      <Text maxWidth={"100%"}>{messageItem.msg}</Text>
                    </VStack>
                  </Box>
                </Box>
              </VStack>
            ))
          )}
          <InputGroup p={1} display={"flex"}>
            <Input
              type="text"
              id="props.clientId"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <InputRightElement h={"full"}>
              <Button
                id="sendButton"
                onClick={async () => {
                  if (input !== "" && input !== undefined) {
                    let Regex =
                      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                    if (Regex.test(input)) {
                      window.alert(
                        "Sending Phone Numbers through Chat is not allowed"
                      );
                    } else {
                      const message = await updateDoc(
                        doc(db, "chat", props.clientId + "_" + userId),
                        {
                          conversation: arrayUnion({
                            msg: input,
                            time: Date.now(),
                            type: "TEXT",
                            user: userId,
                          }),
                        }
                      );
                    }
                  }
                  setInput("");
                }}
              >
                <AddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </PopoverContent>
    </Popover>
  );
}
