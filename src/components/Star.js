import { Box } from "@chakra-ui/react";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Star = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elm, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" color={"#EF2B4B"} />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" color={"#EF2B4B"} />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <>
      <Box className="icon-style" display={"flex"} gap={"0.2rem"}>
        {ratingStar}
      </Box>
    </>
  );
};

export default Star;
