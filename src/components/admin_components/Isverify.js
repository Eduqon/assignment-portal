import React, { useState, useEffect } from "react";
import "./verify.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../services/contants";
import verify from "../../assets/verified.png";
import notverify from "../../assets/notverify.png";
function Isverify() {
  const [isVerified, setIsverified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [browserId, setBrowserId] = useState("");
  const { id } = useParams();
  console.log(id, "veridy");
  const Isverifyfun = async () => {
    const data = await axios.put(apiUrl + "/user/updatebyadmin", {
      token: id,
      isAuthentify: true,
    });
    console.log(data.data.success);
    if (data.data.success === true) {
      setIsverified(true);
      setUserEmail(data.data.response.email);
      setBrowserId(data.data.response.browserId);
    }
  };
  useEffect(() => {
    Isverifyfun();
  }, []);
  return (
    <div className={isVerified === true ? "verifydiv" : "verifydivred"}>
      <div
        className={isVerified === true ? "miniverifydiv" : "miniverifydivred"}
      >
        <img src={isVerified === true ? verify : notverify} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={isVerified === true ? "wordblue" : "wordred"}
        >
          <div>Email : {userEmail}</div>
          <div>BrowserId : {browserId}</div>
          <div>Verfied</div>
        </div>
      </div>
    </div>
  );
}

export default Isverify;
