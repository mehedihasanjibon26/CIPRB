
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Baby,
  CalendarDays,
  Lightbulb,
  MapPin,
  Waves,
  UsersRound,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Innovation = {
  number: string;
  title: string;
  category: string;
  image: string;
  position: string;
  description: string;
  detail: string;
  href: string;
  icon: LucideIcon;
};

const innovations: Innovation[] = [
  {
    number: "01",
    title: "Anchal",
    category: "Child Safety",
    image: "/images/focus/focus-child-development.png",
    position: "center",
    description:
      "Community day-care centres providing safe, nurturing environments for children aged 1–5.",
    detail: "Early Childhood Care",
    href: "https://www.ciprb.org/creches",
    icon: Baby,
  },
  {
    number: "02",
    title: "SwimSafe",
    category: "Drowning Prevention",
    image: "/images/focus/focus-swimming.png",
    position: "center",
    description:
      "Equipping children with essential survival swimming skills to help prevent drowning in Bangladesh.",
    detail: "Water Safety Training",
    href: "https://www.ciprb.org/swimming-skills",
    icon: Waves,
  },
  {
    number: "03",
    title: "Death Mapping",
    category: "Data for Action",
    image: "/images/focus/focus-eye-health.png",
    position: "center",
    description:
      "Using research and data-driven approaches to understand injury-related deaths and support prevention efforts.",
    detail: "Evidence-Led Research",
    href: "https://www.ciprb.org/scientific-publications",
    icon: ScanSearch,
  },
];

type Statistic = {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

const statistics: Statistic[] = [
  {
    value: 3,
    suffix: "+",
    label: "Innovations",
    icon: Lightbulb,
  },
  {
    value: 6,
    suffix: "M+",
    label: "People Reached",
    icon: UsersRound,
  },
  {
    value: 50,
    suffix: "+",
    label: "Districts",
    icon: MapPin,
  },
  {
    value: 18,
    suffix: "+",
    label: "Years of Innovation",
    icon: CalendarDays,
  },
];

export default function Innovations() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  // Count up when the statistics enter the viewport.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const statsElement = statsRef.current;
    if (!statsElement) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      statistics.forEach((stat, index) => {
        const element = counterRefs.current[index];
        if (element) {
          element.textContent = `${stat.value}${stat.suffix}`;
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: statsElement,
          start: "top 88%",
          once: true,
        },
      });

      statistics.forEach((stat, index) => {
        const element = counterRefs.current[index];
        if (!element) return;

        const counter = { value: 0 };

        timeline.to(
          counter,
          {
            value: stat.value,
            duration: 1.9,
            ease: "power2.out",
            onUpdate: () => {
              element.textContent = `${Math.round(
                counter.value
              )}${stat.suffix}`;
            },
            onComplete: () => {
              element.textContent = `${stat.value}${stat.suffix}`;
            },
          },
          0
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="innovations"
      aria-labelledby="innovations-heading"
      className="relative isolate overflow-hidden bg-[#F2F7FF] py-16 sm:py-20 lg:py-24"
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_5%,rgba(213,233,255,0.7),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1550px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <header className="mx-auto mb-9 max-w-[900px] text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-9 bg-[#0C64D5]" />

            <span className="text-[11px] font-bold tracking-[0.2em] text-[#0C4DA2] uppercase">
              Our Innovations
            </span>

            <span className="h-[2px] w-9 bg-[#0C64D5]" />
          </div>

          <h2
            id="innovations-heading"
            className="font-serif text-[clamp(2.8rem,5.2vw,5.5rem)] leading-[1.08] tracking-[-0.06em] text-[#102945]"
          >
            Innovation that{" "}
            <span className="text-[#0C64D5]">
              Saves Lives.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.75] text-[#607B9A] sm:text-[17px]">
            Explore the innovative programmes and
            technologies developed by CIPRB to improve
            public health and save lives across Bangladesh.
          </p>
        </header>

        {/* Live count-up metrics */}
        <div
          ref={statsRef}
          className="mx-auto mb-9 grid max-w-[1120px] grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
        >
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex min-h-[85px] items-center gap-3 rounded-[18px] border border-[#234A7A]/40 bg-[#0C274C] px-4 py-4 shadow-[0_10px_25px_-18px_rgba(4,30,73,0.35)] sm:px-6"
              >
                <Icon
                  size={26}
                  strokeWidth={1.75}
                  className="shrink-0 text-[#56B6FF]"
                />

                <span
                  aria-hidden="true"
                  className="h-10 w-px shrink-0 bg-white/20"
                />

                <div className="min-w-0">
                  <span
                    ref={(element) => {
                      counterRefs.current[index] = element;
                    }}
                    className="block text-[clamp(1.8rem,2.7vw,2.65rem)] leading-none font-bold tracking-[-0.04em] text-[#43B3FF]"
                  >
                    0{stat.suffix}
                  </span>

                  <span className="mt-1.5 block text-[10px] leading-tight font-medium text-white sm:text-[11px]">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive innovation accordion */}
        <div
          aria-label="Explore CIPRB innovations"
          className="flex flex-col gap-3 lg:h-[455px] lg:flex-row lg:gap-4 xl:h-[500px]"
        >
          {innovations.map((innovation, index) => {
            const isActive = activeIndex === index;
            const Icon = innovation.icon;

            return (
              <article
                key={innovation.title}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group relative isolate min-w-0 overflow-hidden rounded-[25px] border border-white/30 bg-[#112B48] shadow-[0_14px_40px_-23px_rgba(7,33,70,0.35)] transition-[flex-grow,border-color,box-shadow] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-full lg:basis-0 ${
                  isActive
                    ? "h-[390px] border-[#B4DAFF] shadow-[0_20px_48px_-22px_rgba(7,52,116,0.4)] sm:h-[420px] lg:grow-[4.8]"
                    : "h-[115px] cursor-pointer lg:grow-[1]"
                }`}
              >
                {/* Background photograph */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-cover transition-transform duration-[900ms] ease-out ${
                    isActive
                      ? "scale-100"
                      : "scale-[1.06] group-hover:scale-100"
                  }`}
                  style={{
                    backgroundImage: `url("${BASE_PATH}${innovation.image}")`,
                    backgroundPosition: innovation.position,
                  }}
                />

                {/* Image shading */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? "bg-gradient-to-r from-[#06172E]/95 via-[#06172E]/78 to-[#06172E]/30"
                      : "bg-gradient-to-t from-[#06172E]/90 via-[#06172E]/25 to-[#06172E]/20"
                  }`}
                />

                {/* Top number */}
                <span className="absolute top-5 left-5 z-10 text-[11px] font-bold tracking-wider text-white lg:top-7 lg:left-7">
                  {innovation.number}
                </span>

                {/* Collapsed clickable state */}
                {!isActive && (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-label={`Expand ${innovation.title}`}
                    className="absolute inset-0 z-20 flex w-full items-end p-5 text-left focus-visible:outline-3 focus-visible:outline-offset-[-5px] focus-visible:outline-[#5CB6FF] lg:p-6"
                  >
                    <div className="w-full min-w-0">
                      <span className="mb-2 inline-flex max-w-full rounded-full border border-white/40 bg-[#0C64D5]/75 px-2.5 py-1 text-[9px] font-bold tracking-wide text-white uppercase backdrop-blur-md">
                        {innovation.category}
                      </span>

                      <h3 className="text-[clamp(1.15rem,1.6vw,1.75rem)] leading-[1.13] font-semibold tracking-[-0.035em] text-white">
                        {innovation.title}
                      </h3>

                      <span className="mt-3 hidden h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white lg:flex">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </button>
                )}

                {/* Expanded full story */}
                {isActive && (
                  <div
                    key={`content-${innovation.number}`}
                    className="innovation-reveal relative z-10 flex h-full min-w-0 flex-col justify-between p-6 sm:p-8 lg:p-9 xl:p-10"
                  >
                    <div className="flex items-center justify-between gap-3 pl-8">
                      <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#83D1FF]/60 bg-[#0B477F]/60 px-3 py-1.5 text-[10px] font-bold tracking-[0.06em] text-white uppercase backdrop-blur-lg">
                        {innovation.category}
                      </span>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[#8FD2FF] backdrop-blur-md">
                        <Icon size={23} strokeWidth={1.7} />
                      </span>
                    </div>

                    <div className="max-w-[530px]">
                      <p className="mb-3 text-[10px] font-bold tracking-[0.18em] text-[#79CEFF] uppercase">
                        {innovation.detail}
                      </p>

                      <h3 className="font-serif text-[clamp(2.8rem,4.7vw,5.4rem)] leading-[1.03] tracking-[-0.06em] text-white">
                        {innovation.title}
                      </h3>

                      <p className="mt-4 max-w-[480px] text-[14px] leading-[1.7] text-white/85 sm:text-[16px]">
                        {innovation.description}
                      </p>

                      <Link
                        href={innovation.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex min-h-[51px] max-w-full items-center gap-4 rounded-full bg-[#0C64D5] py-1.5 pr-1.5 pl-5 text-[12px] font-bold text-white shadow-[0_10px_24px_rgba(0,35,100,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0875EA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[13px]"
                      >
                        Explore Innovation

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0C64D5]">
                          <ArrowUpRight size={17} />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="mt-5 text-center text-[12px] text-[#7894B2] lg:hidden">
          Tap an innovation to explore its story.
        </p>
      </div>

      <style jsx>{`
        .innovation-reveal {
          animation: innovation-content-enter 520ms ease-out both;
        }

        @keyframes innovation-content-enter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .innovation-reveal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
