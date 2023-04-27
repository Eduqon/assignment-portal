import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import AdminOrders from "./Orders";
import AdminHome from "./Home";
import { useEffect, useState } from "react";
import Calendars from "./Calendars";
import AdminPanel from "./AdminPanel";
import { ChatIcon } from "@chakra-ui/icons";
import Messages from "./Messages";
import AdminLayout from ".";
import GetExcelData from "./GetExcelData";
import GetStatusExcelData from "./GetStatusExcelData";

function PortalLayout() {
  const [userRole, setUserRole] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(
    (typeof window !== "undefined" &&
      Number(localStorage.getItem("tabIndex"))) ||
      0
  );

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  useEffect(() => {
    localStorage.setItem("tabIndex", tabIndex);
  }, [tabIndex]);

  return (
    <>
      <AdminLayout />
      <Box padding={"10px"} position={"relative"}>
        {userRole === "Sales" ? (
          <>
            <Tabs
              position={"absolute"}
              orientation="vertical"
              variant="solid-rounded"
              display={{ base: "none", sm: "inline-flex", md: "inline-flex" }}
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
              <TabList display={{ base: "none", sm: "block", md: "block" }}>
                <Tab>
                  <Heading fontSize={"md"}>Support</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>{tabIndex === 0 && <AdminHome />}</TabPanel>
                <TabPanel>{tabIndex === 1 && <AdminOrders />}</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        ) : userRole === "Operator" ? (
          <>
            <Tabs
              position={"absolute"}
              orientation="vertical"
              variant="solid-rounded"
              display={{ base: "none", sm: "inline-flex", md: "inline-flex" }}
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Calendar</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
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
                <Tab>
                  <Heading fontSize={"md"}>Data</Heading>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel
                  style={
                    tabIndex === 0 ? { display: "block" } : { display: "none" }
                  }
                >
                  {tabIndex === 0 && <Calendars />}
                </TabPanel>
                <TabPanel>{tabIndex === 1 && <AdminOrders />}</TabPanel>
                <TabPanel>
                  <Messages
                    setMessageCount={setMessageCount}
                    setSpinnerLoading={setLoading}
                  />
                </TabPanel>
                <TabPanel>{tabIndex === 3 && <GetStatusExcelData />}</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        ) : userRole === "Super Admin" || userRole === "Admin" ? (
          <>
            <Tabs
              position={"absolute"}
              orientation="vertical"
              variant="solid-rounded"
              display={{ base: "none", sm: "inline-flex", md: "inline-flex" }}
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
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
                <TabPanel>{tabIndex === 0 && <AdminPanel />}</TabPanel>
                <TabPanel>{tabIndex === 1 && <AdminHome />}</TabPanel>
                <TabPanel>{tabIndex === 2 && <Calendars />}</TabPanel>
                <TabPanel>{tabIndex === 3 && <AdminOrders />}</TabPanel>
                <TabPanel>{tabIndex === 4 && <GetExcelData />}</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        ) : (
          <>
            <Tabs
              position={"absolute"}
              orientation="vertical"
              variant="solid-rounded"
              display={{ base: "none", sm: "inline-flex", md: "inline-flex" }}
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
              <TabList display={{ base: "none", sm: "block", md: "block" }}>
                <Tab>
                  <Heading fontSize={"md"}>Orders</Heading>
                </Tab>
              </TabList>

              <TabPanels display={{ base: "none", sm: "block", md: "block" }}>
                <TabPanel>{tabIndex === 0 && <AdminOrders />}</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Box>
    </>
  );
}

export default PortalLayout;
