import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
} from "@chakra-ui/react";
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { query, onSnapshot, collection, doc, orderBy, setDoc, where } from 'firebase/firestore';
import { db } from "../../services/firebase";
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../../services/contants";
import axios from "axios";

function SalesChatQueue() {

    const [users, setUsers] = useState([]);
    const [listening, setListening] = useState(false);
    let navigate = useNavigate();

    async function assignSales(client, assignment) {
        let userEmail = localStorage.getItem('userEmail');
        try {
            const anon_client = await setDoc(doc(db, "sales_chat", assignment), {
                sales: userEmail
            });
            const chatName = client + "_" + userEmail + "_" + assignment;
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
            let userToken = localStorage.getItem('userToken');
            let config = {
                headers: { "Authorization": `Bearer ${userToken}` },
            }
            const response = await axios.post(apiUrl + '/assignment/update',
                {
                    "_id": assignment,
                    "assignedSales": userEmail
                },
                config
            )
            navigate(`/admin/assignment_details/${assignment}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!listening) {
            const q = query(collection(db, "sales_chat"), orderBy("time", "desc"), where("time", ">=", (Date.now() - 1800000)));
            const unsub = onSnapshot(q, (querySnapshot) => {
                const queue = [];
                querySnapshot.forEach((doc) => {
                    queue.push(doc);
                });
                setUsers(queue);
            });
            setListening(true);
        }
    }, [listening, users]);

    return (
        <>
            <Table variant='simple' size="md" display={{ base: 'none', sm: 'block', md: 'block' }}>
                <Thead bgColor={'gray.200'}>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Assigned Sales</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {(users.length === 0) ? <></> : users.map(
                        (user, index) =>
                            <Tr visibility={(user.data().sales === "") ? "visible" : "collapse"} key={user.id}>
                                <Td fontWeight={'semibold'}>{(localStorage.getItem('userRole') === 'Super Admin') ? user.id : user.id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                                <Td>{user.data().sales}</Td>
                                <Td>
                                    <Button onClick={async () => {
                                        await assignSales(
                                            user.id,
                                            user.data().assignment
                                        )
                                    }}>Resolve</Button>
                                </Td>
                            </Tr>
                    )}
                </Tbody>
            </Table>
            {/* accordion for mobile version  */}
            <div className='ShowSideClick'>
                {(users.length === 0) ? <></> : users.map(
                    (user, index) =>
                        <Accordion defaultIndex={[0]} allowMultiple display={{ base: 'block', sm: 'none', md: 'none' }}>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Sales  Chat Queue
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>

                                    <TableContainer>
                                        <Table >
                                            <Tbody>
                                                <Tr visibility={(user.data().sales === "") ? "visible" : "collapse"} key={user.id}>
                                                    <Table>
                                                        <Tr>
                                                            <Th>ID</Th>
                                                            <Td fontWeight={'semibold'}>{(localStorage.getItem('userRole') === 'Super Admin') ? user.id : user.id.substring(0, 2) + '****' + '@' + '****' + '.com'}</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Th>Assigned Sales</Th>
                                                            <Td>{user.data().sales}</Td>
                                                        </Tr>
                                                    </Table>
                                                    <Td>
                                                        <Button onClick={async () => {
                                                            await assignSales(
                                                                user.id,
                                                                user.data().assignment
                                                            )
                                                        }}>Resolve</Button>
                                                    </Td>
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

export default SalesChatQueue;