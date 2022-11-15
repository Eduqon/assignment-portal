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

function QC() {
    const [qcs, setQcs] = useState([]);

    let qcList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchQcs();
        }, []);

    async function _fetchQcs() {
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
                    "role": "QC"
                }, config);
            let data = response.data.res;
            qcList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    qcList.push({
                        id: data[index]._id,
                        name: data[index].name,
                        contact_no: data[index].contact_no,
                    });
                }
            }
            else {
                console.log("No QC");
            }
            setQcs(qcList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteQc(id) {
        try {
            const response = await axios.get(apiUrl + '/user/delete?_id=' + id);
            if (response.data.success) {
                await _fetchQcs();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteQc(selectedId)}>Delete</Button>
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
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Contact Number</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {qcs.map(
                        qc => <Tr key={qc.id}>
                            <Td fontWeight={'bold'}>{qc.id}</Td>
                            <Td>{qc.name}</Td>
                            <Td>{qc.contact_no}</Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(qc.id); onModalOpen(); }} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {/* accordion for mobile version  */}
            <div className='ShowSideClick'>
                {qcs.map(
                    qc =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Table>
                                                <Tr>
                                                    <Th>ID</Th>
                                                    <Td fontWeight={'bold'}>{qc.id}</Td>
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
                                                <Tr key={qc.id}>
                                                    <Table>
                                                        <Tr>
                                                            <Th>Name</Th>
                                                            <Td>{qc.name}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Contact Number</Th>
                                                            <Td>{qc.contact_no}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Delete</Th>
                                                            <Td>
                                                                <IconButton
                                                                    icon={<DeleteIcon />}
                                                                    onClick={() => { setSelectedId(qc.id); onModalOpen(); }} />
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

export default QC;
