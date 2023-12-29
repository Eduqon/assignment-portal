import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";

function GiftSection() {
  return (
    <Box
      width={"100%"}
      position={"relative"}
      height={["20rem", "540px"]}
      marginTop={"2rem"}
    >
      <Box
        backgroundImage={"url(/assets/newDesigns/FooterBg.png)"}
        backgroundSize={"cover"}
        height={["83%", "90%"]}
        width={"100%"}
        position={"absolute"}
        bottom={0}
      >
        <Box
          id="right-section"
          position={"absolute"}
          right={["-3rem", "2rem"]}
          bottom={0}
          width={["15rem", "30rem"]}
          transform={["translateX(-50%)", "none"]}
          display={["none", "none", "none", "block"]}
        >
          <img
            width="600"
            height="400"
            src="/assets/newDesigns/FooterSanta.png"
            alt="Footer Santa"
          />
        </Box>
      </Box>
      <Box
        id="wait-longer-section"
        background={"#FFF3DB"}
        width={["20rem", "580px"]}
        height={"100%"}
        position={"relative"}
        marginLeft={["1rem", "3rem"]}
      >
        <Box id="vector"></Box>
        <Box
          id="top-section"
          display={"flex"}
          flexDirection={"column"}
          gap={"1rem"}
          padding={"4rem"}
        >
          <Heading fontSize={["25px", "40px"]} fontWeight={"700"}>
            Why wait <span style={{ color: "#EF2B4B" }}>any longer</span>?
          </Heading>
          <Text fontSize={["15px", "20px"]} fontWeight={"500"}>
            Place an order now and get proposals from our professional writers
            within 10 seconds
          </Text>
          <Button
            width={["auto", "12rem"]}
            background={"#EF2B4B"}
            color="#fff"
            padding={["0rem", "2rem 8rem"]}
            borderRadius={"40px"}
            fontWeight={"600"}
            fontSize={["15px", "23px"]}
          >
            Order Now
          </Button>
        </Box>
        <Box
          id="bottom-section"
          position={"absolute"}
          bottom={["0rem", "-1rem"]}
          left={["0%", "7%"]}
          transform={["scale(1)", "scale(1.1)"]}
        >
          <img
            width="600"
            height="400"
            src="/assets/newDesigns/Gifts.png"
            alt="Gifts"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default GiftSection;
