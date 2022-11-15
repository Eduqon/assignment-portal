import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    TableCaption,
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
// vendor show on mobile 
const VendorShow = () => {
    //    document.getElementsByClassName('Vendors')[0].style.display='block';
    document.write('VENDRO');
}
// end
function Vendors() {
    const [vendors, setVendors] = useState([]);

    let vendorList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchVendors();
        }, []);

    async function _fetchVendors() {
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
                    "role": "Vendor"
                }, config);
            let data = response.data.res;
            vendorList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    vendorList.push({
                        id: data[index]._id,
                        name: data[index].name,
                        contact_no: data[index].contact_no,
                        referralCode: data[index].referralCode
                    });
                }
            }
            else {
                console.log("No Vendors");
            }
            setVendors(vendorList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _deleteVendor(id) {
        try {
            const response = await axios.get(apiUrl + '/user/delete?_id=' + id);
            if (response.data.success) {
                await _fetchVendors();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteVendor(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>
            <DeleteModal />
            <Table variant='simple' size="md" className="Vendors" display={{ base: 'none', sm: 'block', md: 'block' }} >
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Contact Number</Th>
                        <Th>Referral Code</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vendors.map(
                        vendor => <Tr key={vendor.id}>
                            <Td fontWeight={'bold'}>{vendor.id}</Td>
                            <Td>{vendor.name}</Td>
                            <Td>{vendor.contact_no}</Td>
                            <Td>{vendor.referralCode}</Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    onClick={() => { setSelectedId(vendor.id); onModalOpen(); }} />
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            {/* accordion for mobile version  */}
          
            <div  class='ShowSideClick'>
            <Accordion defaultIndex={[0]} allowMultiple  display={{ base: 'block', sm: 'none', md: 'none' }}>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                               vendor ID :-
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {/* table  */}
                        <TableContainer>
                            <Table >
                                <TableCaption>Imperial to metric conversion factors</TableCaption>
                                <Tbody>
                                    {vendors.map(
                                        vendor => <Tr key={vendor.id}>
                                            <Table>
                                                {/* <Tr>
                                                    <Td fontWeight={'bold'}>{vendor.id}</Td>
                                                </Tr> */}
                                                <Tr>
                                                    <Th>Name</Th>
                                                    <Td>{vendor.name}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Th>Contact Number</Th>
                                                    <Td>{vendor.contact_no}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Th>Referral Code</Th>
                                                    <Td>{vendor.referralCode}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Th>Delete</Th>
                                                    <Td>
                                                        <IconButton
                                                            icon={<DeleteIcon />}
                                                            onClick={() => { setSelectedId(vendor.id); onModalOpen(); }} />
                                                    </Td>
                                                </Tr>
                                            </Table>
                                            {/* <Td fontWeight={'bold'}>{vendor.id}</Td>
                                            <Td>{vendor.name}</Td>
                                            <Td>{vendor.contact_no}</Td>
                                            <Td>{vendor.referralCode}</Td>
                                            <Td>
                                                <IconButton
                                                    icon={<DeleteIcon />}
                                                    onClick={() => { setSelectedId(vendor.id); onModalOpen(); }} />
                                            </Td> */}
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            </div>
            
        </>
    );
}

export default Vendors;
export { VendorShow };