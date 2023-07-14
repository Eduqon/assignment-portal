import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import Examplee from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import { deleteToken } from "./LogoutFunction";
import io from "socket.io-client";
import { UserStore } from "../../services/stores/user_store";
import { apiUrl } from "../../services/contants";
import axios from "axios";

function AdminLayout() {
  const toast = useToast();
  // my adding
  const [userRole, setUserRole] = useState("");
  const userEmail = window.localStorage.getItem("userEmail");
  const assignmentSantaBrowserToken = window.localStorage.getItem(
    "assignmentSantaBrowserToken"
  );

  const setName = UserStore((state) => state.setName);
  const setContactNo = UserStore((state) => state.setContactNo);
  const setRole = UserStore((state) => state.setRole);
  const setLoader = UserStore((state) => state.setLoader);

  useEffect(async () => {
    setUserRole(localStorage.getItem("userRole"));
    // setUserRole("Operator")
    // console.log(userRole);
  });

  let navigate = useNavigate();

  async function _logout() {
    console.log("haa yhi function chal rha h bhai");
    // deleteToken(navigate, toast);

    // localStorage.removeItem("userToken");
    const userData = await axios.put(`${apiUrl}/user/updatebyadmin`, {
      _id: userEmail,
      browserId: assignmentSantaBrowserToken,
      isAuthentify: false,
    });

    console.log({
      userData,
    });
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setLoader(false);
    navigate("/admin/login");
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
    if (userEmail && assignmentSantaBrowserToken) {
      socket.on("logout", async (user) => {
        if (
          userEmail == user.email &&
          assignmentSantaBrowserToken == user.browserId
        ) {
          console.log(user, "userDetail on logout");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userName");
          setLoader(false);
          navigate("/admin/login");
        }
      });
      socket.on("verifyByAdmin", async (user) => {
        let local = window.localStorage.getItem("userEmail");
        console.log(
          {
            user,
            userEmail,
            assignmentSantaBrowserToken,
            local,
          },
          "verifyByAdminverifyByAdmin"
        );
        if (
          userEmail === user.email &&
          assignmentSantaBrowserToken === user.browserId
        ) {
          console.log(user, "userDetail on verifyByAdmin");
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userCommission", user.userCommission);
          await setContactNo(user.contact_no);
          await setRole(user.role);
          await setName(user.name);
          navigate("/admin/portal");
        }
      });
    }
  }, [userEmail, assignmentSantaBrowserToken]);

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
