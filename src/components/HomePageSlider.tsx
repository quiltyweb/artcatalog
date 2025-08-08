// PortraitSwiperSlider.tsx
// React + TypeScript component: responsive Swiper slider with portrait images.
// • Mobile (< 768 px): shows **1 image per view** (1 portrait image on each slide).
// • Desktop (≥ 768 px): shows **3 images per view** simultaneously.
// • Accessible prev/next navigation arrows with icons

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type HomePageSliderProps = {
  images: Array<FlattenedImage>;
};

type FlattenedImage = {
  image: string;
  reference: {
    image: {
      url: string;
    };
  };
  alt_text: string;
  link: {
    text: string;
    url: string;
  };
  title: string;
  caption: string;
  category: string;
};
export const HomePageSlider: React.FC<HomePageSliderProps> = ({ images }) => {
  return (
    <Swiper
      id="homepage-slider-1"
      data-testid="homepage-slider-1"
      modules={[Navigation, Pagination, A11y, EffectFade]}
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
      navigation={true}
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 3, spaceBetween: 0 },
      }}
      className="relative w-full bg-black/95"
      style={{ height: "calc(100vh - 84px)" }}
      loop={false}
    >
      {images.map((item, idx) => (
        <SwiperSlide key={item.image} className="h-full w-full p-2">
          <img
            src={item.reference.image.url}
            alt={item.alt_text}
            className="h-full w-full object-cover rounded"
            loading="eager"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
