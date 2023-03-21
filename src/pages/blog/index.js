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
import AnonymousChat from "../../components/chat_components/anonymous_chat";
import { FooterHome } from "../../components/home_components/footer_home";
import SearchBar from "../../components/home_components/SearchBar";
import HeadLayout from "../../components/home_components/HeadLayout";
import { NavbarHome } from "../../components/home_components/navbar_home";
import { BLOGS, SEOTAGS, SERVICES } from "../../services/contants";
import { client } from "../_app";

export default function Blog({ services, seotags, blogs }) {
  const { data: blogData } = blogs;
  return (
    <>
      <HeadLayout slug="blog" seotags={seotags} />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />
      <Divider />
      <Box
        h="500px"
        background="linear-gradient(to right top, #dc3545, #dc3545, #dc3545, #ffffff);"
        mt="1rem"
        display="flex"
        padding="2rem"
      >
        <Box id="text_section" w="50%" padding="5rem" color="#fff">
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
        <Box id="image_part" display="flex" w="50%">
          <Image
            src="/assets/avtar/blog_bg.jpeg"
            alt="Assignment santa"
            borderRadius="xl"
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Box>
      <Box padding="3rem" display="grid" gridTemplateColumns="auto auto auto">
        {blogData &&
          blogData.map((blog) => {
            return (
              <Box
                maxW="420px"
                bg="gray.100"
                p="6"
                borderRadius="15px"
                mt="1rem"
              >
                <Image
                  src="/assets/img/card-image.jpeg"
                  alt="waterfall"
                  borderRadius="xl"
                  objectFit="cover"
                  mx="auto"
                />
                <Box px="1rem">
                  <HStack mt="5" spacing="3" color="gray.500">
                    <span>
                      <i class="fa fa-user" aria-hidden="true"></i>{" "}
                      {blog.attributes.Author} at{" "}
                      <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                      {new Date(blog.attributes.createdAt).toLocaleDateString()}
                    </span>
                  </HStack>
                  <Heading my="4" size="lg">
                    {blog.attributes.Heading}
                  </Heading>
                  <Text>
                    {blog.attributes.body
                      .substring(0, 150)
                      .split("**")
                      .join("")}{" "}
                    [...]
                  </Text>
                </Box>
                <Divider
                  mt="1rem"
                  mb="1rem"
                  w="90%"
                  margin="15px auto"
                  borderColor="gray.500"
                />
                <HStack
                  px="1rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                    <Button variant="link">Like</Button>
                  </Box>
                  <Box>
                    <Link href={`/blog/${blog.attributes.Slug}`}>
                      <a>Read more</a>
                    </Link>
                  </Box>
                </HStack>
              </Box>
            );
          })}
      </Box>
      <FooterHome />
      <AnonymousChat />
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
      services: serviceData.services,
      seotags: data.seotags,
      blogs: blogData.blogs,
    },
  };
}
