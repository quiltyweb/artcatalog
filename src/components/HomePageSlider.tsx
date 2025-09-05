// PortraitSwiperSlider.tsx
// React + TypeScript component: responsive Swiper slider with portrait images.
// • Mobile (< 768 px): shows **1 image per view** (1 portrait image on each slide).
// • Desktop (≥ 768 px): shows **3 images per view** simultaneously.
// • Accessible prev/next navigation arrows with icons

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "gatsby";

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
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <section>
        <Swiper
          id="homepage-slider-loader"
          data-testid="homepage-slider-loader"
          modules={[Navigation, Pagination]}
          pagination={false}
          navigation={false}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 0 },
          }}
          className="relative w-full bg-black/95"
          style={{ height: "calc(100vh - 84px)" }}
          loop={false}
        >
          {images.map((item, idx) => (
            <SwiperSlide
              key={item.image}
              className="h-full w-full p-2 bg-black/95"
            ></SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }
  return (
    <section aria-label="Homepage main slider">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
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
              <div className="flex flex-col items-center h-full w-full">
                <img
                  src={item.reference.image.url}
                  alt={item.alt_text}
                  className="object-cover h-full rounded-sm"
                  loading="eager"
                />

                <div className="absolute bottom-4 left-4 max-w-[80%] bg-black/80 text-white  px-4 py-2 rounded-lg">
                  <p className="text-base leading-snug line-clamp-3">
                    <Link
                      to="/collections/original-paintings/"
                      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
                      font-medium font-serif"
                    >
                      {item.caption}
                    </Link>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};
