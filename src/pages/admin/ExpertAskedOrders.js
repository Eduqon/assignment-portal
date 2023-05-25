import {
  ArrowForwardIcon,
  ChatIcon,
  RepeatIcon,
  AttachmentIcon,
  ViewOffIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Link,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Heading,
  VStack,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { doc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { updateAssignment } from "../../services/functions/assignmentFun";
function ExpertAskedOrders({
  inProcessOrderAssignedExpertMessages,
  operatorExpertChat,
  inProcessOrderData,
  incrementCounter,
}) {
  const [assignments, setAssignments] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState();
  const [openModalId, setOpenModalId] = useState(null);
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(true);
  const inputFileOperatorExpert = useRef(null);
  const { onOpen, onClose } = useDisclosure();
  let inProcessOrderDataMessageCount;

  const MessagesModalDis = useDisclosure();
  const ReplyMessageModalDis = useDisclosure();
  const [userID, setUserID] = useState("");

  let assignmentList = [];

  let navigate = useRouter();

  useEffect(() => {
    (async () => {
      await _fetchToken();
    })();
  }, []);

  useEffect(() => {
    _fetchAssignments();
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

  async function _fetchAssignments() {
    try {
      let userToken = localStorage.getItem("userToken");
      let userEmail = localStorage.getItem("userEmail");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(
        apiUrl + "/assignment/fetch?status=Expert%20Asked",
        config
      );
      let data = response.data.assignmentData;
      assignmentList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          assignmentList.push({
            id: data[index]._id,
            client_id: data[index].client_id,
            subject: data[index].subject,
            status: data[index].status,
            quotation: data[index].quotation,
            currencyOfQuote: data[index].currencyOfQuote,
            level: data[index].level,
            reference: data[index].reference,
            description: data[index].description,
            descriptionFile: data[index].descriptionFile,
            order_placed_time: data[index].order_placed_time,
            numOfPages: data[index].numOfPages,
            paid: data[index].paid,
            contact_no: data[index].contact_no,
            deadline:
              new Date(data[index].deadline).toLocaleTimeString() +
              ", " +
              new Date(data[index].deadline).toDateString(),
            expertDeadline: data[index].expertDeadline
              ? data[index].expertDeadline[data[index]._id]
              : "",
            amountStatus: data[index].amountStatus,
          });
        }
      } else {
        console.log("No Expert Asked Orders");
      }
      setUserID(userEmail);
      setAssignments(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }

  async function openReplyMessageModal(dataID, expertEmail) {
    const id = dataID + "_" + expertEmail;
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }
    } catch (err) {
      console.log(err);
    }
    setOpenModalId(id);
    ReplyMessageModalDis.onOpen();
  }

  function ReplyMessageModal() {
    return (
      <Modal
        size={"lg"}
        onClose={ReplyMessageModalDis.onClose}
        isOpen={ReplyMessageModalDis.isOpen}
        onOpen={ReplyMessageModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"}>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="block"
              borderWidth="1px"
              borderRadius="md"
              width={"md"}
            >
              <Box p={4} bgColor="gray.200">
                <HStack>
                  <Heading fontSize={"xl"}>Operator Chat with Expert</Heading>
                </HStack>
              </Box>
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
                  {openModalId &&
                    operatorExpertChat[openModalId] &&
                    operatorExpertChat[openModalId].map((msg, index) => {
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
                            msg.user === id ? "flex-end" : "flex-start"
                          }
                          flexWrap={true}
                          padding={2}
                          borderRadius={"md"}
                          maxWidth="70%"
                          bgColor={msg.user === id ? "blue.100" : "green.100"}
                          key={index}
                        >
                          <VStack maxWidth="100%" overflowWrap={"break-word"}>
                            <Text
                              display={msg.type === "TEXT" ? "flex" : "none"}
                              maxWidth={"100%"}
                            >
                              {msg.msg}
                            </Text>
                            <Link
                              color={"blue"}
                              fontWeight={"bold"}
                              display={msg.type === "MEDIA" ? "flex" : "none"}
                              maxWidth={"100%"}
                              href={msg.msg}
                            >
                              {msg.msg && msg.msg.substring(62)}
                            </Link>
                          </VStack>
                        </Box>
                      );
                    })}
                </VStack>
                <InputGroup>
                  <Input type="text" id="addChatOperatorExpert" />
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
                                inputFileOperatorExpert.current.files[0].name
                              ) +
                              "?" +
                              token,
                            headers: {
                              "x-ms-blob-type": "BlockBlob",
                            },
                            data: inputFileOperatorExpert.current.files[0],
                          };
                          axios(config)
                            .then(async function (response) {
                              fileUrl =
                                "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                                encodeURIComponent(
                                  inputFileOperatorExpert.current.files[0].name
                                );
                              const message = await updateDoc(
                                doc(
                                  db,
                                  "chat",
                                  openModalId.split("_")[1] +
                                    "_" +
                                    id +
                                    "_" +
                                    openModalId.split("_")[0]
                                ),
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
                        let userToken = localStorage.getItem("userToken");
                        let Regex =
                          /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                        let textInput = document.getElementById(
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
                            const message = await updateDoc(
                              doc(
                                db,
                                "chat",
                                openModalId.split("_")[1] +
                                  "_" +
                                  id +
                                  "_" +
                                  openModalId.split("_")[0]
                              ),
                              {
                                conversation: arrayUnion({
                                  msg: textInput.value,
                                  time: Date.now(),
                                  type: "TEXT",
                                  user: id,
                                }),
                              }
                            );
                            let config = {
                              headers: { Authorization: `Bearer ${userToken}` },
                            };
                            try {
                              const response = await axios.post(
                                apiUrl + "/messages",
                                {
                                  id: openModalId.split("_")[0],
                                  expertEmail: openModalId.split("_")[1],
                                },
                                config
                              );
                              let resdata = response.data;
                              if (resdata.success) {
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
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  async function readMessages(id, expertEmail) {
    const _assignmentId = id + "_" + expertEmail;

    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      if (operatorExpertChat[_assignmentId]) {
        const newChat = operatorExpertChat[_assignmentId].slice();
        const lastMsg = newChat.pop();
        let userEmail = localStorage.getItem("userEmail");
        const message = await updateDoc(
          doc(
            db,
            "chat",
            lastMsg.user + "_" + userEmail + "_" + _assignmentId.split("_")[0]
          ),
          {
            conversation: [...newChat, { ...lastMsg, newMessageCount: 0 }],
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function openMessageModal(index) {
    setSelectedIndex(index);
    MessagesModalDis.onOpen();
  }

  function MessageModal() {
    let message;
    if (
      assignments &&
      assignments.length !== 0 &&
      inProcessOrderData &&
      inProcessOrderData.length !== 0 &&
      selectedIndex
    ) {
      message = inProcessOrderData.filter((data) => {
        return assignments[selectedIndex].id === data.id;
      });
    }

    return (
      <Modal
        size={"4xl"}
        onClose={MessagesModalDis.onClose}
        isOpen={MessagesModalDis.isOpen}
        onOpen={MessagesModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation Messages</ModalHeader>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            <Heading size={"lg"}>{message && message[0].id}</Heading>
            <hr />
            <Table variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>Expert Email</Th>
                  <Th>Messages</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {message &&
                message[0].experts &&
                message[0].experts.length === 0 ? (
                  <></>
                ) : (
                  message &&
                  message[0].experts &&
                  message[0].experts.map((msg, index) => (
                    <Tr key={msg.time}>
                      <Td>{msg.expertEmail}</Td>
                      <Td>{msg.expertChat[msg.expertChat.length - 1].msg}</Td>
                      <Td>
                        <HStack>
                          <Button
                            onClick={async () => {
                              await openReplyMessageModal(
                                message[0].id,
                                msg.expertEmail
                              );
                              readMessages(message[0].id, msg.expertEmail);
                            }}
                          >
                            Reply
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (inProcessOrderData && inProcessOrderData.length !== 0) {
    inProcessOrderDataMessageCount = inProcessOrderData.map((data) => {
      const newMsgCount = data.experts.reduce((acc, val) => {
        return acc + val.expertChat[val.expertChat.length - 1].newMessageCount;
      }, 0);

      return {
        id: data.id,
        newMsgCount: newMsgCount,
      };
    });
  }

  const addToDone = async (assignmentID) => {
    let userToken = localStorage.getItem("userToken");
    let data = {
      _id: assignmentID,
      status: "CP1 Done",
    };
    let response = await updateAssignment(JSON.stringify(data));

    let config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    const createNotification = await axios.post(
      apiUrl + "/notifications",
      {
        assignmentId: assignmentID,
        status: "CP1 Done",
        read: false,
      },
      config
    );
    incrementCounter("CP1 Done");
    if (response.success) {
      _fetchAssignments();
    }
  };

  async function _calling(client_number, id) {
    const updateAssignment = assignments.map((assignment) =>
      assignment.id === id ? { ...assignment, client_call: true } : assignment
    );
    try {
      const response = await axios.post(apiUrl + "/calling", {
        clientNumber: client_number,
      });
      if (response.status === 200) {
        setAssignments(updateAssignment);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <MessageModal />
      <ReplyMessageModal />
      <Table
        variant="simple"
        size="md"
        display={{ base: "none", sm: "block", md: "block" }}
      >
        <Thead bgColor={"gray.200"}>
          <Tr>
            <Th>Id</Th>
            <Th>Student Email</Th>
            <Th>Subject</Th>
            <Th>Amount Paid</Th>
            <Th>Expert Deadline</Th>
            <Th>Deadline</Th>
            <Th>
              <Button
                leftIcon={<RepeatIcon />}
                onClick={async () => {
                  await _fetchAssignments();
                }}
              >
                Refresh
              </Button>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {assignments.length === 0 ? (
            <>No Orders</>
          ) : (
            assignments.map((assignment, index) => (
              <Tr key={assignment.id}>
                <Td fontWeight={"semibold"} padding={0}>
                  <Box display={"flex"} alignItems="center">
                    <Link href={"/admin/assignment_details/" + assignment.id}>
                      {assignment.id}
                    </Link>
                    {!assignment.client_call ? (
                      <Button
                        background={"none"}
                        _focus={{ outline: "none" }}
                        _hover={{ background: "none" }}
                        color={"#dc3545"}
                        onClick={() =>
                          _calling(assignment.contact_no, assignment.id)
                        }
                      >
                        <PhoneIcon />
                      </Button>
                    ) : (
                      <i
                        class="fa fa-phone-square"
                        aria-hidden="true"
                        style={{
                          fontSize: "1.5rem",
                          color: "#dc3545",
                          marginLeft: "1rem",
                        }}
                      />
                    )}
                    {inProcessOrderDataMessageCount &&
                      inProcessOrderDataMessageCount.length !== 0 &&
                      inProcessOrderDataMessageCount.map((data) => {
                        if (data.id === assignment.id) {
                          if (data.newMsgCount && data.newMsgCount !== 0) {
                            return (
                              <Box
                                display="flex"
                                alignItems={"center"}
                                position="relative"
                                marginLeft={2}
                                cursor={"pointer"}
                                onClick={async () => openMessageModal(index)}
                              >
                                <ChatIcon width={"1.5em"} height={"1.5em"} />
                                <Box
                                  display={"flex"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  borderRadius={15}
                                  backgroundColor={"rgb(201, 105, 105)"}
                                  marginLeft={2}
                                  width={5}
                                  height={5}
                                  color={"white"}
                                  position={"absolute"}
                                  right={"-10px"}
                                  top={"-5px"}
                                >
                                  {data.newMsgCount}
                                </Box>
                              </Box>
                            );
                          }
                        }
                      })}
                  </Box>
                </Td>
                <Td>
                  {localStorage.getItem("userRole") === "Super Admin" ||
                  localStorage.getItem("userRole") === "Admin"
                    ? assignment.client_id
                    : assignment.client_id.substring(0, 2) +
                      "****" +
                      "@" +
                      "****" +
                      ".com"}
                </Td>
                <Td color={"green.600"} fontWeight={"semibold"}>
                  {assignment.subject}
                </Td>
                <Td>
                  {assignment &&
                  assignment.amountStatus &&
                  assignment.amountStatus[userID] === "Approved" ? (
                    <Button
                      onClick={async () => {
                        try {
                          const response = await axios.get(
                            apiUrl +
                              `/expert/assignment/showAmount/reply?approved=${false}&expertId=Arnabgoswami1193@gmail.com&assignmentId=${
                                assignment["id"]
                              }&operatorID=${userID}`
                          );
                          let resdata = response.data;
                          if (resdata.success) {
                            _fetchAssignments();
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      background="none"
                      _hover={{
                        background: "none",
                      }}
                      _focus={{
                        boxShadow: "none",
                      }}
                    >
                      {assignment.quotation}
                    </Button>
                  ) : (
                    <Button
                      onClick={async () => {
                        let userToken = localStorage.getItem("userToken");
                        if (userToken == null) {
                          navigate.replace("/admin/login");
                        }

                        let config = {
                          headers: { Authorization: `Bearer ${userToken}` },
                        };
                        try {
                          const response = await axios.post(
                            apiUrl + "/expert/assignment/showAmount",
                            {
                              assignmentId: assignment.id,
                            },
                            config
                          );
                          let resdata = response.data;
                          if (resdata.success) {
                            window.alert("Show Amount Asked");
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                      background="none"
                      _hover={{
                        background: "none",
                      }}
                      _focus={{
                        boxShadow: "none",
                      }}
                    >
                      <ViewOffIcon />
                    </Button>
                  )}
                </Td>
                <Td color={"red.600"} fontWeight={"semibold"}>
                  {assignment.expertDeadline
                    ? new Date(
                        assignment.expertDeadline[0]
                      ).toLocaleTimeString() +
                      ", " +
                      new Date(assignment.expertDeadline[0]).toDateString()
                    : ""}
                </Td>
                <Td color={"red.600"} fontWeight={"semibold"}>
                  {assignment.deadline}
                </Td>
                <Td>
                  <Button
                    display={
                      localStorage.getItem("userRole") === "Operator" ||
                      localStorage.getItem("userRole") === "Super Admin" ||
                      localStorage.getItem("userRole") === "Admin"
                        ? "flex"
                        : "none"
                    }
                    onClick={() => {
                      addToDone(assignment.id);
                    }}
                  >
                    Back to CP1 Done
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {/* accodion for mobile  */}
      <div className="ShowSideClick">
        {assignments.map((assignment) => (
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            display={{ base: "block", sm: "none", md: "none" }}
          >
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Table>
                      <Tr>
                        <Th>Id</Th>
                        <Td fontWeight={"semibold"}>
                          <Link
                            href={"/admin/assignment_details/" + assignment.id}
                          >
                            {assignment.id}
                          </Link>
                        </Td>
                      </Tr>
                    </Table>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={0}>
                <Table variant="simple" size="md">
                  <Tbody>
                    <Tr key={assignment.id}>
                      <Table bgColor={"gray.100"}>
                        <Tr>
                          <Th>Student Email</Th>
                          <Td>
                            {localStorage.getItem("userRole") ===
                              "Super Admin" ||
                            localStorage.getItem("userRole") === "Admin"
                              ? assignment.client_id
                              : assignment.client_id.substring(0, 2) +
                                "****" +
                                "@" +
                                "****" +
                                ".com"}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Subject</Th>
                          <Td color={"green.600"} fontWeight={"semibold"}>
                            {assignment.subject}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Amount Paid</Th>
                          <Td>{assignment.paid}</Td>
                        </Tr>
                        <Tr>
                          <Th>Expert Deadline</Th>
                          <Td color={"red.600"} fontWeight={"semibold"}>
                            {assignment.expertDeadline
                              ? new Date(
                                  assignment.expertDeadline[0]
                                ).toLocaleTimeString() +
                                ", " +
                                new Date(
                                  assignment.expertDeadline[0]
                                ).toDateString()
                              : ""}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Deadline</Th>
                          <Td color={"red.600"} fontWeight={"semibold"}>
                            {assignment.deadline}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>
                            <Button
                              leftIcon={<RepeatIcon />}
                              onClick={async () => {
                                await _fetchAssignments();
                              }}
                            >
                              Refresh
                            </Button>
                          </Th>
                        </Tr>
                      </Table>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
}

export default ExpertAskedOrders;
