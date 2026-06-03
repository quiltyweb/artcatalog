import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { Link } from "gatsby";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import LogoSVG from "../images/svg/brushella-black-bg.svg";
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

// Module-level flag — survives unmount/remount across SPA navigation
// so the epic reveal only plays once per page-load lifetime.
let hasPlayedEntrance = false;

export const HomePageSlider: React.FC<HomePageSliderProps> = ({
  images,
  initialLoading = true,
}) => {
  const reduceMotion = useReducedMotion();
  // Claim the entrance slot at mount, not when the animation effect fires.
  // Otherwise, navigating away during the 2.5s logo intro (before the effect
  // sets the flag) leaves hasPlayedEntrance=false and the animation replays
  // on return.
  const [shouldAnimate] = useState(() => {
    if (hasPlayedEntrance || reduceMotion) return false;
    hasPlayedEntrance = true;
    return true;
  });
  const [loading, setLoading] = useState(initialLoading);
  const [epicMode, setEpicMode] = useState(shouldAnimate);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // Guarantees the loader is visible for at least N ms — prevents
  // it from flashing past in a single frame when images are cached.
  const [minLoaderHeld, setMinLoaderHeld] = useState(true);
  // Brand-logo intro: fades in, holds 1.5s, fades out — runs only on
  // the first home visit (same condition as shouldAnimate).
  const [logoIntroDone, setLogoIntroDone] = useState(() => !shouldAnimate);
  const [hoverReady, setHoverReady] = useState(() => !shouldAnimate);
  const [skipped, setSkipped] = useState(false);
  const loadedIdxRef = React.useRef<Set<number>>(new Set());
  const hasInteractedRef = React.useRef(false);
  const controls = useAnimationControls();
  const sectionControls = useAnimationControls();

  const markImageLoaded = (idx: number) => {
    if (loadedIdxRef.current.has(idx)) return;
    loadedIdxRef.current.add(idx);
    if (loadedIdxRef.current.size >= images.length) {
      setImagesLoaded(true);
    }
  };

  const showLoader =
    loading || !imagesLoaded || minLoaderHeld || !logoIntroDone;

  const showSkipButton = shouldAnimate && !hoverReady;

  const skipAnimation = () => {
    setSkipped(true);
    setMinLoaderHeld(false);
    setLogoIntroDone(true);
    setLoading(false);
    setImagesLoaded(true);
    setEpicMode(false);
    setHoverReady(true);
    controls.stop();
    sectionControls.stop();
    controls.set({ opacity: 1, filter: "grayscale(0)" });
    sectionControls.set({ height: "calc(100vh - 84px)", marginTop: 0 });
  };

  useEffect(() => {
    const t = setTimeout(() => setMinLoaderHeld(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Signal to the consent banner that the homepage entrance animation is over,
  // so it can appear without competing with the reveal.
  useEffect(() => {
    if (hoverReady) {
      window.dispatchEvent(new Event("brushella:hero-animation-complete"));
    }
  }, [hoverReady]);

  useEffect(() => {
    if (epicMode) {
      document.body.classList.add("epic-mode-active");
    } else {
      document.body.classList.remove("epic-mode-active");
      document.body.classList.remove("epic-mode-descending");
    }
    return () => {
      document.body.classList.remove("epic-mode-active");
      document.body.classList.remove("epic-mode-descending");
    };
  }, [epicMode]);

  // Mirror the keyframe duration used for the logo motion below
  // (fade in 0.5s + hold 1.5s + fade out 0.5s = 2.5s).
  useEffect(() => {
    if (!shouldAnimate) return;
    const t = setTimeout(() => setLogoIntroDone(true), 2500);
    return () => clearTimeout(t);
  }, [shouldAnimate]);

  useEffect(() => {
    if (skipped) return;
    if (!shouldAnimate || loading || !imagesLoaded || !logoIntroDone) return;
    controls.set({ opacity: 0, filter: "grayscale(1)" });
    sectionControls.set({ height: "100vh", marginTop: "-84px" });

    // Color reveal: holds greyscale for 1.5s then transitions to full colour over 3s.
    const colourPromise = controls.start({
      filter: "grayscale(0)",
      transition: { duration: 3, delay: 1.5, ease: "easeOut" },
    });

    const opacityPromise = controls.start((custom: number) => ({
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: "easeOut",
      },
    }));

    let hoverReadyTimeout: ReturnType<typeof setTimeout> | null = null;

    // Wait for both fade-in and colour transition before descending.
    Promise.all([colourPromise, opacityPromise])
      .then(() => {
        // Signal the descend phase so desktop can hide the transitory
        // hamburger/cart styling before the real nav becomes visible.
        document.body.classList.add("epic-mode-descending");
        return sectionControls.start({
          height: "calc(100vh - 84px)",
          marginTop: 0,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
      })
      .then(() => {
        setEpicMode(false);
        // Captions and nav buttons now fade in over 200ms — wait that
        // long before enabling hover scale.
        hoverReadyTimeout = setTimeout(() => setHoverReady(true), 200);
      });

    return () => {
      if (hoverReadyTimeout) clearTimeout(hoverReadyTimeout);
    };
  }, [
    skipped,
    shouldAnimate,
    loading,
    imagesLoaded,
    logoIntroDone,
    controls,
    sectionControls,
  ]);

  return (
    <motion.section
      aria-live="off"
      aria-label="Featured work slider"
      className={`group relative ${
        epicMode ? "z-50 pointer-events-none epic-mode-active" : ""
      }`}
      style={{ height: "calc(100vh - 84px)" }}
      initial={shouldAnimate ? { height: "100vh", marginTop: "-84px" } : false}
      animate={shouldAnimate ? sectionControls : false}
    >
      {showSkipButton && (
        <button
          type="button"
          onClick={skipAnimation}
          className="absolute bottom-4 right-4 z-20 pointer-events-auto
                     text-white/60 hover:text-white/90 text-xs
                     px-2 py-1 underline underline-offset-4 decoration-white/30
                     hover:decoration-white/70 transition-colors
                     focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
          aria-label="Skip intro animation"
        >
          Skip animation
        </button>
      )}

      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/95 z-10">
          {!logoIntroDone ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.5,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              style={{
                width: "40vmin",
                height: "40vmin",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LogoSVG
                aria-label="Brushella"
                style={{ width: "100%", height: "100%" }}
              />
              <span className="sr-only">Brushella — loading</span>
            </motion.div>
          ) : (
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/30 border-t-white">
              <div className="sr-only">Featured work slider is loading</div>
            </div>
          )}
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
        style={{ height: "100%" }}
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
          if (!hasInteractedRef.current) {
            hasInteractedRef.current = true;
            return; // skip the first automatic slide change
          }
          if (window.innerWidth < 768) return;
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
            style={{ padding: "0.15rem" }}
          >
            <motion.div
              className="flex flex-col items-center h-full w-full"
              custom={idx}
              initial={
                shouldAnimate ? { opacity: 0, filter: "grayscale(1)" } : false
              }
              animate={shouldAnimate ? controls : false}
            >
              <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded">
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
                    ref={(node) => {
                      if (node?.complete && node.naturalWidth > 0) {
                        markImageLoaded(idx);
                      }
                    }}
                    onLoad={() => markImageLoaded(idx)}
                    onError={() => markImageLoaded(idx)}
                    src={withWidth(item.reference.image.url, 1280)}
                    alt={item.alt_text}
                    className={`object-cover h-full w-full transition-transform duration-700 ease-out ${
                      hoverReady ? "hover:scale-[1.02]" : ""
                    }`}
                    loading="eager"
                    width={634}
                    height={840}
                  />
                </picture>
                {(item.collection?.handle || item.link?.url) && (
                  <Link
                    to={
                      item.collection?.handle
                        ? `/collections/${item.collection.handle}`
                        : item.link!.url
                    }
                    className="absolute inset-0"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                )}
              </div>

              {!epicMode && (
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, height: 0 } : false}
                  animate={
                    shouldAnimate ? { opacity: 1, height: "auto" } : false
                  }
                  transition={{ duration: skipped ? 0 : 0.1, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                  className="shrink-0 w-full"
                >
                  <div className="flex items-center justify-center max-w-[90%] min-h-[1lh] text-white text-center p-1 mx-auto">
                    {item.collection?.handle || item.link?.url ? (
                      <Link
                        to={
                          item.collection?.handle
                            ? `/collections/${item.collection.handle}`
                            : item.link!.url
                        }
                        className="slide-caption block
                          font-serif font-medium text-sm"
                      >
                        <p className="leading-snug line-clamp-2">
                          {item.caption}
                        </p>
                      </Link>
                    ) : (
                      <p className="slide-caption font-serif font-medium text-sm leading-snug line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </SwiperSlide>
        ))}

        <button
          className={`swiper-button-prev absolute left-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-transparent flex items-center justify-center
                   rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   [&::after]:hidden
                   transition-opacity duration-200 ${
                     epicMode
                       ? "opacity-0 pointer-events-none"
                       : "opacity-50 hover:opacity-100 active:opacity-100"
                   }`}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="w-10 h-10 drop-shadow"
          >
            <mask id="hp-prev-arrow">
              <rect width="40" height="40" fill="white" />
              <polyline
                points="24 28 14 20 24 12"
                stroke="black"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
            <circle
              cx="20"
              cy="20"
              r="20"
              fill="white"
              fillOpacity="0.7"
              mask="url(#hp-prev-arrow)"
            />
          </svg>
        </button>
        <button
          className={`swiper-button-next absolute right-2 top-1/2 -translate-y-1/2 z-10
                   group-focus-within:opacity-100
                   bg-transparent flex items-center justify-center
                   rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                   [&::after]:hidden
                   transition-opacity duration-200 ${
                     epicMode
                       ? "opacity-0 pointer-events-none"
                       : "opacity-50 hover:opacity-100 active:opacity-100"
                   }`}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="w-10 h-10 drop-shadow"
          >
            <mask id="hp-next-arrow">
              <rect width="40" height="40" fill="white" />
              <polyline
                points="16 12 26 20 16 28"
                stroke="black"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
            <circle
              cx="20"
              cy="20"
              r="20"
              fill="white"
              fillOpacity="0.7"
              mask="url(#hp-next-arrow)"
            />
          </svg>
        </button>
      </Swiper>
    </motion.section>
  );
};
