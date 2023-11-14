import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
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
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Td,
  Tbody,
  Link,
  Text,
  Select,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, MinusIcon, Search2Icon } from "@chakra-ui/icons";
import { isMobile } from "react-device-detect";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import {
  apiUrl,
  FAQSCHEMA,
  mediaUrl,
  SERVICE,
  SERVICES,
} from "../../services/contants";
import { useRouter } from "next/router";
import useFetch from "../../hooks/useFetch";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { FooterHome } from "../../components/home_components/footer_home";
import Testomonial from "../../components/home_components/Testomonial";
import Faqschema from "../../components/home_components/Faqschema";
import { client } from "../_app";
import Custom404 from "../404";

const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AssignmentSanta",
  url: "https://www.assignmentsanta.com",
  logo: "https://www.assignmentsanta.com/assets/newDesigns/Logo.png",
  sameAs: [
    "https://www.facebook.com/assignmentsanta/",
    "https://twitter.com/AssignmentSanta",
    "https://www.instagram.com/assignmentsanta04/",
    "https://www.youtube.com/channel/UCiuHzMoZc4GQ7dMG2quupbg",
  ],

  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+16042562312",
      email: "info@assignmentsanta.com",
      contactType: "customer service",
    },
  ],
};

const productData = {
  "@context": "http://schema.org/",
  "@type": "product",
  name: "assignmentsanta",
  image: "https://www.assignmentsanta.com/assets/newDesigns/Logo.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "5473",
  },
};

export default function NavService({ servicesdata, services, faqschemas }) {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  let navigate = useRouter();
  const { slug } = navigate.query;

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

  useEffect(() => {
    let date = document.getElementById("date");
    if (date) {
      date.min = new Date().toLocaleDateString("en-ca");
      date.value = new Date().toLocaleDateString("en-ca");
    }
  }, []);

  const getURL =
    services && services.data.some((val) => val.attributes.slug === slug);

  const title =
    servicesdata && getURL && servicesdata.data[0].attributes.Seotitle;
  const description =
    servicesdata && getURL && servicesdata.data[0].attributes.Seodescription;
  const keyword =
    servicesdata && getURL && servicesdata.data[0].attributes.Seokeyword;
  const canonicalURL =
    servicesdata && getURL && servicesdata.data[0].attributes.Seocntag;
  const SchemaTitle =
    servicesdata && getURL && servicesdata.data[0].attributes.SchemaTitle;

  const serviceImageAltText =
    servicesdata &&
    getURL &&
    servicesdata.data[0].attributes.Media &&
    servicesdata.data[0].attributes.Media.data.length !== 0 &&
    servicesdata.data[0].attributes.Media.data[0].attributes.alternativeText;

  // const serviceImageHash =
  //   servicesdata &&
  //   getURL &&
  //   servicesdata.data[0].attributes.Media &&
  //   servicesdata.data[0].attributes.Media.data.length !== 0 &&
  //   servicesdata.data[0].attributes.Media.data[0].attributes.hash;

  // const serviceImageExt =
  //   servicesdata &&
  //   getURL &&
  //   servicesdata.data[0].attributes.Media &&
  //   servicesdata.data[0].attributes.Media.data.length !== 0 &&
  //   servicesdata.data[0].attributes.Media.data[0].attributes.ext;

  // const serviceImage =
  //   servicesdata &&
  //   getURL &&
  //   servicesdata.data[0].attributes.Media &&
  //   servicesdata.data[0].attributes.Media.data.length !== 0 &&
  //   servicesdata.data[0].attributes.Media.data[0].attributes.url;

  console.log({ servicesdata });

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

  // const bgColor = useColorModeValue("white", "gray.700");

  // const { apiData } = useFetch(mediaUrl + "/upload/files");
  // const serviceImage =
  //   apiData &&
  //   servicesdata &&
  //   getURL &&
  //   apiData.filter(
  //     (data) => data.name === servicesdata.data[0].attributes.slug
  //   );

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
          <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keyword && <meta name="keyword" content={keyword} />}
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
            />
          </Head>
          <Link href="/samples">
            <img src="/assets/foter/View.png" alt="" className="view" />
          </Link>
          <NavbarHome services={services} />
          <Box
            className="contain"
            position={"relative"}
            height={["100vh", "100vh", "55vh", "70vh"]}
            marginBottom={"2rem"}
          >
            <Box
              className="bg-image"
              height={"100%"}
              width={"100%"}
              filter={"blur(2px)"}
              position={"absolute"}
            ></Box>
            <Box
              position={"absolute"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              width={"100%"}
              flexDirection={["column", "column", "column", "row"]}
              top={"50%"}
              transform={"translateY(-50%)"}
            >
              <Box width={["auto", "500px"]} marginTop={["1rem", "0rem"]}>
                <Box
                  color={"white"}
                  textAlign={["center", "center", "center", "left"]}
                >
                  <Heading fontSize={["1.5rem", "2.25rem"]} fontWeight={"bold"}>
                    {servicesdata && servicesdata.data[0].attributes.title}
                  </Heading>
                  <Heading
                    size={"md"}
                    lineHeight={"1.5"}
                    fontSize={["1rem", "1.25rem"]}
                  >
                    {servicesdata && servicesdata.data[0].attributes.Sub_Title}
                  </Heading>
                  <Text>
                    {servicesdata &&
                      servicesdata.data[0].attributes.Sub_Title_2}
                  </Text>
                </Box>
              </Box>
              <Box id="form-section" width={["100%", "100%", "100%", "50%"]}>
                <Stack spacing={4} mx={"auto"} maxW={"lg"} px={6}>
                  <Box
                    display={["none", "none", "none", "block"]}
                    color={"#fff"}
                  >
                    <Heading size={"xl"}>
                      {servicesdata &&
                        servicesdata.data[0].attributes.Formheading}
                    </Heading>
                    <Text textTransform={"capitalize"}>
                      Take help from best writing service !!
                    </Text>
                  </Box>
                  <Box
                    rounded={"lg"}
                    background={"#fff"}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <Box className="d-flex flex-column flex-md-row flex-sm-row flex-lg-row">
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
                      </Box>
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
          <Box className="row w-100 h-100 d-flex" margin={"0"}>
            <div
              id="bottom-section"
              className="col-md-8 col-12 d-flex align-items-center flex-column p-5"
            >
              <div className="headings d-flex justify-content-center align-items-center mb-4">
                <Heading size={"lg"}>
                  {servicesdata && servicesdata.data[0].attributes.body_title}
                </Heading>
              </div>
              <Box
                className="service-body"
                style={{ whiteSpace: "pre-line", padding: "0 2rem" }}
              >
                <ReactMarkdown>
                  {servicesdata &&
                    servicesdata.data[0].attributes.body_1
                      .split("<br/>")
                      .join("\n")}
                </ReactMarkdown>
              </Box>
              <br />
              {serviceImageHash && (
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
                    <img
                      src=""
                      // src={serviceImage}
                      // src={`https://media.assignmentsanta.com/${
                      //   serviceImageHash + serviceImageExt
                      // }`}
                      alt={serviceImageAltText}
                      style={{
                        width: "100%",
                      }}
                    />
                    {/* <Box
                      width={"100%"}
                      height={"100%"}
                      backgroundImage={`url(${serviceImage})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                    /> */}
                  </Box>
                  <br />
                </>
              )}

              {servicesdata &&
                servicesdata.data[0].attributes.table_heading && (
                  <TableContainer
                    width={"90%"}
                    border="1px solid #eee"
                    borderRadius={"15px"}
                  >
                    <Table variant="simple">
                      <TableCaption
                        style={{
                          captionSide: "top",
                          marginTop: "0",
                          padding: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        <h2 style={{ fontSize: "20px" }}>
                          {servicesdata &&
                            servicesdata.data[0].attributes.table_heading}
                        </h2>
                      </TableCaption>
                      <Tbody borderTopWidth={"1px"}>
                        {servicesdata &&
                          servicesdata.data[0].attributes.table_data &&
                          servicesdata.data[0].attributes.table_data.length !==
                            0 &&
                          servicesdata &&
                          servicesdata.data[0].attributes.table_data.map(
                            (data) => {
                              return (
                                <Tr>
                                  {data.firstData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.firstData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.firstData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.secondData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.secondData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.secondData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.thirdData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.thirdData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.thirdData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.fourthData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.fourthData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.fourthData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.fifthData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.fifthData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.fifthData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.sixthData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.sixthData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.sixthData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.seventhData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.seventhData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.seventhData.name}
                                      </Link>
                                    </Td>
                                  )}
                                  {data.eighthData && (
                                    <Td
                                      borderRight={"1px solid #eee"}
                                      textAlign="center"
                                    >
                                      <Link
                                        href={data.eighthData.Link}
                                        target="_blank"
                                        _hover={{
                                          color: "#dc3545",
                                        }}
                                      >
                                        {data.eighthData.name}
                                      </Link>
                                    </Td>
                                  )}
                                </Tr>
                              );
                            }
                          )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
              <br />
              {servicesdata && servicesdata.data[0].attributes.body_2 && (
                <Box
                  className="service-body"
                  style={{ "white-space": "pre-line", padding: "0 2rem" }}
                >
                  <ReactMarkdown>
                    {servicesdata &&
                      servicesdata.data[0].attributes.body_2
                        .split("<br/>")
                        .join("\n")}
                  </ReactMarkdown>
                </Box>
              )}
              <br />
              <Faqschema
                title={SchemaTitle}
                slug={slug}
                faqschemas={faqschemas}
              />
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
                  <Search2Icon fontSize="3rem" />
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
                  alt="Paypal Image"
                  style={{ "padding-top": "20px", "padding-bottom": "20px" }}
                  src="/assets/img/paypal_image.png"
                />
              </Box>
              <Box>
                <img
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt="MONEY BACK"
                  src="/assets/img/MONEY_BACK.png"
                />
              </Box>
              <Box>
                <img
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt="100p QUALITY"
                  src="/assets/img/100p_QUALITY.png"
                />
              </Box>
              <Box>
                <img
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt="Lowest_Price_Guarantee"
                  src="/assets/img/Lowest_Price_Guarantee.png"
                />
              </Box>
              <Box>
                <img
                  style={{ "padding-top": "10px", "padding-bottom": "20px" }}
                  alt="Plagiarism_Free_Work"
                  src="/assets/img/Plagiarism_Free_Work.png"
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
        <Custom404 />
      )}
    </>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const { data } = await client.query({
    query: SERVICE,
    variables: { slug: slug },
  });
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data: faqschemasData } = await client.query({
    query: FAQSCHEMA,
  });
  if (
    Object.keys(data.services).length === 0 ||
    Object.keys(serviceData.services).length === 0 ||
    Object.keys(faqschemasData.faqschemas).length === 0
  ) {
    return {
      notFound: true,
      props: {},
    };
  }
  return {
    props: {
      servicesdata: data.services || null,
      services: serviceData.services || null,
      faqschemas: faqschemasData.faqschemas || null,
    },
  };
}
