import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiUrl } from "../../services/contants";
import Head from "next/head";

export default function verify() {
  const [isVerified, setIsverified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [browserId, setBrowserId] = useState("");

  let navigate = useRouter();
  const Isverifyfun = async () => {
    const data = await axios.put(apiUrl + "/user/updatebyadmin", {
      token: navigate.query.id,
      isAuthentify: true,
    });
    if (data.data.success === true) {
      setIsverified(true);
      setUserEmail(data.data.response.email);
      setBrowserId(data.data.response.browserId);
    }
  };
  useEffect(() => {
    if (navigate && navigate.query.id) {
      Isverifyfun();
    }
  }, [navigate]);

  return (
    <>
      <Head>
        <title>Verify</title>
      </Head>
      <div className={isVerified === true ? "verifydiv" : "verifydivred"}>
        <div
          className={isVerified === true ? "miniverifydiv" : "miniverifydivred"}
        >
          <img
            src={
              isVerified === true
                ? "/assets/verified.png"
                : "/assets/notverify.png"
            }
          />
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
    </>
  );
}

export async function getStaticPaths() {
  const response = await axios.put(apiUrl + "/user/updatebyadmin", {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJNYW5zaWdoYW5nYTk5N0BnbWFpbC5jb20iLCJicm93c2VyVG9rZW4iOiJBU1NJR05NRU5UXzE2OTA2MTQ4OTI3NzEiLCJpYXQiOjE2OTA2MTQ4OTN9.hUqNVP-YZW4_d6NI8JlHaSd9oe2V3ajwEZFVWU3QJQc",
    isAuthentify: true,
  });
  return {
    paths: [
      {
        params: { id: JSON.parse(response.config.data).token },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await axios.put(apiUrl + "/user/updatebyadmin", {
    token: id,
    isAuthentify: true,
  });
  let data = await response.data;
  return {
    props: { data },
  };
}
