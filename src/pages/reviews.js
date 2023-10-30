import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FooterHome } from "../components/home_components/footer_home";
import HeadLayout from "../components/home_components/HeadLayout";
import { NavbarHome } from "../components/home_components/navbar_home";
import { client } from "./_app";
import { REVIEWS, SEOTAGS, SERVICES } from "../services/contants";
import Star from "../components/Star";

export default function Review({ services, seotags, reviews }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [reviewListData, setReviewListData] = useState([]);
  const { data: reviewsData } = reviews;
  const limit = 12;
  const totalPage = Math.ceil(reviewsData.length / limit);
  const pageNumbers = Array.from({ length: totalPage }, (_, i) => i + 1);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <HeadLayout slug="reviews" seotags={seotags} />
      <NavbarHome services={services} />
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
              fontSize={["2rem", "56px"]}
              fontWeight={"700"}
              textAlign={"center"}
            >
              Genuine User Testimonials
            </Heading>
            <Text
              width={["16rem", "515px"]}
              fontSize={["0.8rem", "19px"]}
              textAlign={"center"}
              fontWeight={"400"}
            >
              Discover the sentiments of our valued customers. Explore authentic
              feedback from students worldwide.
            </Text>
          </Box>
        </Box>
        <Box
          id="image_part"
          display="flex"
          position={"absolute"}
          width={["40%", "30rem"]}
          top={["3rem", "-5rem"]}
          right={["-3rem", 0]}
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
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        padding={"2rem"}
        gap={["1rem", "5rem"]}
      >
        <Box textAlign={"center"}>
          <Heading
            textTransform={"capitalize"}
            fontSize={["25px", "34px"]}
            fontWeight={"600"}
          >
            Let the <span style={{ color: "#EF2B4B" }}>numbers</span> tell the
            story of <span style={{ color: "#EF2B4B" }}>our success.</span>
          </Heading>
        </Box>
        <Box
          display={"flex"}
          gap={["2rem", "20rem"]}
          flexDirection={["column", "row"]}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            justifyContent={["start", "center"]}
          >
            <Box width={"25%"}>
              <img src="/assets/newDesigns/score_icon.png" alt="" />
            </Box>
            <Box>
              <span
                style={{
                  color: "#EF2B4B",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                4.72/5
              </span>
              <br />
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                Average Score
              </span>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            justifyContent={["start", "center"]}
          >
            <Box width={"25%"}>
              <img src="/assets/newDesigns/reviews_icon.png" alt="" />
            </Box>
            <Box>
              <span
                style={{
                  color: "#EF2B4B",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                5000+
              </span>
              <br />
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                Real Reviews
              </span>
            </Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            justifyContent={["start", "center"]}
          >
            <Box width={"25%"}>
              <img src="/assets/newDesigns/customers_icons.png" alt="" />
            </Box>
            <Box>
              <span
                style={{
                  color: "#EF2B4B",
                  fontSize: "24px",
                  fontWeight: "700",
                }}
              >
                96%
              </span>
              <br />
              <span
                style={{
                  fontSize: "17px",
                }}
              >
                Happy Customers
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        id="reviews-section"
        display={"flex"}
        alignItems={"center"}
        padding={"2rem"}
        flexDirection={"column"}
        background={"linear-gradient(180deg, #FFEDED, transparent)"}
      >
        <Heading textTransform={"capitalize"} textAlign={"center"}>
          Countless <span style={{ color: "#EF2B4B" }}>positive</span> reviews
          from <span style={{ color: "#EF2B4B" }}>satisfied students</span>
        </Heading>
        <Box
          width={"100%"}
          height={"100%"}
          padding={["0rem", "2rem"]}
          display={"grid"}
          gridTemplateColumns={["auto", "auto auto auto auto"]}
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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
        fontSize={"1.5rem"}
        marginBottom={"1rem"}
      >
        <button
          style={{
            borderRadius: "15px",
            padding: "0rem 1rem",
            boxShadow: "0px 0px 5px 0px #000",
          }}
          disabled={currentPage < 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {pageNumbers
          .slice(
            Math.max(0, currentPage - 2),
            Math.min(totalPage, currentPage + 3)
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page - 1)}
              className={page === currentPage + 1 ? "activePagination" : ""}
            >
              {page}
            </button>
          ))}
        <button
          style={{
            borderRadius: "15px",
            padding: "0rem 1rem",
            boxShadow: "0px 0px 5px 0px #000",
          }}
          disabled={currentPage >= totalPage - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </Box>
      <Box
        backgroundColor={"#EF2B4B"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={["column", "row"]}
      >
        <Box
          id="left-section"
          width={["100%", "50%"]}
          color={"#fff"}
          padding={["1rem", "5rem"]}
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
        >
          <Heading fontSize={"38px"} fontWeight={"700"}>
            What sets our reviews apart as trustworthy and reliable
          </Heading>
          <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
            <Box display={"flex"} alignItems={"baseline"} gap={"1rem"}>
              <img src="/assets/newDesigns/tick_icon.png" alt="" width={"2%"} />
              <Text fontSize={"18px"} fontWeight={"400"}>
                Our reviews are exclusively from verified customers who have
                received completed orders, ensuring authenticity.
              </Text>
            </Box>
            <Box display={"flex"} alignItems={"baseline"} gap={"1rem"}>
              <img src="/assets/newDesigns/tick_icon.png" alt="" width={"2%"} />
              <Text fontSize={"18px"} fontWeight={"400"}>
                Each feedback is derived from genuine customer experiences and
                will never be manipulated or deleted.
              </Text>
            </Box>
            <Box display={"flex"} alignItems={"baseline"} gap={"1rem"}>
              <img src="/assets/newDesigns/tick_icon.png" alt="" width={"2%"} />
              <Text fontSize={"18px"} fontWeight={"400"}>
                We value your input: your reviews assist us in maintaining
                quality control and improving the work of our writers.
              </Text>
            </Box>
          </Box>
        </Box>
        <Box id="right-section" width={["100%", "50%"]}>
          <Box
            backgroundColor={"#fff"}
            width={["100%", "60%"]}
            padding={"1rem"}
            borderRadius={"15px"}
          >
            <FormControl>
              <FormLabel>Email ID</FormLabel>
              <Input type="email" placeholder="Enter your email ID" />
              <FormLabel marginTop={"1rem"}>Rating</FormLabel>
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                      style={{
                        display: "none",
                      }}
                    />
                    <FaStar
                      size={30}
                      style={{
                        marginRight: "0.5rem",
                      }}
                      cursor={"pointer"}
                      color={
                        currentRating <= (hover || rating)
                          ? "#EF2B4B"
                          : "e4e5e9"
                      }
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
              <FormLabel marginTop={"1rem"}>Feedback</FormLabel>
              <Textarea placeholder="Enter your feedback" />
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  width={"80%"}
                  marginTop={"1rem"}
                  borderRadius={"30px"}
                  backgroundColor={"#EF2B4B"}
                  color={"#fff"}
                  _hover={{
                    backgroundColor: "#EF2B4B",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <FooterHome />
    </>
  );
}

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
  console.log({ serviceData, data, reviewsData });

  return {
    props: {
      services: serviceData.services,
      seotags: data.seotags,
      reviews: reviewsData.reviews,
    },
  };
}
