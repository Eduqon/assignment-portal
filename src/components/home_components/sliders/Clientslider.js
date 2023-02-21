import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay, Pagination } from "swiper";
import { FaListUl } from "react-icons/fa";
export default function Clientslider() {
  return (
    <>
      <div className="row">
        <div className="col set-mt mt-4 mb-4">
          <div className=" mt-4 headings d-flex justify-content-center align-items-center">
            <FaListUl className="mr-2" />
            <h1>Providing Services In</h1>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={1}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          // pagination={true}
          loopFillGroupWithBlank={true}
          navigation={false}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/one.webp" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/UK.webp" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/Germany.webp" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/newzland.gif" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/egipt.jpg" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/australia.webp" className="img-sizw" />
          </SwiperSlide>
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <img src="/assets/canada.webp" className="img-sizw" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
