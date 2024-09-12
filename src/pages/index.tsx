import * as React from "react";
import SEO from "../components/SEO";
import { StaticImage } from "gatsby-plugin-image";
import TileList from "../components/TileList";
import Slider from "react-slick";
import styled from "styled-components";
import { IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const SliderContainer = styled.div`
  margin: 1rem 0 2rem 0;
  display: flex;
  justify-content: center;

  .brushella-slider {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    .brushella-slider-arrow {
      display: none;
    }

    @media (min-width: 320px) {
      max-width: 315px;
    }

    @media (min-width: 375px) {
      max-width: 370px;
    }

    @media (min-width: 425px) {
      max-width: 420px;
    }

    @media (min-width: 625px) {
      max-width: 620px;
      .brushella-slider-arrow {
        display: initial;
      }
    }

    @media (min-width: 768px) {
      max-width: 680px;
    }

    @media (min-width: 1024px) {
      max-width: 890px;
    }

    .slick-next:before,
    .slick-prev:before {
      color: black;
    }

    .brushella-slide {
      border: 6px solid white;
      border-radius: 10px;
    }
  }
`;

const SliderArrow = (props: {
  onClick?: () => void;
  to: string;
  icon: any;
}) => {
  return (
    <IconButton
      className="brushella-slider-arrow"
      color="#48616c"
      backgroundColor="#FFFFFF"
      fontSize="2rem"
      onClick={props.onClick}
      aria-label={props.to}
      icon={props.icon}
    />
  );
};

const IndexPage: React.FunctionComponent = (): React.ReactElement => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: "brushella-slider",
    nextArrow: <SliderArrow to="next" icon={<ChevronRightIcon />} />,
    prevArrow: <SliderArrow to="previous" icon={<ChevronLeftIcon />} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <SliderContainer data-testid="brushella-slider-index">
        <Slider {...settings}>
          <StaticImage
            className="brushella-slide"
            alt={"Macumba original painting"}
            src="../images/slider/slider-1.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Brushella murals"}
            src="../images/slider/slider-2.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Brushella abstract painting"}
            src="../images/slider/slider-3.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Heart from Human nature collection"}
            src="../images/slider/slider-4.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Tucan print"}
            src="../images/slider/slider-5.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Brain from Human nature collection"}
            src="../images/slider/slider-6.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Birds from Human nature collection"}
            src="../images/slider/slider-7.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
          <StaticImage
            className="brushella-slide"
            alt={"Birds from Human nature collection"}
            src="../images/slider/slider-8.jpg"
            placeholder="blurred"
            layout="fixed"
            height={400}
          />
        </Slider>
      </SliderContainer>
      <TileList />
    </>
  );
};

export default IndexPage;

export const Head = (): React.ReactElement => (
  <SEO>
    <title id="home-title">Welcome to Brushella - All things ART!</title>
    <meta
      id="index-page"
      name="home page"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Body painting"
    />
  </SEO>
);
