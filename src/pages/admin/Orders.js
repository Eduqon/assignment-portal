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
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import AssignedExpertOrders from "./AssignedExpertOrders";
import CP1DoneOrders from "./CP1DoneOrders";
import CP1PendingOrders from "./CP1PendingOrders";
import ExpertAskedOrders from "./ExpertAskedOrders";
import FreshOrders from "./FreshOrders";
import InternalReworkOrders from "./InternalReworkOrders";
import ProofReadOrders from "./ProofReadOrders";
import QuotationAskedOrders from "./QuotationAskedOrders";
import RawSubmissionOrders from "./RawSubmissionOrders";
import { useEffect, useState } from "react";
import VendorOrders from "./VendorOrders";
import CP2DoneOrders from "./CP2DoneOrders";
import ClientReworkOrders from "./ClientReworkOrders";
import axios from "axios";
import { apiUrl, frontEndUrl } from "../../services/contants";

function AdminOrders() {
  const [userRole, setUserRole] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationCounter, setNotificationCounter] = useState({});

  const navigate = useNavigate();
  const NotificationModalDis = useDisclosure();

  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
  });

  useEffect(() => {
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
        navigate("/admin/login");
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
      console.log({ response, resData });
      if (response.data.success) {
        await NotificationModalDis.onClose();
        decrementCounter(notification.status);
      }
      //setNotifications(resData);
    } catch (err) {
      console.log(err);
    }
  }

  async function openNotificationModal(status) {
    try {
      let userToken = localStorage.getItem("userToken");
      if (userToken == null) {
        navigate("/admin/login");
      }

      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const response = await axios.get(
        apiUrl + `/notifications?status=${status}`,
        config
      );
      let resData = response.data.result;
      console.log({ response, resData });
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
  console.log({ notifications });

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
                  />
                </TabPanel>
                <TabPanel>
                  <AssignedExpertOrders
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                  />
                </TabPanel>
                <TabPanel>
                  <RawSubmissionOrders
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
      <Outlet />

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
