import { addDoc, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { ChatIcon, AddIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    IconButton,
    VStack,
    Box,
    Heading,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import { useState } from "react";

export default function AnonymousChat() {

    const [id, setId] = useState('');
    const [status, setStatus] = useState('requested');
    const [operatorId, setOperatorId] = useState('');
    const [chat, setChat] = useState([]);

    function generateUserId() {
        var id_elem = [];
        var dateObj = new Date();

        function convertToString(id_elem) {
            return id_elem.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        }

        id_elem[0] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        id_elem[1] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        id_elem[3] = convertToString(dateObj.getDate());
        id_elem[4] = convertToString(dateObj.getMonth());
        id_elem[5] = convertToString(dateObj.getFullYear()).slice(2, 4);

        return `${id_elem.join('')}`;
    }

    async function newAnnUser() {
        if (operatorId === "") {
            try {
                let tempId = generateUserId();
                const anon_client = await setDoc(doc(db, "anonymous_chat", tempId), {
                    operator: "",
                    time: Date.now()
                });
                setId(tempId);
                const unsub = onSnapshot(doc(db, "anonymous_chat", tempId), (doc) => {
                    console.log(doc.data().operator);
                    if (doc.data().operator !== '') {
                        setStatus('assigned');
                        setOperatorId(doc.data().operator);
                        fetchChat(tempId, doc.data().operator);
                    }
                });
            } catch (error) {
                //console.log(error);
            }
        }
    }

    async function fetchChat(client, operator) {
        try {
            const unsubChat = onSnapshot(doc(db, "chat", client + "_" + operator), (doc) => {
                console.log(doc.data().conversation);
                setChat(doc.data().conversation);
            });
        } catch (error) {
            //console.log(error);
        }
    }

    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <IconButton
                className="set-chat"
                    position='fixed'
                    
                    bottom='10px'
                    right='10px'
                    zIndex={1}
                    onClick={async () => { await newAnnUser() }}
                    colorScheme='white'
                    size='lg'
                    icon={<><p className="ml-4 set-bl">We're Online</p><button className="set-icon-design mr-1">Chat Now </button></>}
                />
            </PopoverTrigger>
            <PopoverContent>
                <VStack alignItems={'start'} minH={'500px'}>
                    <Box p={2} bgColor="gray.200" width={'100%'}>
                        <Heading fontSize={'xl'}>Chat with Sales</Heading>
                    </Box>
                    <VStack flexGrow={1} padding="2" width="100%" overflowY="scroll">
                        {(status === 'requested')
                            ?
                            <Box>
                                <Text>Connecting to an operator.....</Text>
                            </Box>
                            :
                            chat.map(
                                (messageItem, index) => <Box
                                    display={(messageItem.type === 'TEXT') ? "flex" : "none"}
                                    alignSelf={(messageItem.user === id) ? "flex-end" : "flex-start"}
                                    flexWrap={true}
                                    padding={2}
                                    borderRadius={'md'}
                                    maxWidth="70%"
                                    bgColor={(messageItem.user === id) ? 'blue.100' : 'green.100'}
                                    key={index}>
                                    <VStack maxWidth="100%" overflowWrap={'break-word'}>
                                        <Text maxWidth={'100%'}>{messageItem.msg}</Text>
                                    </VStack>
                                </Box>
                            )}
                    </VStack>
                    <InputGroup p={1} display={(status === 'requested') ? 'none' : 'flex'}>
                        <Input
                            type="text"
                            id="addChat"
                        />
                        <InputRightElement h={'full'}>
                            <Button id='sendButton' onClick={async () => {
                                let Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                                let textInput = document.getElementById('addChat');
                                if (textInput.value !== '' && textInput.value !== undefined) {
                                    if (Regex.test(textInput.value)) {
                                        window.alert("You are not allowed to share phone numbers through the chat")
                                    } else {
                                        const message = await updateDoc(doc(db, "chat", id + '_' + operatorId), {
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
                                <AddIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>
            </PopoverContent>
        </Popover >
    );
}