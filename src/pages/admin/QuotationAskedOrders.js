import { RepeatIcon } from "@chakra-ui/icons";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    HStack,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Link,
    Textarea,
    ModalFooter,
    InputLeftAddon,
    Input,
    InputGroup,
    FormLabel,
    FormControl,
    Spacer,
    Text
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../../services/contants";
import { useNavigate } from 'react-router-dom';

function QuotationAskedOrders() {
    const [assignments, setAssignments] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState();
    const [selectedIndexQuote, setSelectedIndexQuote] = useState();
    let selectedCost;

    let assignmentList = [];
    let quotesList = [];

    let navigate = useNavigate();

    const QuotesModalDis = useDisclosure();

    async function openQuotesModal(index) {
        setSelectedIndex(index);
        try {
            let userToken = localStorage.getItem("userToken");
            if (userToken == null) {
                navigate("/admin/login");
            }

            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.get(apiUrl + '/assignment/quotes/fetch?assignment_id=' + assignments[index].id, config
            );
            let data = await response.data.result.expertQuotations;
            quotesList = [];
            if (data.length !== 0) {
                for (let index = 0; index < data.length; index++) {
                    quotesList.push({
                        _id: data[index]._id,
                        name: data[index].name,
                        wordCount: data[index].wordCount,
                        cost: data[index].cost,
                        currency: data[index].currency,
                        comments: data[index].comments,
                    });
                }
            }
            else {
                console.log("No Experts Found");
            }
            setQuotes(quotesList);
        } catch (err) {
            console.log(err);
        }
        QuotesModalDis.onOpen();
    }


    function QuotesModal() {

        const ExpertQuoteGenerateModalDis = useDisclosure();

        async function openExpertQuoteGenerateModal(index) {
            selectedCost = index;
            ExpertQuoteGenerateModalDis.onOpen();
        }

        function ExpertQuoteGenerateModal() {
            const [quote, setQuote] = useState('');
            const [note, setNote] = useState('');
            return (
                <Modal
                    size={'2xl'}
                    onClose={ExpertQuoteGenerateModalDis.onClose}
                    isOpen={ExpertQuoteGenerateModalDis.isOpen}
                    onOpen={ExpertQuoteGenerateModalDis.onOpen}
                    isCentered
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader id="assId">{(quotes[selectedCost] !== undefined) ? "Expert Quotation: " + quotes[selectedCost].cost : ""}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl padding={2} id="expertDeadline">
                                <FormLabel fontWeight={'bold'}>Set Expert Deadline</FormLabel>
                                <HStack>
                                    <Input type="date" id='date' />
                                    <Input type="time" id='time' />
                                </HStack>
                            </FormControl>
                            <FormControl h={'full'} padding={2} id="quote">
                                <FormLabel fontWeight={'bold'}>Enter Quotation</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>
                                        <Text fontWeight={'bold'}>INR</Text>
                                    </InputLeftAddon>
                                    <Input
                                        type="number"
                                        value={quote}
                                        onChange={() => {
                                            let quoteElement = document.getElementById('quote');
                                            setQuote(quoteElement.value);
                                        }}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl h={'full'} padding={2}>
                                <FormLabel fontWeight={'bold'}>Note From Operator</FormLabel>
                                <Textarea
                                    id="note"
                                    value={note}
                                    onChange={() => {
                                        let noteElement = document.getElementById('note');
                                        setNote(noteElement.value);
                                    }}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Spacer />
                            <Button onClick={async () => {
                                try {
                                    let userEmail = localStorage.getItem("userEmail");
                                    console.log(userEmail);
                                    let userName = localStorage.getItem("userName");
                                    let userToken = localStorage.getItem("userToken");
                                    if (userToken == null) {
                                        navigate("/admin/login");
                                    }
                                    let config = {
                                        headers: { "Authorization": `Bearer ${userToken}` },
                                    }

                                    let dateElement = document.getElementById('date');
                                    let timeElement = document.getElementById('time');

                                    let splitDate = await dateElement.value.split("-");
                                    let year = splitDate[0];
                                    let month = splitDate[1];
                                    let day = splitDate[2];

                                    let splitTime = await timeElement.value.split(":");
                                    let hour = splitTime[0];
                                    let min = splitTime[1];
                                    let deadline = new Date(year, month - 1, day, hour, min, 0);
                                    let iso = deadline.toISOString()

                                    if (timeElement.value !== undefined && quote !== "") {
                                        const responseDeadline =
                                            await axios.post(
                                                apiUrl +
                                                '/assignment/update',
                                                {
                                                    "_id": assignments[selectedIndex].id,
                                                    "expertDeadline": iso
                                                }, config
                                            );
                                        const responseNote =
                                            await axios.post(apiUrl + '/assignment/comments/operatorToExpert',
                                                {
                                                    "assignmentId": assignments[selectedIndex].id,
                                                    "notesFromOperator": {
                                                        "_id": userEmail,
                                                        "name": userName,
                                                        "comment": note
                                                    }
                                                },
                                                config
                                            );
                                        const response =
                                            await axios.post(
                                                apiUrl +
                                                '/assignment/quote/generate',
                                                {
                                                    "_id": assignments[selectedIndex].id,
                                                    "quotation": quote,
                                                    "cp1": quote / 2
                                                },
                                                config
                                            );
                                        let resdata = response.data;
                                        if (resdata.success) {
                                            await _fetchAssignments();
                                            window.alert('Quote Generated');
                                            ExpertQuoteGenerateModalDis.onClose();
                                        }
                                    }
                                    else {
                                        window.alert("Fill Up Quote & Set Deadline Time")
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }}>Send Quote</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            );
        }

        return (
            <Modal
                size={'4xl'}
                onClose={QuotesModalDis.onClose}
                isOpen={QuotesModalDis.isOpen}
                onOpen={QuotesModalDis.onOpen}
                isCentered
            >
                <ExpertQuoteGenerateModal />
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Quotations</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table variant='simple' size="sm">
                            <Thead bgColor={'gray.200'}>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Word Count</Th>
                                    <Th>Currency</Th>
                                    <Th>Quotation</Th>
                                    <Th>Comments</Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {(quotes.length === 0) ? <></> : quotes.map(
                                    (quote, index) => <Tr key={quote._id}>
                                        <Td>{quote.name}</Td>
                                        <Td>{quote.wordCount}</Td>
                                        <Td>{quote.currency}</Td>
                                        <Td>{quote.cost}</Td>
                                        <Td maxW={'300px'}>{quote.comments}</Td>
                                        <Td>
                                            <HStack>
                                                <Button onClick={() => { openExpertQuoteGenerateModal(index); }}>Select Quote</Button>
                                            </HStack>
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

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
            const response = await axios.get(apiUrl + '/assignment/fetch?status=Quotation%20Asked', config);
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
                        deadline: new Date(data[index].deadline).toLocaleTimeString() + ", " + new Date(data[index].deadline).toDateString()
                    });
                }
            }
            else {
                console.log("No CP1 Pending Orders");
            }
            setAssignments(assignmentList);
            console.log(assignments);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <QuotesModal />
            <Table variant='simple' size="md">
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Student Email</Th>
                        <Th>Subject</Th>
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
                <Tbody>
                    {assignments.map(
                        (assignment, index) => <Tr key={assignment.id}>
                            <Td fontWeight={'semibold'}><Link href={"/admin/assignment_details/" + assignment.id}>{assignment.id}</Link></Td>
                            <Td>{(localStorage.getItem('userRole') === 'Super Admin' || localStorage.getItem('userRole') === 'Admin') ? assignment.client_id : assignment.client_id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                            <Td color={'green.600'} fontWeight={'semibold'}>{assignment.subject}</Td>
                            <Td color={'red.600'} fontWeight={'semibold'}>{assignment.deadline}</Td>
                            <Td>
                                <HStack>
                                    <Button
                                        display={(localStorage.getItem('userRole') === "Operator" || localStorage.getItem("userRole") === "Super Admin" || localStorage.getItem('userRole') === 'Admin') ? 'flex' : 'none'}
                                        onClick={async () => openQuotesModal(index)}>Quotes from Experts</Button>
                                </HStack>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
        </>
    );
}

export default QuotationAskedOrders;