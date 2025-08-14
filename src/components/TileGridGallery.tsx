import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "gatsby";
import { Heading } from "@chakra-ui/react";
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
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-prana-human-nature-collection.jpg?v=1755134152",
        alt: "'Prana' by Brushella from the Human Nature Collection.",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-a-moment-without-thoughts-human-nature-collection.jpg?v=1755134217",
        alt: "'A moment without thoughts' by Brushella from the Human Nature Collection.",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-after-grief-human-nature-collection.jpg?v=1755134182",
        alt: "'After Grief' by Brushella from the Human Nature Collection.",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-nirvana-gardens.jpg?v=1755134089",
        alt: "'Nirvana Gardens' by Brushella.",
      },
    ],
  },
];

export const TileGridGallery = () => {
  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <Heading
        id="browse-categories"
        as="h3"
        color="pink.800"
        mb="2.4rem"
        textAlign="left"
      >
        Browse Brushella’s World
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tiles.map((tile) => (
          <article
            aria-labelledby="category-heading"
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
                slideLabelMessage: "{{index}} / {{slidesLength}}",
              }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full relative"
              loop={true}
            >
              {tile.images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[3/4] object-cover h-full w-full rounded-lg"
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
              <h4 id="category-heading" className="text-lg font-bold">
                {tile.title}
              </h4>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
