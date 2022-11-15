import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Link,
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
import { apiUrl } from "../../services/contants";
import { useNavigate } from "react-router-dom";
import { updateAssignment } from "../../services/functions/assignmentFun";
import DeadlinePopup from "./DeadlinePopup";

function CP1PendingOrders() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [assignments, setAssignments] = useState([]);
  const [asId, setAsId] = useState("");
  const [paid, setPaid] = useState("");



  let assignmentList = [];

  let navigate = useNavigate();

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
      // if ()
      //   const response = await axios.post(apiUrl + '/assignment/fetch',
      //     {
      //       "status": {
      //         "$in": ["Fresh Order", "Quotation Asked", "Doability Asked",]
      //       }
      //     },
      //     config
      //   );
      const response = await axios.get(
        apiUrl + "/assignment/fetch?status=CP1%20Pending",
        config
      );
      let data = response.data.assignmentData;
      console.log(data, 'check data')
      assignmentList = [];
      console.log("fetching");
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
            expertDeadline:
              new Date(data[index].expertDeadline).toLocaleTimeString() +
              ", " +
              new Date(data[index].expertDeadline).toDateString(),
          });
        }
      } else {
        console.log("No CP1 Pending Orders");
      }
      setAssignments(assignmentList);
      console.log(assignments);
    } catch (err) {
      console.log(err);
    }
  }
  const addToDone = async () => {
    
    console.log("add to Done function started.....");
    console.log(paid, "paid");
    console.log(asId, "asid");
    if (paid.trim().length > 0) {
      let data = {
        _id: asId,
        status: "CP1 Done",
        paid: paid,
      };
      let response = await updateAssignment(JSON.stringify(data));
      console.log(response , 'res')
      if (response.success) {
        _fetchAssignments();
        onClose();
      }
    } else {
      alert("Please Fill the Amount Paid Field");
    }
  };
  // My Work

  // const ExpertModalDis = useDisclosure();
  // const [selectedIndex, setSelectedIndex] = useState();
  // const [subjects, setSubjects] = useState([]);
  // const [experts, setExperts] = useState([]);
  // let expertList = [];
  // async function fetchExperts(subject) {
  //   try {
  //     const response = await axios.post(apiUrl + '/expert/fetch',
  //       (subject === '') ?
  //         {} :
  //         {
  //           "subject": subject
  //         }
  //     );
  //     let data = await response.data.res;
  //     expertList = [];
  //     if (data.length !== 0) {
  //       for (let index = 0; index < data.length; index++) {
  //         expertList.push({
  //           _id: data[index]._id,
  //           name: data[index].name,
  //           subject: data[index].subject,
  //         });
  //       }
  //     }
  //     else {
  //       console.log("No Experts Found");
  //     }
  //     setExperts(expertList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }



  // async function openExpertModal(index) {
  //   setSelectedIndex(index);
  //   console.log(selectedIndex, 'index')
  //   await fetchExperts('');
  //   ExpertModalDis.onOpen();
  // }
  // function ExpertModal() {
  //   let checkedListTemp = [];

  //   return (
  //     <Modal
  //       size={'xl'}
  //       onClose={ExpertModalDis.onClose}
  //       isOpen={ExpertModalDis.isOpen}
  //       onOpen={ExpertModalDis.onOpen}
  //       isCentered
  //     >
  //       <ModalOverlay />
  //       <ModalContent maxH={'500px'} overflowY='scroll'>
  //         <ModalHeader>Choose Expert</ModalHeader>
  //         <ModalCloseButton />
  //         <ModalBody>
  //           <Select onChange={async (e) => { await fetchExperts(e.target.value) }} id='subject'>
  //             <option value=''>All Subjects</option>
  //             {
  //               (subjects.length === 0) ? <></> : subjects.map((subject, index) => <option value={subject._id} key={index}>{subject._id}</option>)
  //             }
  //           </Select>
  //           <Table marginTop={2} variant='simple' size="sm">
  //             <Thead bgColor={'gray.200'}>
  //               <Tr>
  //                 <Th>ID</Th>
  //                 <Th>Name</Th>
  //                 <Th>Subject</Th>
  //                 <Th></Th>
  //               </Tr>
  //             </Thead>
  //             <Tbody>
  //               {(experts.length === 0) ? <></> : experts.map(
  //                 (expert, index) => <Tr key={expert._id}>
  //                   <Td fontWeight={'semibold'}>{expert._id}</Td>
  //                   <Td>{expert.name}</Td>
  //                   <Td>{expert.subject}</Td>
  //                   <Td>
  //                     <Checkbox
  //                       className="expertCheckBox"
  //                       value={expert._id}
  //                       onChange={(e) => { (e.target.checked) ? checkedListTemp.push(e.target.value) : checkedListTemp.splice(checkedListTemp.indexOf(e.target.value)) }}
  //                     />
  //                   </Td>
  //                 </Tr>
  //               )}
  //             </Tbody>
  //           </Table>
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button onClick={async () => {
  //             let userToken = localStorage.getItem("userToken");
  //             if (userToken == null) {
  //               navigate("/admin/login");
  //             }

  //             let config = {
  //               headers: { "Authorization": `Bearer ${userToken}` },
  //             }
  //             try {
  //               const response = await axios.post(apiUrl + '/expert/quote/ask',
  //                 {
  //                   "expertIds": checkedListTemp,
  //                   "assignmentId": assignments[selectedIndex].id
  //                 },
  //                 config
  //               );
  //               let resdata = response.data;
  //               if (resdata.success) {
  //                 window.alert('Quotation Asked');
  //                 ExpertModalDis.onClose();
  //                 _fetchAssignments();
  //               }
  //             } catch (err) {
  //               console.log(err);
  //             }
  //           }}>Send Request</Button>
  //           <Spacer />
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal >
  //   );
  // }
  // end My Work
  return (
    <>
      {/* <ExpertModal /> */}
      {/* Modal */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add To CP Done</ModalHeader>
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
            <Th>Subject</Th>
            <Th>Order Quote</Th>
            <Th>Amount Paid</Th>
            <Th>Expert Deadline </Th>
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
              <Td>{assignment.quotation}</Td>
              <Td>{assignment.paid}</Td>
              <Td color={"red.600"} fontWeight={"semibold"} >
                {assignment.expertDeadline}
              </Td>
              <Td color={"red.600"} fontWeight={"semibold"}>
                {assignment.deadline}
              </Td>
              <Td fontWeight={'semibold'} color={(assignment.status === 'Fresh Order') ? 'green' : (assignment.status === "Doability Asked") ? 'orange' : 'red'}>{assignment.status}</Td>
              <Td>
                <Button
                  onClick={() => {
                    onOpen();
                    setAsId(assignment.id);
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
          ))}
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
