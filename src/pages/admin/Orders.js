import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
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

function AdminOrders() {
  const [userRole, setUserRole] = useState("");

  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
  });

  return (
    <>
      <Box padding={0}>
        <Tabs isLazy variant="soft-rounded">
          {userRole === "Super Admin" || userRole === "Admin" ? (
            <>
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Fresh</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Pending</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Done</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Confirmation Asked</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Assigned Expert</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Raw Submission</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Internal Rework</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Proof Read</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP2 Done</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Client Rework</Heading>
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
                  <ClientReworkOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Operator" ? (
            <>
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Fresh</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Pending</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Done</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Confirmation Asked</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Assigned Expert</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Raw Submission</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Proof Read</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP2 Done</Heading>
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
                  <ExpertAskedOrders />
                </TabPanel>
                <TabPanel>
                  <AssignedExpertOrders />
                </TabPanel>
                <TabPanel>
                  <RawSubmissionOrders />
                </TabPanel>
                <TabPanel>
                  <ProofReadOrders />
                </TabPanel>
                <TabPanel>
                  <CP2DoneOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "QC" ? (
            <>
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Raw Submission</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Internal Rework</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Proof Read</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP2 Done</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Client Rework</Heading>
                </Tab>
              </TabList>

              <TabPanels>
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
                  <ClientReworkOrders />
                </TabPanel>
              </TabPanels>
            </>
          ) : userRole === "Sales" ? (
            <>
              <TabList>
                <Tab>
                  <Heading fontSize={"md"}>Fresh</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Pending</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP1 Done</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>Proof Read</Heading>
                </Tab>
                <Tab>
                  <Heading fontSize={"md"}>CP2 Done</Heading>
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
                <Tab>
                  <Heading fontSize={"md"}>Vendor Orders</Heading>
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
