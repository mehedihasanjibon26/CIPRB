
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Megaphone,
  Star,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type UpdateItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  image: string;
  href: string;
  type: "story" | "blog" | "event";
};

const updates: UpdateItem[] = [
  {
    id: "story",
    category: "Story of the Month",
    title:
      "Fistula Survivor Ripta Begum receives Sewing Machine from the Director (Health)",
    description:
      "A story of resilience, recovery and rehabilitation support creating renewed opportunities.",
    date: "18 Jun 2025",
    image: "/images/updates/updates-story-01.jpg",
    href:
      "https://www.ciprb.org/spotlight/fistula-survivor-ripta-begum-receives-sewing-machine-from-the-director-health-of-sylhet-division-as-rehabilitation-support",
    type: "story",
  },
  {
    id: "blog",
    category: "Blogs of CIPRB",
    title: "পানিতে ডুবে শিশু মৃত্যু প্রতিরোধে নারী",
    description:
      "Community perspectives on women's roles in preventing childhood drowning and improving safety.",
    date: "12 Oct 2023",
    image: "/images/updates/updates-blog-01.jpg",
    href:
      "https://www.ciprb.org/blog/women-s-participation-in-preventing-child-drowning",
    type: "blog",
  },
  {
    id: "event",
    category: "News & Events",
    title:
      "Seminar on World Drowning Prevention Day (WDPD) 2025",
    description:
      "CIPRB brings together experts and stakeholders to strengthen collaboration for drowning prevention in Bangladesh.",
    date: "25 Jul 2025",
    image: "/images/updates/updates-event-01.jpg",
    href:
      "https://www.ciprb.org/event/seminar-on-world-drowning-prevention-day-wdpd-2025",
    type: "event",
  },
];

// Each half of the carousel contains 9 cards,
// so it stays wider than the screen at desktop sizes.
// The second half is an identical copy.
const repeatedUpdates = Array.from(
  { length: 3 },
  (_, repeatIndex) =>
    updates.map((item) => ({
      ...item,
      repeatIndex,
    }))
).flat();

type CardProps = {
  item: UpdateItem;
  instanceId: string;
  highlighted: boolean;
  selected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
};

function UpdateCard({
  item,
  instanceId,
  highlighted,
  selected,
  onHover,
  onSelect,
}: CardProps) {
  const CategoryIcon =
    item.type === "story"
      ? Star
      : item.type === "blog"
        ? BookOpen
        : Megaphone;

  return (
    <article
      onMouseEnter={() => onHover(instanceId)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(instanceId)}
      className={`group relative flex h-[525px] w-[min(86vw,390px)] shrink-0 cursor-pointer flex-col overflow-hidden rounded-[23px] border shadow-[0_13px_35px_-24px_rgba(12,77,162,0.28)] transition-[background-color,border-color,box-shadow] duration-500 sm:w-[400px] ${
        highlighted
          ? "border-[#0C64D5] bg-[#0D548F] shadow-[0_20px_45px_-20px_rgba(12,77,162,0.38)]"
          : "border-[#E1EBF7] bg-white hover:border-[#B5D7FF]"
      }`}
    >
      {/* Image */}
      <div className="relative h-[200px] shrink-0 overflow-hidden">
        <div
          role="img"
          aria-label={item.category}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.045] motion-reduce:transform-none"
          style={{
            backgroundImage: `url("${BASE_PATH}${item.image}")`,
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent" />

        <span
          className={`pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold text-white uppercase shadow-md ${
            item.type === "story"
              ? "bg-[#7652D9]"
              : "bg-[#0C64D5]"
          }`}
        >
          <CategoryIcon size={13} />
          {item.category}
        </span>

        {/* Select this physical card only */}
        <button
          type="button"
          aria-label={`Highlight ${item.category} card`}
          aria-pressed={selected}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(instanceId);
          }}
          onFocus={() => onHover(instanceId)}
          onBlur={() => onHover(null)}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-4 focus-visible:outline-offset-[-5px] focus-visible:outline-[#69BFFF]"
        />

        {/* Curved image edge */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[55px] w-full"
          viewBox="0 0 400 55"
          preserveAspectRatio="none"
        >
          <path
            d="M0 35 C95 55 180 55 275 37 C326 27 365 14 400 9 V55 H0Z"
            fill={highlighted ? "#0D548F" : "#FFFFFF"}
            className="transition-[fill] duration-500"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative flex min-h-0 flex-1 flex-col px-6 pt-3 pb-6 sm:px-7">
        <div
          className={`mb-3 flex items-center gap-2 text-[11px] transition-colors duration-500 ${
            highlighted
              ? "text-[#C2E6FF]"
              : "text-[#6887AE]"
          }`}
        >
          <CalendarDays size={14} />
          {item.date}
        </div>

        <h3
          className={`font-serif text-[clamp(1.4rem,1.9vw,1.8rem)] leading-[1.15] font-semibold tracking-[-0.035em] transition-colors duration-500 ${
            highlighted ? "text-white" : "text-[#102945]"
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`mt-3 text-[12px] leading-[1.6] transition-colors duration-500 sm:text-[13px] ${
            highlighted
              ? "text-white/85"
              : "text-[#6785AB]"
          }`}
        >
          {item.description}
        </p>

        {/* Read More always at bottom */}
        <div className="relative z-20 mt-auto pt-4">
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onFocus={() => onHover(instanceId)}
            onBlur={() => onHover(null)}
            onClick={(event) => event.stopPropagation()}
            className={`group/link inline-flex min-h-[40px] items-center gap-3 rounded-full text-[12px] font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 ${
              highlighted
                ? "bg-white py-1 pr-1 pl-4 text-[#0C4DA2] hover:bg-[#E8F4FF] focus-visible:outline-white"
                : "text-[#0C64D5] hover:text-[#083F8D] focus-visible:outline-[#0C64D5]"
            }`}
          >
            Read More

            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/link:translate-x-1 ${
                highlighted
                  ? "border border-[#D2E6FF] bg-[#F6FAFF] text-[#0C64D5]"
                  : "bg-[#0C64D5] text-white"
              }`}
            >
              <ArrowUpRight size={17} />
            </span>
          </Link>
        </div>

        {highlighted && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-[80px] w-[240px]"
            viewBox="0 0 240 80"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80C85 62 135 25 240 18V80H0Z"
              fill="#087FCD"
              fillOpacity="0.7"
            />
            <path
              d="M65 80C130 55 184 40 240 43V80H65Z"
              fill="#27AEF3"
              fillOpacity="0.42"
            />
          </svg>
        )}
      </div>
    </article>
  );
}

export default function Updates() {
  const [hoveredCard, setHoveredCard] =
    useState<string | null>(null);

  const [selectedCard, setSelectedCard] =
    useState<string | null>(null);

  const highlightedCard = hoveredCard ?? selectedCard;

  return (
    <section
      id="updates"
      aria-labelledby="updates-heading"
      className="relative isolate overflow-hidden bg-[#F3F8FF] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.95),transparent_72%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[370px] -right-[320px] -z-10 h-[700px] w-[700px] rounded-full border-[70px] border-[#DFEDFF]/70"
      />

      {/* Existing heading */}
      <header className="relative z-10 mx-auto mb-11 max-w-[1050px] px-5 text-center sm:mb-12">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-9 bg-[#0C64D5]" />

          <span className="text-[10px] font-bold tracking-[0.18em] text-[#0C4DA2] uppercase">
            Latest Updates & Stories
          </span>

          <span className="h-px w-9 bg-[#0C64D5]" />
        </div>

        <h2
          id="updates-heading"
          className="font-serif text-[clamp(2.8rem,5.4vw,5.7rem)] leading-[1.05] tracking-[-0.065em] text-[#10264F]"
        >
          Stories, News{" "}
          <span className="text-[#0C64D5]">
            & Insights
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-[735px] text-[15px] leading-[1.75] text-[#607FA7] sm:text-[16px]">
          Stay informed with our latest news, events and
          stories from the field. Discover how we are
          making a difference in communities across
          Bangladesh.
        </p>
      </header>

      {/* Gapless, infinite right-to-left carousel */}
      <div
        className="updates-marquee-viewport relative w-full overflow-hidden py-3"
        aria-label="Latest CIPRB stories and updates"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-5 bg-gradient-to-r from-[#F3F8FF] to-transparent sm:w-14 lg:w-24"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-5 bg-gradient-to-l from-[#F3F8FF] to-transparent sm:w-14 lg:w-24"
        />

        <div className="updates-marquee-track">
          {/* Two identical, wide groups */}
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="updates-marquee-set"
            >
              {repeatedUpdates.map((item) => {
                const instanceId =
                  `${copyIndex}-${item.repeatIndex}-${item.id}`;

                return (
                  <UpdateCard
                    key={instanceId}
                    item={item}
                    instanceId={instanceId}
                    highlighted={
                      highlightedCard === instanceId
                    }
                    selected={
                      selectedCard === instanceId
                    }
                    onHover={setHoveredCard}
                    onSelect={setSelectedCard}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-9 flex justify-center">
        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[53px] items-center gap-5 rounded-full border border-[#0C64D5] bg-white py-1.5 pr-1.5 pl-6 text-[12px] font-semibold text-[#0C4DA2] shadow-[0_10px_25px_-18px_rgba(12,77,162,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAF5FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0C64D5]"
        >
          View All News & Events

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C64D5] text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      <style jsx global>{`
        .updates-marquee-track {
          display: flex;
          width: max-content;
          animation: ciprb-updates-infinite 90s linear infinite;
          will-change: transform;
        }

        .updates-marquee-set {
          display: flex;
          flex: none;
          align-items: stretch;
          gap: 18px;
          padding-right: 18px;
        }

        @keyframes ciprb-updates-infinite {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        /* Movement continues during hover and click. */

        @media (prefers-reduced-motion: reduce) {
          .updates-marquee-viewport {
            overflow-x: auto;
            scrollbar-width: thin;
          }

          .updates-marquee-track {
            animation: none !important;
            transform: none !important;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
