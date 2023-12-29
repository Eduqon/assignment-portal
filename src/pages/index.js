"use client";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NavbarHome } from "../components/home_components/navbar_home.js";
import HeadLayout from "../components/home_components/HeadLayout.js";
import { client } from "./_app.js";
import { SEOTAGS, SERVICES, REVIEWS } from "../services/contants.js";

const FormSection = dynamic(
  () => import("../components/home_components/formSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const WorkSection = dynamic(
  () => import("../components/home_components/workSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ReviewSection = dynamic(
  () => import("../components/home_components/reviewSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const FaqSection = dynamic(
  () => import("../components/home_components/faqSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const FooterHome = dynamic(
  () => import("../components/home_components/footer_home.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const GiftSection = dynamic(
  () => import("../components/home_components/giftSection.js"),
  {
    loading: () => <p>Loading...</p>,
  }
);

function Home({ services, seotags, reviews }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [reviewListData, setReviewListData] = useState([]);

  const { data: reviewsData } = reviews;
  const limit = 12;

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

  return (
    <>
      <HeadLayout
        slug="assignment-help-online-assignment-assistance"
        seotags={seotags}
      />
      <NavbarHome services={services} />
      <FormSection />
      <WorkSection />
      <ReviewSection reviewListData={reviewListData} />
      <FaqSection />
      <GiftSection />
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
