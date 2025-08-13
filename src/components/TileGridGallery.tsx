import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
// import { Link } from "@chakra-ui/react";
import { Link } from "gatsby";
// import { Text } from "@chakra-ui/react";
// import { Link } from "gatsby";
// const tiles = Array.from({ length: 8 }, (_, tileIndex) => ({
//   id: tileIndex + 1,
//   images: Array.from(
//     { length: 4 },
//     (_, imgIndex) =>
//       `https://source.unsplash.com/random/300x300?sig=${
//         tileIndex * 4 + imgIndex
//       }`
//   ),
// }));

const tiles = [
  {
    id: "tile1",
    title: "Original Paintings",
    handle: "original-paintings",
    images: [
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
    ],
  },
  {
    id: "tile2",
    title: "Original Paintings",
    handle: "original-paintings",
    images: [
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
    ],
  },
  {
    id: "tile3",
    title: "Original Paintings",
    handle: "original-paintings",
    images: [
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/Prana-by-Brushella-Human-Nature-Collection.jpg?v=1750915766",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/A-moment-without-thoughts-by-Brushella-Human-Nature-Collection.jpg?v=1750915407",
      "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/After-Grief-by-Brushella-Human-Nature-Collection.jpg?v=1750915560",
    ],
  },
];

export const TileGridGallery = () => {
  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className="group rounded-lg overflow-hidden px-2 py-2"
            tabIndex={-1} // Make container programmatically focusable
          >
            <Swiper
              modules={[Navigation, A11y]}
              navigation={{
                nextEl: `.next-${tile.id}`,
                prevEl: `.prev-${tile.id}`,
              }}
              a11y={{
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
              }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full aspect-square relative"
              loop={true}
            >
              {tile.images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center">
                    <img
                      src={src}
                      alt={`Tile ${tile.id} - Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom navigation buttons */}
              <button
                className={`prev-${tile.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
                  transition-opacity bg-white/80 rounded-full p-2 shadow`}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className={`next-${tile.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
                  transition-opacity bg-white/80 rounded-full p-2 shadow`}
                aria-label="Next image"
              >
                ›
              </button>
            </Swiper>
            <Link
              to={`/collections/${tile.handle}/`}
              className="block px-2 py-2 mt-2 rounded 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <h3 className="text-lg font-bold">{tile.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
