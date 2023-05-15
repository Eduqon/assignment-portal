import React from "react";
import {
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  AddIcon,
  ArrowRightIcon,
  AttachmentIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  IconButton,
  VStack,
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Avatar,
  InputLeftElement,
  HStack,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../services/contants";

export default function AnonymousChat() {
  const [id, setId] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [chat, setChat] = useState([]);
  const [chatbotMsg, setChatbotMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const inputFile = useRef(null);
  const [token, setToken] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const initRef = useRef();
  const messagesEndRef = React.createRef();
  const [showAttachButton, setShowAttachButton] = useState(false);

  const scrollToBottom = () => {
    const scroll =
      messagesEndRef.current?.scrollHeight -
      messagesEndRef?.current.clientHeight;
    messagesEndRef.current?.scrollTo(0, scroll);
  };

  const CloseModal = ({ onClose }) => {
    return (
      <Box display={"flex"} justifyContent="center" width={"100%"}>
        <Box display="block" borderWidth="1px" borderRadius="md">
          <Box p={4} bgColor="#dc3545">
            <HStack>
              <Heading fontSize={"xl"} color="white">
                Are you sure to close this Chat ?
              </Heading>
            </HStack>
          </Box>
          <VStack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-around"}
            margin={3}
            flexDirection="row"
          >
            <Button onClick={onClose} ref={initRef}>
              Ok
            </Button>
            <Button onClick={() => setCloseModal(false)}>Cancel</Button>
          </VStack>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    _fetchToken();
  }, []);

  useEffect(() => {
    if (chat.length > 3) {
      scrollToBottom();
    }
  }, [chat]);

  async function _fetchToken() {
    try {
      const response = await axios.get(
        apiUrl + "/util/sas-token?container_name=assignment-dscp"
      );
      let data = response.data;
      if (data.success) {
        setToken(data.SASToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function generateUserId() {
    var id_elem = [];
    var dateObj = new Date();

    function convertToString(id_elem) {
      return id_elem.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    }

    id_elem[0] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    id_elem[1] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    id_elem[3] = convertToString(dateObj.getDate());
    id_elem[4] = convertToString(dateObj.getMonth());
    id_elem[5] = convertToString(dateObj.getFullYear()).slice(2, 4);

    return `${id_elem.join("")}`;
  }

  async function initialChat() {
    setLoading(false);
    setChat([]);
    setShowAttachButton(false);
    setTimeout(() => {
      setChatbotMsg("Hi!! Please let us know how I can assist you today?");
      setOperatorId("");
    }, 1000);
  }

  async function newAnnUser(msg) {
    if (operatorId === "") {
      try {
        setChatbotMsg("");
        setLoading(true);
        let tempId = generateUserId();
        const anon_client = await setDoc(doc(db, "anonymous_chat", tempId), {
          operator: "Aroraharshdeep27@gmail.com",
          time: Date.now(),
          id: tempId,
          chat_status: "Home",
        });
        setId(tempId);
        const unsub = onSnapshot(doc(db, "anonymous_chat", tempId), (doc) => {
          if (doc.data().operator !== "") {
            setOperatorId(doc.data().operator);
            fetchChat(tempId, doc.data().operator);
            updateChat(tempId, doc.data().operator, msg);
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      updateChat(id, operatorId, msg);
    }
  }

  async function fetchChat(client, operator) {
    try {
      const chatName = client + "_" + operator;
      const chat = await setDoc(doc(db, "chat", chatName), {
        conversation: [
          {
            msg: "Thank you for Contacting !",
            time: Date.now(),
            type: "TEXT",
            user: "Aroraharshdeep27@gmail.com",
          },
        ],
      });
      const unsubChat = onSnapshot(doc(db, "chat", chatName), (doc) => {
        setChat(doc.data().conversation);
        setLoading(false);
        setShowAttachButton(true);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateChat(id, operatorId, msg) {
    const message = await updateDoc(doc(db, "chat", id + "_" + operatorId), {
      conversation: arrayUnion({
        msg: msg,
        time: Date.now(),
        type: "TEXT",
        user: id,
      }),
    });
  }

  return (
    <Popover
      closeOnBlur={false}
      placement="top-start"
      initialFocusRef={initRef}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              className="set-chat"
              position="fixed"
              bottom="10px"
              right="10px"
              zIndex={111}
              onClick={() => {
                initialChat();
              }}
              colorScheme="white"
              size="lg"
              icon={
                <>
                  <p className="ml-4 set-bl">We're Online</p>
                  <button
                    className="set-icon-design mr-1"
                    onClick={() => setCloseModal(false)}
                  >
                    Chat Now
                  </button>
                </>
              }
            />
          </PopoverTrigger>
          <PopoverContent width={"lg"} minH={"500px"} maxH={"500px"}>
            <PopoverHeader padding={"0"}>
              <Box
                p={3}
                bgColor="#dc3545"
                width={"100%"}
                display="flex"
                alignItems={"center"}
                borderTopLeftRadius="5px"
                borderTopRightRadius="5px"
                justifyContent={"space-between"}
                color="#fff"
              >
                <Box display={"flex"} alignItems="center">
                  <Heading fontSize={"xl"}>Assignment Sales</Heading>
                  <Box
                    backgroundColor="#fff"
                    color="#dc3545"
                    marginLeft={"10px"}
                    borderRadius={"10px"}
                    padding="6px 20px"
                    fontWeight={"bold"}
                  >
                    Sales
                  </Box>
                </Box>

                <Button
                  background={"none"}
                  padding="0"
                  onClick={() => {
                    setCloseModal(true);
                  }}
                  _hover={{ backgroundColor: "#fff", color: "#dc3545" }}
                  _focus={{ boxShadow: "none" }}
                >
                  <CloseIcon />
                </Button>
              </Box>
            </PopoverHeader>

            <PopoverBody padding={"1rem 0.5rem"} height="390px">
              <Box
                id="scroll-view"
                overflowY="scroll"
                height={"100%"}
                fontSize="17px"
                ref={messagesEndRef}
              >
                {closeModal && <CloseModal onClose={onClose} />}
                {chatbotMsg !== "" ? (
                  <VStack width="100%">
                    <Box
                      display={"flex"}
                      alignSelf={"flex-start"}
                      flexWrap={true}
                      borderRadius={"md"}
                      maxWidth="70%"
                    >
                      {chatbotMsg && (
                        <Box display={"flex"} flexDirection="column">
                          <Avatar
                            bg="red.500"
                            name="Assignment Santa"
                            size={"sm"}
                          />
                          <VStack
                            maxWidth="100%"
                            overflowWrap={"break-word"}
                            bgColor={"gray.100"}
                            marginTop="0.5rem"
                          >
                            <Text maxWidth={"100%"}>{chatbotMsg}</Text>
                          </VStack>
                        </Box>
                      )}
                    </Box>
                  </VStack>
                ) : (
                  <>
                    {loading ? (
                      <Text>Connecting with Sales...</Text>
                    ) : (
                      chat.map((messageItem, index) => (
                        <VStack
                          alignItems={
                            messageItem.user === id ? "flex-end" : "flex-start"
                          }
                          width="100%"
                        >
                          <Box
                            display={"flex"}
                            justifyContent={
                              messageItem.user === id
                                ? "flex-end"
                                : "flex-start"
                            }
                            flexDirection="column"
                            width={"100%"}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: `${
                                  messageItem.user === id
                                    ? "flex-end"
                                    : "flex-start"
                                }`,
                              }}
                            >
                              {messageItem.user === id ? null : (
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
                              )}
                            </span>
                            <Box
                              display={
                                messageItem.type === "TEXT" || "MEDIA"
                                  ? "flex"
                                  : "none"
                              }
                              alignSelf={
                                messageItem.user === id
                                  ? "flex-end"
                                  : "flex-start"
                              }
                              flexWrap={true}
                              padding={2}
                              borderRadius={"md"}
                              maxWidth="70%"
                              bgColor={
                                messageItem.user === id
                                  ? "gray.100"
                                  : "gray.100"
                              }
                              marginTop="0.5rem"
                              key={index}
                            >
                              <VStack
                                maxWidth="100%"
                                overflowWrap={"break-word"}
                              >
                                <Text maxWidth={"100%"}>{messageItem.msg}</Text>
                              </VStack>
                            </Box>
                          </Box>
                        </VStack>
                      ))
                    )}
                  </>
                )}
              </Box>
            </PopoverBody>
            <PopoverFooter
              position={"fixed"}
              bottom="0"
              borderTopWidth={0}
              width="100%"
            >
              <InputGroup p={1} display={"flex"} zIndex="11">
                <Input
                  type="text"
                  id="addChat"
                  _focus={{ borderColor: "#eee" }}
                />
                <Input
                  type="file"
                  id="addFileSalesChat"
                  onChange={async () => {
                    let fileUrl = "";
                    if (inputFile) {
                      try {
                        var config = {
                          method: "put",
                          url:
                            "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                            encodeURIComponent(
                              inputFile.current.files[0].name
                            ) +
                            "?" +
                            token,
                          headers: {
                            "x-ms-blob-type": "BlockBlob",
                          },
                          data: inputFile.current.files[0],
                        };
                        axios(config)
                          .then(async function (response) {
                            fileUrl =
                              "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                              encodeURIComponent(
                                inputFile.current.files[0].name
                              );
                            const message = await updateDoc(
                              doc(db, "chat", id + "_" + operatorId),
                              {
                                conversation: arrayUnion({
                                  msg: fileUrl,
                                  time: Date.now(),
                                  type: "MEDIA",
                                  user: id,
                                }),
                              }
                            );
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                {showAttachButton && (
                  <InputLeftElement h={"90%"} alignItems="flex-end">
                    <Button
                      id="attachButton"
                      onClick={async () => {
                        inputFile.current.click();
                      }}
                    >
                      <AttachmentIcon />
                    </Button>
                  </InputLeftElement>
                )}
                <InputRightElement h={"90%"} alignItems="flex-end">
                  <Button
                    id="sendButton"
                    onClick={async () => {
                      let Regex =
                        /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                      let textInput = document.getElementById("addChat");
                      if (
                        textInput.value !== "" &&
                        textInput.value !== undefined
                      ) {
                        if (Regex.test(textInput.value)) {
                          window.alert(
                            "You are not allowed to share phone numbers through the chat"
                          );
                        } else {
                          await newAnnUser(textInput.value);
                        }
                      }
                      textInput.value = "";
                    }}
                  >
                    <ArrowRightIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
