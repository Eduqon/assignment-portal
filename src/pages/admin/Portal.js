import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  useDisclosure,
  Select,
  Spinner,
} from "@chakra-ui/react";
import AdminOrders from "./Orders";
import AdminHome from "./Home";
import { useEffect, useState } from "react";
import Calendars from "./Calendars";
import AdminPanel from "./AdminPanel";
import Assignments from "./Assignments";
import Subjects from "./Subjects";
import Vendors from "./Vendors";
import NewUser from "./NewUser";
import Admins from "./Admins";
import Operators from "./Operators";
import QC from "./QC";
import Sales from "./Sales";
import Experts from "./Experts";
import AnnChatQueue from "./AnnChatQueue";
import SalesChatQueue from "./SalesChatQueue";
import FreshOrders from "./FreshOrders";
import CP1PendingOrders from "./CP1PendingOrders";
import CP1DoneOrders from "./CP1DoneOrders";
import ExpertAskedOrders from "./ExpertAskedOrders";
import AssignedExpertOrders from "./AssignedExpertOrders";
import RawSubmissionOrders from "./RawSubmissionOrders";
import InternalReworkOrders from "./InternalReworkOrders";
import ProofReadOrders from "./ProofReadOrders";
import CP2DoneOrders from "./CP2DoneOrders";
import ClientReworkOrders from "./ClientReworkOrders";
import { mobTab } from "../../components/sidebar/Sidebar";
import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Messages from "./Messages";
import AdminLayout from ".";

function PortalLayout() {
  const [userRole, setUserRole] = useState("");
  const { onClose } = useDisclosure();
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [orderIndex, setOrderIndex] = useState(0);

  const dropOrder = () => {
    var hideShow =
      document.getElementsByClassName("dropOrder")[0].style.display;

    if (hideShow === "block") {
      document.getElementsByClassName("dropOrder")[0].style.display = "none";
    } else {
      document.getElementsByClassName("dropOrder")[0].style.display = "block";
    }
  };

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        typeof window !== "undefined" &&
          window.localStorage.setItem("tabIndex", Number(0));
        typeof window !== "undefined" &&
          window.localStorage.setItem("orderIndex", Number(0));
      }
    }

    setUserRole(localStorage.getItem("userRole"));
    setTabIndex(Number(localStorage.getItem("tabIndex")));
    setOrderIndex(Number(localStorage.getItem("orderIndex")));
  }, []);

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("tabIndex", Number(tabIndex));
    let backButton = localStorage.getItem("backButton");
    if (backButton) {
      setLoading(false);
    }
    localStorage.removeItem("backButton");
  }, [tabIndex]);

  useEffect(() => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("orderIndex", Number(orderIndex));
  }, [orderIndex]);

  const handleChange = (index) => {
    setTabIndex(index);
    localStorage.removeItem("backButton");
  };

  const handleCount = (child) => {
    setOrderIndex(child);
  };
  return (
    <>
      <AdminLayout />
      <Box padding={"10px"} position={"relative"}>
        <Tabs
          position={"absolute"}
          orientation="vertical"
          variant="solid-rounded"
          display={{ base: "none", sm: "inline-flex", md: "inline-flex " }}
          onChange={(index) => handleChange(index)}
          index={Number(tabIndex)}
        >
          {userRole === "Sales" ? (
            <>
              <TabList display={{ base: "none", sm: "block", md: "block" }}>
                <Tab>
                  <Heading fontSize={"md"}>Support</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <AdminHome />
                </TabPanel>
                <TabPanel>
                  <AdminOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Operator" ? (
            <>
              {loading && (
                <Box
                  width={"100%"}
                  height={"100vh"}
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"center"}
                  position={"absolute"}
                  left={0}
                  top={0}
                  zIndex={1}
                >
                  <Spinner size={"xl"} />
                </Box>
              )}
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Calendar</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Raw Submission</Heading>
                </Tab>
                <Tab>
                  <Box display={"flex"} alignItems={"center"}>
                    <Heading fontSize={"md"}>Messages</Heading>
                    <Box
                      display="flex"
                      alignItems={"center"}
                      position="relative"
                      marginLeft={2}
                    >
                      <ChatIcon width={"1.5em"} height={"1.5em"} />
                      {messageCount !== 0 ? (
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          borderRadius={15}
                          backgroundColor={"rgb(201, 105, 105)"}
                          marginLeft={2}
                          width={5}
                          height={5}
                          color={"white"}
                          position={"absolute"}
                          right={"-10px"}
                          top={"-5px"}
                        >
                          {messageCount}
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Calendars />
                </TabPanel>
                <TabPanel>
                  <AdminOrders
                    setOrderCount={handleCount}
                    orderIndex={orderIndex}
                  />
                </TabPanel>
                <TabPanel>
                  <RawSubmissionOrders />
                </TabPanel>
                <TabPanel>
                  <Messages
                    setMessageCount={setMessageCount}
                    setSpinnerLoading={setLoading}
                  />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Super Admin" || userRole === "Admin" ? (
            <>
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Admin</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Support</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Calendar</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <AdminPanel />
                </TabPanel>
                <TabPanel>
                  <AdminHome />
                </TabPanel>
                <TabPanel>
                  <Calendars />
                </TabPanel>
                <TabPanel>
                  <AdminOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : (
            <>
              <TabList display={{ base: "none", sm: "block", md: "block" }}>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels display={{ base: "none", sm: "block", md: "block" }}>
                <TabPanel>
                  <AdminOrders />
                </TabPanel>
              </TabPanels>
            </>
          )}
        </Tabs>
      </Box>
      <Box display={{ base: "block", sm: "none", md: "none " }} id="parent_tab">
        <Assignments />
        <Subjects />
        <NewUser />
        <Vendors />
        <Admins />
        <Operators />
        <QC />
        <Sales />
        <Experts />
        {/* support start  */}
        <AnnChatQueue />
        <SalesChatQueue />
        {/* celender */}
        <Calendars />
        {/* orders tab started  */}
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

export default PortalLayout;
