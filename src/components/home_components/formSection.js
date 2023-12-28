import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  HStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import validator from "validator";
import React, { useEffect, useState } from "react";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import { useRouter } from "next/router";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { apiUrl } from "../../services/contants";

const FormSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [pages, setPages] = useState(0);
  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  const [subjects, setSubjects] = useState([]);
  let navigate = useRouter();

  useEffect(() => {
    _fetchSubjects();
  }, []);

  async function _fetchSubjects() {
    try {
      const response = await axios.get(apiUrl + "/util/subject/fetch");
      let data = await response.data.res;
      let tempList = [];
      if (data.length !== 0) {
        for (let index = 0; index < data.length; index++) {
          tempList.push({
            _id: data[index]._id.toLowerCase(),
          });
        }
      } else {
        console.log("No Subjects Found");
      }
      setSubjects(tempList);
    } catch (error) {
      console.log(error);
    }
  }

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
      localStorage.setItem("Subject", subject.value);
      subjectVal = true;
    }

    if (pages == 0) {
      window.alert("Specify No. Of Pages");
      pagesVal = false;
    } else {
      await setStorePages(pages);
      localStorage.setItem("Pages", pages);
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
      localStorage.setItem("Deadline", deadline.toISOString());
      deadlineVal = true;
    }

    if (
      emailVal === true &&
      subjectVal === true &&
      pagesVal === true &&
      deadlineVal === true
    ) {
      localStorage.setItem("clientEmail", email.value);
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
        console.log({ error });
        if (error.response?.status == 401) {
          await setExistingUser(false);
          navigate.replace("/order_details");
        } else {
          window.alert(error.response.message);
        }
      }
    }
  }
  const fetchSearchData = (value) => {
    const results =
      subjects &&
      subjects.filter((data) => {
        return data && data._id.toLowerCase().includes(value);
      });
    setSearchResult(results);
  };
  const onChangeHandler = (value) => {
    const searchValue = value.toLowerCase();
    setSearchInput(searchValue);
    fetchSearchData(searchValue);
  };

  return (
    <Box
      width={"100%"}
      backgroundColor={"#FFECEC"}
      display={"flex"}
      height={["60rem", "60rem", "55rem", "30rem"]}
      marginBottom={"2rem"}
      flexDirection={["column", "column", "column", "row"]}
    >
      <Box
        position={"relative"}
        padding={["1rem", "1rem", "1rem", "3rem"]}
        boxSizing="border-box"
        width={["100%", "100%", "100%", "50%"]}
      >
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={["8%", "8%", "8%", "6%"]}>
            <Image
              width={600}
              height={600}
              src="/assets/icons/assignment-santa-lines.webp"
              alt="assignment santa line"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="1rem"
            margin={[
              "1.2rem -0.8rem",
              "1.2rem -0.8rem",
              "3rem -3rem",
              "2rem 0",
            ]}
            width={"90%"}
            textAlign={["center", "center", "center", "left"]}
          >
            <Heading size="2xl">
              Securing{" "}
              <span style={{ color: "#EF2B4B" }}>
                Higher Grades Assignment Help
              </span>{" "}
              Costing Your Pocket?
            </Heading>
            <Text>
              Get professional assistance for your assignments online at
              unbeatable prices. Don't miss out; book now!
            </Text>
            <Box
              display={"flex"}
              justifyContent={["center", "center", "center", "start"]}
            >
              <Button
                background={"none"}
                border={"1px solid #EF2B4B"}
                borderRadius={"2rem"}
                color={"#EF2B4B"}
                padding={"0rem 2rem"}
                marginRight={"1rem"}
                _focus={{
                  boxShadow: "none",
                }}
                _hover={{
                  background: "#EF2B4B",
                  color: "#fff",
                }}
              >
                Book Now
              </Button>
              <Button
                background={"none"}
                border={"1px solid #EF2B4B"}
                borderRadius={"2rem"}
                color={"#EF2B4B"}
                padding={"0rem 2rem"}
                _focus={{
                  boxShadow: "none",
                }}
                _hover={{
                  background: "#EF2B4B",
                  color: "#fff",
                }}
              >
                See Our Work
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        width={["100%", "100%", "100%", "50%"]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          width={["90%", "90%", "90%", "50%"]}
          position={"relative"}
          height={"85%"}
          display={["flex", "flex", "flex", "block"]}
          justifyContent={["center", "center", "center", ""]}
        >
          <Box
            position={"absolute"}
            backgroundImage={"url(/assets/icons/orderNow_home.webp)"}
            backgroundSize={"cover"}
            width={["100%", "100%", "65%", "100%"]}
            height={"4rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Heading as={"h1"} size="lg" color={"#fff"}>
              Assignment Help
            </Heading>
          </Box>
          <Box
            position={"absolute"}
            top={["3rem", "3rem", "4rem", "4rem"]}
            zIndex={2}
            background={"#fff"}
            width={["100%", "100%", "65%", "100%"]}
            border="1px solid #EF2B4B"
            borderRadius="0.4rem"
            padding={"1rem"}
          >
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
                <Box position={"relative"}>
                  <FormControl id="subject" isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      placeholder="Enter Your Subject"
                      type="text"
                      value={searchInput}
                      onChange={(e) => onChangeHandler(e.target.value)}
                    />
                  </FormControl>
                  {searchInput && searchResult && searchResult.length !== 0 && (
                    <Box
                      id="search-result-box"
                      background={"#fff"}
                      width={["100%"]}
                      padding={["1rem"]}
                      borderRadius="1rem"
                      border="1px solid #eee"
                      maxH={["35vh", "35vh", "35vh", "20vh"]}
                      overflowY={"scroll"}
                      position={"absolute"}
                      zIndex={9}
                    >
                      {searchResult &&
                        searchResult.map((result, id) => {
                          return (
                            <Box
                              _hover={{ cursor: "pointer" }}
                              onClick={(e) => {
                                setSearchInput(e.target.textContent);
                                setSearchResult([]);
                              }}
                            >
                              {result._id.charAt(0).toUpperCase() +
                                result._id.slice(1)}
                              <Divider />
                            </Box>
                          );
                        })}
                    </Box>
                  )}
                </Box>
              </div>
              <FormControl id="words">
                <FormLabel>No. of Words/Pages</FormLabel>
                <InputGroup>
                  <InputLeftElement h={"full"}>
                    <Button
                      variant={"outline"}
                      aria-label="Minus Icon"
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
                      aria-label="Add Icon"
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
                  <Input type="date" aria-labelledby="deadline-date" />
                  <Input type="time" aria-labelledby="deadline-time" />
                </HStack>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <button
                  className="btn btn-Set"
                  onClick={() => {
                    _submit();
                  }}
                >
                  <h2>Order Now</h2>
                </button>
              </Stack>
            </Stack>
          </Box>
          <Box
            position={"absolute"}
            right={["1%", "1%", "1%", "-35%"]}
            width={["auto", "auto", "22%", "46%"]}
            top={"5rem"}
            display={["none", "none", "block", "block"]}
          >
            <Image
              width={600}
              height={1000}
              src="/assets/icons/Santa_home.webp"
              alt="Assignment Santa"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormSection;
