"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

type HeroSlide = {
  category: string;
  title: string;
  description: string;
  image: string;
  position?: string;
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slides: HeroSlide[] = [
  {
    category: "Drowning Prevention",
    title: "SwimSafe Training",
    description:
      "Practical survival swimming skills helping children become safer in and around water.",
    image: "/images/hero/swimsafe-premium.png",
    position: "center center",
  },
  {
    category: "Life-Saving Skills",
    title: "Skills That Save Lives",
    description:
      "Building confidence through practical swimming and water-survival training for children.",
    image: "/images/hero/life-saving-premium.png",
    position: "center center",
  },
  {
    category: "Community Water Safety",
    title: "Safer Communities",
    description:
      "Raising awareness and strengthening drowning prevention for children and families across Bangladesh.",
    image: "/images/hero/water-safety-premium.png",
    position: "center center",
  },
  {
    category: "Community Health Research",
    title: "Research for Safer Lives",
    description:
      "Working with communities to generate evidence that helps improve public health and prevent injuries.",
    image: "/images/hero/community-research-premium.png",
    position: "center center",
  },
];

const SLIDE_DURATION = 6800;

const heroDroplets = [
  { left: "8%", size: 3, delay: -1.4, duration: 4.8, color: "#A9D6FF" },
  { left: "17%", size: 5, delay: -3.2, duration: 5.5, color: "#0C4DA2" },
  { left: "27%", size: 3, delay: -2.1, duration: 4.2, color: "#5CADF0" },
  { left: "36%", size: 4, delay: -4.7, duration: 5.9, color: "#A9D6FF" },
  { left: "45%", size: 2, delay: -0.8, duration: 4.6, color: "#0C4DA2" },
  { left: "54%", size: 5, delay: -3.8, duration: 6.2, color: "#5CADF0" },
  { left: "63%", size: 3, delay: -2.6, duration: 4.9, color: "#A9D6FF" },
  { left: "72%", size: 4, delay: -5.1, duration: 5.7, color: "#0C4DA2" },
  { left: "81%", size: 3, delay: -1.9, duration: 4.4, color: "#5CADF0" },
  { left: "90%", size: 5, delay: -4.3, duration: 6.1, color: "#A9D6FF" },
  { left: "23%", size: 2, delay: -5.8, duration: 5.1, color: "#0C4DA2" },
  { left: "58%", size: 3, delay: -6.6, duration: 4.7, color: "#5CADF0" },
  { left: "75%", size: 2, delay: -3.7, duration: 5.4, color: "#A9D6FF" },
  { left: "95%", size: 3, delay: -0.3, duration: 4.3, color: "#0C4DA2" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const preloadedImages = slides.map((slide) => {
      const image = new window.Image();
      image.decoding = "async";
      image.src = `${BASE_PATH}${slide.image}`;
      return image;
    });

    return () => {
      preloadedImages.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex(
        (previous) => (previous + 1) % slides.length
      );
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;

    const elements =
      contentRef.current.querySelectorAll(
        "[data-hero-reveal]"
      );

    const animation = gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 24,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      }
    );

    return () => {
      animation.kill();
    };
  }, [activeIndex, reducedMotion]);

  return (
    <section
      id="home"
      aria-label="CIPRB featured programmes"
      className="bg-[#F7F9FC] px-3 pt-[104px] pb-4 sm:px-5 lg:px-8"
    >
      <div
        className="
          relative isolate mx-auto
          min-h-[680px] w-full max-w-[1900px]
          overflow-hidden rounded-[28px]
          bg-white
          shadow-[0_22px_75px_-40px_rgba(12,55,110,0.18)]
          sm:rounded-[36px]
          lg:h-[calc(100svh-120px)]
          lg:min-h-[560px]
        "
      >
        {/* Background slideshow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`
                absolute inset-0
                bg-cover bg-no-repeat
                transition-[opacity,transform]
                duration-[1600ms] ease-in-out
                motion-reduce:transition-none
                ${
                  activeIndex === index
                    ? "scale-100 opacity-100"
                    : "scale-[1.04] opacity-0"
                }
              `}
              style={{
                backgroundImage: `url("${BASE_PATH}${slide.image}")`,
                backgroundPosition:
                  slide.position ?? "center center",
              }}
            />
          ))}

          {/* subtle image wash */}
          <div className="absolute inset-0 bg-[#08203A]/[0.04]" />
        </div>

        {/* Delicate rain in the white editorial zone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 left-[3%] z-[2] hidden h-[245px] w-[34%] overflow-hidden lg:block"
        >
          {heroDroplets.map((droplet, index) => (
            <span
              key={`${droplet.left}-${index}`}
              className="hero-droplet absolute top-[-12px] rounded-full"
              style={{
                left: droplet.left,
                width: `${droplet.size}px`,
                height: `${droplet.size * 1.45}px`,
                backgroundColor: droplet.color,
                animationDelay: `${droplet.delay}s`,
                animationDuration: `${droplet.duration}s`,
              }}
            />
          ))}
        </div>

        {/* LEFT WHITE CURVED MASK - Desktop */}
        <svg
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[1]
            hidden h-full w-full lg:block
          "
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="hero-left-fill"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="#FFFFFF" />
              <stop
                offset="100%"
                stopColor="#FFFFFF"
                stopOpacity="0.92"
              />
            </linearGradient>

            <linearGradient
              id="hero-left-soft"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity="0.82"
              />
              <stop
                offset="100%"
                stopColor="#FFFFFF"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d="
              M0 0
              H850
              C770 70 730 150 705 255
              C675 375 635 495 560 590
              C495 672 400 736 260 790
              C168 825 77 847 0 860
              Z
            "
            fill="url(#hero-left-fill)"
          />

          <path
            d="
              M850 0
              C770 70 730 150 705 255
              C675 375 635 495 560 590
              C495 672 400 736 260 790
              C168 825 77 847 0 860
              L0 900
              C183 872 364 814 493 715
              C602 631 679 516 731 367
              C761 279 790 165 842 82
              C866 45 901 16 935 0
              Z
            "
            fill="url(#hero-left-soft)"
          />
        </svg>

        {/* MOBILE WHITE FADE */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 z-[1]
            lg:hidden
          "
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0.9) 43%, #FFFFFF 58%, #FFFFFF 100%)",
          }}
        />

        {/* BOTTOM WHITE FADE TO HIDE IMAGE TEXT */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-0 bottom-0 z-[2]
            hidden h-[200px] lg:block
          "
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.68) 36%, rgba(255,255,255,0.94) 68%, #F7F9FC 100%)",
          }}
        />

        {/* RIGHT/BOTTOM PREMIUM ACCENT SHAPES */}
        <svg
          aria-hidden="true"
          className="
            pointer-events-none absolute right-0 bottom-0 z-[3]
            hidden h-[44%] w-[36%] lg:block
          "
          viewBox="0 0 700 420"
          preserveAspectRatio="none"
        >
          <path
            d="M700 70 C550 96 470 162 386 251 C307 334 238 389 130 420 H700 Z"
            fill="#D9ECFC"
            fillOpacity="0.82"
          />
          <path
            d="M700 142 C572 165 500 222 428 300 C367 365 313 402 238 420 H700 Z"
            fill="#A9D6FF"
            fillOpacity="0.7"
          />
          <path
            d="M700 222 C590 242 526 285 465 347 C423 389 382 408 329 420 H700 Z"
            fill="#5CADF0"
            fillOpacity="0.54"
          />
          <path
            d="M700 296 C617 309 567 340 513 385 C491 403 470 414 446 420 H700 Z"
            fill="#0C4DA2"
            fillOpacity="0.42"
          />
        </svg>

        {/* Hero content */}
        <div
          className="
            relative z-[4]
            flex min-h-[680px]
            flex-col justify-end
            px-7 pt-[292px] pb-12
            sm:px-12 sm:pt-[320px]
            lg:h-full lg:min-h-0
            lg:justify-start
            lg:px-[6%]
            lg:pt-[112px]
            lg:pb-0
            2xl:px-[7%]
            2xl:pt-[118px]
          "
        >
          <div
            key={activeIndex}
            ref={contentRef}
            aria-live="polite"
            aria-atomic="true"
            className="w-full max-w-[720px] lg:w-[48%]"
          >
            <div
              data-hero-reveal
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-[2px] w-11 shrink-0 bg-[#0C4DA2]" />

              <span
                className="
                  text-[11px] font-bold
                  tracking-[0.2em]
                  text-[#0C4DA2] uppercase
                "
              >
                {activeSlide.category}
              </span>
            </div>

            <h1
              data-hero-reveal
              className="
                max-w-[760px]
                font-serif
                text-[clamp(3.35rem,7vw,7.05rem)]
                leading-[0.99]
                font-normal
                tracking-[-0.07em]
                text-[#102945]
                lg:text-[clamp(3.4rem,5.3vw,6.7rem)]
              "
            >
              {activeSlide.title}
              <span className="text-[#0C4DA2]">.</span>
            </h1>

            <p
              data-hero-reveal
              className="
                mt-7 max-w-[520px]
                text-[16px] leading-[1.8]
                text-[#415D79]
                sm:text-[18px]
                lg:mt-8
                xl:text-[19px]
              "
            >
              {activeSlide.description}
            </p>

            <div
              data-hero-reveal
              className="
                mt-9 flex flex-wrap items-center gap-6
                lg:mt-10
              "
            >
              <Link
                href="#about"
                className="
                  group inline-flex min-h-[56px]
                  items-center gap-5
                  rounded-full bg-[#0C4DA2]
                  py-1.5 pr-1.5 pl-6
                  text-[13px] font-semibold text-white
                  shadow-[0_12px_30px_-14px_rgba(12,77,162,0.4)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#083E84]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#0C4DA2]
                  motion-reduce:transform-none
                "
              >
                Discover CIPRB

                <span
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full bg-white
                    text-[#0C4DA2]
                    transition-transform duration-300
                    group-hover:rotate-45
                    motion-reduce:transform-none
                  "
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                  />
                </span>
              </Link>

              <Link
                href="#research"
                className="
                  group inline-flex min-h-12
                  items-center gap-2
                  text-[13px] font-semibold
                  text-[#183C65]
                  transition-colors duration-300
                  hover:text-[#0C4DA2]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#0C4DA2]
                "
              >
                Our Research

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                    motion-reduce:transform-none
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-droplet {
          animation-name: ciprb-hero-rain;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          opacity: 0;
          transform: translate3d(0, -12px, 0) scaleY(0.85);
          will-change: transform, opacity;
        }

        @keyframes ciprb-hero-rain {
          0% {
            opacity: 0;
            transform: translate3d(0, -12px, 0) scaleY(0.85);
          }

          14% {
            opacity: 0.65;
          }

          78% {
            opacity: 0.34;
          }

          100% {
            opacity: 0;
            transform: translate3d(8px, 255px, 0) scaleY(1.15);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-droplet {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
