import { RepeatIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  HStack,
  Input,
  InputGroup,
  FormLabel,
  FormControl,
  Text,
  InputLeftAddon,
  Textarea,
  ModalFooter,
  Spacer,
  Box,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from "react-router-dom";

function CP1DoneOrders() {
  const [assignments, setAssignments] = useState([]);
  const [experts, setExperts] = useState([]);
  const [subjects, setSubjects] = useState([]);

  let assignmentList = [];
  let expertList = [];

  let navigate = useNavigate();

  const ExpertModalDis = useDisclosure();
  const QcModalDis = useDisclosure();

  const [selectedIndex, setSelectedIndex] = useState();

  async function _fetchSubjects() {
    try {
      const response = await axios.get(apiUrl + "/util/subject/fetch");
      let data = await response.data.res;
      let tempList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          tempList.push({
            _id: data[index]._id,
          });
        }
      } else {
        console.log("No Subjects Found");
      }
      setSubjects(tempList);
    } catch (error) {
      console.log(error);
    }
  }

  const [qcs, setQcs] = useState([]);
  let qcList = [];

  async function _fetchQcs() {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(
        apiUrl + "/user/fetch",
        {
          role: "QC",
        },
        config
      );
      let data = response.data.res;
      qcList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          qcList.push({
            id: data[index]._id,
            name: data[index].name,
            contact_no: data[index].contact_no,
          });
        }
      } else {
        console.log("No QC");
      }
      setQcs(qcList);
    } catch (err) {
      console.log(err);
    }
  }

  async function openQcModal(index) {
    setSelectedIndex(index);
    await _fetchQcs();
    QcModalDis.onOpen();
  }

  function QcModal() {
    let checkedListTemp = [];

    return (
      <Modal
        size={"xl"}
        onClose={QcModalDis.onClose}
        isOpen={QcModalDis.isOpen}
        onOpen={QcModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"} overflowY="scroll">
          <ModalHeader>Assign QC</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table marginTop={2} variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {qcs.length === 0 ? (
                  <></>
                ) : (
                  qcs.map((qc, index) => (
                    <Tr key={qc.id}>
                      <Td fontWeight={"semibold"}>{qc.id}</Td>
                      <Td>{qc.name}</Td>
                      <Td>
                        <Button
                          onClick={async () => {
                            let userToken = localStorage.getItem("userToken");
                            if (userToken == null) {
                              navigate("/admin/login");
                            }

                            let config = {
                              headers: { Authorization: `Bearer ${userToken}` },
                            };
                            try {
                              const response = await axios.post(
                                apiUrl + "/assignment/update",
                                {
                                  _id: assignments[selectedIndex].id,
                                  assignedQC: qcs[index].id,
                                },
                                config
                              );
                              let resdata = response.data;
                              if (resdata.success) {
                                window.alert("QC Assigned");
                                _fetchAssignments();
                                QcModalDis.onClose();
                              }
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          Assign
                        </Button>
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

  async function fetchExperts(subject) {
    try {
      const response = await axios.post(
        apiUrl + "/expert/fetch",
        subject === ""
          ? {}
          : {
              subject: subject,
            }
      );
      let data = await response.data.res;
      expertList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          expertList.push({
            _id: data[index]._id,
            name: data[index].name,
            subject: data[index].subject,
          });
        }
      } else {
        console.log("No Experts Found");
      }
      setExperts(expertList);
    } catch (err) {
      console.log(err);
    }
  }

  async function openExpertModal(index) {
    setSelectedIndex(index);
    await fetchExperts("");
    ExpertModalDis.onOpen();
  }

  function ExpertModal() {
    let checkedListTemp = [];
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState({
      date: "",
      time: "",
    });
    const [sendRequest, setSendRequest] = useState(
      [] || JSON.parse(window.localStorage.getItem("sendRequest"))
    );

    const sendRequestIcon = (info) => {
      setSendRequest([...sendRequest, info._id]);
      window.localStorage.setItem(
        "sendRequest",
        JSON.stringify(Array.from(new Set([...sendRequest, info._id])))
      );
    };

    const closeModal = () => {
      setInputValue({
        date: "",
        time: "",
      });
      ExpertModalDis.onClose();
    };

    let requestData = JSON.parse(window.localStorage.getItem("sendRequest"));
    return (
      <Modal
        size={"5xl"}
        onClose={closeModal}
        isOpen={ExpertModalDis.isOpen}
        onOpen={ExpertModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"} overflowY="scroll">
          <ModalHeader>Choose Expert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              onChange={async (e) => {
                await fetchExperts(e.target.value);
              }}
              id="subject"
            >
              <option value="">All Subjects</option>
              {subjects.length === 0 ? (
                <></>
              ) : (
                subjects.map((subject, index) => (
                  <option value={subject._id} key={index}>
                    {subject._id}
                  </option>
                ))
              )}
            </Select>
            <FormControl padding={2} id="expertDeadline">
              <FormLabel fontWeight={"bold"}>Set Expert Deadline</FormLabel>
              <HStack>
                <Input
                  type="date"
                  id="date"
                  value={inputValue.date}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      date: e.target.value,
                    });
                  }}
                />
                <Input
                  type="time"
                  id="time"
                  value={inputValue.time}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      time: e.target.value,
                    });
                  }}
                />
              </HStack>
              {error && (
                <span style={{ color: "red" }}>
                  ** Expert Deadline is mandatory
                </span>
              )}
            </FormControl>
            <Table marginTop={2} variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Subject</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {experts.length === 0 ? (
                  <></>
                ) : (
                  experts.map((expert, index) => (
                    <Tr key={expert._id}>
                      <Td fontWeight={"semibold"}>{expert._id}</Td>
                      <Td>{expert.name}</Td>
                      <Td>{expert.subject}</Td>
                      <Td>
                        {requestData && requestData.includes(expert._id) && (
                          <span>✅</span>
                        )}
                      </Td>
                      <Td>
                        <Button
                          onClick={async (e) => {
                            let userToken = localStorage.getItem("userToken");

                            !inputValue.date || !inputValue.time
                              ? setError(true)
                              : setError(false);

                            let splitDate = inputValue.date.split("-");

                            let year = splitDate[0];
                            let month = splitDate[1];
                            let day = splitDate[2];

                            let splitTime = inputValue.time.split(":");

                            let hour = splitTime[0];
                            let min = splitTime[1];
                            let deadline = new Date(
                              year,
                              month - 1,
                              day,
                              hour,
                              min,
                              0
                            );

                            let iso = deadline?.toISOString();

                            if (userToken == null) {
                              navigate("/admin/login");
                            }

                            let config = {
                              headers: { Authorization: `Bearer ${userToken}` },
                            };
                            try {
                              await sendRequestIcon(expert);
                              const response = await axios.post(
                                apiUrl + "/expert/assignment/ask",
                                {
                                  expertId: experts[index]._id,
                                  assignmentId: assignments[selectedIndex].id,
                                  expertDeadline: iso,
                                },
                                config
                              );
                              let resdata = response.data;
                              if (resdata.success) {
                                window.alert("Expert Asked for Confirmation");
                              }
                            } catch (err) {
                              console.log(err);
                            }
                          }}
                        >
                          {requestData && requestData.includes(expert._id)
                            ? "Re-Send Request"
                            : "Send Request"}
                        </Button>
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

  const [quotes, setQuotes] = useState([]);
  let quotesList = [];
  let selectedCost;

  const QuotesModalDis = useDisclosure();

  async function openQuotesModal(index) {
    setSelectedIndex(index);
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(
        apiUrl +
          "/assignment/quotes/fetch?assignment_id=" +
          assignments[index].id,
        config
      );
      let data = await response.data.result.expertQuotations;
      quotesList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          quotesList.push({
            _id: data[index]._id,
            name: data[index].name,
            wordCount: data[index].wordCount,
            cost: data[index].cost,
            currency: data[index].currency,
            comments: data[index].comments,
          });
        }
      } else {
        console.log("No Experts Found");
      }
      setQuotes(quotesList);
    } catch (err) {
      console.log(err);
    }
    QuotesModalDis.onOpen();
  }

  function QuotesModal() {
    const ExpertQuoteGenerateModalDis = useDisclosure();

    async function openExpertQuoteGenerateModal(index) {
      selectedCost = index;
      ExpertQuoteGenerateModalDis.onOpen();
    }

    function ExpertQuoteGenerateModal() {
      const [quote, setQuote] = useState("");
      const [note, setNote] = useState("");
      return (
        <Modal
          size={"2xl"}
          onClose={ExpertQuoteGenerateModalDis.onClose}
          isOpen={ExpertQuoteGenerateModalDis.isOpen}
          onOpen={ExpertQuoteGenerateModalDis.onOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader id="assId">
              {quotes[selectedCost] !== undefined
                ? "Expert Quotation: " + quotes[selectedCost].cost
                : ""}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl padding={2} id="expertDeadline">
                <FormLabel fontWeight={"bold"}>Set Expert Deadline</FormLabel>
                <HStack>
                  <Input type="date" id="date" />
                  <Input type="time" id="time" />
                </HStack>
              </FormControl>
              <FormControl h={"full"} padding={2} id="quote">
                <FormLabel fontWeight={"bold"}>Enter Quotation</FormLabel>
                <InputGroup>
                  <InputLeftAddon>
                    <Text fontWeight={"bold"}>INR</Text>
                  </InputLeftAddon>
                  <Input
                    type="number"
                    value={quote}
                    onChange={() => {
                      let quoteElement = document.getElementById("quote");
                      setQuote(quoteElement.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl h={"full"} padding={2}>
                <FormLabel fontWeight={"bold"}>Note From Operator</FormLabel>
                <Textarea
                  id="note"
                  value={note}
                  onChange={() => {
                    let noteElement = document.getElementById("note");
                    setNote(noteElement.value);
                  }}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Spacer />
              <Button
                onClick={async () => {
                  try {
                    let userEmail = localStorage.getItem("userEmail");
                    console.log(userEmail);
                    let userName = localStorage.getItem("userName");
                    let userToken = localStorage.getItem("userToken");
                    if (userToken == null) {
                      navigate("/admin/login");
                    }
                    let config = {
                      headers: { Authorization: `Bearer ${userToken}` },
                    };

                    let dateElement = document.getElementById("date");
                    let timeElement = document.getElementById("time");

                    let splitDate = await dateElement.value.split("-");
                    let year = splitDate[0];
                    let month = splitDate[1];
                    let day = splitDate[2];

                    let splitTime = await timeElement.value.split(":");
                    let hour = splitTime[0];
                    let min = splitTime[1];
                    let deadline = new Date(year, month - 1, day, hour, min, 0);
                    let iso = deadline.toISOString();

                    if (timeElement.value !== undefined && quote !== "") {
                      const responseDeadline = await axios.post(
                        apiUrl + "/assignment/update",
                        {
                          _id: assignments[selectedIndex].id,
                          expertDeadline: iso,
                        },
                        config
                      );
                      const responseNote = await axios.post(
                        apiUrl + "/assignment/comments/operatorToExpert",
                        {
                          assignmentId: assignments[selectedIndex].id,
                          notesFromOperator: {
                            _id: userEmail,
                            name: userName,
                            comment: note,
                          },
                        },
                        config
                      );
                      const response = await axios.post(
                        apiUrl + "/assignment/quote/generate",
                        {
                          _id: assignments[selectedIndex].id,
                          quotation: quote,
                          cp1: quote / 2,
                        },
                        config
                      );
                      let resdata = response.data;
                      if (resdata.success) {
                        await _fetchAssignments();
                        window.alert("Quote Generated");
                        ExpertQuoteGenerateModalDis.onClose();
                      }
                    } else {
                      window.alert("Fill Up Quote & Set Deadline Time");
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Send Quote
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    }

    return (
      <Modal
        size={"4xl"}
        onClose={QuotesModalDis.onClose}
        isOpen={QuotesModalDis.isOpen}
        onOpen={QuotesModalDis.onOpen}
        isCentered
      >
        <ExpertQuoteGenerateModal />
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quotations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Word Count</Th>
                  <Th>Currency</Th>
                  <Th>Quotation</Th>
                  <Th>Comments</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {quotes.length === 0 ? (
                  <></>
                ) : (
                  quotes.map((quote, index) => (
                    <Tr key={index}>
                      <Td>{quote.name}</Td>
                      <Td>{quote.wordCount}</Td>
                      <Td>{quote.currency}</Td>
                      <Td>{quote.cost}</Td>
                      <Td maxW={"300px"}>{quote.comments}</Td>
                      <Td>
                        <HStack>
                          <Button
                            onClick={async () => {
                              let userToken = localStorage.getItem("userToken");
                              if (userToken == null) {
                                navigate("/admin/login");
                              }

                              let config = {
                                headers: {
                                  Authorization: `Bearer ${userToken}`,
                                },
                              };
                              try {
                                const response = await axios.post(
                                  apiUrl + "/expert/assignment/ask",
                                  {
                                    expertId: quote._id,
                                    assignmentId: assignments[selectedIndex].id,
                                  },
                                  config
                                );
                                let resdata = response.data;
                                if (resdata.success) {
                                  window.alert("Expert Asked for Confirmation");
                                  QuotesModalDis.onClose();
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            Send Request
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

  useEffect(() => {
    _fetchAssignments();
  }, []);

  async function _fetchAssignments() {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(
        apiUrl + "/assignment/fetch?status=CP1%20Done",
        config
      );
      let data = response.data.assignmentData;
      assignmentList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          assignmentList.push({
            id: data[index]._id,
            client_id: data[index].client_id,
            assignedQC: data[index].assignedQC,
            subject: data[index].subject,
            status: data[index].status,
            quotation: data[index].quotation,
            currencyOfQuote: data[index].currencyOfQuote,
            level: data[index].level,
            reference: data[index].reference,
            description: data[index].description,
            descriptionFile: data[index].descriptionFile,
            numOfPages: data[index].numOfPages,
            paid: data[index].paid,
            cp1PaymentId: data[index].cp1PaymentId,
            cp2PaymentId: data[index].cp2PaymentId,
            deadline:
              new Date(data[index].deadline).toLocaleTimeString() +
              ", " +
              new Date(data[index].deadline).toDateString(),
            expertDeadline:
              new Date(data[index].expertDeadline).toLocaleTimeString() +
              ", " +
              new Date(data[index].expertDeadline).toDateString(),
          });
        }
        await _fetchSubjects();
      } else {
        console.log("No CP1 Pending Orders");
      }
      setAssignments(assignmentList);
      console.log(assignmentList, "cp1 done Data");
      console.log(assignments);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div display={{ base: "none", sm: "block", md: "block" }}>
        <ExpertModal />
        <QcModal />
        <QuotesModal />
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
              <Th>Order Quote</Th>
              <Th>Amount Paid</Th>
              <Th>Expert Deadline</Th>
              <Th>Deadline</Th>
              <Th>Assigned QC</Th>
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
            {assignments.map((assignment, index) => (
              <Tr key={assignment.id}>
                <Td fontWeight={"semibold"}>
                  <Link href={"/admin/assignment_details/" + assignment.id}>
                    {assignment.id}
                  </Link>
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
                <Td
                  fontWeight={"bold"}
                  color={
                    assignment.cp1PaymentId === "External Payment"
                      ? "red"
                      : "green"
                  }
                >
                  {assignment.quotation}
                </Td>
                <Td
                  fontWeight={"bold"}
                  color={
                    assignment.cp1PaymentId === "External Payment"
                      ? "red"
                      : "green"
                  }
                >
                  {assignment.paid}
                </Td>
                <Td color={"red.600"} fontWeight={"semibold"}>
                  {assignment.expertDeadline}
                </Td>
                <Td color={"red.600"} fontWeight={"semibold"}>
                  {assignment.deadline}
                </Td>
                <Td fontWeight={"semibold"}>{assignment.assignedQC}</Td>
                <Td>
                  <HStack>
                    <Button
                      display={
                        localStorage.getItem("userRole") === "Super Admin" ||
                        localStorage.getItem("userRole") === "Operator" ||
                        localStorage.getItem("userRole") === "Admin"
                          ? "flex"
                          : "none"
                      }
                      onClick={async () => openQcModal(index)}
                    >
                      Assign QC
                    </Button>
                    <Button
                      display={
                        localStorage.getItem("userRole") === "Super Admin" ||
                        localStorage.getItem("userRole") === "Operator" ||
                        localStorage.getItem("userRole") === "Admin"
                          ? "flex"
                          : "none"
                      }
                      onClick={async () => openExpertModal(index)}
                    >
                      Assign Expert
                    </Button>
                    <Button
                      display={
                        localStorage.getItem("userRole") === "Operator" ||
                        localStorage.getItem("userRole") === "Super Admin" ||
                        localStorage.getItem("userRole") === "Admin"
                          ? "flex"
                          : "none"
                      }
                      onClick={async () => openQuotesModal(index)}
                    >
                      Quotation Responses
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      {/* accordion for mobile  */}
      <div className="ShowSideClick">
        {assignments.map((assignment, index) => (
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
              <AccordionPanel p={0}>
                <ExpertModal />
                <QcModal />
                <QuotesModal />
                <Table variant="simple" size="md">
                  <Tbody>
                    <Tr key={assignment.id}>
                      {/* adding table  */}
                      <Table bgColor={"gray.100"} className="select-td">
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
                          <Th>Order Quote</Th>
                          <Td
                            fontWeight={"bold"}
                            color={
                              assignment.cp1PaymentId === "External Payment"
                                ? "red"
                                : "green"
                            }
                          >
                            {assignment.quotation}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Amount Paid</Th>
                          <Td
                            fontWeight={"bold"}
                            color={
                              assignment.cp1PaymentId === "External Payment"
                                ? "red"
                                : "green"
                            }
                          >
                            {assignment.paid}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Subject</Th>
                          <Td color={"green.600"} fontWeight={"semibold"}>
                            {assignment.subject}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Expert Deadline</Th>
                          <Td color={"red.600"} fontWeight={"semibold"}>
                            {assignment.expertDeadline}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Deadline</Th>
                          <Td color={"red.600"} fontWeight={"semibold"}>
                            {assignment.deadline}
                          </Td>
                        </Tr>
                        <Tr>
                          <Th>Assigned QC</Th>
                          <Td fontWeight={"semibold"}>
                            {assignment.assignedQC}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <HStack>
                              <Table className="pad-setting">
                                <Tr>
                                  <Td>
                                    <Button
                                      display={
                                        localStorage.getItem("userRole") ===
                                          "Super Admin" ||
                                        localStorage.getItem("userRole") ===
                                          "Operator" ||
                                        localStorage.getItem("userRole") ===
                                          "Admin"
                                          ? "flex"
                                          : "none"
                                      }
                                      onClick={async () => openQcModal(index)}
                                    >
                                      Assign QC
                                    </Button>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>
                                    <Button
                                      display={
                                        localStorage.getItem("userRole") ===
                                          "Super Admin" ||
                                        localStorage.getItem("userRole") ===
                                          "Operator" ||
                                        localStorage.getItem("userRole") ===
                                          "Admin"
                                          ? "flex"
                                          : "none"
                                      }
                                      onClick={async () =>
                                        openExpertModal(index)
                                      }
                                    >
                                      Assign Expert
                                    </Button>
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td>
                                    <Button
                                      display={
                                        localStorage.getItem("userRole") ===
                                          "Operator" ||
                                        localStorage.getItem("userRole") ===
                                          "Super Admin" ||
                                        localStorage.getItem("userRole") ===
                                          "Admin"
                                          ? "flex"
                                          : "none"
                                      }
                                      onClick={async () =>
                                        openQuotesModal(index)
                                      }
                                    >
                                      Quotation Responses
                                    </Button>
                                  </Td>
                                </Tr>
                              </Table>
                            </HStack>
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
      </div>{" "}
    </>
  );
}

export default CP1DoneOrders;
