
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  FlaskConical,
  Info,
  Mail,
  Newspaper,
  Network,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

type QuickLink = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

const quickLinks: QuickLink[] = [
  {
    title: "About CIPRB",
    description: "Learn about our mission, focus areas and impact.",
    href: "https://www.ciprb.org/about-ciprb",
    icon: Info,
  },
  {
    title: "Senior Management",
    description: "Meet the senior management team of CIPRB.",
    href: "https://www.ciprb.org/senior-management-team",
    icon: UsersRound,
  },
  {
    title: "Executive Committee",
    description: "Learn about the Executive Committee and its role.",
    href: "https://www.ciprb.org/executive-committee",
    icon: Network,
  },
  {
    title: "Careers",
    description: "Explore job opportunities and grow with CIPRB.",
    href: "https://www.ciprb.org/career",
    icon: BriefcaseBusiness,
  },
  {
    title: "Tenders",
    description: "View current tenders and procurement notices.",
    href: "https://www.ciprb.org/tenders",
    icon: FileText,
  },
  {
    title: "Publications",
    description: "Access our reports, studies and publications.",
    href: "https://www.ciprb.org/scientific-publications",
    icon: BookOpen,
  },
  {
    title: "Newsletters",
    description: "Read our latest newsletters and key updates.",
    href: "https://www.ciprb.org/newsletters",
    icon: Mail,
  },
  {
    title: "Our Researchers",
    description: "Meet our researchers and explore their work.",
    href: "https://www.ciprb.org/researchers",
    icon: FlaskConical,
  },
  {
    title: "Media Coverage",
    description: "Follow CIPRB in the media and latest coverage.",
    href: "https://www.ciprb.org/ciprb-in-news",
    icon: Newspaper,
  },
];

function QuickLinkCard({ item }: { item: QuickLink }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Explore ${item.title}`}
      className="
        group relative isolate flex min-h-[105px]
        min-w-0 items-center gap-3 overflow-hidden
        rounded-[20px] border border-white/95
        bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FBFF_60%,#EDF6FF_100%)]
        px-4 py-3.5
        shadow-[0_9px_20px_-12px_rgba(17,67,124,0.22),0_16px_32px_-25px_rgba(12,77,162,0.19),inset_0_1px_0_#FFFFFF]
        transition-[transform,box-shadow,border-color]
        duration-400
        ease-out
        hover:-translate-y-1
        hover:border-[#B6D9FF]
        hover:shadow-[0_15px_27px_-13px_rgba(12,77,162,0.28),0_22px_35px_-22px_rgba(12,77,162,0.23),inset_0_1px_0_#FFFFFF]
        focus-visible:outline-2
        focus-visible:outline-offset-3
        focus-visible:outline-[#0C64D5]
        motion-reduce:transform-none
        lg:min-h-[112px] lg:px-5
      "
    >
      {/* Subtle 3D reflection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_10%_0%,rgba(166,217,255,0.32),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Compact 3D icon */}
      <span
        className="
          relative flex h-[48px] w-[48px]
          shrink-0 items-center justify-center
          rounded-[15px] border border-white
          bg-[linear-gradient(145deg,#FFFFFF,#E4F2FF_60%,#CEE7FF)]
          text-[#0C4DA2]
          shadow-[0_6px_12px_-6px_rgba(12,77,162,0.34),inset_0_1px_0_white]
          transition-transform duration-300
          group-hover:-translate-y-0.5
          group-hover:scale-[1.05]
          motion-reduce:transform-none
          lg:h-[52px] lg:w-[52px]
        "
      >
        <Icon size={23} strokeWidth={1.8} />
      </span>

      <span
        aria-hidden="true"
        className="h-10 w-px shrink-0 bg-[#C8DFF7]"
      />

      {/* Compact card content */}
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] leading-[1.25] font-bold tracking-[-0.02em] text-[#102945] transition-colors duration-300 group-hover:text-[#0C4DA2] lg:text-[15px]">
          {item.title}
        </span>

        <span className="mt-1 block text-[11px] leading-[1.4] text-[#67809C] lg:text-[12px]">
          {item.description}
        </span>
      </span>

      {/* Compact arrow */}
      <span
        className="
          flex h-[31px] w-[31px]
          shrink-0 items-center justify-center
          rounded-full border border-white
          bg-gradient-to-br from-white to-[#DCEEFF]
          text-[#0C4DA2]
          shadow-[0_4px_9px_-5px_rgba(12,77,162,0.4)]
          transition-all duration-300
          group-hover:translate-x-0.5
          group-hover:-translate-y-0.5
          group-hover:bg-[#C4E4FF]
          motion-reduce:transform-none
        "
      >
        <ArrowUpRight size={17} strokeWidth={1.9} />
      </span>
    </Link>
  );
}

export default function QuickLinks() {
  return (
    <section
      id="quick-links"
      aria-labelledby="quick-links-heading"
      className="relative isolate overflow-hidden bg-[#F4F9FF] py-12 sm:py-14 lg:py-16"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_5%,rgba(255,255,255,1),transparent_70%)]"
      />

      {/* Top corner accent */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-[180px] w-[310px]"
        viewBox="0 0 310 180"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0H310C210 54 92 93 0 180V0Z"
          fill="#E1F0FF"
        />
        <path
          d="M0 0H210C129 43 65 70 0 104V0Z"
          fill="#C6E5FF"
          fillOpacity="0.6"
        />
      </svg>

      {/* Bottom soft wave */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[105px] w-full"
        viewBox="0 0 1600 105"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 50C300 100 540 100 820 78C1140 48 1360 30 1600 55V105H0Z"
          fill="#E3F2FF"
        />
        <path
          d="M800 105C1120 62 1380 88 1600 24V105H800Z"
          fill="#C7E6FF"
          fillOpacity="0.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-10">
        {/* Heading */}
        <header className="mx-auto mb-8 max-w-[780px] text-center lg:mb-9">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#0C64D5]" />

            <span className="rounded-full border border-[#D4E9FF] bg-[#E5F2FF] px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#0C4DA2] uppercase">
              Explore CIPRB
            </span>

            <span className="h-px w-8 bg-[#0C64D5]" />
          </div>

          <h2
            id="quick-links-heading"
            className="font-serif text-[clamp(2.8rem,4.8vw,4.8rem)] leading-[1.04] tracking-[-0.06em] text-[#0E2750]"
          >
            Quick{" "}
            <span className="text-[#0C64D5]">
              Links
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-[1.6] text-[#607D9E] sm:text-[15px]">
            Access key information and resources about
            CIPRB in one place.
          </p>
        </header>

        {/* Compact 3 × 3 grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {quickLinks.map((item) => (
            <QuickLinkCard
              key={item.title}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
