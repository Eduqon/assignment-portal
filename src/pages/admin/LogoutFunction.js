import axios from "axios";
import { apiUrl } from "../../services/contants";

export const deleteToken = async (navigate, toast) => {
  const userEmail = localStorage.getItem("userEmail");
  localStorage.removeItem("userName");

  try {
    let assignmentSantaBrowserToken = localStorage.getItem(
      "assignmentSantaBrowserToken"
    );

    const userData = await axios.put(`${apiUrl}/user/logout`, {
      _id: userEmail,
      browserId: assignmentSantaBrowserToken,
      isAuthentify: false,
    });

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
  localStorage.removeItem("userEmail");
  navigate("/admin/login");
};

export const logoutUser = async ({ res, toast, setRefresh }) => {
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

export const logoutAllUser = async ({ users, toast, setRefresh }) => {
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
