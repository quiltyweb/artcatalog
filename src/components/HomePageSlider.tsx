// PortraitSwiperSlider.tsx
// React + TypeScript component: responsive Swiper slider with portrait images.
// • Mobile (< 768 px): shows **1 image per view** (1 portrait image on each slide).
// • Desktop (≥ 768 px): shows **3 images per view** simultaneously.
// • Accessible prev/next navigation arrows with icons

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type HomePageSliderProps = { images: string[] };

export const HomePageSlider: React.FC<HomePageSliderProps> = ({ images }) => (
  <Swiper
    modules={[Pagination, Navigation]}
    pagination={{ clickable: true }}
    navigation={{
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }}
    breakpoints={{
      0: { slidesPerView: 1, spaceBetween: 0 },
      768: { slidesPerView: 3, spaceBetween: 0 },
    }}
    className="relative w-full bg-black/95"
    style={{ height: "calc(100vh - 84px)" }}
    loop={true}
  >
    {images.map((src, idx) => (
      <SwiperSlide key={idx} className="h-full p-2">
        <img
          src={src}
          alt={`Portrait ${idx + 1}`}
          className="h-full w-full object-cover rounded"
          loading="lazy"
        />
      </SwiperSlide>
    ))}

    <button
      className="swiper-button-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 p-1 bg-white/50 rounded shadow hover:bg-white"
      aria-label="Previous slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      className="swiper-button-next absolute top-1/2 right-2 z-10 -translate-y-1/2 p-1 bg-white/50 rounded shadow hover:bg-white"
      aria-label="Next slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </Swiper>
);
