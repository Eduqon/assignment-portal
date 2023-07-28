import Calendar from "react-calendar";
import { BellIcon } from "@chakra-ui/icons";
import {
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Button,
  Tfoot,
  Center,
} from "@chakra-ui/react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiUrl } from "../../services/contants";
import axios from "axios";

const Checkbox = ({ obj, onChange }) => {
  return (
    <>
      <input
        type="checkbox"
        id={`custom-checkbox-${obj.id}`}
        checked={obj.checked}
        onChange={() => {
          onChange({ ...obj, checked: !obj.checked });
        }}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

function ExpertDeadlineCalendarView() {
  const [assignments, setAssignments] = useState([]);

  let navigate = useRouter();

  let assignmentList = [];

  useEffect(() => {
    _fetchAssignments(new Date());
  }, []);

  async function _fetchAssignments(dateValue) {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const response = await axios.get(apiUrl + "/assignment/fetch", config);
      let data = response.data.assignmentData;

      const expertID = data.filter(
        (data) =>
          typeof data.expertDeadline === "object" &&
          data.assignedExpert &&
          new Date(
            data.expertDeadline[data._id][
              data.expertDeadline[data._id].length - 1
            ]
          ).toDateString() === dateValue.toDateString()
      );
      assignmentList = [];
      expertID && expertID.length !== 0
        ? expertID.forEach((data, index) => {
            assignmentList.push({
              id: data._id,
              client_id: data.client_id,
              assignedExpert: data.assignedExpert,
              expert: data.assignedExpert,
              subject: data.subject,
              status: data.status,
              quotation: data.quotation,
              currencyOfQuote: data.currencyOfQuote,
              level: data.level,
              reference: data.reference,
              description: data.description,
              descriptionFile: data.descriptionFile,
              numOfPages: data.numOfPages,
              paid: data.paid,
              deadline:
                new Date(data.deadline).toLocaleTimeString() +
                ", " +
                new Date(data.deadline).toDateString(),
              expertDeadline: data.expertDeadline ? data.expertDeadline : [],
            });
          })
        : console.log("No Orders");

      setAssignments(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }

  async function _sendReminder(index) {
    let userToken = localStorage.getItem("userToken");
    if (userToken == null) {
      navigate.replace("/admin/login");
    }

    let config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    try {
      const response = await axios.post(
        apiUrl + "/expert/sendReminder",
        {
          expertIds: assignments[index].assignedExpert,
          assignmentId: assignments[index].id,
        },
        config
      );
      // alert response data
      let resdata = response.data;
      if (resdata.success) {
        window.alert("Send Reminder to Expert");
        const updateAssignmentData = assignments.map((assignment) => {
          return assignment.id === assignments[index].id
            ? { ...assignment, sendReminder: true }
            : assignment;
        });
        setAssignments(updateAssignmentData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _sendAllReminder() {
    let userToken = localStorage.getItem("userToken");
    if (userToken == null) {
      navigate.replace("/admin/login");
    }

    let config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    try {
      const selectedAssignments =
        assignments &&
        assignments.length !== 0 &&
        assignments.filter((assignment) => assignment.checked);

      const response = selectedAssignments.map(async (assignment, index) => {
        return await axios.post(
          apiUrl + "/expert/sendReminder",
          {
            expertIds: assignment.assignedExpert,
            assignmentId: assignment.id,
          },
          config
        );
      });

      // alert response data
      let resdata = Promise.all(response);
      let promiseData = await resdata;
      let responseData = promiseData[promiseData.length - 1].data;

      if (responseData.success) {
        window.alert("Send Reminder to All Expert");
        const updateAssignmentData = assignments.map((assignment) => {
          return assignment.checked
            ? { ...assignment, sendReminder: true }
            : assignment;
        });
        setAssignments(updateAssignmentData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div display={{ base: "none", sm: "block", md: "block" }}>
        <HStack marginBottom={"20px"}>
          <Calendar
            onClickDay={(value) => {
              _fetchAssignments(value);
            }}
          />
        </HStack>
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
              <Th>Expert</Th>
              <Th>Deadline</Th>
              <Th>Expert Deadline</Th>
              <Th>
                <Button
                  onClick={() => {
                    setAssignments(
                      assignments.flatMap((data) => [
                        { ...data, checked: true },
                      ])
                    );
                  }}
                >
                  Select All
                </Button>
              </Th>
            </Tr>
          </Thead>
          {assignments && assignments.length !== 0 ? (
            <Tbody>
              {assignments.map((assignment, index) => (
                <Tr key={assignment.id}>
                  <Td
                    fontWeight={"semibold"}
                    display="flex"
                    alignItems="center"
                  >
                    <Link href={"/admin/assignment_details/" + assignment.id}>
                      {assignment.id}
                    </Link>
                    <Button
                      background="none"
                      onClick={() => _sendReminder(index)}
                      disabled={!assignment.checked}
                    >
                      {assignment.sendReminder ? (
                        <BellIcon color={"red.600"} />
                      ) : (
                        <BellIcon />
                      )}
                    </Button>
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
                  <Td>{assignment.paid}</Td>
                  <Td>{assignment?.expert}</Td>
                  <Td fontWeight={"semibold"}>{assignment.deadline}</Td>
                  <Td color={"red.600"} fontWeight={"semibold"}>
                    {assignment.expertDeadline
                      ? new Date(
                          assignment.expertDeadline[assignment.id][
                            assignment.expertDeadline[assignment.id].length - 1
                          ]
                        ).toLocaleTimeString() +
                        ", " +
                        new Date(
                          assignment.expertDeadline[assignment.id][
                            assignment.expertDeadline[assignment.id].length - 1
                          ]
                        ).toDateString()
                      : ""}
                  </Td>
                  <Td>
                    <Checkbox
                      obj={assignment}
                      onChange={(item) => {
                        setAssignments(
                          assignments.map((d) => (d.id === item.id ? item : d))
                        );
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody display="flex">
              <Box margin="0 auto">No Orders</Box>
            </Tbody>
          )}
          <br />
          <Tfoot float="right">
            {assignments.length !== 0 && (
              <Button onClick={() => _sendAllReminder()}>Send</Button>
            )}
          </Tfoot>
        </Table>
      </div>
      {/* accordion for mobile version  */}
      <div display={{ base: "block", sm: "none", md: "none" }}>
        {assignments.map((assignment) => {
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
              <AccordionPanel pb={4}>
                <TableContainer>
                  <Table>
                    <Tbody>
                      <>
                        <Tr key={assignment.id}>
                          <Table>
                            <Tr>
                              <Th>Student Email</Th>
                              <Td>
                                {localStorage.getItem("userRole") ===
                                "Super Admin"
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
                              <Th>Expert</Th>
                              <Td>{assignment.assignedExpert}</Td>
                            </Tr>
                            <Tr>
                              <Th>Expert Deadline</Th>
                              <Td fontWeight={"semibold"}>
                                {assignment.expertDeadline}
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
                      </>
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>;
        })}
      </div>
    </>
  );
}

export default ExpertDeadlineCalendarView;
