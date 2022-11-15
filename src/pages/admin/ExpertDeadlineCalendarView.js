import { Outlet } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../../../src/calendar.css'
import {
    HStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link
} from '@chakra-ui/react';
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../../services/contants";
import axios from "axios";

function ExpertDeadlineCalendarView() {
    const [assignments, setAssignments] = useState([]);

    let navigate = useNavigate();

    let assignmentList = [];

    useEffect(
        () => {
            _fetchAssignments(new Date());
        }, []);

    async function _fetchAssignments(dateValue) {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            let queryDate = dateValue;
            let startQueryDate = new Date(queryDate.setHours(0, 0, 0, 0));
            let endQueryDate = new Date(queryDate.setHours(24, 0, 0, 0));
            const response = await axios.post(apiUrl + '/assignment/fetch',
                {
                    "expertDeadline": {
                        "$gte": startQueryDate.toISOString(),
                        "$lt": endQueryDate.toISOString(),
                    }
                }, config
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
                        paid: data[index].paid,
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString(),
                        expertDeadline: new Date(data[index].expertDeadline).toLocaleTimeString() + ", " + new Date(data[index].expertDeadline).toDateString()
                    });
                }
            }
            else {
                console.log("No Orders");
            }
            setAssignments(assignmentList);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div display={{ base: 'none', sm: 'block', md: 'block' }}>
                <HStack marginBottom={'20px'} justifyContent={'center'}>
                    <Calendar onClickDay={(value) => { _fetchAssignments(value) }} />
                </HStack>
                <Table variant='simple' size="md" display={{ base: 'none', sm: 'block', md: 'block' }}>
                    <Thead bgColor={'gray.200'}>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Student Email</Th>
                            <Th>Subject</Th>
                            <Th>Amount Paid</Th>
                            <Th>Expert</Th>
                            <Th>Deadline</Th>
                            <Th>Expert Deadline</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {assignments.map(
                            assignment => <Tr key={assignment.id}>
                                <Td fontWeight={'semibold'}><Link href={"/admin/assignment_details/" + assignment.id}>{assignment.id}</Link></Td>
                                <Td>{(localStorage.getItem('userRole') === 'Super Admin' || localStorage.getItem('userRole') === 'Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                                <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
                                <Td>{assignment.paid}</Td>
                                <Td>{assignment.assignedExpert}</Td>
                                <Td fontWeight={'semibold'}>{assignment.deadline}</Td>
                                <Td color={'red.600'} fontWeight={'semibold'}>{assignment.expertDeadline}</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
                <Outlet />
            </div>
            {/* accordion for mobile version  */}
            <div display={{ base: 'block', sm: 'none', md: 'none' }}>
                {
                    assignments.map((assignment) => {

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
                                <AccordionPanel pb={4}>
                                    <TableContainer>
                                        <Table >
                                            <Tbody>

                                                <>
                                                    <Tr key={assignment.id}>
                                                        <Table>

                                                            <Tr>
                                                                <Th>Student Email</Th>
                                                                <Td>{(localStorage.getItem('userRole') === 'Super Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
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
                                                                <Td fontWeight={'semibold'}>{assignment.expertDeadline}</Td>
                                                            </Tr>
                                                            <Tr>
                                                                <Th>Deadline</Th>
                                                                <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                                                            </Tr>
                                                        </Table>
                                                    </Tr>
                                                </>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    })}



            </div>
        </>
    );
}

export default ExpertDeadlineCalendarView;