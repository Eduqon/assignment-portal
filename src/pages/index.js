"use client";
import moment from "moment";
import { useRouter } from "next/router";
import validator from "validator";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavbarHome } from "../components/home_components/navbar_home.js";
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
              <img
                src="/assets/icons/assignment-santa-lines.png"
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
              backgroundImage={"url(/assets/icons/orderNow_home.png)"}
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
                    <Input type="date" id="date" aria-labelledby="deadline" />
                    <Input type="time" id="time" aria-labelledby="deadline" />
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
              <img src="/assets/icons/Santa_home.png" alt="Assignment Santa" />
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
                      <img src={data.icon} alt={data.altText} />
                    </Box>
                    <Box width={["70%", "70%", "70%", "80%"]}>
                      <h3
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 500,
                        }}
                      >
                        Step{" "}
                        <span style={{ color: "#EF2B4B" }}>{data.step_no}</span>{" "}
                        : {data.before_spanText}{" "}
                        <span style={{ color: "#EF2B4B" }}>
                          {data.spanText}
                        </span>{" "}
                        {data?.after_spanText}
                      </h3>
                      <Text fontSize={["0.7rem", "0.7rem", "0.7rem", "1rem"]}>
                        {data.sub_heading}
                      </Text>
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
              Assignment Help <span style={{ color: "#EF2B4B" }}>Services</span>
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
                    <img src={data.icon} alt={data.altText} />
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
              Assignment Help <span style={{ color: "#EF2B4B" }}>Features</span>
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
                    <img src={data.icon} alt={data.altText} />
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
        <Box id="question_section">
          <Stack gap={"1rem"} padding={["0rem", "0rem", "0rem", "0 3rem"]}>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Box display={["none", "none", "none", "block"]}>
                  <FaLocationArrow color="#EF2B4B" />
                </Box>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                  }}
                >
                  What exactly do you mean by an "assignment" and why would you
                  require assistance with one?
                </h3>
              </Box>
              <br />
              <Text>
                There is no doubt that writing projects are among the most
                dreaded chores that students are given to complete during their
                college years. The complexity of the assignments puts a great
                deal of mental strain on the students. No matter how challenging
                the project may be, students must nevertheless complete many
                assignments each day by the deadline given by their lecturers.
                It's especially harder for students who are less competent at
                writing and comprehending assignment issues. These students run
                into difficulties while writing their assignments and are unsure
                of who to turn to or where to look for assistance.
              </Text>
              <br />
              <Text>
                Academic assignments can be challenging or simple, depending on
                the subject. Things will be a lot easier to manage for students
                if they have <strong>assignment help</strong>. The student,
                however, encounters difficulties if their friends decline to
                lend a hand with their assignments. The situation becomes more
                challenging when the professor is also engaged and unable to
                respond to the student's questions. How may these circumstances
                be resolved, then? Do not worry. Whatever the case, a student in
                any circumstance can get in touch with{" "}
                <strong>Assignment Santa</strong> for any form of assistance. We
                are always available to assist you in finishing your assignment.
              </Text>
              <br />
              <Text>
                Although 24x7 accessibility is a minor aspect of our assignment
                assistance services, other features like timeliness and
                top-notch quality set us apart from the competition. Our skilled
                writers are completely aware that the deadline is one of the
                major causes of pressure when finishing and submitting an
                assignment. In this case, assignment writing services are
                crucial. Whatever the time restrictions, we will collaborate
                with you to complete your project ahead of schedule.
              </Text>
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Box display={["none", "none", "none", "block"]}>
                  <FaLocationArrow color="#EF2B4B" />
                </Box>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                  }}
                >
                  Employ the Assistance of Our Experts to Complete Your
                  Assignments on Time
                </h3>
              </Box>
              <br />
              <Text>
                The assignment is one of the most challenging tasks that
                students have to do throughout their academic careers. Students
                are now expected to complete numerous tasks across a variety of
                courses. Academic institutions provide grades for assignments
                based on their quality, which is a significant factor in
                assessing a student's overall academic performance. This thus
                puts more pressure on students to complete their assignments.
                Due to their lack of time and lack of prior assignment writing
                experience, students ultimately turned to the best assignment
                assistance services online for help.
              </Text>
              <br />
              <Text>
                You might be having trouble finishing your assignments if you're
                a student in high school, or university. Do you need any
                <strong>assignment help</strong>? Well, you have stopped at the
                right place. Regardless of your academic level,
                assignmentsanta.com has qualified assignment experts in many
                disciplines who are here to help you with all of your
                subject-related assignments. We have been in the business for a
                while and have already helped countless students earn top
                scores. The assignment assistance professionals on our team will
                deliver top-notch, precise answers before the deadline,
                depending on your needs.
              </Text>
              <br />
              <Text>
                Take advantage of our online assignment writing assistance. By
                enlisting our assignment help, you'll experience less academic
                stress and perform better in class.
              </Text>
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Box display={["none", "none", "none", "block"]}>
                  <FaLocationArrow color="#EF2B4B" />
                </Box>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                  }}
                >
                  Reduce your academic stress with our top-rated online
                  assignment help service, Best Writers, and Great Results.
                </h3>
              </Box>
              <br />
              <Text>
                The cause for assignment writing failure is a query that the
                majority of students ask themselves. Why getting an A on your
                assignment is difficult? According to our online assignment
                writers, having bad time management abilities results in a time
                rush, which strains your head. Moreover, one of the main causes
                of poor assignment grades is a lack of comprehension of academic
                research. Assignment Santa is aware of the requirements that
                professors will be looking for in your assignment to give it a
                first-class grade, but achieving them can be challenging. It is
                possible to become exhausted from nonstop research, writing, and
                assignment analysis. To assist you to succeed in your academic
                coursework, Assignment Santa has been offering custom assignment
                writing services. You can rank among the top students in your
                class by utilizing our first-rate{" "}
                <strong>online assignment help service</strong>. We provide a
                fair service with excellent results for all of our customers
                that require assignment help. To discover more about our writing
                style, the themes we cover, and the results it may provide for
                you, look at a few of our sample assignments.
              </Text>
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Box display={["none", "none", "none", "block"]}>
                  <FaLocationArrow color="#EF2B4B" />
                </Box>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                  }}
                >
                  Receive competent assignment help from anywhere in Australia,
                  Canada, the UK, and the USA.
                </h3>
              </Box>
              <br />
              <Text>
                Looking for reliable assignment help? Do you dislike having to
                write essays? Or unsure of where to begin but eager to produce a
                well-written assignment? The hunt is over now. We are here to
                help you with our excellent assignment assistance services.
                Simply get in touch with us to acquire a quality project on
                time. You may unwind and enjoy life by selecting our
                trustworthy, serious, and reliable assignment support services.
                After joining us, you won't look back and will continue to rely
                on us for all of your tasks going forward. Our assignment help
                services stand out for their accessibility from everywhere,
                which is a major plus.
              </Text>
              <br />
              <Text>
                Assignment Santa of Australia has a solid reputation in the
                fields of custom dissertation writing, court writing services,
                report writing assistance, and assignment writing services. Our
                well-known company has been providing{" "}
                <strong>online assignment help</strong> services to a variety of
                clientele. Our team works hard to finish projects by the
                deadline and on time. Your task will be completed on time and to
                your standards because of our extensive experience. Assignment
                Santa also provides editing and proofreading services to their
                clients.
              </Text>
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                <Box display={["none", "none", "none", "block"]}>
                  <FaLocationArrow color="#EF2B4B" />
                </Box>
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 500,
                  }}
                >
                  What Makes Our Online Assignment Helpers the Best for You?
                </h3>
              </Box>
              <br />
              <Text>
                Whenever you run into any assignment-related issues, get in
                touch with us right away. Our staff of academic writers is
                capable of producing unique answers for any kind of assignment
                on any topic. The assignment writer team at Assignmentsanta.com
                is considered to be the best among all assignment writing
                websites for the following reasons.
              </Text>
              <br />
              <UnorderedList>
                <ListItem>
                  We have native academic experts on our staff. Based on the
                  academic institutions in your nation's educational system's
                  needs for assignment writing, you can thus obtain fantastic
                  answers. Additionally, you won't encounter any language
                  hurdles when speaking with them.
                </ListItem>
                <ListItem>
                  Our academic writers will create a personalized paper on the
                  assignment topic of your choice with the appropriate
                  citations.
                </ListItem>
                <ListItem>
                  The assignment writers on our staff have extensive experience
                  in both academic writing and teaching. As a result, they are
                  quite skilled at producing content that will please your
                  supervisor and earn you excellent marks.
                </ListItem>
                <ListItem>
                  We have highly regarded professionals and Ph.D. scholars in
                  all subjects of study. They can therefore easily do in-depth
                  research and create unique, accurate answers that are free of
                  plagiarism.
                </ListItem>
                <ListItem>
                  Our professionals will answer quickly and without keeping you
                  waiting long for any of your questions.
                </ListItem>
              </UnorderedList>
            </Box>
          </Stack>
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
      <Box id="faqs" padding={["1rem", "1rem", "1rem", "1rem 3rem"]}>
        <Heading>Frequently Asked Questions for Assignment Help</Heading>
        <Box marginTop={"2rem"}>
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  I want to pay someone to do my assignment. Can I?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Yes, you can pay Assignment Santa to complete your homework.
                  We help you bargain with the Tutors for the best price on your
                  assignment. You are also welcome to haggle with us for the
                  best prices at any time. We work with a group of graduates,
                  professionals, and task-writing specialists who are available
                  twenty-four hours a day. Our staff offers extensive assignment
                  writing services and can handle a range of assignments.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What online resources can I use to help with my assignments?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text>
                  If you need assistance with your assignments, case studies, or
                  research writing projects, Assignment Santa is here to help.
                  We offer original, non-plagiarized content and assignments at
                  the lowest price possible. The primary principle of each
                  project followed by Assignment Santa is to thoroughly research
                  the subject, create a solid work schedule, and guarantee that
                  the online assignment writing service is completed by the
                  deadline. Many people, including working people, students,
                  specialists, and teachers, appreciate Assignment Santa's
                  versatile skills and affordable assignment help.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the best tips for choosing an online assignment help
                  services provider?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  There are a few important pointers that will help you do your
                  homework assignments on time and within your budget without
                  sacrificing the quality of the job.
                </Text>
                <UnorderedList>
                  <ListItem>Examine the services offered.</ListItem>
                  <ListItem>
                    Look into the expertise of the instructors.
                  </ListItem>
                  <ListItem>Consider time management..</ListItem>
                  <ListItem>Check the samples.</ListItem>
                  <ListItem>Evaluate the costs.</ListItem>
                </UnorderedList>
                <Text>
                  Contact Assignment Santa if you're looking for a dynamic and
                  reliable platform. We can offer cutting-edge online homework
                  help because of our extensive global network of qualified
                  tutors.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  Does assignmentsanta.com deliver original content with all its
                  assignment help services?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignment Santa makes a unique and distinctive assignment for
                  each of its customers. Along with being adept at original
                  writing, we also make use of a variety of modern technologies
                  to check the work for plagiarism before delivering it to
                  clients. It helps our writers to fix the plagiarism problem.
                  To get error-free material, our proofreading assignment
                  assistance professionals also check the assignments for
                  errors. They then continue to edit the contents so that they
                  preserve the papers' general relevance and tone while keeping
                  the contents flowing. These are the major reasons why so many
                  students use Assignment Santa to complete their assignments.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is the importance of assignments in lesson plans?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assessment is essential to the learning procedures. According
                  to John Biggs, an expert on higher education, "What and how
                  students learn depends to a great extent on how they perceive
                  they will be graded." Given the significance of assessment for
                  student learning, it is critical to think carefully about the
                  most effective method for measuring the learning you want your
                  students to acquire. Assessments should incorporate learning,
                  grading, and student enthusiasm. Effective evaluation methods
                  provide crucial insights into students' learning. They outline
                  the subjects the students studied, how well they retained the
                  content, and the difficulties they encountered.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  Is assignment help for students legal?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignment writing services are frequently used by university
                  and college students to assist them with a variety of
                  assignments. Essay writing services will keep expanding
                  because many students still have writing needs. If you follow
                  the guidelines, you are free to buy essays. Customers want to
                  do business with registered companies since registration
                  increases a company's credibility and trustworthiness.
                  However, use caution when selecting a writing service because
                  there are some unethical ones out there. And Assignment Santa
                  is among the best and most reputable writers you can work
                  with. They are reputable and well-known for providing the
                  greatest essay writing services available.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is the best website to get assignment help quickly?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Assignmentsanta.com is more than just an average assignment
                  writing company that provides{" "}
                  <a href="https://www.assignmentsanta.com/service/academic-writing- services">
                    academic writing services
                  </a>
                  . It is a group of highly educated paper writers that have
                  grouped to offer a solid solution to individuals facing
                  academic challenges. Many students who need assistance with
                  their assignments and homework find the Assignment Santa
                  website to be appealing. Additionally, they offer reasonable
                  help to students within a predetermined deadline.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the best ways to start an assignment introduction?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Your assignment's introduction is the first paragraph. Your
                  introduction should inform the reader about the paper's topic
                  and the justifications you plan to make for it. The aim of
                  your paper is made clear to the reader by the{" "}
                  <a href="https://www.assignmentsanta.com/blog/thesis-statement">
                    thesis statement
                  </a>
                  , which is part of the introduction. By shifting from a
                  generic to a specific introduction, you can accomplish these.
                  The first stage should consist of general summary of the
                  subject of your project. The topic should be focused in the
                  center of the introduction so that your reader can see how it
                  relates to your paper's overall goal. Finally, make sure to
                  properly state your thesis before leading the reader to your
                  major point.
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What are the main “assignment help for me" services available
                  at Assignment Santa?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  To make sure that our students don't have to wait for
                  "assignment help for me" services, some of the well-liked
                  sections of our assignment writing service are as follows:
                </Text>
                <UnorderedList>
                  <ListItem>Biotechnology.</ListItem>
                  <ListItem>Writing. </ListItem>
                  <ListItem>Graphic Design and other software. </ListItem>{" "}
                  <ListItem>Architecture and Planning. </ListItem>{" "}
                  <ListItem>Pharmaceutical Science. </ListItem>
                  <ListItem>
                    Ocean Engineering and Naval Architecture.{" "}
                  </ListItem>{" "}
                  <ListItem>Nursing. </ListItem>
                  <ListItem>Nuclear Engineering. </ListItem>
                  <ListItem>Metallurgical and Materials. </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                _focus={{
                  boxShadow: "none",
                }}
              >
                <Box
                  as="h3"
                  flex="1"
                  textAlign="left"
                  fontSize={"1.25rem"}
                  fontWeight={"500"}
                >
                  What is your key principle behind providing help in assignment
                  writing to students?
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Text>
                  Affordability, a plagiarism-free solution, availability, and
                  professionalism are our four primary principles for providing
                  writing services. We stand out from the other assignment
                  assistance service providers due to our inclination for the
                  ASAP approach. Our specialized assignment assistance follows
                  the principle of absorbing ideas and using them to create a
                  superior assignment answer.
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
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
