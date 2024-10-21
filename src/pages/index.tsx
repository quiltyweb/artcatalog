import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import TileList from "../components/TileList";
import HeroSection from "../components/HeroSection";
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

const SlideOverlay = () => {
  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%,rgba(0,0,0,0.8) 100%,rgba(0,0,0,1) 100%)",
        height: "100%",
        width: "100%",
        display: "flex",
        position: "absolute",
        top: "0",
        zIndex: "1",
      }}
    ></div>
  );
};

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
          <SwiperSlide key={"lungs"}>
            <SlideOverlay />
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the Lungs depicting a human heart with wildlife and flowers in a vibrant background."
              }
              src="../images/homepage-slider/lungs.jpg"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"brain"}>
            <SlideOverlay />
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the Brain canvas depicting a human heart with wildlife and flowers in a vibrant background."
              }
              src="../images/homepage-slider/brain.jpg"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"animal-heart"}>
            <SlideOverlay />
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the animal heart depicting a human heart with wildlife and flowers in a vibrant background."
              }
              src="../images/homepage-slider/animal-heart.jpg"
              placeholder="blurred"
            />
          </SwiperSlide>

          <SwiperSlide key={"tiger"}>
            <SlideOverlay />
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
            <SlideOverlay />
            <StaticImage
              className="brushella-slide"
              alt={
                "Partial area of the Jungle print canvas, depicting a black and white toucan perched on a tree branch in a vibrant jungle with trees in the background."
              }
              src="https://cdn.shopify.com/s/files/1/0586/9892/4240/files/homepage-slider-tucan.jpg?v=1728531404"
              placeholder="blurred"
            />
          </SwiperSlide>
          <SwiperSlide key={"panther"}>
            <SlideOverlay />
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
      <HeroSection />
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
