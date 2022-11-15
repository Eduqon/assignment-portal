import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Link,
    useDisclosure,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    Text,
    IconButton
} from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import {
    Box,

    Tfoot,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';
// import Assignmentsmob from '../../components/sidebar/accodian-assignment'
// assignment show on mobile 
const clickk = () => {
    document.getElementsByClassName('clickShow')[0].style.display = 'block';
    // console.log(document.getElementsByClassName('clickShow')[0])
}
// end
function Assignments() {
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
            const response = await axios.get(apiUrl + '/assignment/fetch', config);
            let data = response.data.assignmentData;
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
                        cp1PaymentId: data[index].cp1PaymentId,
                        cp2PaymentId: data[index].cp2PaymentId,
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString(),
                        expertDeadline: new Date(data[index].expertDeadline).toLocaleTimeString() + ", " + new Date(data[index].expertDeadline).toDateString()
                    });
                }
            }
            else {
                console.log("No Orders");
            }
            setAssignments(assignmentList);
            console.log(assignments);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteAssignment(id) {
        let userToken = localStorage.getItem("userToken");
        if (userToken == null) {
            navigate("/admin/login");
        }

        let config = {
            headers: { "Authorization": `Bearer ${userToken}` },
        }
        try {
            const response = await axios.get(apiUrl + '/assignment/delete?_id=' + id, config);
            if (response.data.success) {
                await _fetchAssignments();
                onModalClose();
                setSelectedId('');
            }
        } catch (error) {

        }
    }

    const [selectedId, setSelectedId] = useState('');

    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose
    } = useDisclosure();

    function DeleteModal() {
        return (
            <Modal
                onClose={onModalClose}
                isOpen={isModalOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedId}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to delete?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteAssignment(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>



            <DeleteModal />
            <Table variant='simple' size="md" display={{ base: 'none', sm: 'block', md: 'block' }}>
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Student Email</Th>
                        <Th>Subject</Th>
                        <Th>Order Quote</Th>
                        <Th>Amount Paid</Th>
                        {
                            (localStorage.getItem('userRole') === 'Admin') ? <></> : <> <Th>CP1 Payment ID</Th>
                                <Th>CP2 Payment ID</Th></>
                        }
                        <Th>
                            <Button leftIcon={<AddIcon />} onClick={() => {
                                window.open('/');
                            }}>
                                New Assignment
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
                            {
                                ((localStorage.getItem('userRole') === 'Admin') ? <></> : <> <Td color={(assignment.cp1PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp1PaymentId}</Td>
                                    <Td color={(assignment.cp2PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp2PaymentId}</Td>
                                </>)
                            }
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(assignment.id); onModalOpen(); }} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>

            {/* accodion start for mob table my adding */}
            {/* <Assignmentsmob /> */}
            <div className="ShowSideClick active">
                {assignments.map(
                    assignment =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem p='0'>
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
                                <AccordionPanel p={0}>
                                    <DeleteModal />
                                    <Table variant='simple' size="md">
                                        <Tbody>
                                            <Tr key={assignment.id}>
                                                <Table bgColor={'gray.100'} className="pa-zer">

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

                                                        {
                                                            (localStorage.getItem('userRole') === 'Admin') ? <></> : <> <Th>CP1 Payment ID</Th>
                                                                {/* <Th>CP2 Payment ID</Th> */}
                                                            </>
                                                        }
                                                        {
                                                            ((localStorage.getItem('userRole') === 'Admin') ? <></> : <> <Td color={(assignment.cp1PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp1PaymentId}</Td>
                                                                {/* <Td color={(assignment.cp2PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp2PaymentId}</Td> */}
                                                            </>)
                                                        }
                                                    </Tr>
                                                    <Tr>

                                                        {
                                                            (localStorage.getItem('userRole') === 'Admin') ? <></> : <>
                                                                {/* <Th>CP1 Payment ID</Th> */}
                                                                <Th>CP2 Payment ID</Th>
                                                            </>
                                                        }
                                                        {
                                                            ((localStorage.getItem('userRole') === 'Admin') ? <></> : <>
                                                                {/* <Td color={(assignment.cp1PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp1PaymentId}</Td> */}
                                                                <Td color={(assignment.cp2PaymentId === 'External Payment') ? 'red' : 'green'}>{assignment.cp2PaymentId}</Td>
                                                            </>)
                                                        }
                                                    </Tr>
                                                    <Tr>
                                                        <Td>
                                                            <IconButton
                                                                icon={<DeleteIcon />}
                                                                onClick={() => { setSelectedId(assignment.id); onModalOpen(); }} />
                                                        </Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Th>
                                                            <Button className="btn-Neww" leftIcon={<AddIcon />} onClick={() => {
                                                                window.open('/');
                                                            }}>
                                                                New Assignment
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
export default Assignments;
export { clickk };
