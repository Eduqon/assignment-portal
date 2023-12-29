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
  Divider,
  Avatar,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Td,
  Tbody,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, ChevronRightIcon, MinusIcon } from "@chakra-ui/icons";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import {
  apiUrl,
  BLOG,
  BLOGS,
  FAQSCHEMA,
  OTHERASSIGNMENTSERVICES,
  SERVICES,
} from "../../services/contants";
import { useRouter } from "next/router";
import { NavbarHome } from "../../components/home_components/navbar_home";
import FooterHome from "../../components/home_components/footer_home";
import { client } from "../_app";
import Custom404 from "../404";
import Faqschema from "../../components/home_components/Faqschema";

const data = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AssignmentSanta",
  url: "https://www.assignmentsanta.com",
  logo: "https://www.assignmentsanta.com/assets/newDesigns/assignment-santa-logo.webp",
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
  image:
    "https://www.assignmentsanta.com/assets/newDesigns/assignment-santa-logo.webp",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "5473",
  },
};

export default function NavService({
  blogsdata,
  services,
  faqschemas,
  allBlogs,
  otherAssignmentservices,
}) {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  let navigate = useRouter();
  const { blog } = navigate.query;
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

  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(
      typeof window !== "undefined" && window.innerWidth
    );
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 768;
  };
  const isMobileView = useCheckMobileScreen();

  const getURL =
    blogsdata && blogsdata.data.some((val) => val.attributes.Slug === blog);

  const title = blogsdata && getURL && blogsdata.data[0].attributes.Seo_Title;
  const description =
    blogsdata && getURL && blogsdata.data[0].attributes.Seo_Description;
  const keyword =
    blogsdata && getURL && blogsdata.data[0].attributes.Seo_Keyword;
  const canonicalURL =
    blogsdata && getURL && blogsdata.data[0].attributes.Seo_Cntag;
  const SchemaTitle =
    blogsdata && getURL && blogsdata.data[0].attributes.SchemaTitle;

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

  const bgColor = useColorModeValue("white", "gray.700");

  const blogImage =
    blogsdata &&
    getURL &&
    blogsdata.data[0].attributes.Image &&
    blogsdata.data[0].attributes.Image.data.length !== 0 &&
    blogsdata.data[0].attributes.Image.data[0].attributes.url;

  const blogImageAltText =
    blogsdata &&
    getURL &&
    blogsdata.data[0].attributes.Image &&
    blogsdata.data[0].attributes.Image.data.length !== 0 &&
    blogsdata.data[0].attributes.Image.data[0].attributes.alternativeText;

  const topPostValues =
    otherAssignmentservices &&
    otherAssignmentservices.data.length !== 0 &&
    otherAssignmentservices.data[0].attributes &&
    otherAssignmentservices.data[0].attributes.Other_Assignment_Services &&
    otherAssignmentservices.data[0].attributes.Other_Assignment_Services
      .topPosts;

  const relatedPostsValues =
    blogsdata &&
    blogsdata.data[0].attributes &&
    blogsdata.data[0].attributes.related_post &&
    blogsdata.data[0].attributes.related_post.related_posts.length !== 0 &&
    blogsdata.data[0].attributes.related_post.related_posts;

  const relatedPosts =
    relatedPostsValues &&
    relatedPostsValues.length !== 0 &&
    relatedPostsValues
      .map((post) => {
        return (
          allBlogs &&
          allBlogs.data.length !== 0 &&
          allBlogs.data.filter((val) => val.attributes.Slug === post)
        );
      })
      .flat();

  console.log({ blogsdata, allBlogs, relatedPosts });

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
            {title && (
              <meta
                prefix="og: http://ogp.me/ns#"
                property="og:title"
                content={title}
              />
            )}
            <meta name="robots" content="max-image-preview:large" />
            <meta
              prefix="og: http://ogp.me/ns#"
              property="og:type"
              content="article"
            />
            {description && (
              <meta
                prefix="og: http://ogp.me/ns#"
                property="og:description"
                content={description}
              />
            )}
            <meta
              prefix="og: http://ogp.me/ns#"
              property="og:url"
              content={`https://www.assignmentsanta.com/blog/${blog}`}
            />
            {blogImage && (
              <meta
                prefix="og: http://ogp.me/ns#"
                property="og:image"
                content={blogImage}
              />
            )}
            <meta
              prefix="article: http://ogp.me/ns/article#"
              property="article:published_time"
              content={new Date(
                blogsdata.data[0].attributes.createdAt
              ).toLocaleDateString()}
            />
            {description && <meta name="description" content={description} />}
            {keyword && <meta name="keyword" content={keyword} />}
            <meta
              prefix="og: http://ogp.me/ns#"
              property="og:site_name"
              content="Assignment Santa Blog"
            />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@AssignmentSanta" />
            <meta name="twitter:creator" content="@AssignmentSanta" />
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
          <Divider />
          <Box padding={"1rem"} width={"90%"} margin={"0 auto"}>
            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              style={{
                listStyleType: "none",
                display: "flex",
              }}
            >
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <a itemProp="item" href="https://www.assignmentsanta.com/">
                  <span itemProp="name">
                    Home <ChevronRightIcon color="gray.500" />
                  </span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <a
                  itemProp="item"
                  itemId="https://www.assignmentsanta.com/blog"
                  href="/blog"
                >
                  <span itemProp="name">
                    Blog <ChevronRightIcon color="gray.500" />
                  </span>
                </a>
                <meta itemProp="position" content="2" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name" style={{ textTransform: "capitalize" }}>
                  {blog.split("-").join(" ")}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </Box>
          <Box
            w="90%"
            overflow="hidden"
            margin="15px auto"
            display="flex"
            justifyContent="space-around"
            flexDirection={["column", "column", "column", "row"]}
          >
            <Box id="left_section" w={["100%", "100%", "100%", "65%"]} h="100%">
              <Box
                boxShadow="lg"
                borderRadius="10px"
                border="1px solid #eee"
                padding="1rem"
              >
                <Heading fontSize={["1.6rem", "2rem"]}>
                  {blogsdata.data[0].attributes.Heading}
                </Heading>
                <HStack mt="1rem">
                  <span>
                    Published by <i class="fa fa-user" aria-hidden="true"></i>{" "}
                    {blogsdata.data[0].attributes.Author} at{" "}
                    <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                    {new Date(
                      blogsdata.data[0].attributes.createdAt
                    ).toLocaleDateString()}
                  </span>
                </HStack>
                {blogImage && (
                  <>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      width={"100%"}
                      height={["auto", "auto", "auto", "500px"]}
                      marginTop={2}
                      overflow="hidden"
                    >
                      <Box width={"100%"}>
                        <img
                          src={blogImage}
                          alt={blogImageAltText}
                          style={{
                            width: "100%",
                          }}
                        />
                      </Box>
                    </Box>
                    <br />
                  </>
                )}
                <Box
                  mt="1rem"
                  className="service-body"
                  style={{ "white-space": "pre-line", padding: "0 2rem" }}
                >
                  <ReactMarkdown>
                    {blogsdata &&
                      blogsdata.data[0].attributes.body
                        .split("<br/>")
                        .join("\n")}
                  </ReactMarkdown>
                </Box>
                <br />
                {blogsdata && blogsdata.data[0].attributes.table_heading && (
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
                          {blogsdata &&
                            blogsdata.data[0].attributes.table_heading}
                        </h2>
                      </TableCaption>
                      <Tbody borderTopWidth={"1px"}>
                        {blogsdata &&
                          blogsdata.data[0].attributes.table_data &&
                          blogsdata.data[0].attributes.table_data.length !==
                            0 &&
                          blogsdata.data[0].attributes.table_data.map(
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
                <Faqschema
                  title={SchemaTitle}
                  slug={blog}
                  faqschemas={faqschemas}
                />
                <Divider mt="1rem" />
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  mt="1rem"
                  p={4}
                  background="gray.100"
                  borderRadius="15px"
                  flexDirection={["column", "column", "column", "row"]}
                >
                  <Box id="user_icon" w={["auto", "5%"]}>
                    <Avatar />
                  </Box>
                  <Box id="user_info" w={["100%", "100%", "100%", "90%"]}>
                    <Heading fontSize={"3xl"} paddingBottom="0.5rem">
                      {blogsdata.data[0].attributes.Author}
                    </Heading>
                    <ReactMarkdown>
                      {blogsdata.data[0].attributes.Author_BIO}
                    </ReactMarkdown>
                  </Box>
                </Box>
                <br />
              </Box>
              {relatedPosts && relatedPosts.length !== 0 && (
                <Box marginTop={"1rem"}>
                  <Heading textAlign={["center", "center", "center", "left"]}>
                    Related Posts
                  </Heading>
                  <Box
                    display={"grid"}
                    gap={"1rem"}
                    marginTop={"1rem"}
                    marginBottom={"1rem"}
                    gridTemplateColumns={[
                      "auto",
                      "auto",
                      "auto auto",
                      "auto auto auto",
                    ]}
                  >
                    {relatedPosts.map((post) => {
                      return (
                        post && (
                          <Box
                            maxW={["auto", "345px"]}
                            border="1px solid #eee"
                            p="6"
                            borderRadius="15px"
                            display={"flex"}
                            flexDirection={"column"}
                            position={"relative"}
                          >
                            <Box
                              width={"100%"}
                              height={["30vh", "30vh", "30vh", "20vh"]}
                            >
                              {post.attributes &&
                                post.attributes.Image &&
                                post.attributes.Image.data &&
                                post.attributes.Image.data.length !== 0 &&
                                post.attributes.Image.data[0].attributes &&
                                post.attributes.Image.data[0].attributes
                                  .url && (
                                  <Box
                                    width={"100%"}
                                    height={"100%"}
                                    backgroundImage={`url(${post.attributes.Image.data[0].attributes.url})`}
                                    backgroundSize={"cover"}
                                    backgroundPosition={[
                                      "center",
                                      "center",
                                      "center",
                                      "start",
                                    ]}
                                  />
                                )}
                            </Box>
                            {post &&
                              post.attributes &&
                              post.attributes.Slug && (
                                <Box>
                                  <Heading
                                    my="4"
                                    fontWeight={"600"}
                                    fontSize={"20px"}
                                    size="md"
                                    cursor={"pointer"}
                                  >
                                    <a
                                      href={`/blog/${post.attributes.Slug}`}
                                      style={{
                                        color: "#000",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {`${post.attributes.Heading}`}
                                    </a>
                                  </Heading>
                                </Box>
                              )}
                          </Box>
                        )
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              id="right_section"
              w={["100%", "100%", "100%", "30%"]}
              h="100%"
              border="1px solid #eee"
              padding={["1rem 0", "1rem"]}
              boxShadow="lg"
              borderRadius="10px"
            >
              <div id="form-section">
                <Stack
                  spacing={4}
                  mx={"auto"}
                  maxW={"lg"}
                  px={6}
                  className="set-pp"
                  padding={["0"]}
                >
                  <Stack align={"center"}>
                    <p
                      style={
                        isMobileView
                          ? { fontSize: "2rem", fontWeight: "bold" }
                          : { fontSize: "2.25rem", fontWeight: "bold" }
                      }
                    >
                      Assignment Santa
                    </p>
                    <p color="#000" className="text-capitalize">
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
              <Box width={"100%"} backgroundColor={"#f0f5f8"}>
                <div
                  className="bg-grey p-20 mb-20"
                  style={{ "margin-top": "20px" }}
                >
                  <Heading marginTop={"10"} marginLeft={"3"}>
                    Top Posts
                  </Heading>
                  <ul className="list-group list-group-flush">
                    {topPostValues &&
                      topPostValues.map((value) => {
                        return (
                          <li
                            className="list-group-item"
                            style={{ background: "#0000" }}
                          >
                            <a
                              href={`/blog/${value}`}
                              style={{ textTransform: "capitalize" }}
                            >
                              {value.split("-").join(" ")}
                            </a>
                          </li>
                        );
                      })}{" "}
                  </ul>
                </div>
              </Box>
            </Box>
          </Box>

          <FooterHome className="w-100" />
        </>
      ) : (
        <Custom404 />
      )}
    </>
  );
}

export async function getServerSideProps({ params: { blog } }) {
  const { data } = await client.query({
    query: BLOG,
    variables: { blog: blog },
  });
  const { data: allBlogs } = await client.query({
    query: BLOGS,
  });
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data: faqschemasData } = await client.query({
    query: FAQSCHEMA,
  });
  const { data: otherAssignmentservicesData } = await client.query({
    query: OTHERASSIGNMENTSERVICES,
  });
  if (
    Object.keys(data.blogs).length === 0 ||
    Object.keys(serviceData.services).length === 0 ||
    Object.keys(faqschemasData.faqschemas).length === 0 ||
    Object.keys(allBlogs.blogs).length === 0 ||
    Object.keys(otherAssignmentservicesData.otherAssignmentservices).length ===
      0
  ) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: {
      blogsdata: data.blogs || null,
      services: serviceData.services || null,
      faqschemas: faqschemasData.faqschemas || null,
      allBlogs: allBlogs.blogs || null,
      otherAssignmentservices:
        otherAssignmentservicesData.otherAssignmentservices || null,
    },
  };
}
