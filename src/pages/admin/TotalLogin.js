import React, { useEffect, useState } from "react";
import "./logins.css";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { logoutAllUser, logoutUser } from "./LogoutFunction";
import { useToast } from "@chakra-ui/toast";
function TotalLogin() {
  const toast = useToast();

  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(false);

  const GetAllUsers = async () => {
    try {
      const UserData = await axios.get(`${apiUrl}/user/loginuser`);
      setUserData(UserData.data.filter((e)=>{
        return e.role != "Super Admin"
      }));
      console.log(UserData.data, "sdhjksah");
      // return UserData
    } catch (err) {
      console.log(err, "ERROR");
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
          console.log(res, "response print");
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
