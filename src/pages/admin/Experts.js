import {
    Table,
    Thead,
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
    TableContainer,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from "@chakra-ui/icons";

function Experts() {
    const [experts, setExperts] = useState([]);

    let expertsList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchExperts();
        }, []);

    async function _fetchExperts() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.post(apiUrl + '/expert/fetch', config);
            let data = response.data.res;
            expertsList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    expertsList.push({
                        id: data[index]._id,
                        name: data[index].name,
                        contact_no: data[index].contact_no,
                        subject: data[index].subject
                    });
                }
            }
            else {
                console.log("No Experts");
            }
            setExperts(expertsList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteExpert(id) {
        try {
            const response = await axios.get(apiUrl + '/expert/delete?_id=' + id);
            if (response.data.success) {
                await _fetchExperts();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteExpert(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>
            <DeleteModal />
            <Table variant='simple' size="md" display={{ base: 'none ', sm: 'block', md: 'block' }}>
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Contact Number</Th>
                        <Th>Subject</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {experts.map(
                        expert => <Tr key={expert.id}>
                            <Td fontWeight={'bold'}>{expert.id}</Td>
                            <Td>{expert.name}</Td>
                            <Td>{expert.contact_no}</Td>
                            <Td>{expert.subject}</Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(expert.id); onModalOpen(); }} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {/* accordion for mobile version  */}
            <div className='ShowSideClick'>
                {/* <DeleteModal /> */}
                {experts.map(
                    expert =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                        <Table>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Td fontWeight={'bold'}>{expert.id}</Td>
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
                                                <Tr key={expert.id}>
                                                    <Table>
                                                        <Tr>
                                                            <Th>Name</Th>
                                                            <Td>{expert.name}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Contact Number</Th>
                                                            <Td>{expert.contact_no}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Delete</Th>
                                                            <Td>
                                                                <IconButton
                                                                    icon={<DeleteIcon />}
                                                                    onClick={() => { setSelectedId(expert.id); onModalOpen(); }} />
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
                           )}
            </div>
        </>
    );
}

export default Experts;
