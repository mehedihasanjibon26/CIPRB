
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Eye,
  HeartHandshake,
  Layers3,
  Waves,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const featuredAreas = [
  {
    title: "Injury Prevention",
    description: "Evidence, training and action for safety",
    icon: Layers3,
    color: "#B8E9FF",
    segment: 1,
  },
  {
    title: "Drowning Prevention",
    description: "Life-saving skills and water safety for all",
    icon: Waves,
    color: "#FFF0D4",
    segment: 0,
  },
  {
    title: "Child Development",
    description: "Safe and supportive environments for children",
    icon: HeartHandshake,
    color: "#C5F8DD",
    segment: 2,
  },
  {
    title: "Eye Health",
    description: "Research and solutions for better vision and care",
    icon: Eye,
    color: "#E2D7FF",
    segment: 3,
  },
];

const allFocusAreas = [
  "Drowning Prevention",
  "Maternal and Child Health",
  "Road Safety",
  "Burn",
  "Nutrition",
  "Non-communicable Diseases",
  "Mental Health",
  "Disability-inclusive Care",
  "Tropical Disease",
];

const segments = [
  {
    label: "Children swimming",
    image: "/images/focus/focus-swimming.png",
    clip: "polygon(50% 50%, 50% 0%, 0% 0%, 0% 100%, 50% 100%)",
    position: "45% 50%",
    scale: 1.04,
    flip: false,
  },
  {
    label: "Lifeguard",
    image: "/images/focus/focus-lifeguard.png",
    clip: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 38%)",
    position: "35% 45%",
    scale: 1.25,
    flip: true,
  },
  {
    label: "Child development",
    image: "/images/focus/focus-child-development.png",
    clip: "polygon(50% 50%, 100% 38%, 100% 70%)",
    position: "52% 48%",
    scale: 1.12,
    flip: false,
  },
  {
    label: "Eye examination",
    image: "/images/focus/focus-eye-health.png",
    clip: "polygon(50% 50%, 100% 70%, 100% 100%, 50% 100%)",
    position: "65% 52%",
    scale: 1.16,
    flip: false,
  },
];

export default function Focus() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeCard, setActiveCard] = useState<number | null>(
    null
  );

  const [showAll, setShowAll] = useState(false);

  const selectedSegment =
    activeCard === null
      ? null
      : featuredAreas[activeCard].segment;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-focus-intro]",
        {
          autoAlpha: 0,
          y: 22,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-focus-card]",
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-focus-grid]",
            start: "top 94%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-focus-circle]",
        {
          autoAlpha: 0,
          scale: 0.93,
          rotate: -3,
        },
        {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-focus-circle]",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      aria-labelledby="focus-title"
      className="relative isolate overflow-hidden bg-[#041D38] text-white"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_22%,rgba(23,105,188,0.24),transparent_48%),radial-gradient(ellipse_at_10%_90%,rgba(0,94,184,0.13),transparent_42%)]"
      />

      {/* Upper-left curved blue accents */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[150px] w-[250px] sm:h-[210px] sm:w-[380px]"
        viewBox="0 0 380 210"
        fill="none"
      >
        <path
          d="M0 0H380C240 48 112 123 0 210V0Z"
          fill="#0D65B2"
          fillOpacity="0.7"
        />
        <path
          d="M0 0H270C170 47 70 105 0 160V0Z"
          fill="#9DCDF9"
        />
        <path
          d="M0 0H155C85 37 35 70 0 104V0Z"
          fill="#DDF0FF"
        />
      </svg>

      {/* Main layout */}
      <div
        className="
          relative z-10 mx-auto
          grid w-full max-w-[1700px]
          grid-cols-1 items-center
          gap-12
          px-6 pt-16 pb-24
          sm:px-10 sm:pt-20 sm:pb-28
          lg:min-h-[min(800px,100svh)]
          lg:grid-cols-[1.12fr_0.88fr]
          lg:gap-10
          lg:px-12 lg:py-12
          xl:gap-14 xl:px-16 xl:py-14
          2xl:px-20
        "
      >
        {/* LEFT — content */}
        <div className="relative z-10 min-w-0">
          <div
            data-focus-intro
            className="mb-5 flex items-center gap-4"
          >
            <span className="h-[2px] w-10 bg-[#71C3FF]" />

            <span className="text-[11px] font-bold tracking-[0.2em] text-[#DAEDFF] uppercase">
              Our Focus Areas
            </span>
          </div>

          <h2
            id="focus-title"
            data-focus-intro
            className="
              max-w-[830px]
              font-serif
              text-[clamp(3rem,4.6vw,5.5rem)]
              leading-[1.03]
              font-normal
              tracking-[-0.057em]
              text-white
            "
          >
            Research to Action
            <br />
            for{" "}
            <span className="bg-gradient-to-r from-[#A5D7FF] via-[#48ABFF] to-[#1387F4] bg-clip-text text-transparent">
              Safer Communities.
            </span>
          </h2>

          <p
            data-focus-intro
            className="
              mt-5 max-w-[710px]
              text-[15px] leading-[1.7]
              text-[#D4E3F1]
              sm:text-[16px]
              xl:text-[17px]
            "
          >
            While drowning prevention remains a cornerstone
            of CIPRB&apos;s mission, the organisation has
            strategically expanded its scope to address a
            comprehensive range of critical public health
            priorities.
          </p>

          {/* Premium interactive cards */}
          <div
            data-focus-grid
            className="
              mt-8 grid grid-cols-1 gap-3
              sm:grid-cols-2 sm:gap-4
              xl:mt-9
            "
          >
            {featuredAreas.map((area, index) => {
              const Icon = area.icon;
              const isActive = activeCard === index;

              return (
                <button
                  key={area.title}
                  type="button"
                  data-focus-card
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  onFocus={() => setActiveCard(index)}
                  onBlur={() => setActiveCard(null)}
                  onClick={() =>
                    setActiveCard(
                      isActive ? null : index
                    )
                  }
                  className={`
                    group relative flex
                    min-h-[112px]
                    items-center gap-3.5
                    overflow-hidden rounded-[21px]
                    border px-4 py-4 text-left
                    backdrop-blur-md
                    transition-[background-color,border-color,box-shadow,transform]
                    duration-400
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#79C8FF]
                    motion-reduce:transition-none
                    xl:min-h-[124px]
                    xl:gap-4 xl:px-5
                    ${
                      isActive
                        ? "border-[#75C6FF]/75 bg-[#165080]/75 shadow-[0_0_28px_rgba(37,150,255,0.18)]"
                        : "border-[#4779A8]/55 bg-[#0D3358]/65 hover:-translate-y-1 hover:border-[#71BFF8]/75 hover:bg-[#154675]/80"
                    }
                  `}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />

                  <span
                    className="
                      flex h-[62px] w-[62px]
                      shrink-0 items-center justify-center
                      rounded-[17px] text-[#0B4B83]
                      transition-transform duration-300
                      group-hover:scale-105
                      xl:h-[70px] xl:w-[70px]
                    "
                    style={{
                      backgroundColor: area.color,
                    }}
                  >
                    <Icon
                      size={31}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[15px] leading-[1.3] font-bold tracking-[-0.03em] xl:text-[18px]">
                      {area.title}
                    </span>

                    <span className="mt-1.5 block text-[12px] leading-[1.45] text-[#C9DDEF] xl:text-[13px]">
                      {area.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean CTA controls */}
          <div
            data-focus-intro
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              aria-controls="focus-all-areas"
              className="
                group inline-flex min-h-[52px]
                items-center gap-4 rounded-full
                border border-[#A6D4FA]/75
                bg-white/[0.05]
                py-1.5 pr-1.5 pl-5
                text-[12px] font-semibold
                transition-all duration-300
                hover:border-white hover:bg-white/10
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#79C8FF]
              "
            >
              {showAll
                ? "Hide Focus Areas"
                : "Explore All 9 Focus Areas"}

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0C4DA2]">
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>

            <Link
              href="#"
              className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#9ED7FF] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#79C8FF]"
            >
              Explore Our Work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* All original 9 focus areas */}
          {showAll && (
            <div
              id="focus-all-areas"
              className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {allFocusAreas.map((area, index) => (
                <div
                  key={area}
                  className="rounded-xl border border-white/10 bg-white/[0.07] px-3 py-3 text-[12px] leading-[1.4] text-[#E8F3FF]"
                >
                  <span className="mr-2 font-semibold text-[#6BBEFF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {area}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — circular photo collage */}
        <div
          data-focus-circle
          className="
            relative mx-auto
            flex w-full max-w-[590px]
            items-center justify-center
            px-2 py-5
            sm:px-5
            lg:max-w-[610px]
            lg:px-0
          "
        >
          <div
            className="
              relative aspect-square
              w-full max-w-[560px]
              xl:max-w-[610px]
            "
          >
            {/* Orbit rings */}
            <div
              aria-hidden="true"
              className="absolute -inset-[4%] rounded-full border border-[#198DE9]/25"
            />

            <div
              aria-hidden="true"
              className="absolute -inset-[2%] rounded-full border border-[#4FB7FF]/55"
            />

            <div
              aria-hidden="true"
              className="absolute top-[3%] left-[29%] z-20 h-2.5 w-2.5 rounded-full bg-[#91DBFF] shadow-[0_0_16px_#329AFF]"
            />

            {/* Circular image construction */}
            <div
              className="
                absolute inset-0 overflow-hidden
                rounded-full border-[3px]
                border-white/90
                bg-[#0A335A]
                shadow-[0_22px_75px_rgba(0,0,0,0.24),0_0_38px_rgba(27,137,242,0.15)]
              "
            >
              {segments.map((segment, index) => {
                const dimmed =
                  selectedSegment !== null &&
                  selectedSegment !== index;

                return (
                  <div
                    key={segment.image}
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: segment.clip,
                    }}
                  >
                    <div
                      role="img"
                      aria-label={segment.label}
                      className={`
                        absolute inset-0
                        bg-cover bg-no-repeat
                        transition-[filter,transform]
                        duration-700
                        motion-reduce:transition-none
                        ${
                          dimmed
                            ? "brightness-[0.55] saturate-[0.75]"
                            : "brightness-100 saturate-100"
                        }
                      `}
                      style={{
                        backgroundImage: `url("${BASE_PATH}${segment.image}")`,
                        backgroundPosition: segment.position,
                        transform: `scale(${segment.scale}) ${
                          segment.flip ? "scaleX(-1)" : ""
                        }`,
                      }}
                    />
                  </div>
                );
              })}

              {/* Bright image-segment dividers */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M50 50 L50 0 M50 50 L100 38 M50 50 L100 70 M50 50 L50 100"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Central CIPRB icon medallion */}
            <div
              className="
                absolute top-1/2 left-1/2 z-30
                flex h-[23%] w-[23%]
                -translate-x-1/2 -translate-y-1/2
                items-center justify-center
                overflow-hidden rounded-full
                border-[4px] border-[#2588DF]
                bg-white
                shadow-[0_0_0_8px_rgba(8,90,175,0.24),0_10px_30px_rgba(0,0,0,0.28)]
              "
              role="img"
              aria-label="CIPRB emblem"
            >
              <div
                className="h-[78%] w-[78%] bg-no-repeat"
                style={{
                  backgroundImage: `url("${BASE_PATH}/images/ciprb-logo.png")`,
                  backgroundSize: "310% auto",
                  backgroundPosition: "2% center",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom flowing blue waves */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[85px] w-full sm:h-[115px]"
        viewBox="0 0 1600 150"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 132 C330 85 570 150 810 118 C1110 80 1350 10 1600 42 V150 H0Z"
          fill="#0C4DA2"
          fillOpacity="0.25"
        />

        <path
          d="M0 147 C450 133 665 153 890 127 C1180 95 1425 36 1600 71 V150 H0Z"
          fill="#1480D5"
          fillOpacity="0.31"
        />

        <path
          d="M0 150 C550 146 770 157 1030 127 C1270 100 1470 74 1600 94 V150 H0Z"
          fill="#44A7EF"
          fillOpacity="0.3"
        />

        <path
          d="M810 118 C1110 80 1350 10 1600 42"
          stroke="#6BC5FF"
          strokeWidth="1.3"
          opacity="0.55"
        />
      </svg>
    </section>
  );
}
