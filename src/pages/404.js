import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  InputLeftElement,
  Heading,
  Checkbox,
  Textarea,
  Center,
} from "@chakra-ui/react";
import validator from "validator";
import axios from "axios";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { NavbarHome } from "../components/home_components/navbar_home";
import { AssignmentFormStore } from "../services/stores/assignment_form_store";
import { ClientStore } from "../services/stores/client_store";
import { useRouter } from "next/router";
import { apiUrl, SERVICES } from "../services/contants";
import { client } from "./_app";
import Link from "next/link";
import { FooterHome } from "../components/home_components/footer_home";

const Custom404 = ({ services }) => {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);

  const navigate = useRouter();

  useEffect(() => {
    let date = document.getElementById("date");
    if (date) {
      date.min = new Date().toLocaleDateString("en-ca");
      date.value = new Date().toLocaleDateString("en-ca");
    }
  }, []);

  async function _submit() {
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let clientToken = localStorage.getItem("clientToken");

    let emailVal = false;
    let subjectVal = false;
    let pagesVal = false;

    if (validator.isEmail(email.value)) {
      await setEmail(email.value);
      emailVal = true;
    } else {
      window.alert("Enter Valid Email");
      emailVal = false;
    }

    if (subject.value == "") {
      window.alert("Enter a Subject");
      subjectVal = false;
    } else {
      await setSubject(subject.value);
      subjectVal = true;
    }

    if (pages == 0) {
      window.alert("Specify No. Of Pages");
      pagesVal = false;
    } else {
      await setStorePages(pages);
      pagesVal = true;
    }

    // if (time.value == "") {
    //   window.alert("Select Deadline Time");
    //   deadlineVal = false;
    // } else {
    //   let splitDate = await date.value.split("-");
    //   let year = splitDate[0];
    //   let month = splitDate[1];
    //   let day = splitDate[2];

    //   let splitTime = await time.value.split(":");
    //   let hour = splitTime[0];
    //   let min = splitTime[1];
    //   let deadline = new Date(year, month - 1, day, hour, min, 0);
    //   await setDeadline(deadline.toISOString());
    //   deadlineVal = true;
    // }

    if (
      emailVal === true &&
      subjectVal === true &&
      pagesVal === true
      // deadlineVal === true
    ) {
      try {
        let config = {
          headers: { Authorization: `Bearer ${clientToken}` },
        };
        const response = await axios.post(
          apiUrl + "/client/verify",
          {
            _id: email.value,
          },
          config
        );
        if (response.data.success === true) {
          await setExistingUser(true);
          localStorage.setItem("clientEmail", email.value);
          navigate.replace("/order_details");
        } else if (response.status == 203) {
          localStorage.setItem("clientToken", response.data.token);
          clientToken = response.data.token;

          try {
            let config = {
              headers: { Authorization: `Bearer ${clientToken}` },
            };
            const response = await axios.post(
              apiUrl + "/client/verify",
              {
                _id: email.value,
              },
              config
            );
            if (response.data.success === true) {
              await setExistingUser(true);
              localStorage.setItem("clientEmail", email.value);
              navigate.replace("/order_details");
            }
          } catch (error) {
            if (error.response.status == 401) {
              await setExistingUser(false);
              navigate.replace("/order_details");
            } else {
              window.alert(error.response.message);
            }
          }
        }
      } catch (error) {
        if (error.response.status == 401) {
          await setExistingUser(false);
          navigate.replace("/order_details");
        } else {
          window.alert(error.response.message);
        }
      }
    }
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>OOPS! 404 Error</title>
      </Head>
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />
      <div className="row w-100">
        <div className="col-md-6 col-12 d-flex align-items-end flex-column justify-content-center p-4">
          <Box display={{ base: "none", sm: "block", md: "block" }}>
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "20px" }}
            >
              <img src="/assets/404.jpeg" />
              <Heading as="h3" size="md">
                The Page You Are Looking For Does Not Exist!
              </Heading>
              <p style={{ fontSize: "13px" }}>
                But while you are here, how about signing up for assignment
                help?
              </p>
              <Button onClick={() => navigate.replace("/")}>
                Back to Home
              </Button>
            </div>
          </Box>
        </div>
        <div className="col-md-6 col-12 p-0">
          <Stack
            spacing={5}
            mx={"auto"}
            maxW={"3xl"}
            py={12}
            px={6}
            className="set-pp"
          >
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <div className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row">
                  <Box className="w-100">
                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        placeholder="Enter Your Email"
                        type="email"
                        onChange={async () => {
                          let email = document.getElementById("email");
                          setEmail(email.value);
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Box display={{ base: "none", sm: "block", md: "block" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Box>
                  <Box className="w-100">
                    <FormControl id="subject" isRequired>
                      <FormLabel>Subject</FormLabel>
                      <Input placeholder="Enter Subject" type="text" />
                    </FormControl>
                  </Box>
                </div>
                <FormControl id="words">
                  <FormLabel>No. of Words/Pages</FormLabel>
                  <InputGroup>
                    <InputLeftElement h={"full"}>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          if (pages <= 0) {
                            console.log("Already zero");
                          } else {
                            setPages(pages - 1);
                          }
                        }}
                      >
                        <MinusIcon />
                      </Button>
                    </InputLeftElement>
                    <Input
                      type="text"
                      value={"   " + pages + " Pages/" + 250 * pages + " Words"}
                      contentEditable={false}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          setPages(pages + 1);
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="deadline">
                  <Textarea placeholder="Enter Assignment Description" />
                </FormControl>
                <FormControl id="deadline">
                  <Checkbox>
                    I accept the T&C and other policies of the website and agree
                    to receive offers and updates.
                  </Checkbox>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Center>
                    <button
                      className="btn btn-Set w-50"
                      onClick={() => {
                        _submit();
                      }}
                    >
                      Free Assistance
                    </button>
                  </Center>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </div>
      </div>
      <FooterHome />
    </>
  );
};

export default Custom404;

export async function getStaticProps() {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });

  return {
    props: {
      services: serviceData.services,
    },
  };
}
