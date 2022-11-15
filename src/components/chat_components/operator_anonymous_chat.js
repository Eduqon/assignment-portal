import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
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
    InputGroup,
    Input,
    InputRightElement,
    Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AdminAnonymousChat(props) {

    const [status, setStatus] = useState('unassigned');
    const [chat, setChat] = useState([]);
    const [userId, setUserId] = useState('')
    const [input, setInput] = useState('');

    async function assignOperator() {
        let userEmail = localStorage.getItem('userEmail');
        setUserId(userEmail);
        try {
            const anon_clientRef = await getDoc(doc(db, "anonymous_chat", props.clientId));
            const anon_client = await setDoc(doc(db, "anonymous_chat", props.clientId), {
                operator: userEmail
            });
            if (anon_clientRef.data().operator !== "") {
                console.log("assigned");
                setStatus("assigned");
            } else {
                const chatName = props.clientId + "_" + userEmail;
                const chat = await setDoc(doc(db, "chat", chatName), {
                    conversation: [
                        {
                            msg: "Hi!! Please let us know how I can assist you today?",
                            time: Date.now(),
                            type: "TEXT",
                            user: userEmail,
                        }
                    ]
                });
                setStatus("assigned");
            }

            onSnapshot(doc(db, "chat", props.clientId + "_" + userEmail), (doc) => {
                setChat(doc.data().conversation);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <IconButton
                    onClick={async () => { await assignOperator() }}
                    colorScheme='blue'
                    size='lg'
                    icon={<ChatIcon />}
                />
            </PopoverTrigger>
            <PopoverContent>
                <VStack alignItems={'start'} minH={'500px'} maxH={'500px'}>
                    <Box p={2} bgColor="gray.200" width={'100%'}>
                        <Heading fontSize={'xl'}>Chat with Lead</Heading>
                    </Box>
                    <VStack flexGrow={1} padding="2" width="100%" overflowY="scroll">
                        {(status === 'unassigned')
                            ?
                            <Box>
                                <Text>Connecting to an user.....</Text>
                            </Box>
                            :
                            chat.map(
                                (messageItem, index) => <Box
                                    display={(messageItem.type === 'TEXT') ? "flex" : "none"}
                                    alignSelf={(messageItem.user === userId) ? "flex-end" : "flex-start"}
                                    flexWrap={true}
                                    padding={2}
                                    borderRadius={'md'}
                                    maxWidth="70%"
                                    bgColor={(messageItem.user === userId) ? 'blue.100' : 'green.100'}
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
                            id="props.clientId"
                            value={input}
                            onChange={(e) => { setInput(e.target.value) }}
                        />
                        <InputRightElement h={'full'}>
                            <Button id='sendButton' onClick={async () => {
                                if (input !== '' && input !== undefined) {
                                    let Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
                                    if (Regex.test(input)) {
                                        window.alert("Sending Phone Numbers through Chat is not allowed");
                                    } else {
                                        const message = await updateDoc(doc(db, "chat", props.clientId + '_' + userId), {
                                            conversation:
                                                arrayUnion({
                                                    msg: input,
                                                    time: Date.now(),
                                                    type: "TEXT",
                                                    user: userId,
                                                })
                                        });
                                    }
                                }
                                setInput('');
                            }}>
                                <AddIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>
            </PopoverContent>
        </Popover>
    );
}