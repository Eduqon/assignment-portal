import React from 'react'
import five from '../slider/five.webp'
import four from '../slider/four.jpg'
import six from '../slider/six.jpg'
import Appreciation from '../img/Appreciation.jpg'
import educon from '../img/educon.mp4'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper";
// import six from '../slider/'
export default function Slider() {
    return (
        <>

            <Swiper
                grabCursor={true}
                effect={"creative"}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                //   loop={true}
                //   loopFillGroupWithBlank={true}
                creativeEffect={{

                    prev: {
                        shadow: true,
                        origin: "left center",
                        translate: ["-5%", 0, -200],
                        rotate: [0, 100, 0]
                    },
                    next: {
                        origin: "right center",
                        translate: ["5%", 0, -200],
                        rotate: [0, -100, 0]
                    }
                }}
                modules={[EffectCreative]}
                className="mySwiper6"
            >
                <SwiperSlide> 
                    <video  className='w-100 brdr' loop="true" autoplay="autoplay" controls="controls" id="vid" muted > 
                        <source src={educon} type="video/mp4" /> 
                          
                    </video></SwiperSlide>
                {/* <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>
                <SwiperSlide><img src={Appreciation} class="d-block w-100" alt="..." /></SwiperSlide>  */}
            </Swiper>
            {/* <div className="bord">
                <div id="carouselExampleIndicators" class="carousel slide set-posi" data-ride="carousel" >
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active " id='set_h'>
                            <img src={Appreciation} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src={five} class="d-block w-100" alt=' ..' />
                        </div>
                        <div class="carousel-item">
                            <img src={six} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </button>

                </div>
                <button className='btn add-clor w-100'>Get Help</button>
            </div> */}
        </>
    )
}
