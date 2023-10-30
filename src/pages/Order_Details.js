import { FormOrderDetails } from "../components/order_details_components/form_order_details";
import { NavbarOrderDetails } from "../components/order_details_components/navbar_order_details";
import { FooterOrderDetails } from "../components/order_details_components/footer_order_details";
import HeadLayout from "../components/home_components/HeadLayout";
import { client } from "./_app";
import { SEOTAGS } from "../services/contants";

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
  console.log({ data });

  return {
    props: {
      seotags: data.seotags,
    },
  };
}
