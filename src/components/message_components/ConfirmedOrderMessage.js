import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { db } from "../../services/firebase";
import { apiUrl } from "../../services/contants";
import { ArrowForwardIcon, AttachmentIcon } from "@chakra-ui/icons";

function ConfirmedOrderMessage({
  assignedExpertMessages,
  operatorExpertChat,
  loading,
}) {
  const navigate = useRouter();
  const [id, setId] = useState("");
  const inputFileOperatorExpert = useRef(null);
  const [token, setToken] = useState("");
  const [openModalId, setOpenModalId] = useState(null);
  const { onOpen, onClose } = useDisclosure();
  const [expertChatData, setExpertChatData] = useState([]);

  const operatorMessageCounter = useMemo(() => {
    if (operatorExpertChat && Object.keys(operatorExpertChat).length !== 0) {
      const lastMessage =
        operatorExpertChat &&
        openModalId &&
        operatorExpertChat[openModalId][
          operatorExpertChat[openModalId].length - 1
        ];
      return (lastMessage && lastMessage.operatorMsgCount) || 0;
    }
    return 0;
  }, [operatorExpertChat]);

  useEffect(() => {
    (async () => {
      await _fetchToken();
    })();
  }, []);

  async function _fetchToken() {
    let userEmail = localStorage.getItem("userEmail");
    setId(userEmail);
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

  // async function openMessageModal(data) {
  //   setExpertChatData(data);
  //   setOpenModalId(data.id);
  // }

  // function MessageModal({ expertChatData, openModalId }) {
  //   const MessageModalDis = useDisclosure();

  //   useEffect(() => {
  //     if (openModalId) {
  //       MessageModalDis.onOpen();
  //     } else {
  //       MessageModalDis.onClose();
  //     }
  //   }, [openModalId]);

  //   const handleCloseModal = () => {
  //     setOpenModalId(null);
  //     MessageModalDis.onClose();
  //   };

  //   return (
  //     <Modal
  //       size={"lg"}
  //       onClose={handleCloseModal}
  //       isOpen={MessageModalDis.isOpen}
  //       onOpen={MessageModalDis.onOpen}
  //       isCentered
  //     >
  //       <ModalOverlay />
  //       <ModalContent maxH={"500px"}>
  //         <ModalCloseButton />
  //         <ModalBody>
  //           <Box
  //             display="block"
  //             borderWidth="1px"
  //             borderRadius="md"
  //             width={"md"}
  //           >
  //             <Box p={4} bgColor="gray.200">
  //               <HStack>
  //                 <Heading fontSize={"xl"}>Operator Chat with Expert</Heading>
  //               </HStack>
  //             </Box>
  //             <VStack
  //               alignItems={"start"}
  //               justifyContent={"space-between"}
  //               margin={3}
  //               minH={"sm"}
  //               maxH={"sm"}
  //             >
  //               <VStack
  //                 overflowY={"scroll"}
  //                 alignItems={"start"}
  //                 width={"100%"}
  //               >
  //                 {operatorExpertChat[openModalId] &&
  //                   operatorExpertChat[openModalId].map((msg, index) => {
  //                     return (
  //                       <Box
  //                         display={
  //                           msg.type === "TEXT"
  //                             ? "flex"
  //                             : msg.type === "MEDIA"
  //                             ? "flex"
  //                             : "none"
  //                         }
  //                         alignSelf={
  //                           msg.user === id ? "flex-end" : "flex-start"
  //                         }
  //                         flexWrap={true}
  //                         padding={2}
  //                         borderRadius={"md"}
  //                         maxWidth="70%"
  //                         bgColor={msg.user === id ? "blue.100" : "green.100"}
  //                         key={index}
  //                       >
  //                         <VStack maxWidth="100%" overflowWrap={"break-word"}>
  //                           <Text
  //                             display={msg.type === "TEXT" ? "flex" : "none"}
  //                             maxWidth={"100%"}
  //                           >
  //                             {msg.msg}
  //                           </Text>
  //                           <Link
  //                             color={"blue"}
  //                             fontWeight={"bold"}
  //                             display={msg.type === "MEDIA" ? "flex" : "none"}
  //                             maxWidth={"100%"}
  //                             href={msg.msg}
  //                           >
  //                             {msg.msg && msg.msg.substring(62)}
  //                           </Link>
  //                         </VStack>
  //                       </Box>
  //                     );
  //                   })}
  //               </VStack>
  //               <InputGroup>
  //                 <Input type="text" id="addChatOperatorExpert" />
  //                 <Input
  //                   type="file"
  //                   id="addFileOperatorExpert"
  //                   onChange={async () => {
  //                     let fileUrl = "";
  //                     if (inputFileOperatorExpert) {
  //                       onOpen();
  //                       try {
  //                         var config = {
  //                           method: "put",
  //                           url:
  //                             "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
  //                             encodeURIComponent(
  //                               inputFileOperatorExpert.current.files[0].name
  //                             ) +
  //                             "?" +
  //                             token,
  //                           headers: {
  //                             "x-ms-blob-type": "BlockBlob",
  //                           },
  //                           data: inputFileOperatorExpert.current.files[0],
  //                         };

  //                         axios(config)
  //                           .then(async function (response) {
  //                             fileUrl =
  //                               "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
  //                               encodeURIComponent(
  //                                 inputFileOperatorExpert.current.files[0].name
  //                               );
  //                             const message = await updateDoc(
  //                               doc(
  //                                 db,
  //                                 "chat",
  //                                 expertChatData.chat[
  //                                   expertChatData.chat.length - 1
  //                                 ].user +
  //                                   "_" +
  //                                   "operator_expert_chat" +
  //                                   "_" +
  //                                   openModalId
  //                               ),
  //                               {
  //                                 conversation: arrayUnion({
  //                                   msg: fileUrl,
  //                                   time: Date.now(),
  //                                   type: "MEDIA",
  //                                   user: id,
  //                                   operatorMsgCount: 0,
  //                                   expertMsgCount: 0,
  //                                   newMessageCount: 0,
  //                                 }),
  //                               }
  //                             );
  //                           })
  //                           .catch(function (error) {
  //                             console.log(error);
  //                           });
  //                       } catch (error) {
  //                         console.log(error);
  //                       }
  //                       onClose();
  //                     }
  //                   }}
  //                   ref={inputFileOperatorExpert}
  //                   style={{ display: "none" }}
  //                 />
  //                 <InputLeftElement h={"full"}>
  //                   <Button
  //                     id="attachButton"
  //                     onClick={async () => {
  //                       inputFileOperatorExpert.current.click();
  //                     }}
  //                   >
  //                     <AttachmentIcon />
  //                   </Button>
  //                 </InputLeftElement>
  //                 <InputRightElement h={"full"}>
  //                   <Button
  //                     id="sendButton"
  //                     onClick={async () => {
  //                       let userToken = localStorage.getItem("userToken");
  //                       let Regex =
  //                         /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  //                       let textInput = document.getElementById(
  //                         "addChatOperatorExpert"
  //                       );
  //                       if (
  //                         textInput.value !== "" &&
  //                         textInput.value !== undefined
  //                       ) {
  //                         if (Regex.test(textInput.value)) {
  //                           window.alert(
  //                             "Sharing Phone Numbers through Chat is not allowed"
  //                           );
  //                         } else {
  //                           let config = {
  //                             headers: { Authorization: `Bearer ${userToken}` },
  //                           };
  //                           try {
  //                             const response = await axios.post(
  //                               apiUrl + "/assignment/messages",
  //                               {
  //                                 _id: openModalId,
  //                                 message: textInput.value,
  //                               },
  //                               config
  //                             );
  //                             let resdata = response.data;
  //                             if (resdata.success) {
  //                               console.log({ resdata });
  //                               const message = await updateDoc(
  //                                 doc(
  //                                   db,
  //                                   "chat",
  //                                   expertChatData.chat[
  //                                     expertChatData.chat.length - 1
  //                                   ].user +
  //                                     "_" +
  //                                     "operator_expert_chat" +
  //                                     "_" +
  //                                     openModalId
  //                                 ),
  //                                 {
  //                                   conversation: arrayUnion({
  //                                     msg: textInput.value,
  //                                     time: Date.now(),
  //                                     type: "TEXT",
  //                                     user: id,
  //                                     operatorMsgCount:
  //                                       operatorMessageCounter + 1,
  //                                     expertMsgCount: 0,
  //                                     newMessageCount: 0,
  //                                   }),
  //                                 }
  //                               );
  //                               window.alert("Message sent to Expert");
  //                             }
  //                             const messageresponse = await axios.post(
  //                               apiUrl + "/messages",
  //                               {
  //                                 id: openModalId,
  //                                 expertEmail:
  //                                   expertChatData.chat[
  //                                     expertChatData.chat.length - 1
  //                                   ].user,
  //                               },
  //                               config
  //                             );
  //                             let msgresdata = messageresponse.data;
  //                             if (msgresdata.success) {
  //                               textInput.value = "";
  //                             }
  //                           } catch (err) {
  //                             console.log(err);
  //                           }
  //                         }
  //                       }
  //                     }}
  //                   >
  //                     <ArrowForwardIcon />
  //                   </Button>
  //                 </InputRightElement>
  //               </InputGroup>
  //             </VStack>
  //           </Box>
  //         </ModalBody>
  //       </ModalContent>
  //     </Modal>
  //   );
  // }

  async function readMessages(assignmentID) {
    try {
      if (operatorExpertChat[assignmentID]) {
        const newChat = operatorExpertChat[assignmentID].slice();
        const lastMsg = newChat.pop();
        const message = await updateDoc(
          doc(
            db,
            "chat",
            lastMsg.user + "_" + "operator_expert_chat" + "_" + assignmentID
          ),
          {
            conversation: [
              ...newChat,
              {
                ...lastMsg,
                newMessageCount: 0,
                expertMsgCount: 0,
                operatorMsgCount: 0,
              },
            ],
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* {openModalId && (
        <MessageModal
          expertChatData={expertChatData}
          openModalId={openModalId}
        />
      )} */}
      <Box
        display={"block"}
        borderWidth="1px"
        borderRadius="md"
        width={"lg"}
        height={"3xl"}
        marginTop={"20px"}
        overflow={"hidden"}
      >
        <Box p={4} bgColor="gray.200">
          <HStack>
            <Heading fontSize={"xl"}> Confirmed Orders </Heading>{" "}
          </HStack>{" "}
        </Box>{" "}
        <VStack
          alignItems={"start"}
          justifyContent={"space-between"}
          margin={3}
          minH={"2xl"}
          maxH={"2xl"}
          overflowY={"scroll"}
        >
          <VStack alignItems={"start"} width={"100%"}>
            {loading ? (
              <Spinner />
            ) : (
              assignedExpertMessages &&
              assignedExpertMessages
                .filter((data) => data.chat.length !== 0)
                .map((data) => {
                  return (
                    <Box bgColor="blackAlpha.100" width="100%" p={2}>
                      {data.chat.length !== 0 &&
                        data.chat[data.chat.length - 1].user !== "" && (
                          <strong>
                            From: {data.chat[data.chat.length - 1].user}
                          </strong>
                        )}
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex">
                          <strong>ID:</strong>
                          &nbsp;
                          <a
                            href={"/admin/assignment_details/" + data.id}
                            target="_blank"
                          >
                            {data.id}
                          </a>
                          &nbsp;
                          {data.chat.length !== 0 &&
                            data.chat[data.chat.length - 1].expertMsgCount !==
                              0 && (
                              <div
                                className="text-center"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "5px",
                                  background: "#c96969",
                                  cursor: "pointer",
                                  margin: "2px 5px",
                                  color: "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                {data.chat[data.chat.length - 1]
                                  .expertMsgCount !== 0 &&
                                  data.chat[data.chat.length - 1]
                                    .expertMsgCount}
                              </div>
                            )}
                        </Box>
                        <Box>
                          <span>{data.date}</span>
                        </Box>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <strong>
                          Message:{" "}
                          {data.chat.length !== 0 &&
                            data.chat[data.chat.length - 1].msg}
                        </strong>
                        <Popover
                          placement="right-start"
                          minW={{ base: "100%", lg: "max-content" }}
                        >
                          <PopoverTrigger>
                            <Button
                              onClick={async () => await readMessages(data.id)}
                            >
                              Reply
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverHeader fontWeight="semibold">
                              Operator Chat with Expert
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Box
                                display="block"
                                borderWidth="1px"
                                borderRadius="md"
                              >
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
                                  >
                                    {operatorExpertChat[data.id] &&
                                      operatorExpertChat[data.id].map(
                                        (msg, index) => {
                                          return (
                                            <Box
                                              display={
                                                msg.type === "TEXT"
                                                  ? "flex"
                                                  : msg.type === "MEDIA"
                                                  ? "flex"
                                                  : "none"
                                              }
                                              alignSelf={
                                                msg.user === id
                                                  ? "flex-end"
                                                  : "flex-start"
                                              }
                                              flexWrap={true}
                                              padding={2}
                                              borderRadius={"md"}
                                              maxWidth="70%"
                                              bgColor={
                                                msg.user === id
                                                  ? "blue.100"
                                                  : "green.100"
                                              }
                                              key={index}
                                            >
                                              <VStack
                                                maxWidth="100%"
                                                overflowWrap={"break-word"}
                                              >
                                                <Text
                                                  display={
                                                    msg.type === "TEXT"
                                                      ? "flex"
                                                      : "none"
                                                  }
                                                  maxWidth={"100%"}
                                                >
                                                  {msg.msg}
                                                </Text>
                                                <Link
                                                  color={"blue"}
                                                  fontWeight={"bold"}
                                                  display={
                                                    msg.type === "MEDIA"
                                                      ? "flex"
                                                      : "none"
                                                  }
                                                  maxWidth={"100%"}
                                                  href={msg.msg}
                                                >
                                                  {msg.msg &&
                                                    msg.msg.substring(62)}
                                                </Link>
                                              </VStack>
                                            </Box>
                                          );
                                        }
                                      )}
                                  </VStack>
                                  <InputGroup>
                                    <Input
                                      type="text"
                                      id="addChatOperatorExpert"
                                    />
                                    <Input
                                      type="file"
                                      id="addFileOperatorExpert"
                                      onChange={async () => {
                                        let fileUrl = "";
                                        if (inputFileOperatorExpert) {
                                          onOpen();
                                          try {
                                            var config = {
                                              method: "put",
                                              url:
                                                "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                                                encodeURIComponent(
                                                  inputFileOperatorExpert
                                                    .current.files[0].name
                                                ) +
                                                "?" +
                                                token,
                                              headers: {
                                                "x-ms-blob-type": "BlockBlob",
                                              },
                                              data: inputFileOperatorExpert
                                                .current.files[0],
                                            };

                                            axios(config)
                                              .then(async function (response) {
                                                fileUrl =
                                                  "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                                                  encodeURIComponent(
                                                    inputFileOperatorExpert
                                                      .current.files[0].name
                                                  );
                                                const message = await updateDoc(
                                                  doc(
                                                    db,
                                                    "chat",
                                                    data.chat[
                                                      data.chat.length - 1
                                                    ].user +
                                                      "_" +
                                                      "operator_expert_chat" +
                                                      "_" +
                                                      data.id
                                                  ),
                                                  {
                                                    conversation: arrayUnion({
                                                      msg: fileUrl,
                                                      time: Date.now(),
                                                      type: "MEDIA",
                                                      user: id,
                                                      operatorMsgCount:
                                                        operatorMessageCounter +
                                                        1,
                                                      expertMsgCount: 0,
                                                      newMessageCount: 0,
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
                                          onClose();
                                        }
                                      }}
                                      ref={inputFileOperatorExpert}
                                      style={{ display: "none" }}
                                    />
                                    <InputLeftElement h={"full"}>
                                      <Button
                                        id="attachButton"
                                        onClick={async () => {
                                          inputFileOperatorExpert.current.click();
                                        }}
                                      >
                                        <AttachmentIcon />
                                      </Button>
                                    </InputLeftElement>
                                    <InputRightElement h={"full"}>
                                      <Button
                                        id="sendButton"
                                        onClick={async () => {
                                          let userToken =
                                            localStorage.getItem("userToken");
                                          let Regex =
                                            /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                                          let textInput =
                                            document.getElementById(
                                              "addChatOperatorExpert"
                                            );
                                          if (
                                            textInput.value !== "" &&
                                            textInput.value !== undefined
                                          ) {
                                            if (Regex.test(textInput.value)) {
                                              window.alert(
                                                "Sharing Phone Numbers through Chat is not allowed"
                                              );
                                            } else {
                                              let config = {
                                                headers: {
                                                  Authorization: `Bearer ${userToken}`,
                                                },
                                              };
                                              try {
                                                const response =
                                                  await axios.post(
                                                    apiUrl +
                                                      "/assignment/messages",
                                                    {
                                                      _id: data.id,
                                                      message: textInput.value,
                                                    },
                                                    config
                                                  );
                                                let resdata = response.data;
                                                if (resdata.success) {
                                                  const message =
                                                    await updateDoc(
                                                      doc(
                                                        db,
                                                        "chat",
                                                        data.chat[
                                                          data.chat.length - 1
                                                        ].user +
                                                          "_" +
                                                          "operator_expert_chat" +
                                                          "_" +
                                                          data.id
                                                      ),
                                                      {
                                                        conversation:
                                                          arrayUnion({
                                                            msg: textInput.value,
                                                            time: Date.now(),
                                                            type: "TEXT",
                                                            user: id,
                                                            operatorMsgCount:
                                                              operatorMessageCounter +
                                                              1,
                                                            expertMsgCount: 0,
                                                            newMessageCount: 0,
                                                          }),
                                                      }
                                                    );
                                                  window.alert(
                                                    "Message sent to Expert"
                                                  );
                                                }
                                                const messageresponse =
                                                  await axios.post(
                                                    apiUrl + "/messages",
                                                    {
                                                      id: data.id,
                                                      expertEmail:
                                                        data.chat[
                                                          data.chat.length - 1
                                                        ].user,
                                                    },
                                                    config
                                                  );
                                                let msgresdata =
                                                  messageresponse.data;
                                                if (msgresdata.success) {
                                                  textInput.value = "";
                                                }
                                              } catch (err) {
                                                console.log(err);
                                              }
                                            }
                                          }
                                        }}
                                      >
                                        <ArrowForwardIcon />
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
                                </VStack>
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        {/* <Button
                          onClick={async () => {
                            await openMessageModal(data);
                            await readMessages(data.id);
                          }}
                        >
                          Reply
                        </Button> */}
                      </Box>
                    </Box>
                  );
                })
            )}
          </VStack>
        </VStack>
      </Box>{" "}
    </>
  );
}

export default ConfirmedOrderMessage;
