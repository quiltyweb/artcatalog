import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import { Link } from "@chakra-ui/react";
import { GatsbyImage } from "gatsby-plugin-image";

type TileImage = {
  productTitle: string;
  src: Record<string, unknown> | string;
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
  return (
    <Swiper
      className="custom-swiper-categories w-full relative"
      modules={[Navigation, A11y]}
      navigation={{
        nextEl: `.next-${tile.id}`,
        prevEl: `.prev-${tile.id}`,
      }}
      spaceBetween={0}
      slidesPerGroup={1}
      slidesPerView={1}
      loop={true}
      speed={0}
      watchSlidesProgress={true}
    >
      {/* Custom navigation buttons */}
      {tile.images.length > 1 && (
        <>
          <button
            className={`prev-${tile.id} absolute left-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-white/70 rounded-full p-2 shadow
                   text-md font-bold`}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className={`next-${tile.id} absolute right-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-white/70 rounded-full p-2 shadow
                   text-md font-bold`}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      {tile.images.map((image, idx) => {
        return (
          <SwiperSlide key={idx} className="h-full w-full">
            <div className="flex flex-col items-center">
              <GatsbyImage
                image={image.src as any} // Type assertion since src can be string or object
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
                  aria-live="polite"
                  href={image.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                >
                  {image.productTitle}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
