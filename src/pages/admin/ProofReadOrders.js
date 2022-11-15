import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
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
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';

function ProofReadOrders() {
    const [assignments, setAssignments] = useState([]);

    let assignmentList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchAssignments();
        }, []);

    async function _fetchAssignments() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.get(apiUrl + '/assignment/fetch?status=Proof%20Read', config);
            let data = response.data.assignmentData;
            assignmentList = [];
            console.log("fetching");
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
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString(),
                        expertDeadline: new Date(data[index].expertDeadline).toLocaleTimeString() + ", " + new Date(data[index].expertDeadline).toDateString()
                    });
                }
            }
            else {
                console.log("No Proof Read Orders");
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
                        <Th>Order Quote</Th>
                        <Th>Amount Paid</Th>
                        <Th>Expert Deadline</Th>
                        <Th>Deadline</Th>
                        <Th>Assigned QC</Th>
                        <Th>
                            <Button leftIcon={<RepeatIcon />} onClick={async () => {
                                await _fetchAssignments();
                            }}>
                                Refresh
                            </Button>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {assignments.map(
                        assignment => <Tr key={assignment.id}>
                            <Td fontWeight={'semibold'}><Link href={"/admin/assignment_details/" + assignment.id}>{assignment.id}</Link></Td>
                            <Td>{(localStorage.getItem('userRole') === 'Super Admin' || localStorage.getItem('userRole') === 'Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                            <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
                            <Td>{assignment.quotation}</Td>
                            <Td>{assignment.paid}</Td>
                            <Td color={'red.600'} fontWeight={'semibold'}>{assignment.expertDeadline}</Td>
                            <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                            <Td>{assignment.assignedQC}</Td>
                            {/* <Td><Button>Choose Expert</Button></Td> */}
                        </Tr>
                    )}
                </Tbody>
            </Table>

            {/* // accordion for mobile  */}
            <div className="ShowSideClick">
                {assignments.map(
                    assignment =>
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
                                        <Tbody>
                                            <Tr key={assignment.id}>
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
                                                        <Th>Order Quote</Th>
                                                        <Td>{assignment.quotation}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>Amount Paid</Th>
                                                        <Td>{assignment.paid}</Td>
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
                                                        <Th>Assigned QC</Th>
                                                        <Td>{assignment.assignedQC}</Td>
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
                                                {/* <Td><Button>Choose Expert</Button></Td> */}
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

export default ProofReadOrders;