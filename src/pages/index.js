import { gql } from "@apollo/client";
import { NavbarHome } from "../components/home_components/navbar_home.js";
import { FormHome } from "../components/home_components/form_home.js";
import { FeaturesHome } from "../components/home_components/features_home.js";
import { FooterHome } from "../components/home_components/footer_home.js";
import AnonymousChat from "../components/chat_components/anonymous_chat.js";
import HeadLayout from "../components/home_components/HeadLayout.js";
import { client } from "./_app.js";

const SERVICES = gql`
  query {
    services(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`;
const SEOTAGS = gql`
  query {
    seotags(pagination: { limit: 100 }) {
      data {
        id
        attributes {
          title
          Slug
          description
          keyword
          cntag
        }
      }
    }
  }
`;

function Home({ services, seotags }) {
  return (
    <>
      <HeadLayout slug="home" seotags={seotags} />
      <NavbarHome services={services} />
      <FormHome />
      <FeaturesHome />
      <FooterHome />
      <AnonymousChat />
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

  return {
    props: {
      services: serviceData.services,
      seotags: data.seotags,
    },
  };
}
