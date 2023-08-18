import React from "react";
import Link from "next/link";
import { NavbarHome } from "../components/home_components/navbar_home";
import { FooterHome } from "../components/home_components/footer_home";
import { FcContacts } from "react-icons/fc";
import { FaRegAddressCard, FaPhoneAlt } from "react-icons/fa";
import HeadLayout from "../components/home_components/HeadLayout";
import { client } from "./_app";
import AnonymousChat from "../components/chat_components/anonymous_chat";
import { SEOTAGS, SERVICES } from "../services/contants";

export default function Contact({ services, seotags }) {
  return (
    <>
      <HeadLayout slug="contact" seotags={seotags} />
      <Link href="/samples">
        <img src="/assets/foter/View.png" alt="" className="view" />
      </Link>
      <NavbarHome services={services} />
      <div className="row p-0 m-0">
        <div className="col set-Back">
          <h1 className="set-contact">Contact Us</h1>
        </div>
      </div>

      <div className="wrap">
        <div className="row m-0 p-0">
          <div className="col">
            <div className="contac">
              <div className="headings set- d-flex justify-content-center align-items-center">
                <FcContacts className="mr-2 " />
                <h1 className="">Contact Us </h1>
              </div>
              <div className="row contact_details">
                <div className="col-md-8 col-12 d-flex flex-column justify-content-around align-items-center">
                  <ul className="set-lisT" style={{ listStyle: "none" }}>
                    {/* <li>
                                            <div className="d-flex align-items-center">
                                                <FcCallback className='whst' /> &nbsp;&nbsp;
                                                <a href='tel:+917986021317'> 7986021317 (Call)</a>
                                            </div>

                                        </li> */}
                    {/* <li>
                                            <div className="d-flex align-items-center">
                                                <RiWhatsappFill className='whst' /> &nbsp;&nbsp; <a href='http://api.whatsapp.com/send?phone=917986021317' target="_blank">7986021317 (WhatsApp)</a>
                                            </div>
                                        </li> */}
                    <li>
                      <div className="d-flex">
                        <FaRegAddressCard className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          301 Historical dr, Aintree, Melbourne, Australia
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaPhoneAlt className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          +61 48889-3287
                        </span>
                      </div>
                    </li>
                    <br />
                    <li>
                      <div className="d-flex">
                        <FaRegAddressCard className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          USA address and Contact number 2600 Bay Area Blvd,
                          Houston, Texas 77058, United States
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaPhoneAlt className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          +1(337) 252-0077
                        </span>
                      </div>
                    </li>
                    <br />
                    <li>
                      <div className="d-flex">
                        <FaRegAddressCard className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          Canada address and contact number 9990 125 Street
                          Surrey, V3V 4Y2
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaPhoneAlt className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          +1(604) 256-2312
                        </span>
                      </div>
                    </li>
                    <br />
                    <li>
                      <div className="d-flex">
                        <FaRegAddressCard className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          UK address and contact number Stringfellow Hall Block
                          5, Cranfield, Wharley End, Bedford, Bedfordshire- MK43
                          0FX 44
                        </span>
                      </div>
                      <div className="d-flex">
                        <FaPhoneAlt className="whst" />
                        <span style={{ marginLeft: "1rem" }}>
                          +(744) 144-1907
                        </span>
                      </div>
                    </li>
                    {/* <li>    <div className="mail d-flex align-items-center">
                                            <img src={email} className="eml" /> &nbsp;&nbsp;&nbsp; <a href="mailto:assignmentsanta88@gmail.com?subject=Hello%20again" >assignmentsanta88@gmail.com</a>
                                        </div></li> */}
                  </ul>
                  {/* <h2 className='main-line font-weight-bolder mb-3'>Assignment Santa</h2> */}
                  {/* <div className="address">
                                        627 , Sector-62 , Noida , India
                                    </div>
                                    <div className="mail d-flex align-items-baseline">
                                        <BiMailSend /> &nbsp;&nbsp;&nbsp; assignmentsanta88@gmail.com
                                    </div>
                                    <div className="call d-flex align-items-center">
                                        <BiPhoneCall />  &nbsp; OR &nbsp; <RiWhatsappFill /> &nbsp;&nbsp; <a href='http://api.whatsapp.com/send?phone=917986021317' target="_blank">7986021317</a>
                                    </div> */}
                  {/* <div className="direct ">
                                        <div className='d-flex flex-row alig-items-center juestify-content-between'>

                                            <h2 className="set_linkName">
                                                Directly Contact Us On Our WhatsApp
                                            </h2>
                                            <ImPointDown />
                                        </div>
                                        <div>

                                            <div className="link">
                                              <a href="http://api.whatsapp.com/send?phone=917986021317" target='blank_'>http://api.whatsapp.com/send?phone=917986021317</a>  
                                            </div>
                                        </div>
                                    </div> */}
                </div>
                <div className="col-md-4 col-12">
                  <div className="img-contact">
                    <img src="/assets/contact.png" alt="" />
                  </div>
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
