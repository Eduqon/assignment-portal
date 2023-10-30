import React from "react";
import Link from "next/link";
import { NavbarHome } from "../components/home_components/navbar_home";
import { FooterHome } from "../components/home_components/footer_home";
import { FcPrivacy } from "react-icons/fc";
import HeadLayout from "../components/home_components/HeadLayout";
import { client } from "./_app";
import { SEOTAGS, SERVICES } from "../services/contants";

export default function PrivacyPolicy({ services, seotags }) {
  return (
    <>
      <HeadLayout slug="privacy-policy" seotags={seotags} />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />
      <div className="row p-0 m-0">
        <div className="col set-Back">
          <h1 className="set-privacy-policy">Privacy Policy</h1>
        </div>
      </div>

      <div className="wrap">
        <div className="row m-0 p-0">
          <div className="col">
            <div>
              <div className="privacyPolicy set- d-flex justify-content-start align-items-center">
                <FcPrivacy className="mr-2" />
                <h1 className="">Privacy Policy for AssignmentSanta.com</h1>
              </div>
              <div className="row privacy_details">
                <div className="col-md-12 col-12 d-flex flex-column justify-content-around align-items-center">
                  <ul className="set-lisT">
                    <li>
                      When you use the website and services, the company
                      collects your information to improve your experience and
                      make the platform more effective. This is done for legal
                      purposes. The company only retains your information for as
                      long as necessary for you to use the website and services.
                      Your data is used for specific purposes, such as:
                    </li>
                    <br />
                    <li>
                      The company uses your information so that you can access
                      its website, services, and the services offered by its
                      related companies, partners, and other third parties.
                    </li>
                    <br />
                    <li>
                      When you use this website and request quotations, you
                      permit us to contact you through calls, emails, and text
                      messages using your provided contact details. We will
                      provide you with information about the services and
                      products of Teleforce. This permission applies even if you
                      are registered with the NDNC registry and is valid for the
                      mentioned purposes.
                    </li>
                    <br />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  return {
    props: {
      services: serviceData.services,
      seotags: data.seotags,
    },
  };
}
