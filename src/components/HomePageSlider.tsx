import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
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
        pagination={false}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
          768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 0 },
        }}
        style={{ height: "calc(100vh - 84px)" }}
        loop={true}
        watchSlidesProgress={true} // enables progress tracking
      >
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
                <Link
                  to={item.link.url}
                  className="slide-caption block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
                    font-serif font-medium mb-1 text-lg"
                >
                  <p className="leading-snug line-clamp-2">{item.caption}</p>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          className={`swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-black/70 rounded-full p-2 shadow
                   text-lg font-bold text-white`}
          aria-label="Previous image"
        />
        <button
          className={`swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-black/70 rounded-full p-2 shadow
                   text-lg font-bold text-white`}
          aria-label="Next image"
        />
      </Swiper>
    </section>
  );
};
