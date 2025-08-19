import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "@chakra-ui/react";

type TileImage = {
  src: string;
  alt: string;
  href: string;
};

type Tile = {
  id: string | number;
  title: string;
  handle: string;
  images: TileImage[];
};

interface TileSliderCategoryProps {
  tile: Tile;
}

export const TileSliderCategory: React.FC<TileSliderCategoryProps> = ({
  tile,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      modules={[Navigation, A11y, Pagination]}
      navigation={{
        nextEl: `.next-${tile.id}`,
        prevEl: `.prev-${tile.id}`,
      }}
      pagination={false}
      spaceBetween={10}
      slidesPerView={1}
      className="w-full relative"
      loop={false}
      onSlideChange={(swiper) => {
        const newIndex = swiper.activeIndex;
        setActiveIndex(newIndex);
      }}
    >
      {/* Custom navigation buttons */}
      <button
        className={`prev-${tile.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
                  transition-opacity bg-white/80 rounded-full p-1 shadow`}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        className={`next-${tile.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
                  transition-opacity bg-white/80 rounded-full p-1 shadow`}
        aria-label="Next image"
      >
        ›
      </button>
      {tile.images.map((image, idx) => {
        return (
          <SwiperSlide key={idx} className="h-full w-full">
            <div className="flex flex-col items-center">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] object-cover h-full w-full rounded-lg"
              />
              {/* Overlay title bar */}
              <div
                className="absolute bottom-0 left-0 w-full
                     bg-black/60 text-white text-sm sm:text-base
                     px-3 py-2 rounded-b-lg"
              >
                <Link
                  tabIndex={idx === activeIndex ? 0 : -1} // focusable only if active
                  href={image.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {image.alt}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
