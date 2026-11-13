
"use client";

import { useEffect, useRef } from "react";
import {
  ArrowDown,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Quote,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Story = {
  id: string;
  eyebrow: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  location: string;
  paragraphs: string[];
  quote?: string;
  highlight: string;
  highlightDescription: string;
  demo?: boolean;
};

const stories: Story[] = [
  {
    id: "sabitri",
    eyebrow: "The Journey to Recovery",
    category: "Health & Rehabilitation",
    title: "Sabitri Robidas",
    subtitle: "From Despair to Hope",
    image:
      "/images/transformation/transformation-sabitri.png",
    location: "Moulvibazar, Bangladesh",
    paragraphs: [
      "At just 17, Sabitri endured a difficult labour, lost her first child and developed obstetric fistula, leading to years of isolation and emotional distress.",
      "After receiving specialist treatment and successful corrective surgery, Sabitri began rebuilding her life. Rehabilitation support, skills training and a sewing machine helped her work towards financial independence.",
    ],
    quote:
      "I never thought I'd regain my life after losing my child and suffering from fistula.",
    highlight: "A new beginning",
    highlightDescription:
      "Health, dignity and independence",
  },
  {
    id: "mother",
    eyebrow: "A Future Full of Possibilities",
    category: "Family & Community Wellbeing",
    title: "A Mother's Hope",
    subtitle: "A Daughter's Future",
    image:
      "/images/transformation/transformation-story-2.png",
    location: "Rural Bangladesh",
    paragraphs: [
      "For a mother in rural Bangladesh, building a safer future for her daughter begins with the confidence to make informed decisions about her family's health and wellbeing.",
      "Through community awareness, practical health knowledge and family support, she discovers how everyday choices can create opportunities for her daughter to grow, learn and thrive.",
    ],
    highlight: "Stronger families",
    highlightDescription:
      "Knowledge, confidence and hope",
    demo: true,
  },
  {
    id: "community",
    eyebrow: "Health Beyond the Clinic",
    category: "Community Health Awareness",
    title: "Care That Reaches",
    subtitle: "Every Home",
    image:
      "/images/transformation/transformation-story-3.png",
    location: "Rural Bangladesh",
    paragraphs: [
      "A simple conversation can become the beginning of meaningful change. A community health worker visits a family to share practical guidance on child wellbeing and injury prevention.",
      "By making health information more accessible, community outreach can build trust, encourage safer practices and support healthier lives across households.",
    ],
    highlight: "Care within reach",
    highlightDescription:
      "Awareness, prevention and trust",
    demo: true,
  },
];

function StoryPanel({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const HighlightIcon =
    index === 0
      ? HeartPulse
      : index === 1
        ? GraduationCap
        : HeartHandshake;

  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-label={`${story.title}: ${story.subtitle}`}
      className="grid h-full w-full overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_25px_80px_-40px_rgba(12,70,145,0.35)] md:grid-cols-[46%_54%] lg:rounded-[34px]"
    >
      {/* STORY IMAGE */}
      <div className="relative min-h-[300px] overflow-hidden bg-[#DCECF9] md:min-h-0">
        <div
          data-story-image
          className="absolute inset-0 scale-[1.04] bg-cover bg-center"
          style={{
            backgroundImage: `url("${BASE_PATH}${story.image}")`,
          }}
          role="img"
          aria-label={`Illustrative image for ${story.title}`}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#052B60]/90 via-[#063E7D]/15 to-[#062E64]/20" />

        <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-xl">
            <Sparkles size={15} />
            {story.category}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-[20%] font-serif text-[clamp(8rem,15vw,15rem)] leading-none text-white/[0.14]"
        >
          {number}
        </div>

        <div className="absolute bottom-9 left-7 right-7 z-10 sm:bottom-11 sm:left-10">
          <div className="flex items-center gap-2 text-[13px] font-medium text-white/90">
            <MapPin size={17} />
            {story.location}
          </div>

          <div className="mt-5 h-[2px] w-14 bg-[#8CCEFF]" />

          <p className="mt-4 max-w-[340px] font-serif text-[clamp(1.6rem,2.5vw,2.6rem)] leading-[1.2] text-white">
            Every life has a story worth telling.
          </p>
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-[95px] w-full"
          viewBox="0 0 600 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100C200 100 350 75 470 40C525 24 570 12 600 0V100Z"
            fill="#77C5FF"
            fillOpacity="0.27"
          />
          <path
            d="M260 100C410 93 530 58 600 28V100Z"
            fill="#0C64D5"
            fillOpacity="0.35"
          />
        </svg>
      </div>

      {/* STORY CONTENT */}
      <div className="relative flex min-h-0 flex-col justify-center overflow-y-auto px-7 py-8 sm:px-10 md:py-9 lg:px-11 xl:px-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[360px] w-[360px] rounded-full bg-[#E9F5FF] blur-[80px]"
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#0C64D5]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0C64D5]">
                Chapter {number}
              </span>
            </div>

            <span className="rounded-full border border-[#D9EAF9] bg-[#F2F8FF] px-3 py-1 text-[11px] font-semibold text-[#6388AC]">
              {number} / 03
            </span>
          </div>

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#538FC7]">
            {story.eyebrow}
          </p>

          <h3 className="font-serif text-[clamp(2.1rem,3.1vw,3.9rem)] leading-[1.07] tracking-[-0.055em] text-[#102B50]">
            {story.title}
            <span className="mt-1 block text-[#0C64D5]">
              {story.subtitle}
            </span>
          </h3>

          <div className="mt-5 space-y-3">
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[14px] leading-[1.7] text-[#536F8D] xl:text-[15px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {story.quote && (
            <blockquote className="mt-5 rounded-r-[14px] border-l-[3px] border-[#0C64D5] bg-[#EDF5FF] px-5 py-3">
              <Quote
                size={18}
                className="mb-1 text-[#0C64D5]/70"
              />
              <p className="text-[13px] italic leading-[1.6] text-[#497CA9] xl:text-[14px]">
                “{story.quote}”
              </p>
            </blockquote>
          )}

          <div className="mt-5 flex items-center gap-4 rounded-[17px] border border-[#DCEAF9] bg-gradient-to-r from-[#F5FAFF] to-[#E0F0FF] px-4 py-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white text-[#0C64D5] shadow-sm">
              <HighlightIcon size={24} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-[14px] font-bold text-[#164875]">
                {story.highlight}
              </p>
              <p className="mt-0.5 text-[12px] text-[#5A7B9C]">
                {story.highlightDescription}
              </p>
            </div>
          </div>

          {story.demo && (
            <p className="mt-3 text-[11px] text-[#8A9BAE]">
              Illustrative demo story, not a documented
              beneficiary case.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Transformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const slides = slidesRef.current.filter(Boolean);

    if (slides.length !== stories.length) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        "[data-story-heading]",
        {
          opacity: 0,
          y: 26,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-story-header]",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Pinned single-panel experience on desktop
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          // Only first story is visible initially
          gsap.set(slides[0], {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(slides.slice(1), {
            autoAlpha: 0,
            y: 35,
          });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top 105px",
              end: () =>
                `+=${Math.round(window.innerHeight * 2.4)}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Initial hold: Story 1 remains visible
          timeline.to({}, { duration: 0.9 });

          // Story 1 -> Story 2
          timeline.to(
            slides[0],
            {
              autoAlpha: 0,
              y: -35,
              duration: 0.65,
              ease: "power2.inOut",
            }
          );

          timeline.fromTo(
            slides[1],
            {
              autoAlpha: 0,
              y: 35,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.inOut",
            },
            "<"
          );

          // Hold Story 2
          timeline.to({}, { duration: 1.1 });

          // Story 2 -> Story 3
          timeline.to(
            slides[1],
            {
              autoAlpha: 0,
              y: -35,
              duration: 0.65,
              ease: "power2.inOut",
            }
          );

          timeline.fromTo(
            slides[2],
            {
              autoAlpha: 0,
              y: 35,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.inOut",
            },
            "<"
          );

          // Final hold before normal scrolling resumes
          timeline.to({}, { duration: 1.1 });
        }
      );

      // Clean up media-specific animations
      return () => {
        media.revert();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformation"
      aria-labelledby="transformation-heading"
      className="relative isolate overflow-hidden bg-[#F3F8FE] pb-20 pt-20 text-[#102945] sm:pt-24 lg:pt-28"
    >
      {/* Premium background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 5% 5%,rgba(184,224,255,0.45),transparent 40%),radial-gradient(ellipse at 95% 80%,rgba(198,230,255,0.45),transparent 45%),linear-gradient(180deg,#F9FCFF 0%,#EFF7FF 55%,#E7F3FF 100%)",
        }}
      />

      {/* Decorative upper wave */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[200px] w-[380px] sm:h-[250px] sm:w-[530px]"
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
        {/* Heading */}
        <header
          data-story-header
          className="mx-auto mb-12 max-w-[1000px] text-center lg:mb-14"
        >
          <div
            data-story-heading
            className="mb-5 flex items-center justify-center gap-4"
          >
            <span className="h-[2px] w-10 bg-[#0C64D5]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#103C7A]">
              Stories of Resilience & Hope
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
            className="mx-auto mt-5 max-w-[750px] text-[15px] leading-[1.75] text-[#5D789A] sm:text-[17px]"
          >
            Explore journeys of resilience,
            empowerment and hope through an
            immersive storytelling experience.
          </p>

          <div
            data-story-heading
            className="mt-7 flex justify-center"
          >
            <span className="inline-flex items-center gap-3 rounded-full border border-[#D4E7F8] bg-white/80 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#4E87BE] shadow-sm">
              <ArrowDown size={17} />
              Scroll to explore stories
            </span>
          </div>
        </header>

        {/* DESKTOP: ONE PINNED PANEL */}
        <div
          ref={pinRef}
          className="relative hidden w-full lg:block"
        >
          <div className="relative mx-auto h-[min(670px,calc(100svh-125px))] min-h-[520px] max-w-[1250px]">
            {stories.map((story, index) => (
              <div
                key={story.id}
                ref={(element) => {
                  if (element) {
                    slidesRef.current[index] = element;
                  }
                }}
                className="absolute inset-0"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility:
                    index === 0 ? "visible" : "hidden",
                  zIndex: index + 1,
                }}
                aria-label={`Story ${index + 1} of ${stories.length}`}
              >
                <StoryPanel
                  story={story}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SMALL SCREENS:
            Keep stories readable without clipping
            or trapping the user's page scroll. */}
        <div className="space-y-8 lg:hidden">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="h-auto"
            >
              <StoryPanel story={story} index={index} />
            </div>
          ))}
        </div>

        {/* Section ending */}
        <div className="mx-auto mt-12 max-w-[580px] text-center lg:mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-[#9FC9EC] to-transparent" />

          <p className="mt-7 font-serif text-[clamp(1.6rem,2.8vw,2.7rem)] italic text-[#2466A3]">
            Small steps. Lasting change.
          </p>
        </div>
      </div>
    </section>
  );
}
