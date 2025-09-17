import React from "react";
import { Heading } from "@chakra-ui/react";
import { TileSliderCategory } from "./TileSliderCategory";
import { Link } from "gatsby";

type Tile = {
  id: string;
  title: string;
  handle: string;
  images: {
    src: string;
    alt: string;
    href: string;
  }[];
};
interface TileGridGalleryProps {
  title?: string;
  tiles?: Array<Tile>;
}

export const TileGridGallery: React.FC<TileGridGalleryProps> = ({
  title,
  tiles,
}) => {
  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <Heading
        id="browse-categories-title"
        as="h3"
        color="pink.800"
        mb="2.4rem"
        textAlign="left"
      >
        {title || "Browse Brushella’s World"}
      </Heading>

      <section
        aria-labelledby="browse-categories-title"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {!tiles && <p>No categories available at the moment.</p>}
        {tiles &&
          tiles.map((tile) => (
            <article
              key={tile.id}
              aria-label={tile.title + " slider"}
              className="group rounded-lg px-2 py-2"
            >
              <TileSliderCategory key={tile.id} tile={tile} />
              <Link
                to={`/collections/${tile.handle}/`}
                className="block px-2 py-2 mt-1 rounded
              focus:outline focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
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
      </section>
    </div>
  );
};
