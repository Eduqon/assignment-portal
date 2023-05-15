import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  query,
  onSnapshot,
  collection,
  orderBy,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import AdminAnonymousChat from "../../components/chat_components/operator_anonymous_chat";

function AnnChatQueue() {
  const [users, setUsers] = useState([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      const q = query(
        collection(db, "anonymous_chat"),
        orderBy("time", "desc"),
        where("time", ">=", Date.now() - 1800000)
      );
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

  async function assignSales(clientId) {
    try {
      const anon_client = await setDoc(doc(db, "anonymous_chat", clientId), {
        operator: "Aroraharshdeep27@gmail.com",
        time: Date.now(),
        id: clientId,
        chat_status: "Sales",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Table
        variant="simple"
        size="md"
        display={{ base: "none", sm: "block", md: "block" }}
      >
        <Thead bgColor={"gray.200"}>
          <Tr>
            <Th>ID</Th>
            <Th>Assigned Sales</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.length === 0 ? (
            <></>
          ) : (
            users.map((user, index) => {
              return (
                <Tr
                  key={user.id}
                  backgroundColor={
                    user.data().chat_status === "Sales" ? "red.500" : ""
                  }
                >
                  <Td fontWeight={"semibold"}>{user.id}</Td>
                  <Td>{user.data().operator}</Td>
                  <Td>
                    <Button onClick={() => assignSales(user.id)}>
                      Assign to Sales
                    </Button>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
      {/* accordion for mobile version  */}
      <div className="ShowSideClick">
        {/* <DeleteModal /> */}
        {users.length === 0 ? (
          <></>
        ) : (
          users.map((user, index) => (
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              display={{ base: "block", sm: "none", md: "none" }}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Table>
                        <Tr>
                          <Th>ID</Th>
                          <Td fontWeight={"semibold"}>{user.id}</Td>
                        </Tr>
                      </Table>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {/* table  */}
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>ID</Th>
                          <Th>Assigned Sales</Th>
                        </Tr>

                        <Tr key={user.id}>
                          <Table>
                            <Tr>
                              <AdminAnonymousChat
                                isAssignedOperator={
                                  user.data().operator ? true : false
                                }
                                clientId={user.id}
                                assignedOperator={user.data().operator}
                              />
                            </Tr>
                          </Table>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </>
  );
}

export default AnnChatQueue;
