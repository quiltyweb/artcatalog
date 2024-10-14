import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import TileList from "../components/TileList";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import SEO from "../components/SEO";

// Swiper styles:
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import "swiper/css/effect-fade";

const SliderContainer = styled(Box)`
  --brushellaSliderHomepage-text-color: white;
  --brushellaDesktopNav-height: 130px;
  --brushellaMobileNav-height: 88px;
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
      height: calc(100vh - var(--brushellaMobileNav-height));
      width: 100vw;
      @media (min-width: 992px) {
        height: calc(100vh - var(--brushellaDesktopNav-height));
      }
    }
  }
`;

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <SliderContainer>
        <Swiper
          className="brushellaSliderHomepage"
          loop={true}
          modules={[Navigation, Pagination, A11y, EffectFade]}
          navigation={true}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span role="button" class="' +
                className +
                '">' +
                (index + 1) +
                "</span>"
              );
            },
          }}
          effect={"fade"}
        >
          <SwiperSlide key={"tiger"}>
            <StaticImage
              className="brushella-slide"
              alt={
                "partial area of the print canvas called Jungle, showing one white tiger resting on a rock in a colourful jungle with trees and river in the background"
              }
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-tiger.jpg?v=1728531323"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"tucan"}>
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the Jungle print canvas, depicting a black and white toucan perched on a tree branch in a vibrant jungle with trees in the background."
              }
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-tucan.jpg?v=1728531404"
              placeholder="blurred"
            />
          </SwiperSlide>

          <SwiperSlide key={"redchicken"}>
            <StaticImage
              className="Partial area of the jungle print canvas showing a red chicken and a blue snake in a vibrant jungle with flowers and plants in the background."
              alt={"testing alt"}
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-redchicken.jpg?v=1728532542"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"monkeys"}>
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the jungle print canvas, depicting two colorful monkeys in a jungle with trees in the background."
              }
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-monkeys.jpg?v=1728531337"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"parrot"}>
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the printed canvas titled 'Jungle', displaying a colorful parrot perched on a tree branch."
              }
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-parrot.jpg?v=1728532787"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"panther"}>
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the jungle print canvas depicting a black panther and an iguana in a vibrant background."
              }
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

export const Head = (props: any) => {
  return (
    <SEO
      pageTitle="Home Page"
      siteTitle="Brushella"
      description="Home Page for Brushella Store"
    />
  );
};
