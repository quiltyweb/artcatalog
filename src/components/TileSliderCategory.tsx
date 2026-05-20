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
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = tile.images[activeIndex];

  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
      <Swiper
        className="custom-swiper-categories w-full"
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
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {tile.images.map((image, idx) => {
          return (
            <SwiperSlide key={idx} className="h-full w-full">
              <div className="relative" style={{ height: "360px", backgroundColor: "#000" }}>
                <GatsbyImage
                  image={image.src as any}
                  alt={image.alt}
                  className="w-full"
                  objectFit="contain"
                  style={{ height: "100%" }}
                  loading="lazy"
                />
                <a
                  href={image.href}
                  className="absolute inset-0"
                  tabIndex={-1}
                  aria-hidden="true"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* Caption bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#242424", minHeight: "4rem" }}
      >
        <div className="flex flex-col">
          <Link
            href={currentImage?.href ?? `/collections/${tile.handle}`}
            className="text-white text-sm sm:text-base tracking-wide overflow-hidden"
            style={{ color: "#fff", fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
          >
            {currentImage?.productTitle ?? tile.title}
          </Link>
        </div>
        {tile.images.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              className={`prev-${tile.id} rounded-full border border-white/30 flex items-center justify-center`}
              style={{ width: "36px", height: "36px", color: "#fff" }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className={`next-${tile.id} rounded-full border border-white/30 flex items-center justify-center`}
              style={{ width: "36px", height: "36px", color: "#fff" }}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
