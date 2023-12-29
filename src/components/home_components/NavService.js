import React from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { NavbarHome } from "./navbar_home";
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
  Heading,
  useColorModeValue,
  InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { isMobile } from "react-device-detect";
import { useQuery, gql } from "@apollo/client";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import { apiUrl, mediaUrl } from "../../services/contants";
import { useNavigate, useParams } from "react-router-dom";
import FooterHome from "./footer_home";
import { useLocation } from "react-router-dom";
import Testomonial from "./Testomonial";
import useFetch from "../../hooks/useFetch";
import "./Navservice.css";
import Faqschema from "./Faqschema";

const SERVICE = gql`
  query GetServices($slug: String!) {
    services(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          body_title
          body_1
          body_2
          Sub_Title
          Sub_Title_2
          Seodescription
          Seokeyword
          Formheading
          Seotitle
          Seocntag
          SchemaTitle
        }
      }
    }
  }
`;

const SERVICES = gql`
  query {
    services(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`;

export default function NavService(props) {
  const location = useLocation();
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  let navigate = useNavigate();
  const { slug } = useParams();
  const {
    loading: serviceloading,
    error: serviceError,
    data: serviceData,
  } = useQuery(SERVICES);
  const { services: allServices } = !serviceloading && serviceData;
  const [subjects, setSubjects] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

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

  useEffect(() => {
    let date = document.getElementById("date");
    if (date) {
      date.min = new Date().toLocaleDateString("en-ca");
      date.value = new Date().toLocaleDateString("en-ca");
    }
  }, []);

  const getURL =
    allServices && allServices.data.some((val) => val.attributes.slug === slug);

  const { loading, error, data } = useQuery(SERVICE, {
    variables: { slug: slug },
  });

  const { services } = !loading && data;

  const title = services && getURL && services.data[0].attributes.Seotitle;
  const description =
    services && getURL && services.data[0].attributes.Seodescription;
  const keyword = services && getURL && services.data[0].attributes.Seokeyword;
  const canonicalURL =
    services && getURL && services.data[0].attributes.Seocntag;
  const SchemaTitle =
    services && getURL && services.data[0].attributes.SchemaTitle;

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

  const { apiLoading, apiError, apiData } = useFetch(
    mediaUrl + "/upload/files"
  );
  const serviceImage =
    apiData &&
    services &&
    getURL &&
    apiData.filter((data) => data.name === services.data[0].attributes.slug);

  if (loading || apiLoading || serviceloading) return <p>Loading...</p>;
  if (error || apiError || serviceError) return <p>{error}</p>;

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
    <>
      {getURL ? (
        <>
          <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keyword && <meta name="keyword" content={keyword} />}
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}
          </Helmet>
          <NavbarHome />
          <div className="contain position-relative">
            <div
              className="bg-image"
              style={{ height: "70vh", filter: "blur(2px)" }}
            ></div>
            <div className="row w-100 h-100 set-pos-blur">
              <div
                id="top-section"
                className="col-md-6 col-12 d-flex align-items-center flex-column justify-content-center p-4"
              >
                <Box id="heading-section" color={"white"} width={"500px"}>
                  <Heading size={"xl"}>
                    {services && services.data[0].attributes.title}
                  </Heading>
                  <Heading size={"md"} lineHeight={"1.5"}>
                    {services && services.data[0].attributes.Sub_Title}
                  </Heading>
                  <p>{services && services.data[0].attributes.Sub_Title_2}</p>
                </Box>
              </div>
              <div id="form-section" className="col-md-6 col-12 p-4">
                <Stack
                  spacing={4}
                  mx={"auto"}
                  maxW={"lg"}
                  px={6}
                  className="set-pp"
                >
                  {!isMobile && (
                    <Stack align={"center"}>
                      <Heading className="top_class" size={"xl"}>
                        {services && services.data[0].attributes.Formheading}
                      </Heading>
                      <p className="top_class_sub text-capitalize">
                        Take help from best writing service !!
                      </p>
                    </Stack>
                  )}
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
                        <Box
                          display={{ base: "none", sm: "block", md: "block" }}
                        >
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
                          {searchInput &&
                            searchResult &&
                            searchResult.length !== 0 && (
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
                      <FormControl>
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
          <Box className="row w-100 h-100 d-flex" margin={"0"}>
            <div
              id="bottom-section"
              className="col-md-8 col-12 d-flex align-items-center flex-column p-5"
            >
              <div className="headings d-flex justify-content-center align-items-center mb-4">
                <Heading size={"lg"}>
                  {services && services.data[0].attributes.body_title}
                </Heading>
              </div>
              <Box
                className="service-body"
                style={{ "white-space": "pre-line", padding: "0 2rem" }}
              >
                <ReactMarkdown>
                  {services &&
                    services.data[0].attributes.body_1
                      .split("<br/>")
                      .join("\n")}
                </ReactMarkdown>
              </Box>
              <br />
              {serviceImage && serviceImage.length !== 0 && (
                <>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    width={"100%"}
                    height={"500px"}
                    marginTop={2}
                    padding={"0px 2rem"}
                  >
                    <Box
                      width={"100%"}
                      height={"100%"}
                      backgroundImage={`url(https://assignmentsantastrapi.fly.dev${serviceImage[0].url})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                    />
                  </Box>
                  <br />
                </>
              )}
              {services && services.data[0].attributes.body_2 && (
                <Box
                  className="service-body"
                  style={{ "white-space": "pre-line", padding: "0 2rem" }}
                >
                  <ReactMarkdown>
                    {services &&
                      services.data[0].attributes.body_2
                        .split("<br/>")
                        .join("\n")}
                  </ReactMarkdown>
                </Box>
              )}
              <br />
              <Faqschema title={SchemaTitle} slug={slug} />
            </div>
            <Box
              id="right-section"
              className="col-md-3 col-12 d-flex align-items-center flex-column justify-content-top p-4"
            >
              <Box
                id="assignment-section"
                className="bg-white p-30 mt-20"
                marginTop={"20"}
                borderRadius={"5px"}
                border={"2px solid #eceeef"}
                width={"100%"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  padding={"5"}
                >
                  <img
                    alt="Question Bank"
                    src="https://www.totalassignment.com/uploads/search-assignment03.png"
                    width="60px;"
                  />

                  <Heading
                    size={"md"}
                    className="lspacing"
                    paddingBottom={"5"}
                    paddingTop={"5"}
                  >
                    Looking for Your Assignment?
                  </Heading>

                  <a href="#" className="btn btn-md btn-primary">
                    Search Assignment
                  </a>
                </Box>
              </Box>
              <Box>
                <img
                  class=""
                  alt=""
                  style={{ "padding-top": "20px", "padding-bottom": "20px" }}
                  src="https://www.totalassignment.com/assets/image/we_accept.png"
                />
              </Box>
              <Box>
                <img
                  className=""
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt=""
                  src="https://www.totalassignment.com/assets/image/MONEY_BACK.png"
                />
              </Box>
              <Box>
                <img
                  className=""
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt=""
                  src="https://www.totalassignment.com/assets/image/100p_QUALITY.png"
                />
              </Box>
              <Box>
                <img
                  className=""
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt=""
                  src="https://www.totalassignment.com/assets/image/Lowest_Price_Guarantee.png"
                />
              </Box>
              <Box>
                <img
                  className=""
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt=""
                  src="https://www.totalassignment.com/assets/image/Plagiarism_Free_Work.png"
                />
              </Box>
              <Box width={"100%"} backgroundColor={"#f0f5f8"}>
                <div
                  className="bg-grey p-20 mb-20"
                  style={{ "margin-top": "20px" }}
                >
                  <Heading marginTop={"10"} marginLeft={"3"}>
                    Other Assignment Services
                  </Heading>
                  <ul className="list-group list-group-flush">
                    <li
                      className="list-group-item"
                      style={{ background: "#0000" }}
                    >
                      <a href="#">My Assignment Help</a>
                    </li>

                    <li
                      className="list-group-item"
                      style={{ background: "#0000" }}
                    >
                      <a href="#">SCM Assignment Help</a>
                    </li>
                    <li
                      className="list-group-item"
                      style={{ background: "#0000" }}
                    >
                      <a href="#">HRM Assignment Help</a>
                    </li>
                  </ul>
                </div>
              </Box>
            </Box>
          </Box>
          <Testomonial />
          <FooterHome className="w-100" />
        </>
      ) : (
        navigate("/404.html")
      )}
    </>
  );
}
