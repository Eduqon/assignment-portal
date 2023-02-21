import { apiUrl } from "../contants";
import axios from "axios";

let userToken =
  typeof window !== "undefined" && localStorage.getItem("userToken");
let config = {
  headers: { Authorization: `Bearer ${userToken}` },
};
export const updateAssignment = async (data) => {
  data = JSON.parse(data);
  return await axios
    .post(`${apiUrl}/assignment/update`, data, config)
    .then(
      (res) => {
        return res.data;
      },
      (err) => {
        return err.response.data;
      }
    )
    .catch((err) => {});
};
