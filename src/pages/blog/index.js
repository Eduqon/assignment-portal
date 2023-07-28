import {
  Heading,
  Image,
  Text,
  Box,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FooterHome } from "../../components/home_components/footer_home";
import SearchBar from "../../components/home_components/SearchBar";
import HeadLayout from "../../components/home_components/HeadLayout";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { BLOGS, mediaUrl, SEOTAGS, SERVICES } from "../../services/contants";
import { client } from "../_app";
import useFetch from "../../hooks/useFetch";

export default function Blog({ services, seotags, blogs }) {
  const { data: blogData } = blogs;

  const { apiData } = useFetch(mediaUrl + "/upload/files");

  const blogImage =
    apiData &&
    blogData &&
    apiData.filter((data) =>
      blogData.find((val) => val.attributes.Slug === data.name)
    );

  return (
    <>
      <HeadLayout slug="blog" seotags={seotags} />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />
      <Divider />
      <Box
        height={["auto", "500px"]}
        background="linear-gradient(to right top, #dc3545, #dc3545, #dc3545, #ffffff);"
        mt="1rem"
        display="flex"
        flexDirection={["column", "row"]}
        padding={["1rem", "2rem"]}
      >
        <Box
          id="text_section"
          w={["auto", "50%"]}
          padding={["1rem", "5rem"]}
          color="#fff"
          order={["2", "1"]}
        >
          <Heading mb="1rem">Assignment Santa's Blog</Heading>
          <span>
            Find here the latest information and updates related to education,
            universities, student lifestyle, academic writing tips, and skills
            from Assignment Santa.
          </span>
          <Box mt="1rem">
            <SearchBar />
          </Box>
        </Box>
        <Box id="image_part" display="flex" w={["auto", "50%"]}>
          <Image
            src="/assets/avtar/blog_bg.jpeg"
            alt="Assignment santa"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Box>
      <Box
        padding={["1rem", "3rem"]}
        display={["block", "grid"]}
        gridTemplateColumns={["none", "auto auto auto"]}
      >
        {blogData &&
          blogData.map((blog) => {
            return (
              <Box
                maxW="420px"
                bg="gray.100"
                p="6"
                borderRadius="15px"
                mt="1rem"
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
              >
                {blogImage && blogImage.length !== 0 && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    width={"100%"}
                    height={"200px"}
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
                )}
                <Box px="1rem">
                  <HStack mt="5" spacing="3" color="gray.500">
                    <span>
                      <i class="fa fa-user" aria-hidden="true"></i>{" "}
                      {blog.attributes.Author} at{" "}
                      <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                      {new Date(blog.attributes.createdAt).toLocaleDateString()}
                    </span>
                  </HStack>
                  <Heading my="4" size="lg" cursor={"pointer"}>
                    <Link href={`/blog/${blog.attributes.Slug}`}>
                      {blog.attributes.Heading}
                    </Link>
                  </Heading>
                  <Text>
                    {blog.attributes.body
                      .substring(0, 150)
                      .split("**")
                      .join("")}{" "}
                    [...]
                  </Text>
                </Box>

                <HStack
                  px="1rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box width={"100%"}>
                    <Divider
                      mt="1rem"
                      mb="1rem"
                      margin="15px auto"
                      borderColor="gray.500"
                    />
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <Button variant="link">Like</Button>
                  </Box>
                </HStack>
              </Box>
            );
          })}
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
    props:
      data && serviceData && blogData
        ? {
            services: serviceData.services,
            seotags: data.seotags,
            blogs: blogData.blogs,
          }
        : {},
  };
}
