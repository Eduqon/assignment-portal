import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import facebook from "../../assets/foter/facebook.png";
import insta from "../../assets/foter/insta.png";
import twitter from "../../assets/foter/twitter.png";
import youtube from "../../assets/foter/youtube.png";
import payment from "../../assets/payment.png";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";
export function FooterHome() {
  return (
    <div className="row p-0 m-0  set-back">
      <div className="col-12 ">
        <div className="row pt-4 m-0  d-flex align-items-center">
          <div className="col-md-4 col-12">
            <div className="details">
              <h2 className="Fs-4 font-weight-bolder mb-3">Contact Details</h2>
              <div className="address">
                301 Hostorical dr, Aintree, Melbourne, Australia
              </div>
              {/* <div className="mail d-flex align-items-baseline">
                                <BiMailSend /> &nbsp;&nbsp;&nbsp; assignmentsanta88@gmail.com
                            </div> */}
              {/* <div className="call d-flex align-items-center">
                                <BiPhoneCall />  &nbsp; OR &nbsp; <AiOutlineWhatsApp /> &nbsp;&nbsp; <a href='http://api.whatsapp.com/send?phone=917986021317' target="_blank">7986021317</a>
                            </div> */}
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div className="payment d-flex flex-column flex-lg-row flex-sm-column align-items-center justify-content-around">
              <div className="set_">100% Secure Payment </div>
              <img src={payment} alt="" />
            </div>
          </div>
          <div className="col-md-4 col-12">
            <h2 className="Fs-4 d-flex  font-weight-bolder mb-3 justify-content-center text-white align-items-center ">
              Get In Touch
            </h2>
            <div className="social d-flex align-items-center ml-md-4 justify-content-center">
              <a
                href="https://www.facebook.com/assignmentsanta/"
                target="_blank"
              >
                <img src={facebook} />
              </a>
              <a
                href="https://www.instagram.com/assignmentsanta04/"
                target="_blank"
              >
                <img src={insta} />
              </a>
              <a href="https://twitter.com/AssignmentSanta" target="_blank">
                <img src={twitter} />
              </a>
              <a href="#" target="_blank">
                <img src={youtube} />
              </a>
            </div>
          </div>
        </div>

        {/* <div className="first_footer"> */}

        <p className="set_text_footer text-white p-4 text-center">
          <b>Disclaimer:</b> The reference papers provided by Assignment Santa
          should be used as model papers only. Students are not to copy or
          submit them as is. These reference papers are strictly intended for
          research and reference purposes only.
        </p>
        {/* </div> */}

        <hr />

        {/* <div className="second_footer"> */}
        <div className="row second-fo">
          <div className="col p-3">
            © 2023 Assignment Santa. All rights reserved
          </div>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
