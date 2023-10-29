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
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { useRouter } from "next/router";
import Slider from "./sliders/Slider";
export const FormHome = () => {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  const [subjects, setSubjects] = useState([]);

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
            _id: data[index]._id,
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

  let navigate = useRouter();

  useEffect(() => {
    let date = document.getElementById("date");
    date.min = new Date().toLocaleDateString("en-ca");
    date.value = new Date().toLocaleDateString("en-ca");
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

  return (
    <>
      <Box position={"relative"} height={["105vh", "105vh", "105vh", "70vh"]}>
        <Box className="bg-image" height={"100%"}></Box>
        <Box
          position={"absolute"}
          top={0}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          padding={"1rem"}
          flexDirection={["column", "column", "column", "row"]}
          gap={[0, 0, "1rem", 0]}
        >
          <Box
            width={["100%", "100%", "65%", "35%"]}
            display={["none", "none", "block", "block"]}
          >
            <Slider />
          </Box>
          <Box width={["100%", "100%", "100%", "50%"]}>
            <Stack
              spacing={8}
              mx={"auto"}
              maxW={"lg"}
              py={12}
              px={6}
              className="set-pp"
            >
              <Stack align={["start", "center"]}>
                <Heading
                  color={"#fff"}
                  fontSize={["1.6rem", "3rem"]}
                  textShadow={"5px 2px 10px #000"}
                  letterSpacing={"0.1rem"}
                >
                  Assignment Santa
                </Heading>
                <Text
                  textTransform={"capitalize"}
                  color={"#fff"}
                  textShadow={"5px 2px 10px #000"}
                  letterSpacing={"0.1rem"}
                >
                  Take help from best writing service !!
                </Text>
              </Stack>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
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
                    <Box>
                      <FormControl id="subject" isRequired>
                        <FormLabel>Subject</FormLabel>
                        <Select id="subjectExpert" placeholder="Enter Subject">
                          {subjects.length === 0 ? (
                            <></>
                          ) : (
                            subjects.map((subject, index) => (
                              <option value={subject._id} key={index}>
                                {subject._id}
                              </option>
                            ))
                          )}
                        </Select>
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
          </Box>
        </Box>
      </Box>
    </>
  );
};
