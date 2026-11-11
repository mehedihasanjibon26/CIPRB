
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const partners = [
  {
    name: "Government of Bangladesh",
    logo: "government-bangladesh.jpg",
  },
  {
    name: "World Health Organization",
    logo: "who.jpg",
  },
  {
    name: "RTI International",
    logo: "rti.jpg",
  },
  {
    name: "BSMMU",
    logo: "bsmmu.jpg",
  },
  {
    name: "Directorate General of Family Planning",
    logo: "dgfp.jpg",
  },
  {
    name: "Directorate General of Health Services",
    logo: "dghs.jpg",
  },
  {
    name: "Johns Hopkins University",
    logo: "johns-hopkins.jpg",
  },
  {
    name: "Karolinska Institutet",
    logo: "karolinska.jpg",
  },
  {
    name: "icddr,b",
    logo: "icddrb.jpg",
  },
  {
    name: "Liverpool School of Tropical Medicine",
    logo: "lstm.jpg",
  },
];

type Partner = (typeof partners)[number];

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="partner-logo-card group relative flex h-[120px] w-[195px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-[#E3ECF5] bg-white px-5 py-5 shadow-[0_8px_28px_-18px_rgba(12,77,162,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9EC8F2] hover:shadow-[0_16px_32px_-14px_rgba(12,77,162,0.22)] sm:h-[140px] sm:w-[225px] lg:h-[150px] lg:w-[245px]">
      {/* Original colorful image */}
      <img
        src={`${BASE_PATH}/images/partners/${partner.logo}`}
        alt={`${partner.name} logo`}
        loading="lazy"
        draggable={false}
        className="max-h-[95px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover highlight */}
      <span className="absolute top-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-[#0C4DA2] transition-all duration-300 group-hover:w-14" />
    </div>
  );
}

function LogoRow({
  direction,
  speed = 50,
}: {
  direction: "left" | "right";
  speed?: number;
}) {
  return (
    <div className="partner-marquee-viewport relative w-full overflow-hidden py-3">
      <div
        className={`partner-marquee-track ${
          direction === "right"
            ? "partner-marquee-right"
            : "partner-marquee-left"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* First copy: all 10 partner logos */}
        <div className="partner-marquee-set">
          {partners.map((partner) => (
            <LogoCard
              key={`first-${direction}-${partner.logo}`}
              partner={partner}
            />
          ))}
        </div>

        {/* Second copy: seamless continuous loop */}
        <div
          className="partner-marquee-set"
          aria-hidden="true"
        >
          {partners.map((partner) => (
            <LogoCard
              key={`second-${direction}-${partner.logo}`}
              partner={partner}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motionQuery.matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-partner-heading]",
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      aria-labelledby="partners-title"
      className="relative isolate overflow-hidden bg-[#FAFCFF] py-20 sm:py-24 lg:py-28"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_15%,rgba(218,236,255,0.65),transparent_65%)]" />

      {/* Decorative top curve */}
      <div className="pointer-events-none absolute -top-[330px] -right-[300px] -z-10 h-[650px] w-[650px] rounded-full border-[80px] border-[#E4F1FF]/60" />

      {/* Center heading */}
      <div className="relative z-10 mx-auto max-w-[1000px] px-5 text-center">
        <div
          data-partner-heading
          className="mb-5 flex items-center justify-center gap-4"
        >
          <span className="h-[2px] w-10 bg-[#0C4DA2]" />

          <span className="text-[11px] font-bold tracking-[0.2em] text-[#0C4DA2] uppercase">
            Our Partners
          </span>

          <span className="h-[2px] w-10 bg-[#0C4DA2]" />
        </div>

        <h2
          id="partners-title"
          data-partner-heading
          className="font-serif text-[clamp(2.7rem,5.4vw,5.6rem)] leading-[1.1] tracking-[-0.06em] text-[#102945]"
        >
          Stronger Together.
          <br />
          <span className="text-[#0C4DA2]">
            Greater Impact.
          </span>
        </h2>

        <p
          data-partner-heading
          className="mx-auto mt-6 max-w-[730px] text-[15px] leading-[1.8] text-[#617B98] sm:text-[17px]"
        >
          Working alongside leading institutions,
          government agencies and global organisations
          to create safer, healthier communities.
        </p>
      </div>

      {/* Two opposite-direction carousels */}
      <div className="relative mt-12 w-full lg:mt-16">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#FAFCFF] to-transparent sm:w-16 lg:w-28" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#FAFCFF] to-transparent sm:w-16 lg:w-28" />

        <div className="space-y-3 sm:space-y-5">
          {/* Top row: LEFT to RIGHT */}
          <LogoRow direction="right" speed={55} />

          {/* Bottom row: RIGHT to LEFT */}
          <LogoRow direction="left" speed={55} />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 mt-12 flex justify-center lg:mt-14">
        <Link
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[54px] items-center gap-5 rounded-full border border-[#0C4DA2] bg-white py-1.5 pr-1.5 pl-6 text-[13px] font-semibold text-[#0C4DA2] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EDF6FF]"
        >
          View All Partners

          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C4DA2] text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>

      {/* Infinite animation */}
      <style jsx global>{`
        .partner-marquee-track {
          display: flex;
          width: max-content;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform;
        }

        .partner-marquee-set {
          display: flex;
          flex: none;
          align-items: center;
          gap: 18px;
          padding-right: 18px;
        }

        .partner-marquee-left {
          animation-name: ciprb-partner-left;
        }

        .partner-marquee-right {
          animation-name: ciprb-partner-right;
        }

        @keyframes ciprb-partner-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes ciprb-partner-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .partner-marquee-viewport:hover
          .partner-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-track {
            animation: none !important;
            transform: none !important;
          }

          .partner-marquee-viewport {
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
