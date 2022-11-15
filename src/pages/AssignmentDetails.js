import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { apiUrl } from "../services/contants";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import {
    Button,
    Text,
    HStack,
    Link,
    Textarea,
    VStack,
    Box,
    Heading,
    Center,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftElement,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    ModalFooter,
    Select,
    FormControl
} from "@chakra-ui/react";
import { ArrowForwardIcon, AttachmentIcon } from "@chakra-ui/icons";

function AssignmentDetailsClient() {
    const [assignment, setAssignment] = useState();
    const [loading, setLoading] = useState(true);
    const [salesChat, setSalesChat] = useState([]);

    const [id, setId] = useState('');
    const [operatorId, setChatOperatorId] = useState('')
    const [salesId, setChatSalesId] = useState('');

    let params = useParams();
    let navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const inputFileSalesClient = useRef(null);
    const [token, setToken] = useState('');

    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState({
        _id: "INR",
        INRFactor: "1"
    });

    let currencyList = [];

    useEffect(
        () => {
            _fetchAssignmentDetails();
        }, []);

    async function _fetchCurrencies() {
        try {
            let clientToken = localStorage.getItem("clientToken");
            if (clientToken == null) {
                navigate("/");
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

    async function _fetchToken() {
        try {
            const response = await axios.get(apiUrl + '/util/sas-token?container_name=assignment-dscp');
            let data = response.data;
            if (data.success) {
                setToken(data.SASToken);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function _fetchAssignmentDetails() {
        try {
            let clientToken = localStorage.getItem("clientToken");
            if (clientToken == null) {
                navigate("/");
            }

            let config = {
                headers: { "Authorization": `Bearer ${clientToken}` },
            }
            const response = await axios.get(apiUrl + '/assignment/fetch?_id=' + params.assignmentID, config);
            let data = await response.data.assignmentData;
            if (data.length !== 0) {
                setAssignment({
                    id: data[0]._id,
                    assignedExpert: data[0].assignedExpert,
                    assignedOperator: data[0].assignedOperator,
                    assignedSales: data[0].assignedSales,
                    client_id: data[0].client_id,
                    subject: data[0].subject,
                    status: data[0].status,
                    quotation: data[0].quotation,
                    currencyOfQuote: data[0].currencyOfQuote,
                    createdAt: new Date(data[0].createdAt).toLocaleTimeString() + ", " + new Date(data[0].createdAt).toDateString(),
                    expertDeadline: (data[0].expertDeadline) ? new Date(data[0].expertDeadline).toLocaleTimeString() + ", " + new Date(data[0].expertDeadline).toDateString() : '',
                    level: data[0].level,
                    reference: data[0].reference,
                    description: data[0].description,
                    descriptionFile: data[0].descriptionFile,
                    numOfPages: data[0].numOfPages,
                    paid: data[0].paid,
                    deadline: new Date(data[0].deadline).toLocaleTimeString() + ", " + new Date(data[0].deadline).toDateString()
                });
                setChatOperatorId(data[0].assignedOperator);
                setChatSalesId(data[0].assignedSales);
                // await _fetchChat(data[0].assignedOperator, data[0]._id);
                await _fetchSalesChat(data[0].assignedSales, data[0]._id);
                await _fetchCurrencies();
                await _fetchToken();
            }
            else {
                console.log("Assignment Not Found");
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const ReworkModalDis = useDisclosure();

    async function openReworkModal() {
        ReworkModalDis.onOpen();
    }

    function ReworkModal() {

        return (
            <Modal
                size={'2xl'}
                onClose={ReworkModalDis.onClose}
                isOpen={ReworkModalDis.isOpen}
                onOpen={ReworkModalDis.onOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rework Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup flexDirection={'column'}>
                            <FormLabel>Add Comments For Experts</FormLabel>
                            <Textarea
                                id="reworkComment">
                            </Textarea>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { sendForRework(); }}>Send</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }

    async function sendForRework() {
        let reworkComments = document.getElementById('reworkComment');
        if (reworkComments.value === '') {
            window.alert("Add a comment");
        }
        else {
            try {
                let clientToken = localStorage.getItem('clientToken');
                let config = {
                    headers: { "Authorization": `Bearer ${clientToken}` },
                }
                const response = await axios.post(apiUrl + '/assignment/update',
                    {
                        "_id": assignment.id,
                        "status": "Client Rework",
                        "clientComments": reworkComments.value
                    },
                    config
                )
                _fetchAssignmentDetails();
                ReworkModalDis.onClose();
            } catch (error) {
                //console.log(error);
            }
        }
    }

    async function _fetchSalesChat(salesEmail, assignment_id) {
        if (salesEmail !== undefined) {
            let clientEmail = localStorage.getItem("clientEmail");
            setId(clientEmail);
            try {
                const chatName = clientEmail + "_" + salesEmail + "_" + assignment_id;
                const chatDoc = await getDoc(doc(db, "chat", chatName));
                const unsubChat = onSnapshot(doc(db, "chat", chatName), (doc) => {
                    setSalesChat(doc.data().conversation);
                });
            } catch (error) {

            }
        }
    }

    async function _addToSalesQueue() {
        let clientEmail = localStorage.getItem("clientEmail");
        try {
            const anon_client = await setDoc(doc(db, "sales_chat", assignment.id), {
                sales: "",
                assignment: assignment.id,
                time: Date.now()
            });
            window.alert("Request Sent, Sales Will Respond Soon. Please Stay on this page.")
            const unsub = onSnapshot(doc(db, "sales_chat", assignment.id), (doc) => {
                console.log(doc.data().sales);
                if (doc.data().sales !== '') {
                    window.location.reload();
                }
            });
        } catch (error) {
            //console.log(error);
        }
    }

    if (loading) {
        return (
            <>
                <Center>Loading.....</Center>
            </>
        );
    }
    else {
        if (assignment == undefined) {
            return (
                <>
                    <h2>Invalid ID</h2>
                </>
            );
        }
        else {
            return (
                <VStack alignItems={'start'} margin={5}>
                    <ReworkModal />
                    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>File Upload</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                File is being uploaded, please wait..
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    <HStack>
                        <Select maxW={'100px'} id='currency' onChange={(e) => { setSelectedCurrency(currencies[e.target.value]) }}>
                            {currencies.map((currency, index) =>
                                <option key={index} value={index}>{currency._id}</option>
                            )}
                        </Select>
                        <Button onClick={async () => { navigate("/assignments"); }}>Back to Assignments</Button>
                        <Button
                            display={(salesId !== undefined) ? "none" : "flex"}
                            onClick={async () => { await _addToSalesQueue() }}>
                            Chat with Sales
                        </Button>
                        <Button
                            visibility={(assignment.status === 'CP2 Done') ? "visible" : "hidden"}
                            color={'red'}
                            onClick={async () => openReworkModal()}>
                            Send for Rework
                        </Button>
                    </HStack>
                    <HStack>
                        <Box borderWidth='1px' borderRadius='md' width={'xl'} >
                            <Box bgColor="gray.200" p={4}>
                                <Heading fontSize={'xl'}>Order Details</Heading>
                            </Box>
                            <VStack alignItems={'start'} margin={3} minH={'sm'} maxH={'sm'} overflowY={'scroll'}>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Ordered At:</Text>
                                    <Text>{assignment.createdAt}</Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Assignment ID:</Text>
                                    <Text>{assignment.id}</Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Subject:</Text>
                                    <Text>{assignment.subject}</Text>
                                </HStack>
                                <VStack padding={2} alignItems={'left'}>
                                    <Text fontWeight={'bold'}>Description:</Text>
                                    <Textarea width={'lg'} contentEditable={false} value={assignment.description} onChange={(e) => { console.log(e) }}>{assignment.description}</Textarea>
                                </VStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Level:</Text>
                                    <Text>{assignment.level}</Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Reference:</Text>
                                    <Text>{assignment.reference}</Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Pages:</Text>
                                    <Text>{assignment.numOfPages}</Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Deadline:</Text>
                                    <Text>{assignment.deadline}</Text>
                                </HStack>
                                <VStack padding={2} alignItems={'left'}>
                                    {
                                        (assignment.descriptionFile.length != 0) ? assignment.descriptionFile.map(
                                            (file, index) => <Link
                                                href={assignment.descriptionFile[index]}
                                                fontWeight={'bold'}
                                                color={'blue'}
                                                isExternal>
                                                {assignment.descriptionFile[index].substring(62)}
                                            </Link>
                                        ) : <></>
                                    }

                                </VStack>
                            </VStack>
                        </Box>
                        <Box borderWidth='1px' borderRadius='md' width={'xl'} >
                            <Box bgColor="gray.200" p={4}>
                                <Heading fontSize={'xl'}>Status & Quote</Heading>
                            </Box>
                            <VStack alignItems={'start'} margin={3} minH={'sm'} maxH={'sm'} overflowY={'scroll'}>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Current Status:</Text>
                                    <Text>
                                        {
                                            (assignment.status === "Fresh Order") ? "Order Under Review"
                                                : (assignment.status === "CP1 Pending") ? "1st Payment Link Sent"
                                                    : (assignment.status === "CP2 Pending") ? "2nd Payment Link Sent"
                                                        : (assignment.status === "CP2 Done") ? "Assignment Done"
                                                            : (assignment.status === "CP2 Pending") ? "2nd Payment Link Sent"
                                                                : "Work Underway"
                                        }
                                    </Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Quotation:</Text>
                                    <Text>
                                        {(assignment.quotation !== null) ? (selectedCurrency._id + ' ' + (parseFloat(assignment.quotation) * parseFloat(selectedCurrency.INRFactor)).toFixed(2)) : ''}
                                    </Text>
                                </HStack>
                                <HStack padding={2}>
                                    <Text fontWeight={'bold'}>Paid:</Text>
                                    <Text>
                                        {(assignment.paid !== null) ? (selectedCurrency._id + ' ' + (parseFloat(assignment.paid) * parseFloat(selectedCurrency.INRFactor)).toFixed(2)) : ''}
                                    </Text>
                                </HStack>
                            </VStack>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box visibility={(salesId !== undefined) ? "visible" : "hidden"} borderWidth='1px' borderRadius='md' width={'xl'}>
                            <Box p={4} bgColor="gray.200">
                                <Heading fontSize={'xl'}>Chat with Sales</Heading>
                            </Box>
                            <VStack alignItems={'start'} justifyContent={'space-between'} margin={3} minH={'sm'} maxH={'sm'}>
                                <VStack overflowY={'scroll'} alignItems={'start'} width={'100%'}>
                                    {
                                        salesChat.map(
                                            (messageItem, index) => <Box
                                                display={(messageItem.type === 'TEXT') ? "flex" : (messageItem.type === 'MEDIA') ? "flex" : "none"}
                                                alignSelf={(messageItem.user === id) ? "flex-end" : "flex-start"}
                                                flexWrap={true}
                                                padding={2}
                                                borderRadius={'md'}
                                                maxWidth="70%"
                                                bgColor={(messageItem.user === id) ? 'blue.100' : 'green.100'}
                                                key={index}>
                                                <VStack maxWidth="100%" overflowWrap={'break-word'}>
                                                    <Text display={(messageItem.type === 'TEXT') ? "flex" : 'none'} maxWidth={'100%'}>{messageItem.msg}</Text>
                                                    <Link color={'blue'} fontWeight={'bold'} display={(messageItem.type === 'MEDIA') ? "flex" : 'none'} maxWidth={'100%'} href={messageItem.msg}>{messageItem.msg.substring(62)}</Link>
                                                </VStack>
                                            </Box>
                                        )}
                                </VStack>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        id="addSalesChat"
                                    />
                                    <Input type='file' id='addFileSalesClient' onChange={async () => {
                                        let fileUrl = '';
                                        if (inputFileSalesClient) {
                                            onOpen();
                                            try {
                                                var config = {
                                                    method: 'put',
                                                    url: 'https://assignmentsanta.blob.core.windows.net/assignment-dscp/' + encodeURIComponent(inputFileSalesClient.current.files[0].name) + "?" + token,
                                                    headers: {
                                                        'x-ms-blob-type': 'BlockBlob'
                                                    },
                                                    data: inputFileSalesClient.current.files[0]
                                                };

                                                axios(config)
                                                    .then(async function (response) {
                                                        fileUrl = 'https://assignmentsanta.blob.core.windows.net/assignment-dscp/' + encodeURIComponent(inputFileSalesClient.current.files[0].name);
                                                        const message = await updateDoc(doc(db, "chat", id + '_' + salesId + "_" + assignment.id), {
                                                            conversation:
                                                                arrayUnion({
                                                                    msg: fileUrl,
                                                                    time: Date.now(),
                                                                    type: "MEDIA",
                                                                    user: id,
                                                                })
                                                        });
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });
                                            }
                                            catch (error) {
                                                console.log(error);
                                            }
                                            onClose();
                                        }
                                    }} ref={inputFileSalesClient} style={{ display: 'none' }} />
                                    <InputLeftElement h={'full'}>
                                        <Button id='attachButton' onClick={async () => {
                                            inputFileSalesClient.current.click();
                                        }}>
                                            <AttachmentIcon />
                                        </Button>
                                    </InputLeftElement>
                                    <InputRightElement h={'full'}>
                                        <Button id='sendButton' onClick={async () => {
                                            let Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                                            let textInput = document.getElementById('addSalesChat');
                                            if (textInput.value !== '' && textInput.value !== undefined) {
                                                if (Regex.test(textInput.value)) {
                                                    window.alert("You are not allowed to share phone numbers in the chat")
                                                } else {
                                                    const message = await updateDoc(doc(db, "chat", id + '_' + salesId + "_" + assignment.id), {
                                                        conversation:
                                                            arrayUnion({
                                                                msg: textInput.value,
                                                                time: Date.now(),
                                                                type: "TEXT",
                                                                user: id,
                                                            })
                                                    });
                                                }
                                            }
                                            textInput.value = '';
                                        }}>
                                            <ArrowForwardIcon />
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </VStack>
                        </Box>
                    </HStack>
                </VStack>
            );
        }
    }
}

export default AssignmentDetailsClient;