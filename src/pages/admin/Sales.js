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

function Sales() {
    const [sales, setSales] = useState([]);

    let salesList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchSales();
        }, []);

    async function _fetchSales() {
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
                    "role": "Sales"
                }, config);
            let data = response.data.res;
            salesList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    salesList.push({
                        id: data[index]._id,
                        name: data[index].name,
                        contact_no: data[index].contact_no,
                    });
                }
            }
            else {
                console.log("No Sales");
            }
            setSales(salesList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteSales(id) {
        try {
            const response = await axios.get(apiUrl + '/user/delete?_id=' + id);
            if (response.data.success) {
                await _fetchSales();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteSales(selectedId)}>Delete</Button>
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
                    {sales.map(
                        sale => <Tr key={sale.id}>
                            <Td fontWeight={'bold'}>{sale.id}</Td>
                            <Td>{sale.name}</Td>
                            <Td>{sale.contact_no}</Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(sale.id); onModalOpen(); }} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {/* accordion for mobile version  */}
            <div className='ShowSideClick'>
                {sales.map(
                    sale =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            <Table>
                                                <Tr>
                                                    <Th>ID</Th>
                                                    <Td fontWeight={'bold'}>{sale.id}</Td>
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
                                                <Tr key={sale.id}>
                                                    <Table>
                                                       
                                                        <Tr>
                                                            <Th>Name</Th>
                                                            <Td>{sale.name}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Contact Number</Th>
                                                            <Td>{sale.contact_no}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Delete</Th>
                                                            <Td>
                                                                <IconButton
                                                                    icon={<DeleteIcon />}
                                                                    onClick={() => { setSelectedId(sale.id); onModalOpen(); }} />
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

export default Sales;