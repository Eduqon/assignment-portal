import React from "react";
import { NavbarHome } from "./navbar_home";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputLeftElement,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useQuery, gql } from "@apollo/client";
import home_image from "../../assets/home_bg.jpg";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { useNavigate, useParams } from "react-router-dom";
import home4 from "../../assets/home4.jpg";
import hom1 from "../../assets/hom1.jpg";
import three from "../../assets/three.jpg";
import imm from "./imm.png";
import Slider from "./sliders/Slider";
import AllhomePageForservie from "./AllhomePageForservie";
import { FooterHome } from "./footer_home";
import AutoFakePopup from "./AutoFakePopup";
import { useLocation } from "react-router-dom";
import { FormHome } from "./form_home";

// const SERVICE = gql`
//   query GetServices($slug: String!) {
//     services(filters: { slug: { eq: $slug } }) {
//       data {
//         id
//         attributes {
//           title
//           body
//         }
//       }
//     }
//   }
// `;

export default function NavService(props) {
  const location = useLocation();
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);

  // const { slug } = useParams();

  // const { loading, error, data } = useQuery(SERVICE, {
  //   variables: { slug: slug },
  // });
  // const { services } = !loading && data;

  let navigate = useNavigate();

  useEffect(() => {
    let date = document.getElementById("date");
    if (date) {
      date.min = new Date().toLocaleDateString("en-ca");
      date.value = new Date().toLocaleDateString("en-ca");
    }
  });

  async function _submit() {
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let clientToken = localStorage.getItem("clientToken");

    let emailVal = false;
    let subjectVal = false;
    let pagesVal = false;
    let deadlineVal = false;

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

    if (time.value == "") {
      window.alert("Select Deadline Time");
      deadlineVal = false;
    } else {
      let splitDate = await date.value.split("-");
      let year = splitDate[0];
      let month = splitDate[1];
      let day = splitDate[2];

      let splitTime = await time.value.split(":");
      let hour = splitTime[0];
      let min = splitTime[1];
      let deadline = new Date(year, month - 1, day, hour, min, 0);
      await setDeadline(deadline.toISOString());
      deadlineVal = true;
    }

    if (
      emailVal === true &&
      subjectVal === true &&
      pagesVal === true &&
      deadlineVal === true
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
          navigate("/order_details");
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
              navigate("/order_details");
            }
          } catch (error) {
            if (error.response.status == 401) {
              await setExistingUser(false);
              navigate("/order_details");
            } else {
              window.alert(error.response.message);
            }
          }
        }
      } catch (error) {
        if (error.response.status == 401) {
          await setExistingUser(false);
          navigate("/order_details");
        } else {
          window.alert(error.response.message);
        }
      }
    }
  }

  const bgColor = useColorModeValue("white", "gray.700");

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      <NavbarHome />
      <div className="contain position-relative">
        <div className="bg-image" style={{ height: "60vh" }}></div>
        <div className="row w-100 set-pos-blur">
          <div className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center p-4"></div>
          <div className="col-md-6 col-12 p-0">
            <Stack
              spacing={8}
              mx={"auto"}
              maxW={"lg"}
              py={12}
              px={6}
              className="set-pp"
            >
              <Stack align={"center"}>
                <h1 className="top_class">Assignment Santa</h1>
                <p className="top_class_sub text-capitalize">
                  Take help from best writing service !!
                </p>
              </Stack>
              <Box rounded={"lg"} bg={bgColor} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <div className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row">
                    <Box>
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
                    <Box>
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
                        value={
                          "   " + pages + " Pages/" + 250 * pages + " Words"
                        }
                        contentEditable={false}
                        onChange={() => console.log(pages)}
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
                    <FormLabel>Deadline</FormLabel>
                    <HStack>
                      <Input type="date" id="date" />
                      <Input type="time" id="time" />
                    </HStack>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <button
                      className="btn btn-Set"
                      onClick={() => {
                        _submit();
                      }}
                    >
                      Submit
                    </button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
      {/* <div className="section2">
        <div className="headings d-flex justify-content-center align-items-center">
          <h1 className="">{services && services.data[0].attributes.title}</h1>
        </div>
        <p className="set_text">
          {services && services.data[0].attributes.body}
        </p>
      </div> */}
      <FooterHome className="w-100" />
    </>
  );
}
