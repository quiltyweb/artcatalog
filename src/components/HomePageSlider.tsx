import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Link } from "gatsby";
// Slider CSS styles loaded globally in Layout
type HomePageSliderProps = {
  images: Array<FlattenedImage>;
  initialLoading?: boolean;
};

type FlattenedImage = {
  image: string;
  reference: {
    image: {
      url: string;
    };
  };
  alt_text: string;
  link?: {
    text: string;
    url: string;
  };
  title: string;
  caption: string;
  category: string;
  collection?: {
    handle: string;
    title: string;
  };
};

const withWidth = (url: string, width: number) => {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}`;
};

export const HomePageSlider: React.FC<HomePageSliderProps> = ({
  images,
  initialLoading = true,
}) => {
  const [loading, setLoading] = useState(initialLoading);
  const hasInteractedRef = React.useRef(false);

  return (
    <section
      aria-live="off"
      aria-label="Featured work slider"
      className="group relative"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white-900">
            <div className="sr-only">Featured work slider is loading</div>
          </div>
        </div>
      )}

      <Swiper
        id="homepage-slider-1"
        className="custom-swiper relative w-full bg-black/95"
        data-testid="homepage-slider-1"
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={0}
        slidesPerView={1} // default mobile
        slidesPerGroup={1} // default mobile
        breakpoints={{
          540: {
            slidesPerView: 2, // show 2 slides on desktop
            slidesPerGroup: 2, // move 2 at a time on desktop
          },

          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },

          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        style={{ height: "calc(100vh - 84px)" }}
        loop={true}
        speed={0} // instant transition
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          slideLabelMessage: "{{index}} / {{slidesLength}}",
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        watchSlidesProgress={true} // enables progress tracking
        onInit={() => {
          setLoading(false);
          (document.activeElement as HTMLElement)?.blur();
        }}
        onSlideChange={(swiper) => {
          if (window.innerWidth < 768) {
            return;
          }
          if (!hasInteractedRef.current) {
            hasInteractedRef.current = true;
            return; // skip the first automatic slide change
          }
          const firstVisible = swiper.slides.find((slide) =>
            slide.classList.contains("swiper-slide-visible"),
          );
          if (firstVisible) {
            firstVisible.querySelector("a")?.focus();
          }
        }}
      >
        {images.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="h-full w-full"
            style={{ padding: "0.5rem 0.25rem" }}
          >
            <div className="flex flex-col items-center h-full w-full">
              <picture className="h-full w-full">
                <source
                  media="(max-width: 539px)"
                  srcSet={withWidth(item.reference.image.url, 750)}
                />
                <source
                  media="(max-width: 767px)"
                  srcSet={withWidth(item.reference.image.url, 800)}
                />
                <img
                  src={withWidth(item.reference.image.url, 1280)}
                  alt={item.alt_text}
                  className="object-cover h-full lg:w-full rounded-sm"
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  width={634}
                  height={840}
                />
              </picture>

              <div className="absolute bottom-10 left-4 max-w-[80%] bg-black/70 text-white  px-4 py-2 rounded-lg">
                {item.collection?.handle || item.link?.url ? (
                  <Link
                    to={
                      item.collection?.handle
                        ? `/collections/${item.collection.handle}`
                        : (item.link!.url)
                    }
                    className="slide-caption block
                      font-serif font-medium mb-1 text-lg"
                  >
                    <p className="leading-snug line-clamp-2 min-h-fit">
                      {item.caption}
                    </p>
                  </Link>
                ) : (
                  <p className="slide-caption font-serif font-medium mb-1 text-lg leading-snug line-clamp-2 min-h-fit">
                    {item.caption}
                  </p>
                )}
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
