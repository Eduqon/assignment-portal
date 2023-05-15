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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  query,
  onSnapshot,
  collection,
  doc,
  orderBy,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useRouter } from "next/router";
import { apiUrl } from "../../services/contants";
import axios from "axios";
import AdminAnonymousChat from "../../components/chat_components/operator_anonymous_chat";

function SalesChatQueue() {
  const [users, setUsers] = useState([]);
  const [listening, setListening] = useState(false);
  let navigate = useRouter();

  async function assignSales(client, assignment) {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const anon_client = await setDoc(doc(db, "sales_chat", assignment), {
        sales: userEmail,
      });
      const chatName = client + "_" + userEmail + "_" + assignment;
      const chat = await setDoc(doc(db, "chat", chatName), {
        conversation: [
          {
            msg: "Hi!! Please let us know how I can assist you today?",
            time: Date.now(),
            type: "TEXT",
            user: userEmail,
          },
        ],
      });
      let userToken = localStorage.getItem("userToken");
      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };
      const response = await axios.post(
        apiUrl + "/assignment/update",
        {
          _id: assignment,
          assignedSales: userEmail,
        },
        config
      );
      navigate.replace(`/admin/assignment_details/${assignment}`);
    } catch (error) {
      console.log(error);
    }
  }

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

  const salesData =
    users && users.filter((user) => user.data().chat_status === "Sales");
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
          {salesData.length === 0 ? (
            <></>
          ) : (
            salesData.map((user, index) => (
              <Tr visibility={"visible"} key={user.data().id}>
                <Td fontWeight={"semibold"}>{user.data().id}</Td>
                <Td>{user.data().operator}</Td>
                <Td>
                  <AdminAnonymousChat
                    isAssignedOperator={user.data().operator ? true : false}
                    clientId={user.data().id}
                    assignedOperator={user.data().operator}
                  />
                </Td>
              </Tr>
            ))
            // users.map((user, index) => (
            //   <Tr
            //     visibility={user.data().sales === "" ? "visible" : "collapse"}
            //     key={user.id}
            //   >
            //     <Td fontWeight={"semibold"}>
            //       {localStorage.getItem("userRole") === "Super Admin"
            //         ? user.id
            //         : user.id.substring(0, 2) + "****" + "@" + "****" + ".com"}
            //     </Td>
            //     <Td>{user.data().sales}</Td>
            //     <Td>
            //       <Button
            //         onClick={async () => {
            //           await assignSales(user.id, user.data().assignment);
            //         }}
            //       >
            //         Resolve
            //       </Button>
            //     </Td>
            //   </Tr>
            // ))
          )}
        </Tbody>
      </Table>
      {/* accordion for mobile version  */}
      <div className="ShowSideClick">
        {salesData.length === 0 ? (
          <></>
        ) : (
          salesData.map((user, index) => (
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              display={{ base: "block", sm: "none", md: "none" }}
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Sales Chat Queue
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr visibility={"visible"} key={user.id}>
                          <Table>
                            <Tr>
                              <Th>ID</Th>
                              <Td fontWeight={"semibold"}>{user.data().id}</Td>
                            </Tr>
                            <Tr>
                              <Th>Assigned Sales</Th>
                              <Td>{user.data().operator}</Td>
                            </Tr>
                          </Table>
                          <Td>
                            <AdminAnonymousChat
                              isAssignedOperator={
                                user.data().operator ? true : false
                              }
                              clientId={user.data().id}
                              assignedOperator={user.data().operator}
                            />
                          </Td>
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

export default SalesChatQueue;
