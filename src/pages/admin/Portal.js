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
import RawSubmissionOrders from "./RawSubmissionOrders";
import { ChatIcon } from "@chakra-ui/icons";
import Messages from "./Messages";
import AdminLayout from ".";
import GetExcelData from "./GetExcelData";

function PortalLayout() {
  const [userRole, setUserRole] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);

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
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  return (
    <>
      <AdminLayout />
      <Box padding={"10px"} position={"relative"}>
        <Tabs
          position={"absolute"}
          orientation="vertical"
          variant="solid-rounded"
          display={{ base: "none", sm: "inline-flex", md: "inline-flex " }}
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
                      ) : (
                        loading && (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            marginLeft={2}
                            position={"absolute"}
                            right={"-10px"}
                            top={"-10px"}
                          >
                            <Spinner />
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Calendars />
                </TabPanel>
                <TabPanel>
                  <AdminOrders />
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
                <Tab>
                  <Heading fontSize={"md"}>Data</Heading>
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
                <TabPanel>
                  <GetExcelData />
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
    </>
  );
}

export default PortalLayout;
