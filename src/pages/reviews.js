import React from "react";
import Link from "next/link";
import { FooterHome } from "../components/home_components/footer_home";
import HeadLayout from "../components/home_components/HeadLayout";
import MegaMenu from "../components/home_components/MegaMenu";
import { NavbarHome } from "../components/home_components/navbar_home";
import Testomonial from "../components/home_components/Testomonial";

export default function Review() {
  return (
    <>
      <HeadLayout slug="reviews" />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome />
      <div className="row p-0 m-0">
        <div className="col set-Back">
          <h1 className="set-contact">Reviews</h1>
        </div>
      </div>
      <Testomonial />
      <FooterHome />
    </>
  );
}
