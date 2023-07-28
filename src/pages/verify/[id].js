import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SERVICES, apiUrl } from "../../services/contants";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { client } from "../_app";
import Head from "next/head";

export default function NavService({ services }) {
  const [isVerified, setIsverified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [browserId, setBrowserId] = useState("");

  let navigate = useRouter();
  const Isverifyfun = async () => {
    const data = await axios.put(apiUrl + "/user/updatebyadmin", {
      token: navigate.query.id,
      isAuthentify: true,
    });
    console.log({ data, navigate });
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
      <NavbarHome services={services} />
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
  const paths = [
    {
      params: {
        id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJNYW5zaWdoYW5nYTk5N0BnbWFpbC5jb20iLCJicm93c2VyVG9rZW4iOiJBU1NJR05NRU5UXzE2OTA1NTg2MTc2MzMiLCJpYXQiOjE2OTA1NTg2MTh9.V2TOprA_ajeoA6R0iTWDtcrYlP-59Fi_vMifi4u23og",
      },
    },
  ];
  // console.log({ paths });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });

  return {
    props: {
      services: serviceData.services,
    },
    revalidate: 1,
  };
}
