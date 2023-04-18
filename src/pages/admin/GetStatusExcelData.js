import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { apiUrl } from "../../services/contants";

function GetStatusExcelData() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterValue, setFilterValue] = useState("status");
  const [error, setError] = useState(false);
  const [assignments, setAssignments] = useState([]);
  // const [allAssignments, setAllAssignments] = useState([]);
  const [assignmentByID, setAssignmentByID] = useState([]);
  const [showData, setShowData] = useState(false);
  const [excelData, setExcelData] = useState([]);
  // const [allData, setAllData] = useState(false);
  const [id, setID] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });
  let assignmentList = [];
  // let allAssignmentList = [];
  const status = [
    "Fresh Order",
    "CP1 Pending",
    "CP1 Done",
    "Expert Asked",
    "Expert Assigned",
    "Raw Submission",
    "Internal Rework",
    "Proof Read",
    "CP2 Done",
  ];

  useEffect(() => {
    if (assignments.length !== 0) {
      _fetchExcelData(assignments);
    } else if (assignmentByID.length !== 0) {
      _fetchExcelData(assignmentByID);
    }
  }, [assignments, assignmentByID]);

  async function _fetchAssignments() {
    try {
      setAssignmentByID([]);
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(apiUrl + "/assignment/fetch", config);
      let newData = response.data.assignmentData.filter(
        (data) => data.currentState >= selectedStatus
      );

      let filterData =
        newData &&
        newData.filter(
          (data) =>
            new Date(
              data.order_placed_time[selectedStatus]
            ).toLocaleDateString() >=
              new Date(date.startDate).toLocaleDateString() &&
            new Date(
              data.order_placed_time[selectedStatus]
            ).toLocaleDateString() <=
              new Date(date.endDate).toLocaleDateString()
        );

      assignmentList = [];
      filterData.length !== 0
        ? filterData.forEach((data, index) => {
            assignmentList.push({
              _id: data._id,
              student_name: "",
              order_placed:
                new Date(
                  data.order_placed_time[selectedStatus]
                ).toLocaleTimeString() +
                ", " +
                new Date(data.order_placed_time[selectedStatus]).toDateString(),
              order_confirmed: data.order_confirmed_time,
              subject: data.subject,
              status: data.status,
              assigned_sales: "",
              assigned_qc: data.assignedQC || "",
              assigned_expert: data.assignedExpert || "",
              instructionFile: data.descriptionFile[0] || "",
              client_deadline:
                new Date(data.deadline).toLocaleTimeString() +
                ", " +
                new Date(data.deadline).toDateString(),
              expertDeadline: data.expertDeadline ? data.expertDeadline : [],
              deliveryDate: data.deliveryDate ? data.deliveryDate : [],
              files_from_expert: data.delivery_file ? data.delivery_file : [],
              proof_read_file:
                data.currentState &&
                data.currentState >= 7 &&
                data.delivery_file
                  ? data.delivery_file[data._id][
                      data.delivery_file[data._id].length - 1
                    ]
                  : "",
              internal_rework: data.internal_rework ? data.internal_rework : [],
              internal_rework_date: data.internal_rework_date
                ? data.internal_rework_date
                : [],
              delivery_client_file: data.final_delivery
                ? data.final_delivery
                : "",
            });
          })
        : console.log("No Assignments");

      setAssignments(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }

  // async function _fetchAllAssignments() {
  //   try {
  //     let userToken = localStorage.getItem("userToken");
  //     if (userToken == null) {
  //       navigate.replace("/admin/login");
  //     }

  //     let config = {
  //       headers: { Authorization: `Bearer ${userToken}` },
  //     };
  //     const response = await axios.get(localUrl + "/assignment/fetch", config);
  //     let newData = response.data.assignmentData.filter(
  //       (data) => data.currentState === Number(selectedStatus)
  //     );
  //     console.log({
  //       newData,
  //       response: response.data.assignmentData,
  //       selectedStatus,
  //     });
  //     allAssignmentList = [];
  //     newData.length !== 0
  //       ? newData.forEach((data, index) => {
  //           console.log({ data });
  //           allAssignmentList.push({
  //             _id: data._id,
  //             student_name: "",
  //             order_placed:
  //               new Date(
  //                 data.order_placed_time[data.currentState]
  //               ).toLocaleTimeString() +
  //               ", " +
  //               new Date(
  //                 data.order_placed_time[data.currentState]
  //               ).toDateString(),
  //             order_confirmed: data.order_confirmed_time || "",
  //             subject: data.subject,
  //             status: data.status,
  //             assigned_sales: "",
  //             assigned_qc: data.assignedQC || "",
  //             assigned_expert: data.assignedExpert || "",
  //             instructionFile: data.descriptionFile[0] || "",
  //             client_deadline:
  //               new Date(data.deadline).toLocaleTimeString() +
  //               ", " +
  //               new Date(data.deadline).toDateString(),
  //             expertDeadline: data.expertDeadline ? data.expertDeadline : [],
  //             deliveryDate: data.deliveryDate ? data.deliveryDate : [],
  //             files_from_expert: data.delivery_file ? data.delivery_file : [],
  //             proof_read_file: data.delivery_file
  //               ? data.delivery_file[data._id][
  //                   data.delivery_file[data._id].length - 1
  //                 ]
  //               : "",
  //             internal_rework: data.internal_rework ? data.internal_rework : [],
  //             internal_rework_date: data.internal_rework_date
  //               ? data.internal_rework_date
  //               : [],
  //             delivery_client_file: data.final_delivery
  //               ? data.final_delivery
  //               : "",
  //           });
  //         })
  //       : console.log("No Assignments");

  //     setAllAssignments(allAssignmentList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function _fetchAssignmentByID() {
    try {
      setAssignments([]);
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.get(
        apiUrl + "/assignment/fetch?_id=" + id,
        config
      );
      const data = response.data.assignmentData;
      assignmentList = [];
      data.length !== 0
        ? data.forEach((data, index) => {
            assignmentList.push({
              _id: data._id,
              student_name: "",
              order_placed: data.order_placed_time
                ? new Date(
                    data.order_placed_time[data.currentState]
                  ).toLocaleTimeString() +
                  ", " +
                  new Date(
                    data.order_placed_time[data.currentState]
                  ).toDateString()
                : "",
              order_confirmed: data.order_confirmed_time
                ? data.order_confirmed_time
                : "",
              subject: data.subject,
              status: data.status,
              assigned_sales: "",
              assigned_qc: data.assignedQC || "",
              assigned_expert: data.assignedExpert || "",
              instructionFile: data.descriptionFile[0] || "",
              client_deadline:
                new Date(data.deadline).toLocaleTimeString() +
                ", " +
                new Date(data.deadline).toDateString(),
              expertDeadline: data.expertDeadline ? data.expertDeadline : [],
              deliveryDate: data.deliveryDate ? data.deliveryDate : [],
              files_from_expert: data.delivery_file ? data.delivery_file : [],
              proof_read_file:
                data.currentState >= 7 && data.delivery_file
                  ? data.delivery_file[data._id][
                      data.delivery_file[data._id].length - 1
                    ]
                  : "",
              internal_rework: data.internal_rework ? data.internal_rework : [],
              internal_rework_date: data.internal_rework_date
                ? data.internal_rework_date
                : [],
              delivery_client_file: data.final_delivery
                ? data.final_delivery
                : "",
            });
          })
        : console.log("No Assignments");

      setAssignmentByID(assignmentList);
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchExcelData(data) {
    const excelList = data.map((val) => {
      const deliveryDate = val.deliveryDate[val._id].map((date) => {
        return date
          ? new Date(date).toLocaleTimeString() +
              " " +
              new Date(date).toDateString()
          : "";
      });
      const internal_rework_date =
        val.internal_rework_date[val._id] &&
        val.internal_rework_date[val._id].map((date) => {
          return date
            ? new Date(date).toLocaleTimeString() +
                " " +
                new Date(date).toDateString()
            : "";
        });
      const internal_rework =
        val.internal_rework[val._id] &&
        val.internal_rework[val._id].map((data) => {
          return [data.file, data.comment];
        });
      const delivery_client_file =
        val.delivery_client_file &&
        val.delivery_client_file.map((data) => {
          return data.url;
        });

      return {
        _id: val._id,
        assigned_expert: val.assigned_expert,
        assigned_qc: val.assigned_qc,
        client_deadline: val.client_deadline,
        deliveryDate: deliveryDate.toString(),
        delivery_client_file: delivery_client_file.toString(),
        expertDeadline: val.expertDeadline[val._id].toString(),
        files_from_expert:
          val.files_from_expert[val._id] &&
          val.files_from_expert[val._id].toString(),
        instructionFile: val.instructionFile,
        internal_rework: internal_rework && internal_rework.toString(),
        internal_rework_date:
          internal_rework_date && internal_rework_date.toString(),
        order_confirmed: val.order_confirmed,
        order_placed: val.order_placed,
        proof_read_file: val.proof_read_file,
        status: val.status,
        student_name: val.student_name,
        subject: val.subject,
      };
    });
    setExcelData(excelList);
  }

  const headers = [
    { label: "Task ID", key: "_id" },
    { label: "Student Name", key: "student_name" },
    { label: "Order Placed", key: "order_placed" },
    { label: "Order Confirmed", key: "order_confirmed" },
    { label: "Subject", key: "subject" },
    { label: "Status", key: "status" },
    { label: "Assignment Sales", key: "assigned_sales" },
    { label: "Assignment QC", key: "assigned_qc" },
    { label: "Assignment Expert", key: "assigned_expert" },
    { label: "Instruction File", key: "instructionFile" },
    { label: "Client Deadline", key: "client_deadline" },
    { label: "Expert Deadline", key: "expertDeadline" },
    { label: "Delivery Date/Time", key: "deliveryDate" },
    { label: "Files from Expert", key: "files_from_expert" },
    { label: "Proof Read File", key: "proof_read_file" },
    { label: "Internal Rework", key: "internal_rework" },
    { label: "Internal Rework Date", key: "internal_rework_date" },
    { label: "Delivered File(Client)", key: "delivery_client_file" },
  ];

  return (
    <>
      <Box
        padding={2}
        width={filterValue === "status" || filterValue === "id" ? "20%" : "10%"}
      >
        <HStack display="flex" justifyContent="space-between">
          <span style={{ width: "30%" }}>Filter By:</span>
          <Select
            onChange={async (e) => {
              setFilterValue(e.target.value);
            }}
            id="status"
            width="70%"
            defaultChecked={filterValue}
          >
            <option value="status">Status</option>
            <option value="id">ID</option>
          </Select>
        </HStack>
      </Box>
      {filterValue === "status" ? (
        <>
          <Box padding={2} width={filterValue === "status" ? "20%" : "10%"}>
            <HStack display="flex" justifyContent="space-between">
              <span style={{ width: "30%" }}>Choose Status:</span>
              <Select
                onChange={async (e) => {
                  setSelectedStatus(e.target.value);
                }}
                id="status"
                width="70%"
                value={selectedStatus}
              >
                <option value="">All Status</option>
                {status.length === 0 ? (
                  <></>
                ) : (
                  status.map((status, index) => (
                    <option value={index} key={index}>
                      {status}
                    </option>
                  ))
                )}
              </Select>
            </HStack>
            <HStack>
              <FormControl padding={2}>
                <FormLabel fontWeight={"bold"}>Start Date::</FormLabel>
                <HStack>
                  <Input
                    type="date"
                    id="date"
                    value={date.startDate}
                    onChange={(e) => {
                      setDate({
                        ...date,
                        startDate: e.target.value,
                      });
                    }}
                  />
                </HStack>
              </FormControl>
              <FormControl padding={2}>
                <FormLabel fontWeight={"bold"}>End Date::</FormLabel>
                <HStack>
                  <Input
                    type="date"
                    id="date"
                    value={date.endDate}
                    onChange={(e) => {
                      setDate({
                        ...date,
                        endDate: e.target.value,
                      });
                    }}
                  />
                </HStack>
              </FormControl>
            </HStack>
            {error && !showData && (
              <span style={{ color: "red" }}>
                ** Expert Deadline is mandatory
              </span>
            )}
            {/* {error && !showData && (
              <span style={{ color: "red" }}>
                ** Expert Selection is mandatory
              </span>
            )} */}
            <VStack
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection="row"
            >
              <Button
                marginTop="1rem"
                onClick={async (e) => {
                  setShowData(true);
                  // setAllData(false);
                  !date.startDate || !date.endDate
                    ? setError(true)
                    : setError(false);
                  await _fetchAssignments();
                }}
              >
                Show Data
              </Button>
              {/* <Button
                marginTop="1rem"
                onClick={async (e) => {
                  setAllData(true);
                  setShowData(false);
                  !selectedStatus ? setError(true) : setError(false);
                  await _fetchAllAssignments();
                }}
              >
                All Data
              </Button> */}
            </VStack>
          </Box>
          <Box mt="1rem">
            <Table
              variant="simple"
              marginBottom="2rem"
              size="md"
              display={{ base: "none", sm: "block", md: "block" }}
            >
              <Thead bgColor={"gray.200"} borderWidth="1px">
                <Tr>
                  <Th>ID</Th>
                  <Th>Student Name</Th>
                  <Th>Order Placed</Th>
                  <Th>Order Confirmed</Th>
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Assigned Sales</Th>
                  <Th>Assigned QC</Th>
                  <Th>Assigned Expert</Th>
                  <Th>Instruction File</Th>
                  <Th>Client Deadline</Th>
                  <Th>Expert Deadline</Th>
                  <Th>Delivery Date + Time</Th>
                  <Th>Files from Expert</Th>
                  <Th>Proof Read File</Th>
                  <Th>Internal Rework</Th>
                  <Th>Internal Rework Date</Th>
                  <Th>Delivered File(Client)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assignments.length !== 0 && !error ? (
                  <>
                    {showData ? (
                      assignments.map((assignment, index) => (
                        <Tr key={assignment._id} borderWidth="1px">
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            <Link
                              href={
                                "/admin/assignment_details/" + assignment._id
                              }
                            >
                              {assignment._id}
                            </Link>
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.student_name}
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.order_placed}
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.order_confirmed
                              ? new Date(
                                  assignment.order_confirmed
                                ).toLocaleTimeString() +
                                ", " +
                                new Date(
                                  assignment.order_confirmed
                                ).toDateString()
                              : ""}
                          </Td>
                          <Td
                            color={"red.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.subject}
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.status}
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            {assignment.assigned_sales}
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            {assignment.assigned_qc}
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            {assignment.assigned_expert}
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.instructionFile}
                          </Td>
                          <Td
                            color={"red.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            {assignment.client_deadline}
                          </Td>
                          <Td
                            color={"red.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            <ul>
                              {assignment.expertDeadline
                                ? assignment.expertDeadline[
                                    assignment._id
                                  ]?.map((date, index) => {
                                    return date ? (
                                      <li key={index}>
                                        {new Date(date).toLocaleTimeString() +
                                          ", " +
                                          new Date(date).toDateString()}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  })
                                : ""}
                            </ul>
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            <ul>
                              {assignment.deliveryDate &&
                                assignment.deliveryDate[assignment._id]?.map(
                                  (date, index) => {
                                    return date ? (
                                      <li key={index}>
                                        {new Date(date).toLocaleTimeString() +
                                          ", " +
                                          new Date(date).toDateString()}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  }
                                )}
                            </ul>
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            <ul>
                              {assignment.files_from_expert
                                ? assignment.files_from_expert[
                                    assignment._id
                                  ]?.map((data, index) => {
                                    return data ? (
                                      <li key={index}>{data}</li>
                                    ) : (
                                      ""
                                    );
                                  })
                                : ""}
                            </ul>
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            {assignment.proof_read_file}
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            <ul>
                              {assignment.internal_rework &&
                                assignment.internal_rework[assignment._id]?.map(
                                  (data, index) => {
                                    return data ? (
                                      <li key={index}>
                                        <Heading
                                          size="md"
                                          color={"red.600"}
                                          textDecoration="underline"
                                        >
                                          File:
                                        </Heading>
                                        {data.file}
                                        <br />
                                        <Heading
                                          size="md"
                                          color={"red.600"}
                                          textDecoration="underline"
                                        >
                                          Comment:
                                        </Heading>
                                        {data.comment}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  }
                                )}
                            </ul>
                          </Td>
                          <Td
                            color={"green.600"}
                            fontWeight={"semibold"}
                            borderWidth="1px"
                          >
                            <ul>
                              {assignment.internal_rework_date
                                ? assignment.internal_rework_date[
                                    assignment._id
                                  ]?.map((date, index) => {
                                    return date ? (
                                      <li key={index}>
                                        {new Date(date).toLocaleTimeString() +
                                          ", " +
                                          new Date(date).toDateString()}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  })
                                : ""}
                            </ul>
                          </Td>
                          <Td fontWeight={"semibold"} borderWidth="1px">
                            {assignment.delivery_client_file &&
                              assignment.delivery_client_file?.map((data) => {
                                return data.url;
                              })}
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <>
                        {/* {allAssignments.map((assignment, index) => (
                          <Tr key={assignment._id} borderWidth="1px">
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              <Link
                                href={
                                  "/admin/assignment_details/" + assignment._id
                                }
                              >
                                {assignment._id}
                              </Link>
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.student_name}
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.order_placed}
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.order_confirmed
                                ? new Date(
                                    assignment.order_confirmed
                                  ).toLocaleTimeString() +
                                  ", " +
                                  new Date(
                                    assignment.order_confirmed
                                  ).toDateString()
                                : ""}
                            </Td>
                            <Td
                              color={"red.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.subject}
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.status}
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              {assignment.assigned_sales}
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              {assignment.assigned_qc}
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              {assignment.assigned_expert}
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.instructionFile}
                            </Td>
                            <Td
                              color={"red.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              {assignment.client_deadline}
                            </Td>
                            <Td
                              color={"red.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              <ul>
                                {assignment.expertDeadline
                                  ? assignment.expertDeadline[
                                      assignment._id
                                    ]?.map((date, index) => {
                                      return date ? (
                                        <li key={index}>
                                          {new Date(date).toLocaleTimeString() +
                                            ", " +
                                            new Date(date).toDateString()}
                                        </li>
                                      ) : (
                                        ""
                                      );
                                    })
                                  : ""}
                              </ul>
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              <ul>
                                {assignment.deliveryDate &&
                                  assignment.deliveryDate[assignment._id]?.map(
                                    (date, index) => {
                                      return date ? (
                                        <li key={index}>
                                          {new Date(date).toLocaleTimeString() +
                                            ", " +
                                            new Date(date).toDateString()}
                                        </li>
                                      ) : (
                                        ""
                                      );
                                    }
                                  )}
                              </ul>
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              <ul>
                                {assignment.files_from_expert
                                  ? assignment.files_from_expert[
                                      assignment._id
                                    ]?.map((data, index) => {
                                      return data ? (
                                        <li key={index}>{data}</li>
                                      ) : (
                                        ""
                                      );
                                    })
                                  : ""}
                              </ul>
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              {assignment.proof_read_file}
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              <ul>
                                {assignment.internal_rework &&
                                  assignment.internal_rework[
                                    assignment._id
                                  ]?.map((data, index) => {
                                    return data ? (
                                      <li key={index}>
                                        <Heading
                                          size="md"
                                          color={"red.600"}
                                          textDecoration="underline"
                                        >
                                          File:
                                        </Heading>
                                        {data.file}
                                        <br />
                                        <Heading
                                          size="md"
                                          color={"red.600"}
                                          textDecoration="underline"
                                        >
                                          Comment:
                                        </Heading>
                                        {data.comment}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  })}
                              </ul>
                            </Td>
                            <Td
                              color={"green.600"}
                              fontWeight={"semibold"}
                              borderWidth="1px"
                            >
                              <ul>
                                {assignment.internal_rework_date
                                  ? assignment.internal_rework_date[
                                      assignment._id
                                    ]?.map((date, index) => {
                                      return date ? (
                                        <li key={index}>
                                          {new Date(date).toLocaleTimeString() +
                                            ", " +
                                            new Date(date).toDateString()}
                                        </li>
                                      ) : (
                                        ""
                                      );
                                    })
                                  : ""}
                              </ul>
                            </Td>
                            <Td fontWeight={"semibold"} borderWidth="1px">
                              {assignment.delivery_client_file &&
                                assignment.delivery_client_file?.map((data) => {
                                  return data.url;
                                })}
                            </Td>
                          </Tr>
                        ))} */}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Box>No Data</Box>
                  </>
                )}
              </Tbody>
            </Table>
            <VStack>
              {
                <Button
                  disabled={assignments.length !== 0 && !error ? false : true}
                >
                  <CSVLink
                    data={excelData}
                    headers={headers}
                    filename="ExpertAssignmentData"
                  >
                    Export Assignment
                  </CSVLink>
                </Button>
                // : (
                // <Button
                //   disabled={
                //     allAssignments.length !== 0 && !error ? false : true
                //   }
                // >
                //   <CSVLink
                //     data={allAssignments}
                //     headers={headers}
                //     filename="ExpertAssignmentData"
                //   >
                //     Export Assignment
                //   </CSVLink>
                // </Button>
                // )
              }
            </VStack>
          </Box>
        </>
      ) : (
        <>
          <Box padding={2} width={filterValue === "id" ? "20%" : "10%"}>
            <HStack display="flex" justifyContent="space-between">
              <span style={{ width: "30%" }}>Enter ID:</span>
              <Input
                width={"70%"}
                value={id}
                onChange={(e) => setID(e.target.value)}
                _focus={{
                  outline: "1px solid #eee",
                }}
              />
            </HStack>
            {error && !id && (
              <span style={{ color: "red" }}>
                ** Assignment ID is mandatory
              </span>
            )}

            <VStack
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              flexDirection="row"
            >
              <Button
                marginTop="1rem"
                onClick={async (e) => {
                  !id ? setError(true) : setError(false);
                  await _fetchAssignmentByID();
                }}
              >
                Show Data
              </Button>
            </VStack>
          </Box>
          <Box mt="1rem">
            <Table
              variant="simple"
              marginBottom="2rem"
              size="md"
              display={{ base: "none", sm: "block", md: "block" }}
            >
              <Thead bgColor={"gray.200"} borderWidth="1px">
                <Tr>
                  <Th>ID</Th>
                  <Th>Student Name</Th>
                  <Th>Order Placed</Th>
                  <Th>Order Confirmed</Th>
                  <Th>Subject</Th>
                  <Th>Status</Th>
                  <Th>Assigned Sales</Th>
                  <Th>Assigned QC</Th>
                  <Th>Assigned Expert</Th>
                  <Th>Instruction File</Th>
                  <Th>Client Deadline</Th>
                  <Th>Expert Deadline</Th>
                  <Th>Delivery Date + Time</Th>
                  <Th>Files from Expert</Th>
                  <Th>Proof Read File</Th>
                  <Th>Internal Rework</Th>
                  <Th>Internal Rework Date</Th>
                  <Th>Delivered File(Client)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {assignmentByID.length !== 0 && !error ? (
                  <>
                    {assignmentByID.map((assignment, index) => (
                      <Tr key={assignment._id} borderWidth="1px">
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          <Link
                            href={"/admin/assignment_details/" + assignment._id}
                          >
                            {assignment._id}
                          </Link>
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.student_name}
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.order_placed}
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.order_confirmed
                            ? new Date(
                                assignment.order_confirmed
                              ).toLocaleTimeString() +
                              ", " +
                              new Date(
                                assignment.order_confirmed
                              ).toDateString()
                            : ""}
                        </Td>
                        <Td
                          color={"red.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.subject}
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.status}
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          {assignment.assigned_sales}
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          {assignment.assigned_qc}
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          {assignment.assigned_expert}
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.instructionFile}
                        </Td>
                        <Td
                          color={"red.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          {assignment.client_deadline}
                        </Td>
                        <Td
                          color={"red.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          <ul>
                            {assignment.expertDeadline
                              ? assignment.expertDeadline[assignment._id]?.map(
                                  (date, index) => {
                                    return date ? (
                                      <li key={index}>
                                        {new Date(date).toLocaleTimeString() +
                                          ", " +
                                          new Date(date).toDateString()}
                                      </li>
                                    ) : (
                                      ""
                                    );
                                  }
                                )
                              : ""}
                          </ul>
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          <ul>
                            {assignment.deliveryDate &&
                              assignment.deliveryDate[assignment._id]?.map(
                                (date, index) => {
                                  return date ? (
                                    <li key={index}>
                                      {new Date(date).toLocaleTimeString() +
                                        ", " +
                                        new Date(date).toDateString()}
                                    </li>
                                  ) : (
                                    ""
                                  );
                                }
                              )}
                          </ul>
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          <ul>
                            {assignment.files_from_expert
                              ? assignment.files_from_expert[
                                  assignment._id
                                ]?.map((data, index) => {
                                  return data ? (
                                    <li key={index}>{data}</li>
                                  ) : (
                                    ""
                                  );
                                })
                              : ""}
                          </ul>
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          {assignment.proof_read_file}
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          <ul>
                            {assignment.internal_rework &&
                              assignment.internal_rework[assignment._id]?.map(
                                (data, index) => {
                                  return data ? (
                                    <li key={index}>
                                      <Heading
                                        size="md"
                                        color={"red.600"}
                                        textDecoration="underline"
                                      >
                                        File:
                                      </Heading>
                                      {data.file}
                                      <br />
                                      <Heading
                                        size="md"
                                        color={"red.600"}
                                        textDecoration="underline"
                                      >
                                        Comment:
                                      </Heading>
                                      {data.comment}
                                    </li>
                                  ) : (
                                    ""
                                  );
                                }
                              )}
                          </ul>
                        </Td>
                        <Td
                          color={"green.600"}
                          fontWeight={"semibold"}
                          borderWidth="1px"
                        >
                          <ul>
                            {assignment.internal_rework_date
                              ? assignment.internal_rework_date[
                                  assignment._id
                                ]?.map((date, index) => {
                                  return date ? (
                                    <li key={index}>
                                      {new Date(date).toLocaleTimeString() +
                                        ", " +
                                        new Date(date).toDateString()}
                                    </li>
                                  ) : (
                                    ""
                                  );
                                })
                              : ""}
                          </ul>
                        </Td>
                        <Td fontWeight={"semibold"} borderWidth="1px">
                          {assignment.delivery_client_file &&
                            assignment.delivery_client_file?.map((data) => {
                              return data.url;
                            })}
                        </Td>
                      </Tr>
                    ))}
                  </>
                ) : (
                  <>
                    <Box>No Data</Box>
                  </>
                )}
              </Tbody>
            </Table>
            <VStack>
              <Button
                disabled={assignmentByID.length !== 0 && !error ? false : true}
              >
                <CSVLink
                  data={excelData}
                  headers={headers}
                  filename="ExpertAssignmentData"
                >
                  Export Assignment
                </CSVLink>
              </Button>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
}

export default GetStatusExcelData;
