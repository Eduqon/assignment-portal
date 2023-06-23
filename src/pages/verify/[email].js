import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import { apiUrl } from "../../services/contants";

function Isverify() {
  const [isVerified, setIsverified] = useState(false);
  const navigate = useRouter();
  const { email } = navigate.query;
  const Isverifyfun = async () => {
    const data = await axios.put(apiUrl + "/user/updatebyadmin", {
      _id: email,
      isAuthentify: true,
    });
    if (data.data.success === true) {
      setIsverified(true);
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
        <Image
          src={
            isVerified === true
              ? "/assets/verified.png"
              : "/assets/notverify.png"
          }
        />
        <div className={isVerified === true ? "wordblue" : "wordred"}>
          {email} Verfied
        </div>
      </div>
    </div>
  );
}

export default Isverify;
