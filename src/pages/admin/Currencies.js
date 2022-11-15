import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    IconButton,
    useDisclosure,
    Modal,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    Text,
    HStack,
    Spacer
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function Currencies() {
    const [currencies, setCurrencies] = useState([]);

    let currencyList = [];

    let navigate = useNavigate();

    useEffect(
        () => {
            _fetchCurrencies();
        }, []);

    async function _fetchCurrencies() {
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            const response = await axios.post(apiUrl + '/util/currency/fetch');
            let data = response.data.res;
            currencyList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    currencyList.push({
                        _id: data[index]._id,
                        INRFactor: data[index].INRFactor
                    });
                }
            }
            else {
                console.log("No Currencies");
            }
            setCurrencies(currencyList);
        } catch (err) {
            console.log(err);
        }
    }

    async function _addCurrency() {
        let currencyName = document.getElementById('currencyName');
        let currencyINRFactor = document.getElementById('currencyINRFactor');
        if (currencyName.value === '' || currencyINRFactor === '') {
            window.alert('Fill All Values');
        } else {
            try {
                const response = await axios.post(apiUrl + '/util/currency/new',
                    {
                        "_id": currencyName.value,
                        "INRFactor": currencyINRFactor.value
                    }
                )
                if (response.data.success) {
                    await _fetchCurrencies();
                    currencyName.value = '';
                    currencyINRFactor.value = '';
                }
            } catch (error) {

            }
        }
    }

    async function _deleteCurrency(id) {
        try {
            const response = await axios.get(apiUrl + '/util/currency/delete?_id=' + id);
            if (response.data.success) {
                await _fetchCurrencies();
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
                        <Button bgColor={'red'} color={'white'} onClick={async () => _deleteCurrency(selectedId)}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        );
    }

    return (
        <>
            <DeleteModal />
            <VStack>
                <Box maxW={'400px'}>
                    <FormControl id="subject">
                        <FormLabel margin={'10px'}>
                            <HStack>
                                <Text>New Currency</Text>
                                <Spacer />
                                <IconButton onClick={() => _addCurrency()} icon={<AddIcon />} />
                            </HStack>
                        </FormLabel>
                        <InputGroup flexDirection={'column'}>
                            <Input placeholder="ID" margin={'10px'} type="text" id="currencyName" />
                            <Input placeholder="INR Factor" margin={'10px'} type="text" id="currencyINRFactor" />
                        </InputGroup>
                    </FormControl>
                </Box>
                <Table variant='simple' size="lg">
                    <Thead bgColor={'gray.200'}>
                        <Tr>
                            <Th>Name</Th>
                            <Th>INR Factor</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currencies.map(
                            currency => <Tr key={currency._id}>
                                <Td fontWeight={'bold'}>{currency._id}</Td>
                                <Td>{currency.INRFactor}</Td>
                                <Td>
                                    <IconButton
                                        icon={<DeleteIcon />}
                                        onClick={() => { setSelectedId(currency._id); onModalOpen(); }} />
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </VStack>
        </>
    );
}

export default Currencies;