import { RepeatIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Link
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeadlinePopup from "./DeadlinePopup";

function AssignedExpertOrders() {
    const [assignments, setAssignments] = useState([]);

    //    expert deadline start
    const[showPopup,setShowPopup] = useState(false)
    const[indexVab,setIndexVab] = useState(null);
    const[expertdeadlineDate,setExpertdeadlineDate] = useState('')
    let assignmentList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchAssignments();
        }, []);

    async function removeExpert(index) {
        try {
            let userToken = localStorage.getItem('userToken');
            let userEmail = localStorage.getItem('userEmail');
            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.post(apiUrl + '/assignment/update',
                {
                    "_id": assignments[index].id,
                    "status": "CP1 Done",
                    "assignedExpert": "",
                    "assignedQC": userEmail
                },
                config
            )
            _fetchAssignments();
        } catch (error) {
            //console.log(error);
        }
    }
    function handlePopup(flag,index){
        setShowPopup(flag);
        setIndexVab(index);

    }

    async function _fetchAssignments() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.get(apiUrl + '/assignment/fetch?status=Expert%20Assigned', config);
            let data = response.data.assignmentData;
            assignmentList = [];
            console.log("fetching");
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    assignmentList.push({
                        id: data[index]._id,
                        assignedExpert: data[index].assignedExpert,
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
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString(),
                        expertDeadline: new Date(data[index].expertDeadline).toLocaleTimeString() + ", " + new Date(data[index].expertDeadline).toDateString()
                    });
                }
            }
            else {
                console.log("No Expert Asked Orders");
            }
            setAssignments(assignmentList);
            console.log(assignments);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Table variant='simple' size="md" display={{ base: 'none', sm: 'block', md: 'block' }}>
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Student Email</Th>
                        <Th>Subject</Th>
                        <Th>Amount Paid</Th>
                        <Th>Expert</Th>
                        <Th>Expert Deadline</Th>
                        <Th>Deadline</Th>
                        <Th>
                            <Button leftIcon={<RepeatIcon />} onClick={async () => {
                                await _fetchAssignments();
                            }}>
                                Refresh
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {assignments.map(
                        (assignment, index) => <Tr key={index}>
                            <Td fontWeight={'semibold'}><Link href={"/admin/assignment_details/" + assignment.id}>{assignment.id}</Link></Td>
                            <Td>{(localStorage.getItem('userRole') === 'Super Admin' || localStorage.getItem('userRole') === 'Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                            <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
                            <Td>{assignment.paid}</Td>
                            <Td>{assignment.assignedExpert}</Td>
                            <Td color={'red.600'} fontWeight={'semibold'} onClick={()=>handlePopup(true,index)}>
                        
                                {assignment.expertDeadline}
                              
                                </Td>
                            <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                            <Td>
                                <Button color={'red'} onClick={async () => removeExpert(index)}>Remove Expert</Button>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {
        showPopup===true?
        <DeadlinePopup showPopup={showPopup}
        setShowPopup={setShowPopup}
        expertdeadlineDate={expertdeadlineDate}
        setExpertdeadlineDate={setExpertdeadlineDate}
        index={indexVab}
        assignments={assignments}
        />:null
      }
      {console.log("expertdeadlinedate", expertdeadlineDate)}
            {/* accodion for mobile  */}
            <div className="ShowSideClick dummy">
                {assignments.map(
                    (assignment, index) =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Table>
                                                <Tr>
                                                    <Th>Id</Th>
                                                    <Td fontWeight={'semibold'}><Link href={"/admin/assignment_details/" + assignment.id}>{assignment.id}</Link></Td>
                                                </Tr>
                                            </Table>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={0}>
                                    <Table variant='simple' size="md">
                                        <Tbody className="paddZero">
                                            <Tr key={index}>
                                                <Table bgColor={'gray.100'}>
                                                    <Tr>
                                                        <Th>Student Email</Th>
                                                        <Td>{(localStorage.getItem('userRole') === 'Super Admin' || localStorage.getItem('userRole') === 'Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Subject</Th>
                                                        <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
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
                                                        <Td color={'red.600'} fontWeight={'semibold'}>{assignment.expertDeadline}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Deadline</Th>
                                                        <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td>
                                                            <Button color={'red'} onClick={async () => removeExpert(index)}>Remove Expert</Button>
                                                        </Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>
                                                            <Button leftIcon={<RepeatIcon />} onClick={async () => {
                                                                await _fetchAssignments();
                                                            }}>
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
                )}
            </div>
        </>
    );
}

export default AssignedExpertOrders;