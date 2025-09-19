// PortraitSwiperSlider.tsx
// React + TypeScript component: responsive Swiper slider with portrait images.
// • Mobile (< 768 px): shows **1 image per view** (1 portrait image on each slide).
// • Desktop (≥ 768 px): shows **3 images per view** simultaneously.
// • Accessible prev/next navigation arrows with icons

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { Link } from "gatsby";

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
// TODO: render slides in order coming from CMS
export const HomePageSlider: React.FC<HomePageSliderProps> = ({ images }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <section>con slides available...</section>;
  }

  return (
    <section aria-label="Homepage main slider">
      <Swiper
        id="homepage-slider-1"
        className="custom-swiper relative w-full bg-black/95"
        data-testid="homepage-slider-1"
        modules={[Navigation, Pagination, A11y]}
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
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
          768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 0 },
        }}
        style={{ height: "calc(100vh - 84px)" }}
        loop={false}
      >
        <>
          <button
            className={`swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-white/70 rounded-full p-2 shadow
                   text-lg font-bold`}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-white/70 rounded-full p-2 shadow
                   text-lg font-bold`}
            aria-label="Next image"
          >
            ›
          </button>
        </>
        {images.map((item, idx) => (
          <SwiperSlide key={idx} className="h-full w-full p-2">
            <div className="flex flex-col items-center h-full w-full">
              <img
                src={item.reference.image.url}
                alt={item.alt_text}
                className="object-cover h-full lg:w-full rounded-sm"
                loading="eager"
              />

              <div className="absolute bottom-10 left-4 max-w-[80%] bg-black/70 text-white  px-4 py-2 rounded-lg">
                <p className="text-base leading-snug line-clamp-3">
                  <Link
                    to="/collections/original-paintings/"
                    className="slide-caption block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
                      font-serif font-medium mb-1 text-lg"
                  >
                    {item.caption}
                  </Link>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
