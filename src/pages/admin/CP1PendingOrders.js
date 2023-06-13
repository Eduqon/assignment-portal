import { AddIcon, PhoneIcon, RepeatIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import {
  Box,
  Checkbox,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Spacer,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl, callingNumbers } from "../../services/contants";
import { useRouter } from "next/router";
import { updateAssignment } from "../../services/functions/assignmentFun";
import DeadlinePopup from "./DeadlinePopup";

function CP1PendingOrders({ incrementCounter, decrementCounter }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [asId, setAsId] = useState("");
  const [paid, setPaid] = useState("");
  const [userID, setUserID] = useState("");
  const CallingModalDis = useDisclosure();

  let assignmentList = [];

  let navigate = useRouter();

  useEffect(() => {
    _fetchAssignments();
  }, []);

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
        apiUrl + "/assignment/fetch?status=CP1%20Pending",
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
            numOfPages: data[index].numOfPages,
            order_placed_time: data[index].order_placed_time,
            paid: data[index].paid,
            countryCode: data[index].countrycode,
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
        console.log("No CP1 Pending Orders");
      }
      setUserID(userEmail);
      setAssignments(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }
  const addToDone = async () => {
    let userToken = localStorage.getItem("userToken");
    if (paid.trim().length > 0) {
      let data = {
        _id: asId,
        status: "CP1 Done",
        paid: paid,
        order_confirmed_time: Date.now(),
        currentState: 2,
        order_placed_time: {
          ...assignments[selectedIndex].order_placed_time,
          2: Date.now(),
        },
      };
      let response = await updateAssignment(JSON.stringify(data));

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const createNotification = await axios.post(
        apiUrl + "/notifications",
        {
          assignmentId: asId,
          status: "CP1 Done",
          read: false,
        },
        config
      );

      if (response.success) {
        _fetchAssignments();
        incrementCounter("CP1 Done");
        onClose();
      }
    } else {
      alert("Please Fill the Amount Paid Field");
    }
  };

  async function openCallingModal(index) {
    setSelectedIndex(index);
    CallingModalDis.onOpen();
  }

  function CallingModal() {
    return (
      <Modal
        size={"md"}
        onClose={CallingModalDis.onClose}
        isOpen={CallingModalDis.isOpen}
        onOpen={CallingModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"} overflowY="scroll">
          <ModalHeader>Choose Caller ID</ModalHeader>
          <hr />
          <ModalCloseButton />
          <ModalBody>
            <Table marginTop={2} variant="simple" size="sm">
              <Tbody>
                <Heading size={"sm"}>
                  Which number do you want the recipient to see ?
                </Heading>
                <br />
                {callingNumbers.map((number, index) => {
                  return (
                    <>
                      <Button
                        width={"100%"}
                        marginBottom={2}
                        onClick={() => {
                          _calling(
                            assignments[selectedIndex].countryCode,
                            assignments[selectedIndex].contact_no,
                            assignments[selectedIndex].id,
                            index
                          );
                        }}
                      >
                        {number}
                      </Button>
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  async function _calling(countrycode, client_number, id, callingIndex) {
    try {
      if (countrycode !== 91) {
        const response = await axios.post(apiUrl + "/calling/international", {
          clientNumber: Number(String(countrycode) + String(client_number)),
          CallerId: +callingNumbers[callingIndex],
        });
        if (response.status === 200) {
          window.alert("Call has been initiated");
        } else {
          window.alert("Call has not been initiated due to some reason.");
        }
      } else {
        const response = await axios.post(apiUrl + "/calling", {
          clientNumber: String(client_number),
        });
        if (response.data.msg === "Call originated successfully!!") {
          window.alert("Call has been initiated");
        } else {
          window.alert("Call has not been initiated due to some reason.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <ExpertModal /> */}
      {/* Modal */}
      <CallingModal />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add To CP1 Done</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount Paid by Client</FormLabel>
              <Input
                type="number"
                value={paid}
                onChange={(e) => {
                  setPaid(e.target.value);
                }}
                placeholder="Amount Paid By Client"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                addToDone();
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal */}
      <Table
        variant="simple"
        size="md"
        display={{ base: "none", sm: "block", md: "block" }}
      >
        <Thead bgColor={"gray.200"}>
          <Tr>
            <Th>Id</Th>
            <Th>Student Email</Th>
            <Th>Student No.</Th>
            <Th>Subject</Th>
            <Th>Order Quote</Th>
            <Th>Deadline</Th>
            <Th>Status</Th>
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Link href={"/admin/assignment_details/" + assignment.id}>
                      {assignment.id}
                    </Link>
                    <Button
                      background={"none"}
                      _focus={{ outline: "none" }}
                      _hover={{ background: "none" }}
                      color={"#dc3545"}
                      onClick={() => openCallingModal(index)}
                    >
                      <PhoneIcon />
                    </Button>
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
                <Td textAlign={"center"}>
                  {localStorage.getItem("userRole") === "Super Admin" ||
                  localStorage.getItem("userRole") === "Admin"
                    ? "+" +
                      String(assignment.countryCode) +
                      " " +
                      assignment.contact_no
                    : "+" +
                      String(assignment.countryCode) +
                      " " +
                      String(assignment.contact_no).substring(0, 2) +
                      "********" +
                      String(assignment.contact_no).substring(8, 10)}
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
                  {assignment.deadline}
                </Td>
                <Td
                  fontWeight={"semibold"}
                  color={
                    assignment.status === "Fresh Order"
                      ? "green"
                      : assignment.status === "Doability Asked"
                      ? "orange"
                      : "red"
                  }
                >
                  {assignment.status}
                </Td>
                <Td>
                  <Button
                    onClick={() => {
                      onOpen();
                      setAsId(assignment.id);
                      setSelectedIndex(index);
                      decrementCounter("CP1 Pending");
                    }}
                  >
                    Add to CP1 Done
                  </Button>
                </Td>
                {/* <Td>
                <Button
                  display={(localStorage.getItem('userRole') === "Operator" || localStorage.getItem("userRole") === "Super Admin" || localStorage.getItem("userRole") === "Admin") ? 'flex' : 'none'}
                  onClick={async () => openExpertModal(index)}
                >
                  Ask Quote Expert
                </Button>
              </Td> */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {/* accordion for mobile version  */}

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
                <Tr key={assignment.id}>
                  {/* table  */}
                  <Table bgColor={"gray.200"} variant="simple" size="md">
                    <Tr>
                      <Th>Student Email</Th>
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
                    </Tr>
                    <Tr>
                      <Th>Subject</Th>
                      <Td color={"green.600"} fontWeight={"semibold"}>
                        {assignment.subject}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>Order Quote</Th>
                      <Td>{assignment.quotation}</Td>
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

                  {/* <Td><Button>Choose Expert</Button></Td> */}
                </Tr>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
}

export default CP1PendingOrders;
