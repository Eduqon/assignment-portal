import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import AssignedExpertOrders from "./AssignedExpertOrders";
import CP1DoneOrders from "./CP1DoneOrders";
import CP1PendingOrders from "./CP1PendingOrders";
import ExpertAskedOrders from "./ExpertAskedOrders";
import FreshOrders from "./FreshOrders";
import InternalReworkOrders from "./InternalReworkOrders";
import ProofReadOrders from "./ProofReadOrders";
import RawSubmissionOrders from "./RawSubmissionOrders";
import { useEffect, useState } from "react";
import VendorOrders from "./VendorOrders";
import CP2DoneOrders from "./CP2DoneOrders";
import ClientReworkOrders from "./ClientReworkOrders";
import axios from "axios";
import { apiUrl, frontEndUrl } from "../../services/contants";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

function AdminOrders() {
  const [messageData, setMessageData] = useState([]);
  const [confirmedOperatorExpertChat, setConfirmedOperatorExpertChat] =
    useState({});
  const [processOperatorExpertChat, setProcessOperatorExpertChat] = useState(
    {}
  );
  const [inProcessOrderData, setInProcessOrderData] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [inProcessOrders, setInProcessOrders] = useState([]);
  const [confirmedMessageData, setconfirmedMessageData] = useState([]);
  let confirmOrderAssignedExpertMessages,
    inProcessOrderAssignedExpertMessages,
    // confirmedMessageData,
    inProcessMessageData;

  const [userRole, setUserRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationCounter, setNotificationCounter] = useState({});

  const navigate = useRouter();
  const NotificationModalDis = useDisclosure();

  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
  });

  useEffect(() => {
    _fetchMessages();
    _fetchConfirmedOrders();
    _fetchInProcessOrders();
    (async () => {
      const {
        data: { result: counts },
      } = await axios.get(apiUrl + "/notifications/countByStatus");

      if (counts) {
        const countMap = Object.fromEntries(
          counts.map(({ _id, count }) => [_id, count])
        );
        setNotificationCounter(countMap);
      }
    })();
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
        debugger;
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
    debugger;
    if (
      confirmedOrders.length !== 0 &&
      inProcessOrders.length !== 0 &&
      messageData.length !== 0
    ) {
      debugger;
      console.log("banjouralam", messageData);
      confirmedMessageData = messageData.filter((data) => {
        return confirmedOrders.some((val) => val._id === data._id);
      });
      inProcessMessageData = messageData.filter((data) => {
        return inProcessOrders.some((val) => val._id === data._id);
      });
      setconfirmedMessageData(confirmedMessageData);
    }
  }, [confirmedOrders, inProcessOrders, messageData]);

  useEffect(() => {
    (async () => {
      if (confirmedMessageData && confirmedMessageData.length !== 0) {
        debugger;
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
  }, [confirmedMessageData]);

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
    //debugger;
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
        debugger;
        // console.log(operatorExpertChat, "dcvcsdvcsdsdvs");
        setConfirmedOperatorExpertChat((operatorExpertChat) => ({
          ...operatorExpertChat,
          [assignment_id]: doc.data().conversation,
        }));
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
      });
    } catch (error) {
      console.log(error);
    }
  }

  // if (
  //   confirmedOrders.length !== 0 &&
  //   inProcessOrders.length !== 0 &&
  //   messageData.length !== 0
  // ) {
  //   confirmedMessageData = messageData.filter((data) => {
  //     return confirmedOrders.some((val) => val._id === data._id);
  //   });
  //   inProcessMessageData = messageData.filter((data) => {
  //     return inProcessOrders.some((val) => val._id === data._id);
  //   });
  // }

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

      const studentsByID = finlAr.reduce(
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
      const data = Object.entries(studentsByID)
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

  const incrementCounter = (status) => {
    setNotificationCounter((_counters) => ({
      ..._counters,
      [status]: _counters[status] + 1 || 1,
    }));
  };

  const decrementCounter = (status) => {
    setNotificationCounter((_counters) => ({
      ..._counters,
      [status]: _counters[status] && _counters[status] - 1,
    }));
  };

  async function readNotification(notification) {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.put(
        apiUrl + "/notifications/read",
        {
          assignmentId: notification._id,
        },
        config
      );
      let resData = response.data.result;
      if (response.data.success) {
        await NotificationModalDis.onClose();
        decrementCounter(notification.status);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function openNotificationModal(status) {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate.replace("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const response = await axios.get(
        apiUrl + `/notifications?status=${status}`,
        config
      );
      let resData = response.data.result;
      setNotifications(resData);
    } catch (err) {
      console.log(err);
    }

    NotificationModalDis.onOpen();
  }

  function NotificationModal(status) {
    return (
      <Modal
        size={"sm"}
        onClose={NotificationModalDis.onClose}
        isOpen={NotificationModalDis.isOpen}
        onOpen={NotificationModalDis.onOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxH={"500px"} overflowY="scroll">
          <ModalHeader>New Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table marginTop={2} variant="simple" size="sm">
              <Thead bgColor={"gray.200"}>
                <Tr>
                  <Th>ID</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {notifications && notifications.length === 0 ? (
                  <></>
                ) : (
                  notifications &&
                  notifications.map((notification, index) => (
                    <Tr key={notification._id}>
                      <Td fontWeight={"semibold"}>
                        <a
                          href={
                            frontEndUrl +
                            "/admin/assignment_details/" +
                            notification._id
                          }
                          target="_blank"
                          onClick={() => readNotification(notification)}
                        >
                          {notification._id}
                        </a>
                      </Td>
                      <Td className="d-flex justify-content-end">
                        <Button onClick={() => readNotification(notification)}>
                          <span>✅</span>
                        </Button>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
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

  return (
    <>
      <NotificationModal />
      <Box padding={0}>
        <Tabs isLazy variant="soft-rounded">
          {userRole === "Super Admin" || userRole === "Admin" ? (
            <>
              <TabList>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Fresh</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Pending</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Done</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Confirmation Asked</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Assigned Expert</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Raw Submission</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Internal Rework</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Proof Read</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP2 Done</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Client Rework</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Client Rework")}
                >
                  {notificationCounter["Client Rework"]}
                </div>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FreshOrders />
                </TabPanel>
                <TabPanel>
                  <CP1PendingOrders />
                </TabPanel>
                <TabPanel>
                  <CP1DoneOrders />
                </TabPanel>
                <TabPanel>
                  <ExpertAskedOrders />
                </TabPanel>
                <TabPanel>
                  <AssignedExpertOrders />
                </TabPanel>
                <TabPanel>
                  <RawSubmissionOrders />
                </TabPanel>
                <TabPanel>
                  <InternalReworkOrders />
                </TabPanel>
                <TabPanel>
                  <ProofReadOrders />
                </TabPanel>
                <TabPanel>
                  <CP2DoneOrders />
                </TabPanel>
                <TabPanel>
                  <ClientReworkOrders incrementCounter={incrementCounter} />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Operator" ? (
            <>
              <TabList>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Fresh</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Fresh Order")}
                >
                  {notificationCounter["Fresh Order"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Pending</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("CP1 Pending")}
                >
                  {notificationCounter["CP1 Pending"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Done</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("CP1 Done")}
                >
                  {notificationCounter["CP1 Done"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Confirmation Asked</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Expert Asked")}
                >
                  {notificationCounter["Expert Asked"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Assigned Expert</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Expert Assigned")}
                >
                  {notificationCounter["Expert Assigned"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Raw Submission</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Raw Submission")}
                >
                  {notificationCounter["Raw Submission"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Proof Read</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Proof Read")}
                >
                  {notificationCounter["Proof Read"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP2 Done</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("CP2 Done")}
                >
                  {notificationCounter["CP2 Done"]}
                </div>
              </TabList>
              {console.log(confirmedOperatorExpertChat, "cdvcscsvcdvscdvs")}
              <TabPanels>
                <TabPanel>
                  <FreshOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <CP1PendingOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <CP1DoneOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <ExpertAskedOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                    inProcessOrderAssignedExpertMessages={
                      inProcessOrderAssignedExpertMessages
                    }
                    operatorExpertChat={processOperatorExpertChat}
                    inProcessOrderData={inProcessOrderData}
                  />
                </TabPanel>
                <TabPanel>
                  <AssignedExpertOrders
                    confirmOrderAssignedExpertMessages={
                      confirmOrderAssignedExpertMessages
                    }
                    operatorExpertChat={confirmedOperatorExpertChat}
                  />
                </TabPanel>
                <TabPanel>
                  <RawSubmissionOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                    confirmOrderAssignedExpertMessages={
                      confirmOrderAssignedExpertMessages
                    }
                    operatorExpertChat={confirmedOperatorExpertChat}
                  />
                </TabPanel>
                <TabPanel>
                  <ProofReadOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                    confirmOrderAssignedExpertMessages={
                      confirmOrderAssignedExpertMessages
                    }
                    operatorExpertChat={confirmedOperatorExpertChat}
                  />
                </TabPanel>
                <TabPanel>
                  <CP2DoneOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                    confirmOrderAssignedExpertMessages={
                      confirmOrderAssignedExpertMessages
                    }
                    operatorExpertChat={confirmedOperatorExpertChat}
                  />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "QC" ? (
            <>
              <TabList>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Raw Submission</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Raw Submission")}
                >
                  {notificationCounter["Raw Submission"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Internal Rework</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Internal Rework")}
                >
                  {notificationCounter["Internal Rework"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Proof Read</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Proof Read")}
                >
                  {notificationCounter["Proof Read"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP2 Done</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("CP2 Done")}
                >
                  {notificationCounter["CP2 Done"]}
                </div>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Client Rework</Heading>
                </Tab>
                <div
                  className="text-center"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "#c96969",
                    cursor: "pointer",
                    margin: "2px 5px",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                  onClick={async () => openNotificationModal("Client Rework")}
                >
                  {notificationCounter["Client Rework"]}
                </div>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <RawSubmissionOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <InternalReworkOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <ProofReadOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <CP2DoneOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <ClientReworkOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Sales" ? (
            <>
              <TabList>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Fresh</Heading>
                </Tab>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Pending</Heading>
                </Tab>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP1 Done</Heading>
                </Tab>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Proof Read</Heading>
                </Tab>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>CP2 Done</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FreshOrders />
                </TabPanel>
                <TabPanel>
                  <CP1PendingOrders />
                </TabPanel>
                <TabPanel>
                  <CP1DoneOrders />
                </TabPanel>
                <TabPanel>
                  <ProofReadOrders />
                </TabPanel>
                <TabPanel>
                  <CP2DoneOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Vendor" ? (
            <>
              <TabList>
                <Tab style={{ borderRadius: "5px" }}>
                  <Heading fontSize={"lg"}>Vendor Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VendorOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : (
            <></>
          )}
        </Tabs>
      </Box>

      {/* mobile  */}
      <Box
        display={{ base: "block", sm: "none", md: "none " }}
        id="parent_tabOrder"
      >
        {/* <FreshOrders /> */}
        <FreshOrders />
        <CP1PendingOrders />
        <CP1DoneOrders />
        <ExpertAskedOrders />
        <AssignedExpertOrders />
        <RawSubmissionOrders />
        <InternalReworkOrders />
        <ProofReadOrders />
        <CP2DoneOrders />
        <ClientReworkOrders />
      </Box>
    </>
  );
}

export default AdminOrders;
