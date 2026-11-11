
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  Quote,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const chapters = [
  {
    label: "The Journey",
    description:
      "At just 17, Sabitri endured a difficult labour, lost her first child and developed obstetric fistula, leading to years of isolation and emotional distress.",
  },
  {
    label: "A Path to Healing",
    description:
      "After years of suffering, Sabitri received specialist treatment and successful corrective surgery, helping her regain her health and dignity.",
  },
  {
    label: "A New Beginning",
    description:
      "With rehabilitation support, a sewing machine and skills training, Sabitri began earning an income and rebuilding her independence.",
  },
];

const STORY_URL = "https://www.ciprb.org/case-story";

export default function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [chapter, setChapter] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  // Section entrance animation
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-story-heading]",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-story-panel]",
        {
          opacity: 0,
          y: 42,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-story-panel]",
            start: "top 94%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-story-photo]",
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-story-panel]",
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Reveal content when a story chapter changes
  useEffect(() => {
    if (!contentRef.current || reducedMotion) return;

    const elements = contentRef.current.querySelectorAll(
      "[data-chapter-reveal]"
    );

    const animation = gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 14,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.55,
        ease: "power2.out",
        clearProps: "all",
      }
    );

    return () => animation.kill();
  }, [chapter, reducedMotion]);

  const goToChapter = (index: number) => {
    setChapter(
      (index + chapters.length) % chapters.length
    );
  };

  return (
    <section
      ref={sectionRef}
      id="transformation"
      aria-labelledby="transformation-heading"
      className="relative isolate overflow-hidden bg-[#F3F8FE] py-16 text-[#102945] sm:py-20 lg:py-24"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,rgba(255,255,255,0.98),transparent_70%)]"
      />

      {/* Upper decorative wave */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[190px] w-[370px] sm:h-[250px] sm:w-[530px]"
        viewBox="0 0 530 250"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0H350C230 68 110 128 0 220V0Z"
          fill="#DBEEFF"
        />
        <path
          d="M0 0H250C125 50 70 100 0 155V0Z"
          fill="#B9DEFF"
          fillOpacity="0.72"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1550px] px-5 sm:px-9 lg:px-14">
        {/* Centered heading */}
        <header className="mx-auto mb-10 max-w-[1040px] text-center lg:mb-12">
          <div
            data-story-heading
            className="mb-5 flex items-center justify-center gap-4"
          >
            <span className="h-[2px] w-10 bg-[#0C64D5]" />

            <span className="text-[11px] font-bold tracking-[0.18em] text-[#103C7A] uppercase">
              Real-Life Success Stories
            </span>

            <span className="h-[2px] w-10 bg-[#0C64D5]" />
          </div>

          <h2
            id="transformation-heading"
            data-story-heading
            className="font-serif text-[clamp(2.8rem,5.2vw,5.9rem)] leading-[1.05] tracking-[-0.06em] text-[#0D2851]"
          >
            Stories of{" "}
            <span className="text-[#0C64D5]">
              Transformation
            </span>
          </h2>

          <p
            data-story-heading
            className="mx-auto mt-5 max-w-[750px] text-[15px] leading-[1.7] text-[#5D789A] sm:text-[17px]"
          >
            Real people. Real change. Explore inspiring
            journeys of resilience, empowerment and hope
            from the communities we serve.
          </p>
        </header>

        {/* Story presentation */}
        <div className="relative mx-auto max-w-[1250px]">
          {/* Desktop previous arrow */}
          <button
            type="button"
            onClick={() => goToChapter(chapter - 1)}
            aria-label="Previous story chapter"
            className="absolute top-1/2 -left-14 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#DFEBF7] bg-white text-[#4A82BA] shadow-[0_8px_28px_rgba(12,77,162,0.1)] transition-all duration-300 hover:-translate-x-1 hover:bg-[#0C64D5] hover:text-white focus-visible:outline-2 focus-visible:outline-[#0C64D5] xl:flex"
          >
            <ArrowLeft size={20} />
          </button>

          <article
            data-story-panel
            className="grid overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_22px_70px_-38px_rgba(12,77,162,0.28)] md:grid-cols-[0.47fr_0.53fr] lg:min-h-[510px] lg:rounded-[32px]"
          >
            {/* Photograph */}
            <div className="relative min-h-[390px] overflow-hidden bg-[#DAE9F7] sm:min-h-[470px] md:min-h-0">
              <div
                data-story-photo
                role="img"
                aria-label="Illustrative rural Bangladesh portrait accompanying the story of Sabitri Robidas"
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${BASE_PATH}/images/transformation/transformation-sabitri.png")`,
                  backgroundPosition: "center",
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#052958]/95 via-[#063C77]/15 to-transparent" />

              {/* Photo category */}
              <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-[#0C64D5] px-4 py-2 text-[10px] font-bold tracking-[0.07em] text-white uppercase shadow-lg">
                  <HeartHandshake size={16} />
                  Success Story
                </span>
              </div>

              {/* Photo bottom metadata */}
              <div className="absolute right-6 bottom-9 left-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-medium text-white sm:right-9 sm:left-9">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} />
                  Moulvibazar, Bangladesh
                </span>

                <span className="inline-flex items-center gap-2">
                  <HeartHandshake size={18} />
                  Community Health
                </span>
              </div>

              {/* Bottom blue wave */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 h-[80px] w-full"
                viewBox="0 0 550 90"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 90 C185 90 320 82 430 49 C475 36 519 18 550 8 V90Z"
                  fill="#0C64D5"
                  fillOpacity="0.75"
                />

                <path
                  d="M240 90 C385 82 465 61 550 38 V90Z"
                  fill="#59B5FF"
                  fillOpacity="0.75"
                />
              </svg>
            </div>

            {/* Story content */}
            <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12 lg:py-12 xl:px-14">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#0C64D5]" />

                <span className="text-[11px] font-bold tracking-[0.14em] text-[#0C64D5] uppercase">
                  {chapters[chapter].label}
                </span>
              </div>

              <h3 className="max-w-[640px] font-serif text-[clamp(2.2rem,3vw,3.7rem)] leading-[1.1] font-semibold tracking-[-0.055em] text-[#10264C]">
                Sabitri Robidas: From Despair to Hope
              </h3>

              {/* Source-based quote */}
              <blockquote className="relative mt-7 rounded-r-[15px] border-l-[4px] border-[#0C64D5] bg-[#EDF5FF] px-6 py-5">
                <Quote
                  size={20}
                  className="mb-2 text-[#0C64D5]/70"
                />

                <p className="text-[14px] leading-[1.7] italic text-[#497CA9] sm:text-[16px]">
                  “I never thought I&apos;d regain my life
                  after losing my child and suffering from
                  fistula.”
                </p>
              </blockquote>

              <div
                key={chapter}
                ref={contentRef}
                aria-live="polite"
                aria-atomic="true"
                className="mt-6"
              >
                <p
                  data-chapter-reveal
                  className="text-[15px] leading-[1.8] text-[#607A98] sm:text-[16px]"
                >
                  {chapters[chapter].description}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={STORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[52px] items-center gap-5 rounded-full bg-[#0C64D5] py-1.5 pr-1.5 pl-6 text-[13px] font-bold text-white shadow-[0_12px_30px_-16px_rgba(12,77,162,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0A4FA9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C64D5]"
                >
                  Read Full Story

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowUpRight size={19} />
                  </span>
                </Link>
              </div>
            </div>
          </article>

          {/* Desktop next arrow */}
          <button
            type="button"
            onClick={() => goToChapter(chapter + 1)}
            aria-label="Next story chapter"
            className="absolute top-1/2 -right-14 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#DFEBF7] bg-white text-[#4A82BA] shadow-[0_8px_28px_rgba(12,77,162,0.1)] transition-all duration-300 hover:translate-x-1 hover:bg-[#0C64D5] hover:text-white focus-visible:outline-2 focus-visible:outline-[#0C64D5] xl:flex"
          >
            <ArrowRight size={20} />
          </button>

          {/* Pagination and mobile navigation */}
          <div className="mt-7 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goToChapter(chapter - 1)}
              aria-label="Previous chapter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4E6F8] bg-white text-[#0C64D5] xl:hidden"
            >
              <ArrowLeft size={18} />
            </button>

            <div
              role="group"
              aria-label="Story chapter navigation"
              className="flex items-center gap-3"
            >
              {chapters.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={`Show ${item.label}`}
                  aria-pressed={chapter === index}
                  onClick={() => goToChapter(index)}
                  className={`h-[7px] rounded-full transition-all duration-300 ${
                    chapter === index
                      ? "w-10 bg-[#0C64D5]"
                      : "w-8 bg-[#C9DFF3] hover:bg-[#8BBCEB]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goToChapter(chapter + 1)}
              aria-label="Next chapter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4E6F8] bg-white text-[#0C64D5] xl:hidden"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom soft-blue landscape */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[155px] w-full sm:h-[190px]"
        viewBox="0 0 1600 190"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 80 C260 145 530 180 830 165 C1160 148 1390 83 1600 12 V190 H0Z"
          fill="#E3F1FE"
        />

        <path
          d="M0 125 C300 180 600 190 900 174 C1200 162 1420 110 1600 57 V190 H0Z"
          fill="#CAE5FB"
          fillOpacity="0.65"
        />
      </svg>
    </section>
  );
}
