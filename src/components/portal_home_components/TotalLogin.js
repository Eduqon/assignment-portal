import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { apiUrl } from "../../services/contants";

function TotalLogin() {
  const toast = useToast();

  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(false);

  const GetAllUsers = async () => {
    try {
      const UserData = await axios.get(apiUrl + "/user/loginuser");
      setUserData(
        UserData.data.filter((e) => {
          return e.role != "Super Admin";
        })
      );
    } catch (err) {
      console.log(err, "ERROR");
    }
  };

  const logoutUser = async ({ res, toast, setRefresh }) => {
    try {
      let userToken = localStorage.getItem("userToken");
      let config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const userData = await axios.put(
        `${apiUrl}/user/updatebyadmin`,
        {
          _id: res.email,
          browserId: res.browserId,
          isAuthentify: false,
        },
        config
      );

      setRefresh(true);

      if (userData) {
        toast({
          title: "Logout SuccessFull",
          description: "Logout",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutAllUser = async ({ users, toast, setRefresh }) => {
    try {
      const userData = await axios.put(`${apiUrl}/user/logoutAll`, {
        users,
      });

      if (userData) {
        toast({
          title: "Logout SuccessFull",
          description: "Logout",
          status: "success",
          isClosable: true,
        });

        setRefresh(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllUsers();
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="totallogindiv">
      <div className="heading">
        <div className="serial"> Serial Number</div>
        <div className="name"> Name</div>
        <div className="number"> Phone Number</div>
        <div className="role"> Role</div>
        <div className="browserId"> Browser Id</div>
        <div className="action"> Action</div>
      </div>

      <div className="tablescroll">
        {userData?.map((res, index) => {
          return (
            <div className="tablerow">
              <div className="serialrow">{index + 1} </div>
              <div className="namerow">{res?.name}</div>
              <div className="numberrow">{res?.contact_no}</div>
              <div className="rolerow">{res?.role?.substring(0, 20)}</div>
              <div className="browserIdrow">{res?.browserId}</div>
              <div
                className="actionrow"
                onClick={() => {
                  logoutUser({ res, toast, setRefresh });
                  setRefresh(true);
                }}
              >
                {" "}
                <span>Logout</span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="logoutall"
        onClick={async () => {
          logoutAllUser({
            users: userData,
            toast,
            setRefresh,
          });
          setRefresh(true);
        }}
      >
        <button>Logout All</button>
      </div>
    </div>
  );
}

export default TotalLogin;
