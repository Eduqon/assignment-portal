import axios from "axios";
import { apiUrl } from "../../services/contants";
export const deleteToken = async (navigate, toast) => {
  const userEmail = localStorage.getItem("userEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
  localStorage.removeItem("userToken");

  try {
    const userData = await axios.put(`${apiUrl}/user/updatebyadmin`, {
      _id: userEmail,
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
