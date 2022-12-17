import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { db } from "../../services/firebase";
import ConfirmedOrderMessage from "./ConfirmedOrderMessage";
import InProcessOrderMessage from "./InProcessOrderMessage";
import { useNavigate } from "react-router-dom";

function Messages() {
  const [messageData, setMessageData] = useState([]);
  const [operatorExpertChat, setOperatorExpertChat] = useState({});
  const [confirmedOrders, setConfirmedOrders] = useState();
  const [inProcessOrders, setInProcessOrders] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let assignedExpertMessages;

  useEffect(() => {
    setLoading(true);
    _fetchConfirmedOrders();
  }, []);

  async function _fetchConfirmedOrders() {
    try {
      let clientToken = localStorage.getItem("clientToken");
      if (clientToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${clientToken}` },
      };
      const response = await axios.post(
        apiUrl + "/assignment/fetch",
        {
          status: {
            $in: [
              "Expert Assigned",
              "Raw Submission",
              "Proof Read",
              "CP2 Done",
            ],
          },
        },
        config
      );
      let data = await response.data.assignmentData;
      if (data.length !== 0) {
        setConfirmedOrders(data);
        await _fetchMessages();
      } else {
        console.log("Assignment Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchMessages() {
    try {
      const response = await axios.get(apiUrl + "/messages");
      let data = await response.data;
      if (data.success) {
        setMessageData([...messageData, data.result].flat());
        data.result.map(async (msg) => {
          await _fetchOperatorExpertChat(msg.expertEmail, msg._id);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchOperatorExpertChat(expertEmail, assignment_id) {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const chatName = expertEmail + "_" + userEmail + "_" + assignment_id;
      const chatDoc = await getDoc(doc(db, "chat", chatName));
      console.log({ chatDoc });
      if (!chatDoc.exists()) {
        await setDoc(doc(db, "chat", chatName), {
          conversation: [],
        });
      }
      const unsubChat = onSnapshot(doc(db, "chat", chatName), (doc) => {
        setOperatorExpertChat((operatorExpertChat) => ({
          ...operatorExpertChat,
          [assignment_id]: doc.data().conversation,
        }));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (Object.keys(operatorExpertChat).length !== 0) {
    assignedExpertMessages = Object.keys(operatorExpertChat).map((key) => {
      const data = operatorExpertChat[key];
      const values = data.filter((f) => {
        return messageData.some((val) => val.expertEmail === f.user);
      });
      const date = new Date(values[values.length - 1].time).toLocaleDateString(
        "en-US"
      );
      return {
        id: key,
        chat: values,
        date: date,
      };
    });
  }

  return (
    <>
      <Box padding={0}>
        <Tabs isLazy variant="soft-rounded">
          <TabList>
            <Tab style={{ borderRadius: "5px" }}>
              <Heading fontSize={"lg"}>Confirmed Orders</Heading>
            </Tab>
            <Tab style={{ borderRadius: "5px" }}>
              <Heading fontSize={"lg"}>In-Process Orders</Heading>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ConfirmedOrderMessage
                assignedExpertMessages={assignedExpertMessages}
                confirmedOrders={confirmedOrders}
                operatorExpertChat={operatorExpertChat}
                messageData={messageData}
                loading={loading}
              />
            </TabPanel>
            <TabPanel>
              <InProcessOrderMessage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default Messages;
