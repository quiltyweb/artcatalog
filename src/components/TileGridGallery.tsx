import React from "react";
import { Heading } from "@chakra-ui/react";
import { TileSliderCategory } from "./TileSliderCategory";
import { Link } from "gatsby";

type Tile = {
  id: string;
  title: string;
  handle: string;
  images: {
    productTitle: string;
    src: Record<string, unknown> | string;
    alt: string;
    href: string;
  }[];
};
interface TileGridGalleryProps {
  title?: string;
  tiles?: Array<Tile>;
}

const CATEGORY_ORDER: Record<string, number> = {
  prints: 0,
  "original-paintings": 1,
};

export const TileGridGallery: React.FC<TileGridGalleryProps> = ({
  title,
  tiles,
}) => {
  if (!tiles || tiles.length === 0) {
    return <div aria-live="off">No categories available at the moment.</div>;
  }

  const sortedTiles = [...tiles].sort((a, b) => {
    const aOrder = CATEGORY_ORDER[a.handle] ?? Infinity;
    const bOrder = CATEGORY_ORDER[b.handle] ?? Infinity;
    return aOrder - bOrder;
  });

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <Heading
        id="all-categories-title"
        as="h3"
        color="pink.800"
        my="2.4rem"
        textAlign="left"
      >
        {title || "Browse Brushella’s World"}
      </Heading>

      <section
        aria-live="off"
        aria-labelledby="all-categories-title"
        className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_350px))] min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 justify-center gap-2"
      >
        {sortedTiles.map((tile) => (
            <article
              key={tile.id}
              aria-label={tile.title + " slider"}
              className="group rounded-lg px-2 py-2"
            >
              <Link
                to={`/collections/${tile.handle}/`}
                className="px-2 py-2 mt-1 mb-2 rounded block"
              >
                <h4
                  className="text-xl translate-y-1 hover:translate-y-0 transition-transform duration-300 ease-in-out"
                  aria-label={`go to ${tile.title} category`}
                >
                  {tile.title}
                </h4>
              </Link>
              <TileSliderCategory key={tile.id} tile={tile} />
            </article>
          ))}
      </section>
    </div>
  );
};
