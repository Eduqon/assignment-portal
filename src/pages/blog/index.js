import {
  Heading,
  Image,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Text,
  Box,
  HStack,
  Divider,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FiUsers } from "react-icons/fi";
import { BiTime } from "react-icons/bi";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { FooterHome } from "../../components/home_components/footer_home";
import HeadLayout from "../../components/home_components/HeadLayout";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { BLOGS, mediaUrl, SEOTAGS, SERVICES } from "../../services/contants";
import { client } from "../_app";
import useFetch from "../../hooks/useFetch";
import { Search2Icon } from "@chakra-ui/icons";
import Pagination from "../../components/pagination_component/pagination";

export default function Blog({ services, seotags, blogs }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [blogListData, setBlogListData] = useState([]);

  const { data: blogData } = blogs;

  // const { apiData } = useFetch(mediaUrl + "/upload/files");

  // const blogImage =
  //   apiData &&
  //   blogData &&
  //   apiData.filter((data) =>
  //     blogData.find((val) => val.attributes.Slug === data.name)
  //   );

  useEffect(() => {
    handleSort();
  }, [page]);

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

  let totalPage = Math.ceil(blogData.length / limit);

  const filteredArray = (searchValue) => {
    if (searchValue) {
      const result =
        blogData &&
        blogData.filter((data) => data.attributes.Heading === searchValue);
      setBlogListData(result);
    } else {
      handleSort();
    }
  };

  const handlePageHandler = (value) => {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(totalPage);
    } else {
      setPage(value);
    }
  };

  const handleSort = () => {
    const sortedData = [...blogData];
    let array = [];

    sortedData.sort((a, b) => {
      const dateA = new Date(a.attributes.createdAt);
      const dateB = new Date(b.attributes.createdAt);
      return dateB - dateA;
    });
    for (let i = (page - 1) * limit; i < page * limit; i++) {
      array.push(sortedData[i]);
    }
    setBlogListData(array);
  };

  const fetchSearchData = (value) => {
    const results =
      blogs &&
      blogs.data &&
      blogs.data.filter((data) => {
        return (
          value &&
          data.attributes &&
          data.attributes.Heading &&
          data.attributes.Heading.toLowerCase().includes(value)
        );
      });
    setResults(results);
  };

  const onChangeHandler = (value) => {
    setInput(value.toLowerCase());
    fetchSearchData(value);
  };

  return (
    <>
      <HeadLayout slug="blog" seotags={seotags} />
      <NavbarHome services={services} />
      <Divider />
      <Box position={"relative"}>
        <Box
          height={["200px", "310px"]}
          background="#EF2B4B"
          borderBottomLeftRadius={"3rem"}
          borderBottomRightRadius={"3rem"}
          display="flex"
          flexDirection={["column", "row"]}
          alignItems={"center"}
          justifyContent={["flex-start", "center"]}
        >
          <Box
            id="text_section"
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            color="#fff"
            marginTop={["1rem", "0rem"]}
          >
            <Heading
              mb={["0rem", "1rem"]}
              fontSize={["2rem", "2rem", "2.5rem", "56px"]}
              fontWeight={"700"}
              textAlign={"center"}
            >
              Blog: Insights and Inspiration
            </Heading>
            <Text
              width={["16rem", "515px"]}
              fontSize={["0.8rem", "19px"]}
              textAlign={"center"}
              fontWeight={"400"}
            >
              Discover a world of knowledge and inspiration on our captivating
              blog
            </Text>
          </Box>
        </Box>
        <Box
          id="image_part"
          display="flex"
          position={"absolute"}
          width={["40%", "40%", "20rem", "30rem"]}
          top={["3rem", "3rem", "2rem", "-5rem"]}
          right={["-3rem", "-3rem", "-5rem", 0]}
        >
          <Image
            src="/assets/newDesigns/SantaIcon.png"
            alt="Assignment santa"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Box>
      <Box
        position={"relative"}
        width={"100%"}
        bottom={["4rem", "3rem"]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"1rem"}
        flexDirection={"column"}
      >
        <Box
          id="search-box"
          background={"#fff"}
          width={["100%", "70%"]}
          padding={["1rem", "2rem 1rem"]}
          borderRadius="1rem"
          border="1px solid #eee"
        >
          <Form
            className="d-flex align-items-center gap-2"
            style={{ flexDirection: "column" }}
          >
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="#EF2B4B" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search Blog"
                id="searchBox"
                value={input}
                onChange={(e) => onChangeHandler(e.target.value)}
              />
            </InputGroup>
            <Button
              width={["100%", "auto"]}
              variant="outline-success"
              backgroundColor="#EF2B4B"
              borderRadius="94px"
              color="#fff"
              border="none"
              padding="12px 40px 12px 40px"
              fontWeight={700}
              onClick={() => filteredArray(searchBox.value)}
            >
              Search
            </Button>
          </Form>
        </Box>
        {results && results.length !== 0 && (
          <Box
            id="search-result-box"
            background={"#fff"}
            width={["100%", "70%"]}
            padding={["1rem", "2rem 1rem"]}
            borderRadius="1rem"
            border="1px solid #eee"
            maxH={"320px"}
            overflowY={"scroll"}
          >
            {results &&
              results.map((result, id) => {
                return (
                  <Box
                    _hover={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setInput(e.target.textContent);
                      setResults([]);
                    }}
                  >
                    {result.attributes.Heading}
                    <Divider />
                  </Box>
                );
              })}
          </Box>
        )}
      </Box>

      <Box
        padding={["0.3rem", "2rem"]}
        border={["none", "1px solid #eee"]}
        width={["100%", "90%"]}
        margin="0rem auto"
        borderRadius="10px"
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
      >
        <Box
          display={"grid"}
          gridTemplateColumns={["auto", "auto auto auto auto"]}
          justifyContent={"center"}
          gap={"1rem"}
        >
          {blogListData.map((blog) => {
            return (
              blog && (
                <Box
                  maxW={["auto", "345px"]}
                  height={"30rem"}
                  border="1px solid #eee"
                  p="6"
                  borderRadius="15px"
                  display={"flex"}
                  flexDirection={"column"}
                  position={"relative"}
                  justifyContent={"space-between"}
                >
                  <Box width={"100%"} height={"200px"}>
                    {blog.attributes &&
                      blog.attributes.Image &&
                      blog.attributes.Image.data &&
                      blog.attributes.Image.data.length !== 0 &&
                      blog.attributes.Image.data[0].attributes &&
                      blog.attributes.Image.data[0].attributes.url && (
                        <Box
                          width={"100%"}
                          height={"100%"}
                          backgroundImage={`url(${blog.attributes.Image.data[0].attributes.url})`}
                          backgroundSize={"cover"}
                          backgroundPosition={"center"}
                        />
                      )}
                  </Box>
                  {blog && blog.attributes && blog.attributes.Slug && (
                    <Box>
                      <Heading
                        my="4"
                        fontWeight={"600"}
                        fontSize={"20px"}
                        size="md"
                        cursor={"pointer"}
                      >
                        <a
                          href={`/blog/${blog.attributes.Slug}`}
                          style={{
                            color: "#000",
                            textDecoration: "none",
                          }}
                        >
                          {`${blog.attributes.Heading.substring(0, 40)}...`}
                        </a>
                      </Heading>
                      {blog && blog.attributes && blog.attributes.Slug && (
                        <Box>
                          <Text
                            fontSize={"15px"}
                            fontWeight={"400"}
                            color="#8391A1"
                          >
                            {blog.attributes.body
                              .substring(0, 50)
                              .split("**")
                              .join("")}{" "}
                            [...]
                          </Text>
                          <HStack>
                            <HStack
                              mt="5"
                              spacing="3"
                              color="gray.500"
                              width={"100%"}
                              justifyContent={"space-between"}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.4rem",
                                }}
                              >
                                <FiUsers color="#26AE60" />
                                {blog.attributes.Author}
                              </span>

                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.4rem",
                                }}
                              >
                                <BiTime color="#FD7D6F" />
                                {new Date(
                                  blog.attributes.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </HStack>
                          </HStack>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )
            );
          })}
        </Box>
        <Box>
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            siblings={1}
            onPageChange={handlePageHandler}
            isMobileView={isMobileView}
          />
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

export async function getStaticProps() {
  const { data: blogData } = await client.query({
    query: BLOGS,
  });
  const { data: serviceData } = await client.query({
    query: SERVICES,
  });
  const { data } = await client.query({
    query: SEOTAGS,
  });
  return {
    props: {
      blogs: blogData.blogs || null,
      services: serviceData.services || null,
      seotags: data.seotags || null,
    },
  };
}
