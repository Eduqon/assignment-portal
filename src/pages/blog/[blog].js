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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import validator from "validator";
import { ClientStore } from "../../services/stores/client_store";
import { AssignmentFormStore } from "../../services/stores/assignment_form_store";
import axios from "axios";
import {
  apiUrl,
  BLOG,
  BLOGS,
  FAQSCHEMA,
  mediaUrl,
  SERVICES,
} from "../../services/contants";
import { useRouter } from "next/router";
import useFetch from "../../hooks/useFetch";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { FooterHome } from "../../components/home_components/footer_home";
import Link from "next/link";
import { client } from "../_app";
import Custom404 from "../404";
import AnonymousChat from "../../components/chat_components/anonymous_chat";
import Faqschema from "../../components/home_components/Faqschema";

export default function NavService({ blogsdata, services, faqschemas }) {
  const [pages, setPages] = useState(0);

  const setEmail = ClientStore((state) => state.setId);
  const setExistingUser = ClientStore((state) => state.setExistingUser);

  const setSubject = AssignmentFormStore((state) => state.setSubject);
  const setDeadline = AssignmentFormStore((state) => state.setDeadline);
  const setStorePages = AssignmentFormStore((state) => state.setPages);
  let navigate = useRouter();
  const { blog } = navigate.query;

  useEffect(() => {
    let date = document.getElementById("date");
    if (date) {
      date.min = new Date().toLocaleDateString("en-ca");
      date.value = new Date().toLocaleDateString("en-ca");
    }
  }, []);

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

  const { apiData } = useFetch(mediaUrl + "/upload/files");
  const blogImage =
    apiData &&
    blogsdata &&
    getURL &&
    apiData.filter((data) => data.name === blogsdata.data[0].attributes.Slug);

  return (
    <>
      {getURL ? (
        <>
          <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keyword && <meta name="keyword" content={keyword} />}
            {canonicalURL && <link rel="canonical" href={canonicalURL} />}
          </Head>
          <Link href="/samples">
            <img src="/assets/foter/View.png" alt="" className="view" />
          </Link>
          <NavbarHome services={services} />
          <Divider />
          <Box
            w="90%"
            overflow="hidden"
            margin="15px auto"
            display="flex"
            justifyContent="space-around"
          >
            <Box
              id="left_section"
              w="65%"
              h="100%"
              border="1px solid #eee"
              padding="1rem"
              boxShadow="lg"
              borderRadius="10px"
            >
              <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {blogsdata.data[0].attributes.Heading}
              </h1>
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
              {blogImage && blogImage.length !== 0 && (
                <>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    width={"100%"}
                    height={"500px"}
                    marginTop={2}
                  >
                    <Box
                      width={"100%"}
                      height={"100%"}
                      backgroundImage={`url(https://assignmentsantastrapi.fly.dev${blogImage[0].url})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                    />
                  </Box>
                  <br />
                </>
              )}
              <Box
                mt="1rem"
                className="service-body"
                style={{ whiteSpace: "pre-line", padding: "0 1rem" }}
              >
                <ReactMarkdown>
                  {blogsdata &&
                    blogsdata.data[0].attributes.body.split("<br/>").join("\n")}
                </ReactMarkdown>
              </Box>
              <Divider mt="1rem" />
              <Box
                display="flex"
                justifyContent="space-evenly"
                mt="1rem"
                p={4}
                background="gray.100"
                borderRadius="15px"
              >
                <Box id="user_icon" w="5%">
                  <Avatar />
                </Box>
                <Box id="user_info" w="90%">
                  <Heading>{blogsdata.data[0].attributes.Author}</Heading>
                  <p>{blogsdata.data[0].attributes.Author_BIO}</p>
                </Box>
              </Box>
              <br />
              <Faqschema
                title={SchemaTitle}
                slug={slug}
                faqschemas={faqschemas}
              />
            </Box>
            <Box
              id="right_section"
              w="30%"
              h="100%"
              border="1px solid #eee"
              padding="1rem"
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
                >
                  <Stack align={"center"}>
                    <p style={{ fontSize: "2.25rem", fontWeight: "bold" }}>
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
            </Box>
          </Box>

          <FooterHome className="w-100" />
          <AnonymousChat />
        </>
      ) : (
        <Custom404 />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const { data: blogData } = await client.query({
    query: BLOGS,
  });
  const allBlogs = blogData.blogs.data;
  const paths = allBlogs.map((path) => ({
    params: { blog: path.attributes.Slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { blog } = params;
  const { data } = await client.query({
    query: BLOG,
    variables: { blog: blog },
  });
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data: faqschemasData } = await client.query({
    query: FAQSCHEMA,
  });

  return {
    props: {
      blogsdata: data.blogs,
      services: serviceData.services,
      faqschemas: faqschemasData.faqschemas,
    },
  };
}
