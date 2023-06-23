import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import Examplee from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { deleteToken } from "./LogoutFunction";
import io from "socket.io-client";

function AdminLayout() {
  const toast = useToast();
  // my adding
  const [userRole, setUserRole] = useState("");
  const userEmail = window.localStorage.getItem("userEmail");

  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
    // setUserRole("Operator")
    console.log(userRole);
  });

  let navigate = useNavigate();

  function _logout() {
    console.log("haa yhi function chal rha h bhai");
    deleteToken(navigate, toast);

    // localStorage.removeItem('userEmail');
    // localStorage.removeItem('userRole');
    // localStorage.removeItem('userName');
    // localStorage.removeItem("userToken");
    // navigate("/admin/login");
  }

  const socket = io("http://localhost:8080/", {
    transports: ["websocket"],
    withCredentials: true,
  });

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log(socket.connected, "socket connected successfully");
    });
  }, []);

  useEffect(() => {
    if (userEmail)
      socket.on("logout", async (user) => {
        if (userEmail == user._id) {
          console.log(user, "userDetail on logout");
          deleteToken(navigate, toast);
        }
      });
  }, [userEmail]);

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
            <Image src={logo} w={20} />
          </Flex>
          <Button
            display={
              window.location.pathname === "/admin/login" ? "none" : "flex"
            }
            onClick={() => {
              _logout();
            }}
          >
            Log Out
          </Button>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default AdminLayout;
