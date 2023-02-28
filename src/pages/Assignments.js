import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Heading,
  HStack,
  Button,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Link,
  Select,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavbarAssignments } from "../components/assignments_components.js/navbar_assignments";
import { apiUrl } from "../services/contants";
import { useRouter } from "next/router";

export default function Assignments() {
  const [id, setID] = useState(
    typeof window !== "undefined" ? localStorage.getItem("clientEmail") : null
  );
  const [clientToken, setClientToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("clientToken") : null
  );
  const [assignments, setAssignments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({
    _id: "INR",
    INRFactor: "1",
  });
  let currencyList = [];
  // let clientToken, id;
  let assignmentList = [];
  let navigate = useRouter();

  useEffect(() => {
    _fetchAssignments();
  }, []);

  async function _fetchCurrencies() {
    try {
      if (
        clientToken == null ||
        clientToken == undefined ||
        id == null ||
        id == undefined
      ) {
        navigate.replace("/");
      }

      const response = await axios.post(apiUrl + "/util/currency/fetch");
      let data = response.data.res;
      currencyList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          currencyList.push({
            _id: data[index]._id,
            INRFactor: data[index].INRFactor,
          });
        }
      } else {
        console.log("No Currencies");
      }
      setCurrencies(currencyList);
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchAssignments() {
    try {
      if (
        clientToken == null ||
        clientToken == undefined ||
        id == null ||
        id == undefined
      ) {
        navigate.replace("/");
      }

      let config = {
        headers: { Authorization: `Bearer ${clientToken}` },
      };
      const response = await axios.get(
        apiUrl + "/assignment/fetch?client_id=" + id,
        config
      );
      let data = response.data.assignmentData;
      assignmentList = [];
      for (let index = 0; index < data.length; index++) {
        assignmentList.push({
          id: data[index]._id,
          subject: data[index].subject,
          status: data[index].status,
          quotation: data[index].quotation,
          paid: data[index].paid,
          deadline:
            new Date(data[index].deadline).toLocaleTimeString() +
            ", " +
            new Date(data[index].deadline).toDateString(),
        });
      }
      setAssignments(assignmentList);
      _fetchCurrencies();
    } catch (err) {
      console.log(err);
      navigate.replace("/");
    }
  }

  return (
    <>
      <NavbarAssignments />
      <VStack padding={10} display={{ base: "none", sm: "block", md: "block" }}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Heading
            fontSize={"3xl"}
            color={"gray.800"}
            textAlign={{ base: "center", md: "left" }}
          >
            All Assignments
          </Heading>
          <Button
            display={{ base: "inline-flex", md: "inline-flex" }}
            fontSize={"sm"}
            variant={"outline"}
            fontWeight={600}
            margin={10}
            color={"gray.800"}
            onClick={() => {
              navigate.replace("/");
            }}
          >
            <HStack spacing={4}>
              <AddIcon />
              <Text fontWeight={"bold"} color={"gray.700"}>
                {" "}
                New Assignment
              </Text>
            </HStack>
          </Button>
          <Button
            display={{ base: "inline-flex", md: "inline-flex" }}
            fontSize={"sm"}
            variant={"outline"}
            fontWeight={600}
            color={"gray.800"}
            onClick={() => {
              _fetchAssignments();
            }}
          >
            <HStack spacing={4}>
              <RepeatIcon />
            </HStack>
          </Button>
        </Flex>
        <Select
          maxW={"300px"}
          id="currency"
          onChange={(e) => {
            setSelectedCurrency(currencies[e.target.value]);
          }}
        >
          {currencies.map((currency, index) => (
            <option key={index} value={index}>
              {currency._id}
            </option>
          ))}
        </Select>
        <Table variant="simple" size="md">
          <Thead bgColor={"gray.200"}>
            <Tr>
              <Th>Id</Th>
              <Th>Subject</Th>
              <Th>Status</Th>
              <Th>Order Quote</Th>
              <Th>Amount Paid</Th>
              <Th>Deadline</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assignments.map((assignment) => (
              <Tr key={assignment.id}>
                <Td fontWeight={"semibold"}>
                  <Link href={"/assignment_details/" + assignment.id}>
                    {assignment.id}
                  </Link>
                </Td>
                <Td>{assignment.subject}</Td>
                <Td color={"green.600"} fontWeight={"semibold"}>
                  {assignment.status === "Fresh Order"
                    ? "Order Under Review"
                    : assignment.status === "CP1 Pending"
                    ? "1st Payment Link Sent"
                    : assignment.status === "CP2 Pending"
                    ? "2nd Payment Link Sent"
                    : assignment.status === "CP2 Done"
                    ? "Assignment Done"
                    : assignment.status === "CP2 Pending"
                    ? "2nd Payment Link Sent"
                    : "Work Underway"}
                </Td>
                <Td>
                  {assignment.quotation !== null
                    ? selectedCurrency._id +
                      " " +
                      (
                        parseFloat(assignment.quotation) *
                        parseFloat(selectedCurrency.INRFactor)
                      ).toFixed(2)
                    : ""}
                </Td>
                <Td>
                  {assignment.paid !== null
                    ? selectedCurrency._id +
                      " " +
                      (
                        parseFloat(assignment.paid) *
                        parseFloat(selectedCurrency.INRFactor)
                      ).toFixed(2)
                    : ""}
                </Td>
                <Td color={"red.600"} fontWeight={"semibold"}>
                  {assignment.deadline}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      {/* accodion start for mob table my adding */}
      {/* <Assignmentsmob /> */}
      <Accordion
        allowMultiple
        display={{ base: "block", sm: "none", md: "none" }}
      >
        {assignments.map((assignment) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Table bgColor={"gray.100"}>
                    <Tr>
                      <Th>Id</Th>
                      <Td fontWeight={"semibold"}>
                        <Link href={"/assignment_details/" + assignment.id}>
                          {assignment.id}
                        </Link>
                      </Td>
                    </Tr>
                  </Table>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Table variant="simple" size="md">
                <Tbody>
                  <Tr key={assignment.id}>
                    <Table bgColor={"gray.100"}>
                      <Tr>
                        <Th>Subject</Th>
                        <Td>{assignment.subject}</Td>
                      </Tr>
                      <Tr>
                        <Th>Status</Th>
                        <Td color={"green.600"} fontWeight={"semibold"}>
                          {assignment.status === "Fresh Order"
                            ? "Order Under Review"
                            : assignment.status === "CP1 Pending"
                            ? "1st Payment Link Sent"
                            : assignment.status === "CP2 Pending"
                            ? "2nd Payment Link Sent"
                            : assignment.status === "CP2 Done"
                            ? "Assignment Done"
                            : assignment.status === "CP2 Pending"
                            ? "2nd Payment Link Sent"
                            : "Work Underway"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th>Order Quote</Th>
                        <Td>
                          {assignment.quotation !== null
                            ? selectedCurrency._id +
                              " " +
                              (
                                parseFloat(assignment.quotation) *
                                parseFloat(selectedCurrency.INRFactor)
                              ).toFixed(2)
                            : ""}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th>Amount Paid</Th>
                        <Td>
                          {assignment.paid !== null
                            ? selectedCurrency._id +
                              " " +
                              (
                                parseFloat(assignment.paid) *
                                parseFloat(selectedCurrency.INRFactor)
                              ).toFixed(2)
                            : ""}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th>Deadline</Th>
                        <Td color={"red.600"} fontWeight={"semibold"}>
                          {assignment.deadline}
                        </Td>
                      </Tr>
                    </Table>
                  </Tr>
                </Tbody>
              </Table>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
