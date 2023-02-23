import { FormOrderDetails } from "../components/order_details_components/form_order_details";
import { NavbarOrderDetails } from "../components/order_details_components/navbar_order_details";
import { FooterOrderDetails } from "../components/order_details_components/footer_order_details";
import HeadLayout from "../components/home_components/HeadLayout";
import { client } from "./_app";
import { gql } from "@apollo/client";

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

export default function OrderDetails({ seotags }) {
  return (
    <>
      <HeadLayout slug="order_details" seotags={seotags} />
      <NavbarOrderDetails />
      <FormOrderDetails />
      <FooterOrderDetails />
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: SEOTAGS,
  });

  return {
    props: {
      seotags: data.seotags,
    },
  };
}
