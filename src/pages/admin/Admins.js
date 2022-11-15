import {
    Table,
    Thead,
    TableContainer,
    TableCaption,
    Tbody,

    Tr,
    Th,
    Td,
    useDisclosure,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    Text,
    Button,
    IconButton
} from "@chakra-ui/react";
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from "@chakra-ui/icons";

function Admins() {
    const [operators, setOperators] = useState([]);

    let operatorList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchOperators();
        }, []);

    async function _fetchOperators() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.post(apiUrl + '/user/fetch',
                {
                    "role": "Admin"
                }, config);
            let data = response.data.res;
            operatorList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    operatorList.push({
                        id: data[index]._id,
                        name: data[index].name,
                        contact_no: data[index].contact_no,
                    });
                }
            }
            else {
                console.log("No Admins");
            }
            setOperators(operatorList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteOperator(id) {
        try {
            const response = await axios.get(apiUrl + '/user/delete?_id=' + id);
            if (response.data.success) {
                await _fetchOperators();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteOperator(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>

            <DeleteModal />
            <Table variant='simple' size="md" display={{ base: 'none', sm: 'block', md: 'block' }}   >

                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Contact Number</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {operators.map(
                        operator => <Tr key={operator.id}>
                            <Td fontWeight={'bold'}>{operator.id}</Td>
                            <Td>{operator.name}</Td>
                            <Td>{operator.contact_no}</Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(operator.id); onModalOpen(); }} />
                            </Td>
                        </Tr>

                    )}

                </Tbody>
            </Table>


            {/* accordion for mobile version  */}

            <div className='ShowSideClick admin' >
                {operators.map(function (operator) {
                    return (<>
                        <Accordion defaultIndex={[0]} allowMultiple display={{base:'block',sm:'none',md:'none'}}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Table>
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Td>{operator.name}</Td>
                                                </Tr>
                                            </Table>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>

                                <AccordionPanel pb={4}>
                                    {/* table  */}
                                    <TableContainer>
                                        <Table >

                                            <Tbody>
                                                <Tr key={operator.id}>
                                                    <Table>


                                                        <Tr>
                                                            <Th>Contact Number</Th>
                                                            <Td>{operator.contact_no}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Delete</Th>
                                                            <Td>

                                                                <IconButton
                                                                    icon={<DeleteIcon />}
                                                                    onClick={() => { setSelectedId(operator.id); onModalOpen(); }} />
                                                            </Td>
                                                        </Tr>
                                                    </Table>


                                                </Tr>

                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>)
                })
                }
            </div>


        </>
    );
}

export default Admins;