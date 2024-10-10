import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import TileList from "../components/TileList";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";

import styled from "styled-components";
import { Box } from "@chakra-ui/react";
const SliderContainer = styled(Box)`
  --brushellaSliderHomepage-text-color: white;
  .brushellaSliderHomepage {
    width: 100%;

    .swiper-button-prev,
    .swiper-button-next {
      color: var(--brushellaSliderHomepage-text-color);
      background: rgba(0, 0, 0, 0.65);
      padding: 1.5rem;
      border-radius: 50%;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
      font-size: 1.6rem;
    }

    .swiper-pagination-bullet {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: var(--brushellaSliderHomepage-text-color);
      opacity: 1;
      background: rgba(0, 0, 0, 0.65);
    }

    .swiper-pagination-bullet-active {
      color: #000000;
      background: #ffffff;
    }
    .swiper-slide img {
      height: calc(100vh - 130px);
      width: 100vw;
    }
  }
`;

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <SliderContainer>
        <Swiper
          className="brushellaSliderHomepage"
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          effect={"fade"}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' + className + '">' + (index + 1) + "</span>"
              );
            },
          }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide key={"tucan"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing tucan alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-tucan.jpg?v=1728531404"
              placeholder="blurred"
            />
          </SwiperSlide>

          <SwiperSlide key={"tiger"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing tiger alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-tiger.jpg?v=1728531323"
              placeholder="blurred"
            />
          </SwiperSlide>

          <SwiperSlide key={"redchicken"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-redchicken.jpg?v=1728532542"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"monkeys"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing monkey alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-monkeys.jpg?v=1728531337"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"parrot"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-parrot.jpg?v=1728532787"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"panther"}>
            <StaticImage
              className="brushella-slide"
              alt={"testing alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-panther.jpg?v=1728532742"
              placeholder="blurred"
            />
          </SwiperSlide>
        </Swiper>
      </SliderContainer>
      <TileList />
    </>
  );
};

export default IndexPage;
