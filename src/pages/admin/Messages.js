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
import { useRouter } from "next/router";

function Messages({ setMessageCount, setSpinnerLoading }) {
  const [messageData, setMessageData] = useState([]);
  const [confirmedOperatorExpertChat, setConfirmedOperatorExpertChat] =
    useState({});
  const [processOperatorExpertChat, setProcessOperatorExpertChat] = useState(
    {}
  );
  const [inProcessOrderData, setInProcessOrderData] = useState([]);

  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [inProcessOrders, setInProcessOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  let confirmOrderAssignedExpertMessages,
    inProcessOrderAssignedExpertMessages,
    confirmedMessageData,
    inProcessMessageData;

  useEffect(() => {
    setLoading(true);
    _fetchMessages();
    _fetchConfirmedOrders();
    _fetchInProcessOrders();
  }, []);

  async function _fetchConfirmedOrders() {
    try {
      let clientToken = localStorage.getItem("userToken");
      if (clientToken == null) {
        navigate.replace("/admin/login");
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
      if (data && data.length !== 0) {
        setConfirmedOrders(data);
      } else {
        console.log("Assignment Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchInProcessOrders() {
    try {
      let clientToken = localStorage.getItem("userToken");
      if (clientToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${clientToken}` },
      };
      const response = await axios.post(
        apiUrl + "/assignment/fetch",
        {
          status: {
            $in: ["Expert Asked"],
          },
        },
        config
      );
      let data = await response.data.assignmentData;
      if (data && data.length !== 0) {
        setInProcessOrders(data);
      } else {
        console.log("Assignment Not Found");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async () => {
      if (confirmedMessageData && confirmedMessageData.length !== 0) {
        confirmedMessageData.map(async (msg) => {
          await _fetchConfirmedOperatorExpertChat(msg.expertEmail, msg._id);
        });
      }
      if (inProcessMessageData && inProcessMessageData.length !== 0) {
        inProcessMessageData.map(async (msg) => {
          const emails = msg.allExperts || [msg.expertEmail];
          await Promise.all(
            emails.map((email) =>
              _fetchProcessOperatorExpertChat(email, msg._id)
            )
          );
        });
      }
    })();
  }, [messageData, confirmedOrders, inProcessOrders]);

  useEffect(() => {
    (async () => {
      await _fetchInProcessOrdersData();
    })();
  }, [processOperatorExpertChat]);

  async function _fetchMessages() {
    try {
      const response = await axios.get(apiUrl + "/messages");
      let data = await response.data;

      if (data.success) {
        setMessageData(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _fetchConfirmedOperatorExpertChat(expertEmail, assignment_id) {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const chatName = expertEmail + "_" + userEmail + "_" + assignment_id;

      const chatDoc = await getDoc(doc(db, "chat", chatName));

      if (!chatDoc.exists()) {
        await setDoc(doc(db, "chat", chatName), {
          conversation: [],
        });
      }
      const unsubChat = onSnapshot(doc(db, "chat", chatName), (doc) => {
        setConfirmedOperatorExpertChat((operatorExpertChat) => ({
          ...operatorExpertChat,
          [assignment_id]: doc.data().conversation,
        }));

        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function _fetchProcessOperatorExpertChat(expertEmail, assignment_id) {
    let userEmail = localStorage.getItem("userEmail");
    try {
      const chatName = expertEmail + "_" + userEmail + "_" + assignment_id;
      const chatDoc = await getDoc(doc(db, "chat", chatName));

      if (!chatDoc.exists()) {
        await setDoc(doc(db, "chat", chatName), {
          conversation: [],
        });
      }
      const unsubChat = onSnapshot(doc(db, "chat", chatName), (doc) => {
        setProcessOperatorExpertChat((operatorExpertChat) => ({
          ...operatorExpertChat,
          [`${assignment_id}_${expertEmail}`]: doc.data().conversation,
        }));
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function _fetchInProcessOrdersData() {
    if (
      inProcessOrderAssignedExpertMessages &&
      inProcessOrderAssignedExpertMessages.length !== 0
    ) {
      let objd = {};
      let finlAr = [];
      const uniqueIds = [
        ...new Set(
          inProcessOrderAssignedExpertMessages.map(
            (data) => data.id.split("_")[0]
          )
        ),
      ];
      for (var i = 0; i < inProcessOrderAssignedExpertMessages.length; i++) {
        objd.id = inProcessOrderAssignedExpertMessages[i].id.split("_")[0];
        objd.date = inProcessOrderAssignedExpertMessages[i].date;
        objd.expertEmail =
          inProcessOrderAssignedExpertMessages[i].id.split("_")[1];
        objd.expertChat = inProcessOrderAssignedExpertMessages[i].chat.filter(
          (msg) => {
            return (
              msg.user ===
              inProcessOrderAssignedExpertMessages[i].id.split("_")[1]
            );
          }
        );

        finlAr.push({ ...objd });
      }

      const expertsByID = finlAr.reduce(
        (obj, { id, date, expertChat, expertEmail }) => {
          if (!obj.hasOwnProperty(id)) {
            obj[id] = { id, experts: [] };
          }
          obj[id].experts = [
            ...obj[id].experts,
            { date, expertEmail, expertChat },
          ];
          return obj;
        },
        {}
      );
      const data = Object.entries(expertsByID)
        .flat()
        .filter((data) => {
          return !uniqueIds.some((id) => id == data);
        })
        .filter((data) => {
          return data.experts.some((val) => val.expertChat.length !== 0);
        });
      if (data.length !== 0) {
        setInProcessOrderData(data);
      }
    }
  }

  if (
    confirmedOrders.length !== 0 &&
    inProcessOrders.length !== 0 &&
    messageData.length !== 0
  ) {
    confirmedMessageData = messageData.filter((data) => {
      return confirmedOrders.some((val) => val._id === data._id);
    });
    inProcessMessageData = messageData.filter((data) => {
      return inProcessOrders.some((val) => val._id === data._id);
    });
  }

  if (Object.keys(confirmedOperatorExpertChat).length !== 0) {
    confirmOrderAssignedExpertMessages = Object.keys(
      confirmedOperatorExpertChat
    ).map((key) => {
      const data = confirmedOperatorExpertChat[key];
      const values = data.filter((f) => {
        return confirmedMessageData.some((val) => val.expertEmail === f.user);
      });
      const date =
        values.length !== 0 &&
        new Date(values[values.length - 1].time).toLocaleDateString("en-US");

      return {
        id: key,
        chat: values,
        date: date,
      };
    });
  }

  if (Object.keys(processOperatorExpertChat).length !== 0) {
    inProcessOrderAssignedExpertMessages = Object.keys(
      processOperatorExpertChat
    ).map((key) => {
      const data = processOperatorExpertChat[key];
      const date =
        data.length !== 0 &&
        new Date(data[data.length - 1].time).toLocaleDateString("en-US");
      return {
        id: key,
        chat: data,
        date: date,
      };
    });
  }

  if (
    Object.keys(confirmedOperatorExpertChat).length !== 0 &&
    Object.keys(processOperatorExpertChat).length !== 0
  ) {
    const confirmOrderAssignedExpertChat =
      confirmOrderAssignedExpertMessages.filter(
        (data) => data.chat.length !== 0
      );
    const processOrderAssignedExpertChat =
      inProcessOrderAssignedExpertMessages.filter(
        (data) => data.chat.length !== 0
      );
    let totalMessageCount = confirmOrderAssignedExpertChat
      .concat(processOrderAssignedExpertChat)
      .reduce((acc, val) => {
        if (val && val.chat.length !== 0) {
          return acc + val.chat[val.chat.length - 1].newMessageCount;
        } else {
          return acc;
        }
      }, 0);
  }

  useEffect(() => {
    if (
      Object.keys(confirmedOperatorExpertChat).length !== 0 &&
      Object.keys(processOperatorExpertChat).length !== 0
    ) {
      const confirmOrderAssignedExpertChat =
        confirmOrderAssignedExpertMessages.filter(
          (data) => data.chat.length !== 0
        );
      const processOrderAssignedExpertChat =
        inProcessOrderAssignedExpertMessages.filter(
          (data) => data.chat.length !== 0
        );
      let totalMessageCount = confirmOrderAssignedExpertChat
        .concat(processOrderAssignedExpertChat)
        .reduce((acc, val) => {
          if (val && val.chat.length !== 0) {
            return acc + val.chat[val.chat.length - 1].newMessageCount;
          } else {
            return acc;
          }
        }, 0);
      setMessageCount(totalMessageCount);
      setSpinnerLoading(false);
    }
  }, [confirmedOperatorExpertChat, processOperatorExpertChat]);
  return (
    <>
      <Box padding={0}>
        <Tabs isLazy variant="soft-rounded">
          <TabList>
            <Box id="confirmed_orders">
              <Tab style={{ borderRadius: "5px" }}>
                <Heading fontSize={"lg"}>Confirmed Orders</Heading>
              </Tab>
            </Box>
            <Box id="process_orders">
              <Tab style={{ borderRadius: "5px" }}>
                <Heading fontSize={"lg"}>In-Process Orders</Heading>
              </Tab>
            </Box>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ConfirmedOrderMessage
                assignedExpertMessages={confirmOrderAssignedExpertMessages}
                operatorExpertChat={confirmedOperatorExpertChat}
                loading={loading}
              />
            </TabPanel>
            <TabPanel>
              <InProcessOrderMessage
                assignedExpertMessages={inProcessOrderAssignedExpertMessages}
                operatorExpertChat={processOperatorExpertChat}
                loading={loading}
                inProcessOrderData={inProcessOrderData}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default Messages;
