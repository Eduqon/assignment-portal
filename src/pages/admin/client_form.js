import {
  Box,
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
  Select,
  Textarea,
  InputRightAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AddIcon, AttachmentIcon, MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { apiUrl } from "../../services/contants";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";

const client_form = () => {
  const [pages, setPages] = useState(0);
  const [fileName, setFileName] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [token, setToken] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);

  const clearAssignmentStore = AssignmentFormStore(
    (state) => state.clearAssignmentStore
  );

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setExistingUser = ClientStore((state) => state.setExistingUser);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  let clientToken;

  useEffect(async () => {
    let date = document.getElementById("date");
    date.min = new Date().toLocaleDateString("en-ca");
    date.value = new Date().toLocaleDateString("en-ca");
    await _fetchToken();
    await _verifyUser();
    clientToken = localStorage.getItem("clientToken");
  });

  async function _fetchToken() {
    try {
      const response = await axios.get(
        apiUrl + "/util/sas-token?container_name=assignment-dscp"
      );
      let data = response.data;
      if (data.success) {
        setToken(data.SASToken);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function _verifyUser() {
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
          }
        } catch (error) {
          if (error.response.status == 401) {
            await setExistingUser(false);
          } else {
            window.alert(error.response.message);
          }
        }
      }
    } catch (error) {
      if (error.response.status == 401) {
        await setExistingUser(false);
      } else {
        window.alert(error.response.message);
      }
    }
  }

  async function uploadFile(blobName, filePath) {
    setIsUploading(true);
    await _fetchToken();
    onOpen();
    var data = filePath;

    var config = {
      method: "put",
      url:
        "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
        encodeURIComponent(blobName) +
        "?" +
        token,
      headers: {
        "x-ms-blob-type": "BlockBlob",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFileUrl((fileUrl) => [
          "https://assignmentsanta.blob.core.windows.net/assignment-dscp/" +
            encodeURIComponent(blobName),
          ...fileUrl,
        ]);
        setIsUploading(false);
      })
      .catch(function (error) {
        setIsUploading(false);
      });
    onClose();
  }

  async function _submit() {
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let date = document.getElementById("date");
    let time = document.getElementById("time");
    let file = document.getElementById("file");
    let reference = document.getElementById("reference");
    let description = document.getElementById("description");
    let taskCode = document.getElementById("taskCode");

    let subjectVal = false;
    let pagesVal = false;
    let deadlineVal = false;
    let referenceVal = false;
    let fileVal = false;
    let deadline;

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
      deadline = new Date(year, month - 1, day, hour, min, 0);
      deadlineVal = true;
    }

    if (reference.value == "") {
      window.alert("Select an Assignment Reference");
      referenceVal = false;
    } else {
      referenceVal = true;
    }
    if (file.value == "") {
      window.alert("Please Upload a file");
      fileVal = false;
    } else {
      fileVal = true;
    }

    if (
      subjectVal === true &&
      pagesVal === true &&
      deadlineVal === true &&
      referenceVal === true &&
      fileVal === true
    ) {
      if (isUploading) {
        window.alert("File Still being uploaded... Please Wait");
      } else {
        let reference = document.getElementById("reference");
        let description = document.getElementById("description");
        let taskCode = document.getElementById("taskCode");
        let config = {
          headers: { Authorization: `Bearer ${clientToken}` },
        };
        try {
          if (taskCode.value === "") {
            const response = await axios.post(
              apiUrl + "/assignment/new",
              {
                client_id: email.value,
                status: "Fresh Order",
                subject: subject.value,
                level: "",
                reference: reference.value,
                description: description.value,
                descriptionFile: fileUrl,
                deadline: deadline.toISOString(),
                currencyOfQuote: "INR",
                quotation: null,
                paid: null,
                numOfPages: pages,
                vendorId: "",
                currentState: 0,
                countrycode: "+91",
                contact_no: "9876543210",
                order_placed_time: {
                  0: Date.now(),
                },
              },
              config
            );

            const assignmentResponse = await axios.get(
              apiUrl + "/assignment/fetch?client_id=" + email.value,
              config
            );
            let assignmentID = assignmentResponse.data.assignmentData[0]._id;

            const createNotification = await axios.post(
              apiUrl + "/notifications",
              {
                assignmentId: assignmentID,
                status: "Fresh Order",
              },
              config
            );

            if (response.data.success === true) {
              window.alert("Assignment Submitted");
              clearAssignmentStore();
            } else {
              window.alert("response");
            }
          } else {
            const response = await axios.post(
              apiUrl + "/assignment/new",
              {
                _id: taskCode.value,
                client_id: email.value,
                status: "Fresh Order",
                subject: subject.value,
                level: "",
                reference: reference.value,
                description: description.value,
                descriptionFile: fileUrl,
                deadline: deadline.toISOString(),
                currencyOfQuote: "INR",
                quotation: null,
                paid: null,
                numOfPages: pages,
                currentState: 0,
                countrycode: "+91",
                contact_no: "9876543210",
                order_placed_time: {
                  0: Date.now(),
                },
              },
              config
            );
            const assignmentResponse = await axios.get(
              apiUrl + "/assignment/fetch?client_id=" + email.value,
              config
            );
            let assignmentID = assignmentResponse.data.assignmentData[0]._id;

            const createNotification = await axios.post(
              apiUrl + "/notifications",
              {
                assignmentId: assignmentID,
                status: "Fresh Order",
              },
              config
            );

            if (response.data.success === true) {
              window.alert("Assignment Submitted");
              clearAssignmentStore();
            } else {
              window.alert("response");
            }
          }
        } catch (err) {
          window.alert(err);
        }
      }
    }
  }

  return (
    <>
      <div className="contain position-relative">
        <div className="row w-100 set-pos-blur">
          <div className="col-md-12 col-12 p-0">
            <Stack
              spacing={8}
              mx={"auto"}
              maxW={"lg"}
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
                    <Box>
                      <FormControl id="email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          placeholder="Enter Your Email"
                          type="email"
                          value="dummy@gmail.com"
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
                  <FormControl
                    display={
                      typeof window !== "undefined" &&
                      localStorage.getItem("userToken") === null
                        ? "none"
                        : "block"
                    }
                    id="taskCode"
                    isRequired
                  >
                    <FormLabel>Custom Task Code</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <Select
                    placeholder="Select Assignment Reference"
                    id="reference"
                  >
                    <option value="I Don’t Know">I Don’t Know</option>
                    <option value="AGLC">AGLC</option>
                    <option value="APA">APA</option>
                    <option value="BMJ">BMJ</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Footnotes">Footnotes</option>
                    <option value="Footnotes and Bibliography">
                      Footnotes and Bibliography
                    </option>
                    <option value="Harvard">Harvard</option>
                    <option value="IEEE">IEEE</option>
                    <option value="MHRA">MHRA</option>
                    <option value="MLA">MLA</option>
                    <option value="Open">Open</option>
                    <option value="OSCOLA">OSCOLA</option>
                    <option value="Oxford">Oxford</option>
                    <option value="Turabian">Turabian</option>
                    <option value="Vancouver">Vancouver</option>
                  </Select>
                  <Box>
                    <FormControl id="description">
                      <FormLabel>Enter your assignment description</FormLabel>
                      <Textarea maxLength={10000}></Textarea>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="file">
                      <FormLabel>Upload File</FormLabel>
                      <InputGroup>
                        <Input type="text" isReadOnly={true} value={fileName} />
                        <InputRightAddon>
                          <Button onClick={() => inputRef.current.click()}>
                            <AttachmentIcon />
                          </Button>
                          <input
                            type="file"
                            multiple={true}
                            onChange={async () => {
                              let tempFileNames = [];
                              for (
                                let index = 0;
                                index < inputRef.current.files.length;
                                index++
                              ) {
                                tempFileNames.push(
                                  inputRef.current.files[index].name
                                );
                                await uploadFile(
                                  inputRef.current.files[index].name,
                                  inputRef.current.files[index]
                                );
                              }
                              setFileName(tempFileNames);
                            }}
                            ref={inputRef}
                            style={{ display: "none" }}
                          />
                        </InputRightAddon>
                      </InputGroup>
                    </FormControl>
                    <Box marginTop={2} padding={"0 1rem"}>
                      {fileUrl?.map((_, index) => {
                        return (
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            marginBottom={1}
                          >
                            <Box>{_.split("/")[_.split("/").length - 1]}</Box>
                            <Box>
                              <Button
                                onClick={() => {
                                  const finalArr = fileUrl.filter(
                                    (_, removedItemindex) =>
                                      removedItemindex !== index
                                  );
                                  const finalFileNameList = fileName.filter(
                                    (_) =>
                                      _ !==
                                      fileUrl[index].split("/")[
                                        fileUrl[index].split("/").length - 1
                                      ]
                                  );
                                  setFileUrl(finalArr);
                                  setFileName(finalFileNameList);
                                }}
                              >
                                Remove
                              </Button>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
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
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default client_form;
