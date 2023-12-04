"use client";
import moment from "moment";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavbarHome } from "../components/home_components/navbar_home.js";
import { FormHome } from "../components/home_components/form_home.js";
import { FeaturesHome } from "../components/home_components/features_home.js";
import { FooterHome } from "../components/home_components/footer_home.js";
import HeadLayout from "../components/home_components/HeadLayout.js";
import { client } from "./_app.js";
import { SEOTAGS, SERVICES, REVIEWS, apiUrl } from "../services/contants.js";
import Star from "../components/Star.js";
import { Key_features } from "../../public/key_features.js";
import { services_data } from "../../public/services.js";
import Slider from "../components/home_components/sliders/Slider.js";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ClientStore } from "../services/stores/client_store.js";
import { AssignmentFormStore } from "../services/stores/assignment_form_store.js";
import axios from "axios";
import { steps_data } from "../../public/steps_file.js";

function Home({ services, seotags, reviews }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewListData, setReviewListData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [pages, setPages] = useState(0);
  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  const [subjects, setSubjects] = useState([]);
  const { data: reviewsData } = reviews;
  const limit = 12;

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
    handleSort();
  }, [currentPage]);

  const handleSort = () => {
    const sortedData = [...reviewsData];

    sortedData.sort((a, b) => {
      const dateA = new Date(a.attributes.Date);
      const dateB = new Date(b.attributes.Date);
      return dateB - dateA;
    });
    const sortedList =
      sortedData &&
      sortedData.slice(currentPage * limit, (currentPage + 1) * limit);
    setReviewListData(sortedList);
  };

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
    console.log({ value });
    const searchValue = value.toLowerCase();
    setSearchInput(searchValue);
    fetchSearchData(searchValue);
  };

  return (
    <>
      <HeadLayout
        slug="assignment-help-online-assignment-assistance"
        seotags={seotags}
      />
      <NavbarHome services={services} />
      <Box
        width={"100%"}
        backgroundColor={"#FFECEC"}
        display={"flex"}
        height={["55rem", "55rem", "50rem", "30rem"]}
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
              <img src="/assets/icons/lines.png" />
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
                Securing <span style={{ color: "#EF2B4B" }}>Higher Grades</span>{" "}
                Costing Your Pocket?
              </Heading>
              <Text>
                Get professional assistance for your assignments at unbeatable
                prices. Don't miss out, book now!
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
            <Box position={"absolute"}>
              <img src="/assets/icons/orderNow_home.png" />
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
            <Box
              position={"absolute"}
              right={["1%", "1%", "1%", "-35%"]}
              width={["auto", "auto", "22%", "46%"]}
              top={"5rem"}
              display={["none", "none", "block", "block"]}
            >
              <img src="/assets/icons/Santa_home.png" />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id="works">
        <Box>
          <Heading textTransform={"capitalize"} textAlign={"center"}>
            How It <span style={{ color: "#EF2B4B" }}>Works</span>
          </Heading>
          <hr
            style={{
              width: "6%",
              color: "#EF2B4B",
              margin: "1rem auto",
              borderTopWidth: "4px",
              opacity: 1,
            }}
          />
        </Box>
        <Box
          top={0}
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          padding={"1rem"}
          flexDirection={["column", "column", "column", "row"]}
          gap={"1rem"}
        >
          <Box width={["100%", "100%", "65%", "25%"]} display={"block"}>
            <Slider />
          </Box>
          <Box
            width={["100%", "100%", "100%", "50%"]}
            display={"flex"}
            flexDirection={"column"}
            // gap={"2rem"}
            position={"relative"}
          >
            {steps_data.map((data) => {
              return (
                <>
                  <Box
                    border={"1px solid #C71A37"}
                    borderRadius={"0.4rem"}
                    padding={"1rem"}
                    display={"flex"}
                    alignItems={["center", "center", "center", "start"]}
                    gap={"1rem"}
                  >
                    <Box width={["30%", "30%", "30%", "15%"]}>
                      <img src={data.icon} />
                    </Box>
                    <Box width={["70%", "70%", "70%", "80%"]}>
                      <Heading size="md">
                        Step{" "}
                        <span style={{ color: "#EF2B4B" }}>{data.step_no}</span>{" "}
                        : {data.before_spanText}{" "}
                        <span style={{ color: "#EF2B4B" }}>
                          {data.spanText}
                        </span>{" "}
                        {data?.after_spanText}
                      </Heading>
                      <Box fontSize={["0.7rem", "0.7rem", "0.7rem", "1rem"]}>
                        {data.sub_heading}
                      </Box>
                    </Box>
                  </Box>
                  {data.lastDiv && (
                    <Box
                      height="2rem"
                      borderLeft="3px dotted #C71A37"
                      marginLeft="2rem"
                    />
                  )}
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        id="reviews-section"
        display={"flex"}
        alignItems={"center"}
        padding={"2rem"}
        flexDirection={"column"}
        gap={"2rem"}
        background={"linear-gradient(250deg, #FFEDED, transparent)"}
      >
        <Box id="services">
          <Box>
            <Heading textTransform={"capitalize"} textAlign={"center"}>
              Our <span style={{ color: "#EF2B4B" }}>Services</span>
            </Heading>
            <hr
              style={{
                width: "6%",
                color: "#EF2B4B",
                margin: "1rem auto",
                borderTopWidth: "4px",
                opacity: 1,
              }}
            />
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={[
              "auto",
              "auto",
              "auto auto",
              "auto auto auto",
            ]}
            justifyContent={"space-around"}
            gap={[0, 0, 0, "5rem"]}
            padding={[0, 0, 0, "0 5rem"]}
          >
            {services_data.map((data) => {
              return (
                <Box
                  display={"flex"}
                  gap={"1rem"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  textAlign={"center"}
                  padding={"1rem"}
                >
                  <Box
                    width={"3rem"}
                    borderRadius={"0.3rem"}
                    background={"#ffd9df"}
                    padding={"0.4rem"}
                  >
                    <img src={data.icon} />
                  </Box>
                  <Box>
                    <Heading size="md">{data.heading}</Heading>
                    <Text>{data.sub_heading}</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box id="features">
          <Box>
            <Heading textTransform={"capitalize"} textAlign={"center"}>
              Our <span style={{ color: "#EF2B4B" }}>Key Features</span>
            </Heading>
            <hr
              style={{
                width: "6%",
                color: "#EF2B4B",
                margin: "1rem auto",
                borderTopWidth: "4px",
                opacity: 1,
              }}
            />
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={[
              "auto",
              "auto",
              "auto auto",
              "auto auto auto",
            ]}
            justifyContent={"space-around"}
            gap={[0, 0, 0, "5rem"]}
            padding={[0, 0, 0, "0 5rem"]}
          >
            {Key_features.map((data) => {
              return (
                <Box
                  display={"flex"}
                  gap={"1rem"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  textAlign={"center"}
                  padding={"1rem"}
                >
                  <Box
                    width={"3rem"}
                    borderRadius={"0.3rem"}
                    background={"#ffd9df"}
                    padding={"0.4rem"}
                  >
                    <img src={data.icon} />
                  </Box>
                  <Box>
                    <Heading size="md">{data.heading}</Heading>
                    <Text>{data.sub_heading}</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box id="reviews">
          <Heading textTransform={"capitalize"} textAlign={"center"}>
            Countless <span style={{ color: "#EF2B4B" }}>positive</span> reviews
            <br />
            from <span style={{ color: "#EF2B4B" }}>satisfied students</span>
          </Heading>
          <Box
            width={"100%"}
            height={"100%"}
            padding={["0rem", "2rem"]}
            display={"grid"}
            gridTemplateColumns={[
              "auto",
              "auto",
              "auto auto",
              "auto auto auto auto",
            ]}
            justifyContent={"center"}
            gap={"2rem"}
            marginTop={["1rem", "0rem"]}
          >
            {reviewListData.map((review) => {
              return (
                review && (
                  <Box
                    borderRadius={"20px"}
                    background={"#fff"}
                    padding={"1rem"}
                    boxShadow={"0px 0px 15px -5px #000"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                    gap={"1rem"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Heading
                        fontSize={"14px"}
                        fontWeight={"700"}
                        color="#EF2B4B"
                      >
                        {review.attributes.Review_heading}
                      </Heading>
                      <RiDoubleQuotesL
                        color="#EF2B4B"
                        opacity={"0.6"}
                        fontSize={"2rem"}
                      />
                    </Box>
                    <Text fontWeight={"500"} color={"#303B4F"}>
                      {review.attributes.Main_heading}
                    </Text>
                    <Text
                      fontSize={"14px"}
                      fontWeight={"400"}
                      fontStyle={"italic"}
                      color={"#222222"}
                    >
                      {review.attributes.Sub_heading}
                    </Text>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        id="rating"
                        display={"flex"}
                        alignItems={"center"}
                        gap={"0.5rem"}
                      >
                        <Star stars={review.attributes.Rating} />
                        <span style={{ fontWeight: 700 }}>
                          {review.attributes.Rating}
                        </span>
                      </Box>
                      <Box id="date">
                        {moment(review.attributes.Date).format("ll")}
                      </Box>
                    </Box>
                    <Box>
                      User ID:{" "}
                      <span style={{ fontWeight: "600" }}>
                        {review.attributes.UserID}
                      </span>
                    </Box>
                  </Box>
                )
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box
        width={"100%"}
        position={"relative"}
        height={["20rem", "540px"]}
        marginTop={"2rem"}
      >
        <Box
          backgroundImage={"url(/assets/newDesigns/FooterBg.png)"}
          backgroundSize={"cover"}
          height={["83%", "90%"]}
          width={"100%"}
          position={"absolute"}
          bottom={0}
        >
          <Box
            id="right-section"
            position={"absolute"}
            right={["-3rem", "2rem"]}
            bottom={0}
            width={["15rem", "30rem"]}
            transform={["translateX(-50%)", "none"]}
            display={["none", "none", "none", "block"]}
          >
            <img src="/assets/newDesigns/FooterSanta.png" alt="" />
          </Box>
        </Box>
        <Box
          id="wait-longer-section"
          background={"#FFF3DB"}
          width={["20rem", "580px"]}
          height={"100%"}
          position={"relative"}
          marginLeft={["1rem", "3rem"]}
        >
          <Box id="vector"></Box>
          <Box
            id="top-section"
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}
            padding={"4rem"}
          >
            <Heading fontSize={["25px", "40px"]} fontWeight={"700"}>
              Why wait <span style={{ color: "#EF2B4B" }}>any longer</span>?
            </Heading>
            <Text fontSize={["15px", "20px"]} fontWeight={"500"}>
              Place an order now and get proposals from our professional writers
              within 10 seconds
            </Text>
            <Button
              width={["auto", "12rem"]}
              background={"#EF2B4B"}
              color="#fff"
              padding={["0rem", "2rem 8rem"]}
              borderRadius={"40px"}
              fontWeight={"600"}
              fontSize={["15px", "23px"]}
            >
              Order Now
            </Button>
          </Box>
          <Box
            id="bottom-section"
            position={"absolute"}
            bottom={["0rem", "-1rem"]}
            left={["0%", "7%"]}
            transform={["scale(1)", "scale(1.1)"]}
          >
            <img src="/assets/newDesigns/Gifts.png" alt="" />
          </Box>
        </Box>
      </Box>
      <FooterHome />
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data } = await client.query({
    query: SEOTAGS,
  });
  const { data: reviewsData } = await client.query({
    query: REVIEWS,
  });
  return {
    props: {
      services: serviceData.services || null,
      seotags: data.seotags || null,
      reviews: reviewsData.reviews || null,
    },
  };
}
