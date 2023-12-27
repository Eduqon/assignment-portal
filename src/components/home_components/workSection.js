import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Slider from "./sliders/Slider";
import { steps_data } from "../../../public/steps_file";
import Image from "next/image";

const WorkSection = () => {
  return (
    <Box id="works">
      <Box>
        <Heading textTransform={"capitalize"} textAlign={"center"}>
          How It <span style={{ color: "#EF2B4B" }}>Works</span>
        </Heading>
        <hr
          style={{
            width: "6%",
            color: "#EF2B4B",
            margin: "1rem auto",
            borderTopWidth: "4px",
            opacity: 1,
          }}
        />
      </Box>
      <Box
        top={0}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-around"}
        padding={"1rem"}
        flexDirection={["column", "column", "column", "row"]}
        gap={"1rem"}
      >
        <Box width={["100%", "100%", "65%", "25%"]} display={"block"}>
          <Slider />
        </Box>
        <Box
          width={["100%", "100%", "100%", "50%"]}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
        >
          {steps_data.map((data) => {
            return (
              <>
                <Box
                  border={"1px solid #C71A37"}
                  borderRadius={"0.4rem"}
                  padding={"1rem"}
                  display={"flex"}
                  alignItems={["center", "center", "center", "start"]}
                  gap={"1rem"}
                >
                  <Box width={["30%", "30%", "30%", "15%"]}>
                    <Image
                      width={600}
                      height={500}
                      src={data.icon}
                      alt={data.altText}
                    />
                  </Box>
                  <Box width={["70%", "70%", "70%", "80%"]}>
                    <h3
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: 500,
                      }}
                    >
                      Step{" "}
                      <span style={{ color: "#EF2B4B" }}>{data.step_no}</span> :{" "}
                      {data.before_spanText}{" "}
                      <span style={{ color: "#EF2B4B" }}>{data.spanText}</span>{" "}
                      {data?.after_spanText}
                    </h3>
                    <Text fontSize={["0.7rem", "0.7rem", "0.7rem", "1rem"]}>
                      {data.sub_heading}
                    </Text>
                  </Box>
                </Box>
                {data.lastDiv && (
                  <Box
                    height="2rem"
                    borderLeft="3px dotted #C71A37"
                    marginLeft="2rem"
                  />
                )}
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default WorkSection;
