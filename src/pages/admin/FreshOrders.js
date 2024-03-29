import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  HStack,
  Spacer,
  Link,
  Textarea,
  VStack,
  InputLeftAddon,
  Input,
  InputGroup,
  FormLabel,
  FormControl,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { apiUrl } from "../../services/contants";
import { RepeatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function FreshOrders({ incrementCounter, decrementCounter }) {
  const [assignments, setAssignments] = useState([]);
  const [experts, setExperts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectDate, setSelectedDate] = useState();
  const [token, setToken] = useState("");

  let navigate = useNavigate();

  let assignmentList = [];
  let expertList = [];

  useEffect(() => {
    _fetchAssignments();
  }, []);

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

  async function _fetchAssignments() {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(
        apiUrl + "/assignment/fetch",
        {
          status: {
            $in: ["Fresh Order", "Quotation Asked", "Doability Asked"],
          },
        },
        config
      );
      let data = await response.data.assignmentData;
      console.warn("data fresh order", data);
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
            paid: data[index].paid,
            deadline:
              new Date(data[index].deadline).toLocaleTimeString() +
              ", " +
              new Date(data[index].deadline).toDateString(),
          });
        }
        await _fetchSubjects();
        await _fetchToken();
      } else {
        console.log("No Fresh Orders");
      }
      setAssignments(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }

  const ExpertModalDis = useDisclosure();

  const [selectedIndex, setSelectedIndex] = useState();

  async function fetchExperts(subject) {
    // input taken as a deadline date in quatation
    console.warn(subject, "subject data is here");
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
    console.log(selectedIndex);
    await fetchExperts("");
    ExpertModalDis.onOpen();
  }

  function ExpertModal() {
    let checkedListTemp = [];

    return (
      <Modal
        size={"xl"}
        onClose={ExpertModalDis.onClose}
        isOpen={ExpertModalDis.isOpen}
        onOpen={ExpertModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"} overflowY="scroll">
          <ModalHeader>Choose Expert</ModalHeader>
          {/* <h4 style={{width:"80%",
    marginLeft:"5%"}}> Deadline Date:</h4>
        <br></br>
                <Input
                placeholder="Select Date and Time"
                  size="lg"
                   type="datetime-local"
                   style={{width:"80%",
                border:"none",
            marginLeft:"3%"}}
                 /> */}
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
            <Table marginTop={2} variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Subject</Th>
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
                        <Checkbox
                          className="expertCheckBox"
                          value={expert._id}
                          onChange={(e) => {
                            e.target.checked
                              ? checkedListTemp.push(e.target.value)
                              : checkedListTemp.splice(
                                  checkedListTemp.indexOf(e.target.value)
                                );
                          }}
                        />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
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
                    apiUrl + "/expert/quote/ask",
                    {
                      expertIds: checkedListTemp,
                      assignmentId: assignments[selectedIndex].id,
                    },
                    config
                  );
                  // alert response data
                  let resdata = response.data;
                  if (resdata.success) {
                    window.alert("Quotation Asked");
                    ExpertModalDis.onClose();
                    _fetchAssignments();
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Send Request
            </Button>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  const AskDoableModalDis = useDisclosure();

  async function openAskDoableModal(index) {
    setSelectedIndex(index);
    await fetchExperts("");
    AskDoableModalDis.onOpen();
  }

  function AskDoableModal() {
    let checkedListTemp = [];

    return (
      <Modal
        size={"xl"}
        onClose={AskDoableModalDis.onClose}
        isOpen={AskDoableModalDis.isOpen}
        onOpen={AskDoableModalDis.onOpen}
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
            <Table marginTop={2} variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Subject</Th>
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
                        <Checkbox
                          className="expertCheckBox"
                          value={expert._id}
                          onChange={(e) => {
                            e.target.checked
                              ? checkedListTemp.push(e.target.value)
                              : checkedListTemp.splice(
                                  checkedListTemp.indexOf(e.target.value)
                                );
                          }}
                        />
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
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
                  console.log(config);
                  const response = await axios.post(
                    apiUrl + "/expert/assignment/ask/doable",
                    {
                      expertId: checkedListTemp,
                      assignmentId: assignments[selectedIndex].id,
                    },
                    config
                  );
                  let resdata = response.data;
                  if (resdata.success) {
                    window.alert("Doable Asked");
                    AskDoableModalDis.onClose();
                    _fetchAssignments();
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Send Request
            </Button>
            <Spacer />
          </ModalFooter>
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
    // give quotes started from here
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
                  onChange={(e) => {
                    // let noteElement = document.getElementById('note');
                    setNote(e.target.value);
                  }}
                ></Textarea>
                {/* <Input type={'text'} value={"fdkljfld"} /> */}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Spacer />
              <Button
                onClick={async () => {
                  try {
                    let userEmail = localStorage.getItem("userEmail");
                    console.log("userEmail", userEmail);
                    let userName = localStorage.getItem("userName");
                    console.log("username", userName);
                    let userToken = localStorage.getItem("userToken");
                    console.log("Token", userToken);
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
                      console.log("resdata", response.data);
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
                    <Tr key={quote._id}>
                      <Td>{quote.name}</Td>
                      <Td>{quote.wordCount}</Td>
                      <Td>{quote.currency}</Td>
                      <Td>{quote.cost}</Td>
                      <Td maxW={"300px"}>{quote.comments}</Td>
                      <Td>
                        <HStack>
                          <Button
                            onClick={() => {
                              openExpertQuoteGenerateModal(index);
                            }}
                          >
                            Select Quote
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

  const [doableResponses, setDoableResponses] = useState([]);
  let doableResponsesList = [];

  const DoableResponsesModalDis = useDisclosure();

  async function openDoableResponsesModal(index) {
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
          "/assignment/doability/fetch?assignment_id=" +
          assignments[index].id,
        config
      );
      let data = await response.data.result.expertDoability;
      doableResponsesList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          doableResponsesList.push({
            _id: data[index]._id,
            doable: data[index].doable,
            createdAt: data[index].createdAt,
          });
        }
      } else {
        console.log("No Responses Found");
      }
      setDoableResponses(doableResponsesList);
    } catch (err) {
      console.log(err);
    }
    DoableResponsesModalDis.onOpen();
  }

  function DoableResponsesModal() {
    return (
      <Modal
        size={"xl"}
        onClose={DoableResponsesModalDis.onClose}
        isOpen={DoableResponsesModalDis.isOpen}
        onOpen={DoableResponsesModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Responses</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th>Response</Th>
                </Tr>
              </Thead>
              <Tbody>
                {doableResponses.length === 0 ? (
                  <></>
                ) : (
                  doableResponses.map((doableResponse, index) => (
                    <Tr key={index}>
                      <Td>{doableResponse._id}</Td>
                      <Td>{doableResponse.doable}</Td>
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

  const [quoteAssignmentData, setQuoteAssignmentData] = useState({});

  async function _fetchQuoteAssignmentDetail(index) {
    setQuoteAssignmentData({
      _id: assignments[index].id,
      client_id: assignments[index].client_id,
      subject: assignments[index].subject,
      status: assignments[index].status,
      quotation: assignments[index].quotation,
      currencyOfQuote: assignments[index].currencyOfQuote,
      level: assignments[index].level,
      reference: assignments[index].reference,
      description: assignments[index].description,
      descriptionFile: assignments[index].descriptionFile,
      numOfPages: assignments[index].numOfPages,
      paid: assignments[index].paid,
      deadline:
        new Date(assignments[index].deadline).toLocaleTimeString() +
        ", " +
        new Date(assignments[index].deadline).toDateString(),
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  function QuotationModal() {
    const [quote, setQuote] = useState("");
    const [cp1, setCp1] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [note, setNote] = useState("");
    const [isExternal, setExternal] = useState(false);
    const inputFileStickyNotes = useRef(null);
    const [date, setDate] = useState("");
    const [description, setDescription] = useState(" ");
    const [time, setTime] = useState("");

    return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader id="assId">
            {assignments.length === 0 ? "" : quoteAssignmentData._id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack padding={2}>
              <Text fontWeight={"bold"}>Student ID:</Text>
              <Text>
                {assignments.length === 0 ? "" : quoteAssignmentData.client_id}
              </Text>
            </HStack>
            <HStack padding={2}>
              <Text fontWeight={"bold"}>Subject:</Text>
              <Text>
                {assignments.length === 0 ? "" : quoteAssignmentData.subject}
              </Text>
            </HStack>
            <VStack padding={2} alignItems={"left"}>
              <Text fontWeight={"bold"}>Description:</Text>
              <Textarea
                contentEditable={false}
                onChange={() => {}}
                value={
                  assignments.length === 0
                    ? ""
                    : description == " "
                    ? quoteAssignmentData.description
                    : description
                }
              >
                {quoteAssignmentData.description}
              </Textarea>
              {/* <Input type={"text"}  value={quoteAssignmentData.description}  onChange={(e)=>{
                                setQuoteAssignmentData({...quoteAssignmentData , description: e.target.value })
                            }} /> */}
            </VStack>
            <HStack padding={2}>
              <Text fontWeight={"bold"}>Level:</Text>
              <Text>
                {assignments.length === 0 ? "" : quoteAssignmentData.level}
              </Text>
            </HStack>
            <HStack padding={2}>
              <Text fontWeight={"bold"}>Reference:</Text>
              <Text>
                {assignments.length === 0 ? "" : quoteAssignmentData.reference}
              </Text>
            </HStack>
            <HStack padding={2}>
              <Text fontWeight={"bold"}>Pages:</Text>
              <Text>
                {assignments.length === 0 ? "" : quoteAssignmentData.numOfPages}
              </Text>
            </HStack>
            <VStack padding={2} alignItems={"left"}></VStack>
            <FormControl padding={2} id="expertDeadline">
              <FormLabel fontWeight={"bold"}>Set Expert Deadline</FormLabel>
              <HStack>
                <Input
                  type="date"
                  id="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <Input
                  type="time"
                  id="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
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
                  onChange={(e) => {
                    // let quoteElement = document.getElementById('quote');
                    setQuote(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl h={"full"} padding={2}>
              <FormLabel fontWeight={"bold"}>Note From Operator</FormLabel>
              <Textarea
                id="note"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></Textarea>
            </FormControl>
            <Checkbox
              isChecked={isCustom}
              value={isCustom}
              onChange={(e) => {
                setIsCustom(e.target.checked);
              }}
              padding={2}
              spacing={"5"}
              fontWeight={"bold"}
            >
              Set Custom CP1 Value
            </Checkbox>
            <FormControl
              display={isCustom && !isExternal ? "block" : "none"}
              h={"full"}
              padding={2}
              id="cp1"
            >
              <FormLabel fontWeight={"bold"}>Enter Custom CP1</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Text fontWeight={"bold"}>INR</Text>
                </InputLeftAddon>
                <Input
                  type="number"
                  value={cp1}
                  onChange={(e) => {
                    // let cp1Element = document.getElementById('cp1');
                    console.log(e.target.value, "element CP");
                    setCp1(e.target.value);
                  }}
                />
              </InputGroup>
            </FormControl>
            <Checkbox
              isChecked={isExternal}
              value={isExternal}
              onChange={(e) => {
                setExternal(e.target.checked);
              }}
              padding={2}
              spacing={"5"}
              fontWeight={"bold"}
            >
              External Payment
            </Checkbox>
            <InputGroup>
              <Input
                type="file"
                id="addFileStickyNotes"
                ref={inputFileStickyNotes}
                onChange={() => {
                  let fileUrl = "";
                  if (inputFileStickyNotes) {
                    window.alert("Uploading");
                    try {
                      var config = {
                        method: "put",
                        url:
                          "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                          encodeURIComponent(
                            inputFileStickyNotes.current.files[0].name
                          ) +
                          "?" +
                          token,
                        headers: {
                          "x-ms-blob-type": "BlockBlob",
                        },
                        data: inputFileStickyNotes.current.files[0],
                      };

                      axios(config)
                        .then(async function (response) {
                          fileUrl =
                            "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
                            encodeURIComponent(
                              inputFileStickyNotes.current.files[0].name
                            );
                          let userToken = localStorage.getItem("userToken");
                          let userEmail = localStorage.getItem("userEmail");
                          let userName = localStorage.getItem("userName");

                          let config = {
                            headers: { Authorization: `Bearer ${userToken}` },
                          };
                          if (fileUrl === "") {
                            window.alert("Attachment cannot be empty");
                          } else {
                            const response = await axios.post(
                              apiUrl + "/assignment/comments/operatorToExpert",
                              {
                                assignmentId: quoteAssignmentData._id,
                                notesFromOperator: {
                                  _id: userEmail,
                                  name: userName,
                                  comment: fileUrl,
                                },
                              },
                              config
                            );
                            if (response.data.success) {
                              await axios.post(
                                apiUrl +
                                  "/assignment/comments/operatorToExpert",
                                {
                                  assignmentId: quoteAssignmentData._id,
                                  notesFromOperator: {
                                    _id: userEmail,
                                    name: userName,
                                    comment: "Payment File Sent Above",
                                  },
                                },
                                config
                              );
                              window.alert(
                                `${inputFileStickyNotes.current.files[0].name} has been added to sticky notes, fill other details and submit`
                              );
                            } else {
                              console.log(response);
                            }
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }}
                style={{ display: "none" }}
              />
            </InputGroup>
            <Button
              id="attachButton"
              w={"100%"}
              display={isExternal ? "block" : "none"}
              onClick={async () => {
                inputFileStickyNotes.current.click();
              }}
            >
              Attach Payment File
            </Button>
          </ModalBody>
          <ModalFooter>
            <Spacer />
            <Button
              onClick={async () => {
                try {
                  // alert("call...");
                  let userEmail = localStorage.getItem("userEmail");
                  let userName = localStorage.getItem("userName");
                  let userToken = localStorage.getItem("userToken");
                  //alert(userToken);
                  if (userToken == null) {
                    navigate("/admin/login");
                  }
                  let config = {
                    headers: { Authorization: `Bearer ${userToken}` },
                  };
                  // alert("call...3")
                  let dateElement = document.getElementById("date");
                  // console.log(dateElement, "date element");
                  let timeElement = document.getElementById("time");
                  // alert("call...4")
                  // let splitDate = await date.split("-");
                  let splitDate = date.split("-");
                  console.log(splitDate, "splitDate");
                  let year = splitDate[0];
                  let month = splitDate[1];
                  let day = splitDate[2];
                  // alert("call...5")
                  // let splitTime = await Time.split(":");
                  let splitTime = time.split(":");
                  console.log(splitTime, " split time");
                  let hour = splitTime[0];
                  let min = splitTime[1];
                  //let deadline = new Date(year, month - 1, day, hour, min, 0);
                  //console.log(deadline, "deadline");
                  //let iso = deadline?.toISOString();
                  //   console.log({ iso });
                  // alert("call...6")
                  // alert(timeElement.value);
                  if (timeElement.value !== undefined && quote !== "") {
                    // alert("call 2....")
                    if (isExternal) {
                      try {
                        // window.alert('Please Wait..')
                        const responseDeadline = await axios.post(
                          apiUrl + "/assignment/update",
                          {
                            _id: quoteAssignmentData._id,
                            //expertDeadline: iso,
                            status: "CP1 Done",
                            quotation: quote,
                            paid: quote,
                            cp1PaymentId: "External Payment",
                            cp2PaymentId: "External Payment",
                            description: description,
                          },
                          config
                        );
                        onClose();
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      // window.alert('Please Wait..');
                      console.log("Hereere");
                      const responseDeadline = await axios.post(
                        apiUrl + "/assignment/update",
                        {
                          _id: quoteAssignmentData._id,
                          //   expertDeadline: iso,
                        },
                        config
                      );
                      const responseNote = await axios.post(
                        apiUrl + "/assignment/comments/operatorToExpert",
                        {
                          assignmentId: quoteAssignmentData._id,
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
                          _id: quoteAssignmentData._id,
                          quotation: quote,
                          cp1: cp1 === "" ? quote / 2 : cp1,
                        },
                        config
                      );
                      let resdata = response.data;

                      const createNotification = await axios.post(
                        apiUrl + "/notifications",
                        {
                          assignmentId: quoteAssignmentData._id,
                          status: "CP1 Pending",
                          read: false,
                        },
                        config
                      );
                      incrementCounter("CP1 Pending");
                      decrementCounter("Fresh Order");
                      if (resdata.success) {
                        await _fetchAssignments();
                        window.alert("Quote Generated");
                        onClose();
                      }
                    }
                  } else {
                    window.alert("Fill Up Quote & Set Deadline Time");
                  }
                } catch (error) {
                  alert(error);
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
  async function DeleteRecords(id) {
    try {
      let userToken = localStorage.getItem("userToken");
      let userEmail = localStorage.getItem("userEmail");
      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(
        apiUrl + `/assignment/delete/?_id=${id}`,

        config
      );
      console.log("response", response.data);
      _fetchAssignments();
    } catch (error) {
      //console.log(error);
    }
  }

  async function openModal(index) {
    await _fetchQuoteAssignmentDetail(index);
    onOpen();
    let date = document.getElementById("date");
    date.min = new Date().toLocaleDateString("en-ca");
    date.value = new Date().toLocaleDateString("en-ca");
  }

  return (
    <>
      <div display={{ base: "none", sm: "block", md: "block" }}>
        <ExpertModal />
        <QuotationModal />
        <QuotesModal />
        <AskDoableModal />
        <DoableResponsesModal />
        <Table
          variant="simple"
          size="md"
          display={{ base: "none", sm: "block", md: "block" }}
        >
          <Thead bgColor={"gray.200"}>
            <Tr>
              <Th>ID</Th>
              <Th>Student Email</Th>
              <Th>Subject</Th>
              <Th>Deadline</Th>
              <Th>Status</Th>
              {/* addded new functionality of deleting the data */}
              <Th>Delete Records</Th>
              <Th alignContent={"flex-end"}>
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
              <></>
            ) : (
              assignments.map((assignment, index) => (
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
                  {/* adding new functionality of deleting the data */}
                  <Td>
                    <Button
                      style={{ color: "red" }}
                      onClick={() => DeleteRecords(assignment.id)}
                    >
                      Delete records
                    </Button>
                  </Td>
                  <Td>
                    <HStack>
                      {assignment.status === "Fresh Order" ? (
                        <>
                          {console.log(assignment.status)}
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openModal(index)}
                          >
                            Give Quote
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openExpertModal(index)}
                          >
                            Ask Quote Expert
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openAskDoableModal(index)}
                          >
                            Ask Doable Expert
                          </Button>
                        </>
                      ) : assignment.status === "Quotation Asked" ? (
                        <>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openModal(index)}
                          >
                            Give Quote
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openQuotesModal(index)}
                          >
                            Quotation Responses
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openAskDoableModal(index)}
                          >
                            Ask Doable Expert
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openModal(index)}
                          >
                            Give Quote
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () => openExpertModal(index)}
                          >
                            Ask Quote Expert
                          </Button>
                          <Button
                            display={
                              localStorage.getItem("userRole") === "Operator" ||
                              localStorage.getItem("userRole") ===
                                "Super Admin" ||
                              localStorage.getItem("userRole") === "Admin"
                                ? "flex"
                                : "none"
                            }
                            onClick={async () =>
                              openDoableResponsesModal(index)
                            }
                          >
                            Doable Responses
                          </Button>
                        </>
                      )}
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>

      {/* mobile version accordion  */}
      <div
        className="ShowSideClick checkk"
        display={{ base: "block", sm: "none", md: "none" }}
      >
        {assignments.length === 0 ? (
          <></>
        ) : (
          assignments.map((assignment, index) => (
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              className="p-set "
              display={{ base: "block", sm: "none", md: "none" }}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Table>
                        <Tr>
                          <Th>ID</Th>
                          <Td fontWeight={"semibold"}>
                            <Link
                              href={
                                "/admin/assignment_details/" + assignment.id
                              }
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
                  <ExpertModal />
                  <QuotationModal />
                  <QuotesModal />
                  <AskDoableModal />
                  <DoableResponsesModal />
                  <Table variant="simple" size="md">
                    <Tbody>
                      {/* {console.log(assignments.length)} */}
                      <Tr key={assignment.id}>
                        {/* my table */}
                        <Table bgColor={"gray.200"}>
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
                            <Th>Deadline</Th>
                            <Td color={"red.600"} fontWeight={"semibold"}>
                              {assignment.deadline}
                            </Td>
                          </Tr>
                          <Tr>
                            <Th>Status</Th>
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
                          </Tr>
                          <Tr>
                            <Th alignContent={"flex-end"}>
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
                          <Tr>
                            <Td>
                              <HStack>
                                {assignment.status === "Fresh Order" ? (
                                  <>
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
                                      onClick={async () => openModal(index)}
                                    >
                                      Give Quote
                                    </Button>
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
                                        openExpertModal(index)
                                      }
                                    >
                                      Ask Quote Expert
                                    </Button>
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
                                        openAskDoableModal(index)
                                      }
                                    >
                                      Ask Doable Expert
                                    </Button>
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
                                    >
                                      Delete Records
                                    </Button>
                                  </>
                                ) : assignment.status === "Quotation Asked" ? (
                                  <>
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
                                      onClick={async () => openModal(index)}
                                    >
                                      Give Quote
                                    </Button>
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
                                        openAskDoableModal(index)
                                      }
                                    >
                                      Ask Doable Expert
                                    </Button>
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
                                    >
                                      Delete Records
                                    </Button>
                                  </>
                                ) : (
                                  <>
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
                                      onClick={async () => openModal(index)}
                                    >
                                      Give Quote
                                    </Button>
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
                                        openExpertModal(index)
                                      }
                                    >
                                      Quote Expert
                                    </Button>
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
                                        openDoableResponsesModal(index)
                                      }
                                    >
                                      Doable Responses
                                    </Button>
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
                                    >
                                      Delete Records
                                    </Button>
                                  </>
                                )}
                              </HStack>
                            </Td>
                          </Tr>
                        </Table>
                      </Tr>
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </>
  );
}

export default FreshOrders;
