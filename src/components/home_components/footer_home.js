import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { AiOutlineMail } from "react-icons/ai";
import {
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialTwitterCircular,
  TiSocialYoutube,
} from "react-icons/ti";
import Link from "next/link";

export function FooterHome() {
  return (
    <Box
      className="set-back"
      display={"flex"}
      justifyContent={"center"}
      padding={"2rem"}
      flexDirection={["column", "row"]}
    >
      <Box width={"100%"}>
        <Box
          display={"flex"}
          alignItems={["center", "flex-start"]}
          justifyContent={"space-between"}
          flexDirection={["column", "row"]}
        >
          <Box width={["100%", "25%"]}>
            <Box className="details">
              <Box className="image-section" width={"15rem"}>
                <img
                  src="/assets/newDesigns/FooterLogo.png"
                  alt=""
                  style={{ width: "100%" }}
                />
              </Box>
              <Box
                className="text-section"
                fontSize={"12px"}
                fontWeight={"400"}
              >
                Assignment Santa provides online academic assistance across the
                globe. Due to our extensive expertise in academic writing, we
                offer high-quality work at competitive prices that meet specific
                needs of students.
              </Box>
            </Box>
          </Box>
          <Box>
            <div className="details">
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                About Us
              </Heading>
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                Terms of use
              </Heading>
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                Disclaimer
              </Heading>
            </div>
          </Box>
          <Box>
            <div className="details">
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                <Link href="/contact">Contact Us</Link>
              </Heading>
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Heading>
              <Heading
                fontSize={"12px"}
                fontWeight={"400"}
                className="Fs-4 font-weight-bolder mb-3"
              >
                FAQs
              </Heading>
            </div>
          </Box>
          <Box>
            <Box
              className="details"
              display={"flex"}
              flexDirection={"column"}
              gap={"0.5rem"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"0.4rem"}
                fontSize={"12px"}
                fontWeight={"400"}
              >
                <LiaMapMarkerSolid />
                <span>301 Hostorical dr, Aintree, Melbourne, Australia</span>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"0.4rem"}
                fontSize={"12px"}
                fontWeight={"400"}
              >
                <AiOutlineMail />
                <span>info@assignmentsanta.com</span>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={"0.4rem"}
                fontSize={"2rem"}
                fontWeight={"400"}
              >
                <Link
                  href="https://www.instagram.com/assignmentsanta04/"
                  style={{
                    fontSize: "1.5rem",
                    marginRight: "0.4rem",
                  }}
                >
                  <TiSocialInstagramCircular />
                </Link>
                <Link href="https://www.facebook.com/assignmentsanta/">
                  <TiSocialFacebookCircular />
                </Link>
                <Link href="https://twitter.com/AssignmentSanta">
                  <TiSocialTwitterCircular />
                </Link>
                <Link href="https://www.youtube.com/channel/UCiuHzMoZc4GQ7dMG2quupbg">
                  <TiSocialYoutube />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap="1rem">
          <Text
            className="text-white"
            fontSize={"14px"}
            fontWeight={"400"}
            marginTop={"1rem"}
          >
            Disclaimer: The reference papers provided by Assignment Santa should
            be used as model papers only. Students are not to copy or submit
            them as is. These reference papers are strictly intended for
            research and reference.
          </Text>

          <Divider />

          <Box
            color={"#fff"}
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={["column", "row"]}
            gap={["1rem", "0rem"]}
          >
            <Text>A product of Assignmentsanta.com</Text>
            <Text>© 2023 Assignmentsanta.com Media. All rights reserved</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
