
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
    color: "blue",
  },
  {
    title: "Implementation",
    description: "Turn evidence into action",
    icon: Layers3,
    color: "blue",
  },
  {
    title: "Impact",
    description: "Safer, healthier communities",
    icon: Leaf,
    color: "teal",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left side: photo composition
      const photoTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-about-photo-wrap]",
          start: "top 85%",
          once: true,
        },
      });

      photoTimeline
        .from("[data-about-photo-wrap]", {
          opacity: 0,
          x: -65,
          duration: 1.05,
          ease: "power3.out",
        })
        .from(
          "[data-about-photo]",
          {
            scale: 1.12,
            duration: 1.65,
            ease: "power2.out",
          },
          0
        )
        .from(
          "[data-about-decor]",
          {
            opacity: 0,
            scale: 0.8,
            duration: 1.15,
            ease: "back.out(1.3)",
          },
          0.15
        )
        .from(
          "[data-about-badge]",
          {
            opacity: 0,
            y: 35,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          0.55
        );

      // Right side: introductory content, then
      // Research -> Implementation -> Impact
      // -> Vision background -> Vision text -> CTA
      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-about-content]",
          start: "top 78%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      contentTimeline
        .from("[data-about-eyebrow]", {
          opacity: 0,
          y: 18,
          duration: 0.55,
        })
        .from(
          "[data-about-heading]",
          {
            opacity: 0,
            y: 38,
            duration: 0.9,
          },
          "-=0.25"
        )
        .from(
          "[data-about-description]",
          {
            opacity: 0,
            y: 22,
            duration: 0.7,
          },
          "-=0.35"
        )
        // Each card enters independently from right
        .from("[data-about-card]", {
          opacity: 0,
          x: 105,
          y: 12,
          scale: 0.94,
          duration: 0.72,
          stagger: 0.27,
          clearProps: "transform,opacity",
        })
        // Vision background appears alone first
        .from("[data-about-vision]", {
          opacity: 0,
          y: 22,
          scaleY: 0.82,
          transformOrigin: "center top",
          duration: 0.75,
          clearProps: "transform,opacity",
        })
        // Then icon
        .from("[data-about-vision-icon]", {
          opacity: 0,
          scale: 0.65,
          rotation: -25,
          duration: 0.45,
          ease: "back.out(1.5)",
        })
        // Then heading
        .from("[data-about-vision-heading]", {
          opacity: 0,
          y: 12,
          duration: 0.4,
        })
        // Then vision statement
        .from("[data-about-vision-text]", {
          opacity: 0,
          y: 14,
          duration: 0.65,
        })
        // Last: CTA button
        .from("[data-about-cta]", {
          opacity: 0,
          y: 35,
          scale: 0.94,
          duration: 0.75,
          ease: "back.out(1.25)",
          clearProps: "transform,opacity",
        });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[#F8FBFF] py-20 text-[#0C2542] sm:py-24 lg:py-28"
    >
      {/* Premium background gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at 4% 6%,rgba(203,227,255,0.66),transparent 38%),radial-gradient(ellipse at 95% 45%,rgba(216,234,255,0.60),transparent 45%),linear-gradient(135deg,#F5FAFF 0%,#FFFFFF 45%,#F1F7FF 100%)",
        }}
      />

      {/* Top-right atmospheric curves */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-12 -z-10 h-[320px] w-[450px] opacity-60"
        viewBox="0 0 450 320"
        fill="none"
      >
        <path
          d="M130 -55C210 45 320 30 465 205"
          stroke="#B9DDFF"
          strokeWidth="90"
          strokeLinecap="round"
          opacity="0.42"
        />
        <path
          d="M280 -75C305 40 390 70 485 115"
          stroke="#DDEEFF"
          strokeWidth="50"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>

      {/* Soft layered bottom waves */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[150px] w-full sm:h-[210px] lg:h-[250px]"
        viewBox="0 0 1600 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0 175C240 105 420 270 700 236C1000 200 1180 75 1600 145V250H0Z"
          fill="#E3F1FF"
          opacity="0.75"
        />
        <path
          d="M0 215C300 155 475 275 770 245C1090 210 1310 110 1600 170V250H0Z"
          fill="#BEDDFF"
          opacity="0.50"
        />
      </svg>

      <div className="relative mx-auto max-w-[1640px] px-6 sm:px-10 lg:px-14 2xl:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-[0.84fr_1.16fr] lg:gap-14 xl:gap-20">
          {/* LEFT: Photo composition */}
          <div
            data-about-photo-wrap
            className="relative mx-auto w-full max-w-[600px] lg:mx-0"
          >
            {/* Decorative blue shapes */}
            <div
              data-about-decor
              aria-hidden="true"
              className="pointer-events-none absolute -left-8 top-[8%] h-[53%] w-[72%] rounded-[45%] bg-gradient-to-br from-[#5FAAF5] via-[#1E79D6] to-[#0C4DA2] opacity-90 blur-[0.5px] sm:-left-12"
            />

            <div
              data-about-decor
              aria-hidden="true"
              className="pointer-events-none absolute -left-9 bottom-[5%] h-[55%] w-[45%] rounded-[45px] bg-gradient-to-b from-[#0C64C5] to-[#063D94] sm:-left-12"
            />

            {/* Decorative fine curved line */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 -bottom-5 z-[2] h-[82%] w-[125%] overflow-visible"
              viewBox="0 0 650 650"
              fill="none"
            >
              <path
                d="M190 20C45 120 0 380 92 520C157 620 345 660 535 540"
                stroke="white"
                strokeWidth="3"
                opacity="0.75"
              />
            </svg>

            {/* Main photo */}
            <div className="relative ml-4 aspect-[4/4.5] overflow-hidden rounded-[34px] border-[3px] border-white/80 bg-[#DDEAF6] shadow-[0_35px_75px_-35px_rgba(13,73,151,0.4)] sm:ml-5 sm:rounded-[42px] lg:aspect-[4/4.8]">
              <div
                data-about-photo
                role="img"
                aria-label="Illustrative photograph of a CIPRB community health worker speaking with a family in Bangladesh"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${BASE_PATH}/images/about/ciprb-about-photo.jpg")`,
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082E5B]/25 via-transparent to-white/5" />
            </div>

            {/* Established year badge */}
            <div
              data-about-badge
              className="absolute -bottom-7 left-7 z-10 flex items-center gap-5 rounded-[24px] border-[3px] border-white/90 bg-gradient-to-br from-[#257CDA] via-[#0F5CBA] to-[#0C4DA2] px-6 py-5 text-white shadow-[0_20px_45px_-15px_rgba(12,77,162,0.5)] sm:left-12 sm:gap-6 sm:px-8 sm:py-6"
            >
              <span className="text-[clamp(2.5rem,4vw,3.7rem)] leading-none font-bold tracking-[-0.065em]">
                2005
              </span>

              <span className="h-11 w-px bg-white/50" />

              <span className="text-[12px] leading-[1.5] font-medium sm:text-[13px]">
                Established
                <br />
                in Bangladesh
              </span>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-[2px] h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div data-about-content className="relative pt-7 lg:pt-0">
            {/* Eyebrow */}
            <div
              data-about-eyebrow
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-[2px] w-12 bg-[#0C4DA2]" />

              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0C4DA2] sm:text-[13px]">
                About CIPRB
              </span>
            </div>

            {/* Headline */}
            <h2
              id="about-title"
              data-about-heading
              className="font-serif text-[clamp(3.7rem,6vw,6.8rem)] font-normal leading-[1.04] tracking-[-0.065em] text-[#0C2542]"
            >
              Who We{" "}
              <span className="relative inline-block text-[#0C57B7]">
                Are.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-1/4 h-[5px] w-[75%] rounded-full bg-gradient-to-r from-[#CBE4FF] via-[#69AEF4] to-transparent opacity-80"
                />
              </span>
            </h2>

            {/* Description */}
            <p
              data-about-description
              className="mt-8 max-w-[850px] text-[16px] leading-[1.8] text-[#385676] sm:text-[18px] xl:text-[19px]"
            >
              Centre for Injury Prevention and Research,
              Bangladesh (CIPRB) is a leading public health
              research and implementation organisation
              dedicated to saving lives and improving
              wellbeing.
            </p>

            {/* Pillar cards */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    data-about-card
                    className="group/card relative min-h-[185px] overflow-hidden rounded-[23px] border border-[#D5E7FA] bg-white/75 px-5 py-5 shadow-[0_14px_32px_-22px_rgba(12,77,162,0.32)] backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-300 hover:border-[#9BCBF8] hover:bg-white hover:shadow-[0_22px_42px_-20px_rgba(12,77,162,0.32)] sm:min-h-[190px]"
                  >
                    {/* Hover overlay */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EDF7FF]/0 via-[#E9F5FF]/0 to-[#A9D6FF]/0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-50"
                    />

                    {/* Water-style decorative card bottom */}
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-0 h-[48px] w-full opacity-75"
                      viewBox="0 0 300 55"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 54C80 46 145 60 220 38C250 30 272 34 300 20V55H0Z"
                        fill="#B8DBFF"
                        opacity="0.55"
                      />
                      <path
                        d="M130 55C210 38 246 56 300 32V55H130Z"
                        fill="#78B8FA"
                        opacity="0.35"
                      />
                    </svg>

                    <div className="relative z-10">
                      <div
                        className={`mb-4 flex h-[57px] w-[57px] items-center justify-center rounded-[15px] ${
                          pillar.color === "teal"
                            ? "bg-[#DDF6F6] text-[#08A99B]"
                            : "bg-[#E0EEFF] text-[#0C64D5]"
                        }`}
                      >
                        <Icon size={29} strokeWidth={1.9} />
                      </div>

                      <h3 className="text-[18px] font-bold tracking-[-0.035em] text-[#0C2542] sm:text-[17px] xl:text-[19px]">
                        {pillar.title}
                      </h3>

                      <p className="mt-1 text-[13px] leading-[1.55] text-[#537291] xl:text-[14px]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Our Vision background and text reveal independently */}
            <div
              data-about-vision
              className="relative mt-9 overflow-hidden rounded-[24px] border border-white bg-gradient-to-r from-white/90 via-[#F2F8FF] to-[#D9EAFF] px-6 py-7 shadow-[0_15px_36px_-25px_rgba(10,73,150,0.35)] backdrop-blur-xl sm:px-8"
            >
              {/* Decorative interior wave */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 h-full w-[55%] opacity-55"
                viewBox="0 0 450 160"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 150C130 115 260 122 450 60V160H0Z"
                  fill="#C2DEFF"
                />
                <path
                  d="M120 160C230 123 340 152 450 100V160H120Z"
                  fill="#9DCBFA"
                  opacity="0.55"
                />
              </svg>

              <div className="relative z-10 flex items-center gap-5 sm:gap-6">
                <div
                  data-about-vision-icon
                  className="flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-[18px] bg-white/65 text-[#0C64D5]"
                >
                  <Target size={37} strokeWidth={1.8} />
                </div>

                <span className="h-[60px] w-px shrink-0 bg-[#AFCFF2]" />

                <div>
                  <p
                    data-about-vision-heading
                    className="text-[16px] font-bold text-[#0C64D5] sm:text-[18px]"
                  >
                    Our Vision
                  </p>

                  <p
                    data-about-vision-text
                    className="mt-1 text-[15px] font-semibold leading-[1.55] tracking-[-0.025em] text-[#102945] sm:text-[17px]"
                  >
                    Healthy and dignified life for all in a
                    safe and productive environment.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA: revealed last */}
            <div data-about-cta className="mt-9">
              <Link
                href="#"
                className="group inline-flex min-h-[60px] items-center gap-8 rounded-full bg-gradient-to-r from-[#0C4DA2] to-[#0963D2] py-1.5 pl-7 pr-1.5 text-[14px] font-semibold text-white shadow-[0_14px_32px_-14px_rgba(12,77,162,0.45)] transition-[box-shadow,background-color] duration-300 hover:shadow-[0_20px_38px_-13px_rgba(12,77,162,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C4DA2]"
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
