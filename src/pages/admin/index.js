import React, { useState, useEffect } from "react";
import { Box, Flex, useColorModeValue, Image, Button,useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Examplee from "../../components/sidebar/Sidebar";

function AdminLayout() {
  // my adding
  const toast = useToast();
  const [userRole, setUserRole] = useState("");
  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
  });

  let navigate = useRouter();

  function _logout() {
    deleteToken(navigate,toast)
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("userRole");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("userToken");
    // navigate.replace("/admin/login");
  }
  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4, md: 10 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          {/* my adding side bar */}
          {userRole !== null ? (
            <>
              <Examplee />
            </>
          ) : null}
          {/* end  */}
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Image src="/assets/Logo.png" w={20} />
          </Flex>
          <Button
            display={
              typeof window !== "undefined" &&
              window.location.pathname === "/admin/login"
                ? "none"
                : "flex"
            }
            onClick={() => {
              _logout();
            }}
          >
            Log Out
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default AdminLayout;
