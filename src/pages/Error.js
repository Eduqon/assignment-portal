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

import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ErrorImage from "../assets/404.jpeg";
import { NavbarHome } from "../components/home_components/navbar_home";
import { AssignmentFormStore } from "../services/stores/assignment_form_store";
import { ClientStore } from "../services/stores/client_store";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);

  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>OOPS! 404 Error</title>
      </Helmet>
      <NavbarHome />
      <div className="row w-100">
        <div className="col-md-6 col-12 d-flex align-items-end flex-column justify-content-center p-4">
          <Box display={{ base: "none", sm: "block", md: "block" }}>
            <div
              className="d-flex flex-column align-items-center"
              style={{ gap: "20px" }}
            >
              <img src={ErrorImage} />
              <Heading as="h3" size="md">
                The Page You Are Looking For Does Not Exist!
              </Heading>
              <p style={{ fontSize: "13px" }}>
                But while you are here, how about signing up for assignment
                help?
              </p>
              <Button onClick={() => navigate("/")}>Back to Home</Button>
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
                        // _submit();
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
    </>
  );
};

export default Error;
