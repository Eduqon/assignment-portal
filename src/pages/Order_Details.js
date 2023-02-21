import { FormOrderDetails } from "../components/order_details_components/form_order_details";
import { NavbarOrderDetails } from "../components/order_details_components/navbar_order_details";
import { FooterOrderDetails } from "../components/order_details_components/footer_order_details";
import HeadLayout from "../components/home_components/HeadLayout";

export default function OrderDetails() {
  return (
    <>
      <HeadLayout slug="order_details" />
      <NavbarOrderDetails />
      <FormOrderDetails />
      <FooterOrderDetails />
    </>
  );
}
