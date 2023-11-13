"use client";
import { NavbarHome } from "../components/home_components/navbar_home.js";
import { FormHome } from "../components/home_components/form_home.js";
import { FeaturesHome } from "../components/home_components/features_home.js";
import { FooterHome } from "../components/home_components/footer_home.js";
import HeadLayout from "../components/home_components/HeadLayout.js";
import { client } from "./_app.js";
import { SEOTAGS, SERVICES } from "../services/contants.js";

function Home({ services, seotags }) {
  return (
    <>
      <HeadLayout slug="home" seotags={seotags} />
      <NavbarHome services={services} />
      <FormHome />
      <FeaturesHome />
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
  // console.log({ data: data.seotags });
  return {
    props: {
      services: serviceData.services || null,
      seotags: data.seotags || null,
    },
  };
}
