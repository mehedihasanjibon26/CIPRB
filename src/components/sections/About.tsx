
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  UsersRound,
  Layers3,
  Leaf,
  Target,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const pillars = [
  {
    title: "Research",
    description: "Generate evidence",
    icon: UsersRound,
  },
  {
    title: "Implementation",
    description: "Turn evidence into action",
    icon: Layers3,
  },
  {
    title: "Impact",
    description: "Safer, healthier communities",
    icon: Leaf,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-about-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 36,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

      gsap.fromTo(
        "[data-about-photo]",
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-about-photo]",
            start: "top 90%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[#FBFDFF] py-20 text-[#0C2542] sm:py-24 lg:py-28"
    >
      {/* Subtle background shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-[12%] h-[450px] w-[450px] rounded-full bg-[#EAF3FE]/45 blur-[100px]"
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[230px] w-full lg:h-[300px]"
        viewBox="0 0 1600 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160 C210 280 370 250 570 300 H0 Z"
          fill="#E8F3FF"
        />
        <path
          d="M750 300 C1060 260 1180 80 1600 140 V300 Z"
          fill="#EEF6FF"
        />
        <path
          d="M1050 300 C1270 250 1420 185 1600 200 V300 Z"
          fill="#DFEDFC"
          fillOpacity="0.7"
        />
      </svg>

      <div className="relative mx-auto max-w-[1640px] px-6 sm:px-10 lg:px-14 2xl:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-20">
          {/* Left photographic composition */}
          <div
            data-about-reveal
            className="relative mx-auto w-full max-w-[600px] lg:mx-0"
          >
            <div
              aria-hidden="true"
              className="absolute -left-5 top-[13%] bottom-[3%] w-[65%] rounded-[30px] bg-[#0C4DA2] sm:-left-9"
            />

            <div className="relative ml-4 aspect-[4/4.3] overflow-hidden rounded-[28px] bg-[#DDEAF6] sm:ml-5 sm:rounded-[36px] lg:aspect-[4/4.6]">
              <div
                data-about-photo
                role="img"
                aria-label="Illustrative photograph of a community health worker speaking with a family in Bangladesh"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${BASE_PATH}/images/about/ciprb-about-photo.jpg")`,
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071E36]/15 via-transparent to-transparent" />
            </div>

            {/* Floating year badge */}
            <div
              data-about-reveal
              className="absolute -bottom-7 left-5 z-10 flex items-center gap-5 rounded-[22px] border-[3px] border-white bg-[#0C4DA2] px-6 py-5 text-white shadow-[0_18px_40px_-15px_rgba(12,77,162,0.35)] sm:left-9 sm:gap-6 sm:px-8 sm:py-6"
            >
              <span className="text-[clamp(2.4rem,4vw,3.7rem)] leading-none font-semibold tracking-[-0.065em]">
                2005
              </span>

              <span className="h-11 w-px bg-white/40" />

              <span className="text-[12px] leading-[1.5] font-medium sm:text-[13px]">
                Established
                <br />
                in Bangladesh
              </span>
            </div>
          </div>

          {/* Right editorial content */}
          <div className="pt-3 lg:pt-0">
            <div
              data-about-reveal
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-[2px] w-11 bg-[#0C4DA2]" />

              <span className="text-[11px] font-bold tracking-[0.18em] text-[#0C4DA2] uppercase sm:text-[12px]">
                About CIPRB
              </span>
            </div>

            <h2
              id="about-title"
              data-about-reveal
              className="font-serif text-[clamp(3.7rem,6vw,6.8rem)] leading-[1.03] font-normal tracking-[-0.07em] text-[#0C2542]"
            >
              Who We <span className="text-[#0C4DA2]">Are.</span>
            </h2>

            <p
              data-about-reveal
              className="mt-7 max-w-[850px] text-[16px] leading-[1.8] text-[#385676] sm:text-[18px] xl:text-[19px]"
            >
              Centre for Injury Prevention and Research,
              Bangladesh (CIPRB) is a leading public health
              research and implementation organisation
              dedicated to saving lives and improving
              wellbeing.
            </p>

            {/* Three focus pillars */}
            <div
              data-about-reveal
              className="mt-10 grid grid-cols-1 gap-6 border-y border-[#E2EAF4] py-8 sm:grid-cols-3 sm:gap-4"
            >
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className={`flex items-start gap-3 ${
                      index > 0
                        ? "sm:border-l sm:border-[#DCE6F1] sm:pl-4 xl:pl-6"
                        : ""
                    }`}
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.7}
                      className="mt-0.5 shrink-0 text-[#0C64D5]"
                    />

                    <div>
                      <h3 className="text-[15px] font-bold tracking-[-0.03em] text-[#0C2542] xl:text-[17px]">
                        {pillar.title}
                      </h3>

                      <p className="mt-1 text-[12px] leading-[1.5] text-[#627B96] xl:text-[13px]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vision panel */}
            <div
              data-about-reveal
              className="mt-8 flex items-center gap-5 rounded-[19px] bg-[#EAF3FD] px-6 py-6 sm:gap-6 sm:px-8"
            >
              <Target
                size={36}
                strokeWidth={1.6}
                className="shrink-0 text-[#0C4DA2]"
              />

              <span className="h-12 w-px shrink-0 bg-[#B8CFE9]" />

              <div>
                <p className="text-[14px] font-bold text-[#0C64D5] sm:text-[16px]">
                  Our Vision
                </p>

                <p className="mt-1 text-[15px] leading-[1.5] font-semibold tracking-[-0.025em] text-[#102945] sm:text-[17px]">
                  Healthy and dignified life for all in a
                  safe and productive environment.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div data-about-reveal className="mt-9">
              <Link
                href="#"
                className="group inline-flex min-h-[58px] items-center gap-8 rounded-full bg-[#0C4DA2] py-1.5 pr-1.5 pl-7 text-[13px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(12,77,162,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#083E84] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C4DA2] motion-reduce:transform-none"
              >
                Learn More About Us

                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0C4DA2] transition-transform duration-300 group-hover:rotate-45 motion-reduce:transform-none">
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
