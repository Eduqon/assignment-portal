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
  const [width, setWidth] = useState("515px");
  const [fontSize, setFontSize] = useState("19px");
  const [flexDir, setFlexDir] = useState("row");
  const [blogList, setBlogList] = useState([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const { data: blogData } = blogs;

  const { apiData } = useFetch(mediaUrl + "/upload/files");

  const blogImage =
    apiData &&
    blogData &&
    apiData.filter((data) =>
      blogData.find((val) => val.attributes.Slug === data.name)
    );

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
  useEffect(() => {
    if (isMobileView) {
      setWidth("20rem");
      setFontSize("10px");
      setFlexDir("column");
    } else {
      setWidth("515px");
      setFontSize("19px");
      setFlexDir("row");
    }
  }, [isMobileView]);

  useEffect(() => {
    getBlogs();
  }, [page]);

  let totalPage = Math.ceil(blogData.length / limit);

  const filteredArray = (searchValue) => {
    if (searchValue) {
      const result =
        blogData &&
        blogData.filter((data) => data.attributes.Heading === searchValue);
      setBlogList(result);
    } else {
      let array = [];
      for (let i = (page - 1) * limit; i < page * limit; i++) {
        array.push(blogData[i]);
      }
      setBlogList(array);
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

  const getBlogs = () => {
    let array = [];
    for (let i = (page - 1) * limit; i < page * limit; i++) {
      array.push(blogData[i]);
    }
    setBlogList(array);
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
          height={["420px", "310px"]}
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
              fontSize={["1.5rem", "56px"]}
              fontWeight={"700"}
            >
              Blog: Insights and Inspiration
            </Heading>
            <span
              style={{
                width: width,
                fontSize: fontSize,
                textAlign: "center",
                fontWeight: 400,
              }}
            >
              Discover a world of knowledge and inspiration on our captivating
              blog
            </span>
          </Box>
        </Box>
        <Box
          id="image_part"
          display="flex"
          position={"absolute"}
          width={["auto", "30rem"]}
          top={["1rem", "-5rem"]}
          right={0}
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
        bottom={["0rem", "3rem"]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"1rem 2rem"}
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
            style={{ flexDirection: flexDir }}
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
        display={"flex"}
        flexWrap={"wrap"}
        gap={"1rem"}
        border={["none", "1px solid #eee"]}
        width={["100%", "90%"]}
        margin="0rem auto 2rem"
        borderRadius="10px"
      >
        {blogList.map((blog) => {
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
              >
                {blogImage && blogImage.length !== 0 && (
                  <Box width={"100%"} height={"200px"}>
                    <Box
                      width={"100%"}
                      height={"100%"}
                      // backgroundImage="url(/assets/newDesigns/CardImage.png)"
                      backgroundImage={`url(https://assignmentsantastrapi.fly.dev${blogImage[0].url})`}
                      backgroundSize={"cover"}
                      backgroundPosition={"center"}
                    />
                  </Box>
                )}
                {blog && blog.attributes && blog.attributes.Slug && (
                  <Box>
                    <Heading
                      my="4"
                      fontWeight={"600"}
                      fontSize={"24px"}
                      size="md"
                      cursor={"pointer"}
                    >
                      <Link href={`/blog/${blog.attributes.Slug}`}>
                        {blog.attributes.Heading}
                      </Link>
                    </Heading>
                  </Box>
                )}

                {blog && blog.attributes && blog.attributes.Slug && (
                  <Box position={"absolute"} bottom={"1rem"} width={"85%"}>
                    <Text fontSize={"12px"} fontWeight={"400"} color="#8391A1">
                      {blog.attributes.body
                        .substring(0, 50)
                        .split("**")
                        .join("")}{" "}
                      [...]
                    </Text>
                    <HStack
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
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
            )
          );
        })}
        <Pagination
          totalPage={totalPage}
          page={page}
          limit={limit}
          siblings={1}
          onPageChange={handlePageHandler}
          isMobileView={isMobileView}
        />
      </Box>

      <Box
        width={"100%"}
        position={"relative"}
        height={"540px"}
        marginTop={"2rem"}
      >
        <Box
          backgroundImage={"url(/assets/newDesigns/FooterBg.png)"}
          backgroundSize={"cover"}
          height={"90%"}
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
          >
            <img src="/assets/newDesigns/FooterSanta.png" alt="" />
          </Box>
        </Box>
        <Box
          id="wait-longer-section"
          background={"#FFF3DB"}
          width={["20rem", "580px"]}
          height={["60%", "100%"]}
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
