import { FormOrderDetails } from "../components/order_details_components/form_order_details";
import { NavbarOrderDetails } from "../components/order_details_components/navbar_order_details";
import { FooterOrderDetails } from "../components/order_details_components/footer_order_details";

export function OrderDetails() {
    return (
        <>
            <NavbarOrderDetails />
            <FormOrderDetails />
            <FooterOrderDetails />
        </>
    );
}