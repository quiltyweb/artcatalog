import React from "react";
import { Heading } from "@chakra-ui/react";
import { TileSliderCategory } from "./TileSliderCategory";
import { Link } from "gatsby";

const tiles = [
  {
    id: "tile1",
    title: "Original Paintings",
    handle: "original-paintings",
    images: [
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-prana-human-nature-collection.jpg?v=1755134152",
        alt: "'Prana' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/prana-original-acrylic-painting",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-a-moment-without-thoughts-human-nature-collection.jpg?v=1755134217",
        alt: "'A moment without thoughts' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/a-moment-without-thoughts-original-acrylic-painting",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-after-grief-human-nature-collection.jpg?v=1755134182",
        alt: "'After Grief' by Brushella from the Human Nature Collection.",
        href: "/collections/original-paintings/after-grief",
      },
      {
        src: "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/asset-homepage-gabby-ugalde-nirvana-gardens.jpg?v=1755134089",
        alt: "'Nirvana Gardens' by Brushella.",
        href: "/collections/original-paintings/nirvana-gardens",
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
            aria-label={tile.title + " slider"}
            key={tile.id}
            className="group rounded-lg overflow-hidden px-2 py-2"
            tabIndex={0}
          >
            <TileSliderCategory key={tile.id} tile={tile} />
            <Link
              to={`/collections/${tile.handle}/`}
              className="block px-2 py-2 mt-2 rounded 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <h4
                className="text-lg font-bold"
                aria-label={`go to ${tile.title} category`}
              >
                {tile.title}
              </h4>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
