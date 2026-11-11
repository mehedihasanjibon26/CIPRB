
"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  Globe,
} from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v1.8H8V14h2.2v7h3.3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4.5 w-4.5 fill-current"
    >
      <path d="M18.9 3H21l-6.3 7.2L22 21h-5.7l-4.5-5.9L6.6 21H4.5l6.7-7.7L2 3h5.8l4 5.3L18.9 3Zm-2 16h1.6L7 4.9H5.3L16.9 19Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M23 12s0-3.1-.4-4.6c-.2-.8-.8-1.5-1.6-1.7C19.4 5.3 12 5.3 12 5.3s-7.4 0-9 .4c-.8.2-1.4.9-1.6 1.7C1 8.9 1 12 1 12s0 3.1.4 4.6c.2.8.8 1.4 1.6 1.7 1.6.4 9 .4 9 .4s7.4 0 9-.4c.8-.3 1.4-.9 1.6-1.7.4-1.5.4-4.6.4-4.6ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z" />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  variant,
  children,
}: {
  href: string;
  label: string;
  variant: "facebook" | "x" | "youtube";
  children: ReactNode;
}) {
  const variantClasses =
    variant === "facebook"
      ? "bg-[#1877F2] text-white hover:bg-[#0f66d7]"
      : variant === "x"
        ? "bg-black text-white hover:bg-[#151515]"
        : "bg-[#FF0000] text-white hover:bg-[#db0000]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_25px_-14px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-1 ${variantClasses}`}
    >
      {children}
    </a>
  );
}

function ContactItem({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 py-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/10 text-[#7FD9FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
        {icon}
      </span>

      <div className="pt-1 text-[16px] leading-[1.6] text-white/94">
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="relative isolate overflow-hidden bg-[#03255C] text-white">
      {/* Top atmospheric background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(31,177,255,0.22),transparent_28%),radial-gradient(circle_at_right_center,rgba(31,177,255,0.12),transparent_26%),linear-gradient(180deg,#063B90_0%,#032B6B_40%,#03255C_100%)]" />

      {/* Dotted background */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-0 -z-10 hidden h-[240px] w-[540px] opacity-30 lg:block"
      >
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(102,192,255,0.9)_1.5px,transparent_1.8px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />
      </div>

      {/* Top wave accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-[160px] w-full overflow-hidden"
      >
        <svg
          viewBox="0 0 1600 220"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 34C130 80 240 84 355 46C480 4 585 5 708 57C828 108 941 111 1083 74C1215 39 1327 13 1600 65V0H0Z"
            fill="rgba(47,186,255,0.34)"
          />
          <path
            d="M0 88C164 102 270 78 406 48C568 13 709 29 821 61C946 97 1085 109 1236 78C1371 51 1468 33 1600 52V0H0Z"
            fill="rgba(114,221,255,0.22)"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 pt-20 pb-10 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid gap-12 xl:grid-cols-[1.08fr_0.9fr_1fr] xl:gap-10">

          {/* LEFT: BRANDING */}
          <div className="relative">

            {/* FIXED: WHITE CIPRB LOGO */}
            <div className="flex items-center gap-4">
              <Image
                src={`${BASE_PATH}/images/ciprb-logo.png`}
                alt="CIPRB - Centre for Injury Prevention and Research, Bangladesh"
                width={320}
                height={92}
                unoptimized
                className="
                  h-auto w-[210px]
                  brightness-0 invert
                  sm:w-[250px]
                  lg:w-[300px]
                  drop-shadow-[0_3px_12px_rgba(255,255,255,0.12)]
                "
              />
            </div>

            <div className="mt-8 flex gap-5">
              <span className="mt-1 h-[132px] w-[4px] rounded-full bg-gradient-to-b from-[#27D8FF] to-[#0C64D5]" />

              <p className="max-w-[560px] text-[20px] leading-[1.65] text-white/94 sm:text-[22px] lg:text-[23px]">
                The Centre for Injury Prevention and
                Research, Bangladesh (CIPRB) is a world
                leading injury prevention organisation
                based in Bangladesh.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center rounded-full border border-[#8BD8FF]/40 bg-white/8 px-6 py-3 text-[15px] font-semibold text-[#CFF2FF] backdrop-blur-md">
                Follow Us
              </span>

              <div className="flex items-center gap-4">
                <SocialButton
                  href="https://www.facebook.com/ciprb.org"
                  label="Follow CIPRB on Facebook"
                  variant="facebook"
                >
                  <FacebookIcon />
                </SocialButton>

                <SocialButton
                  href="https://x.com/"
                  label="Follow CIPRB on X"
                  variant="x"
                >
                  <XIcon />
                </SocialButton>

                <SocialButton
                  href="https://www.youtube.com/"
                  label="Follow CIPRB on YouTube"
                  variant="youtube"
                >
                  <YouTubeIcon />
                </SocialButton>
              </div>
            </div>
          </div>

          {/* MIDDLE: CONTACT */}
          <div className="xl:border-l xl:border-r xl:border-white/12 xl:px-10">
            <div className="mb-6">
              <h3 className="font-serif text-[52px] leading-none tracking-[-0.04em] text-white sm:text-[60px] lg:text-[68px]">
                Contact Us
              </h3>

              <div className="mt-4 h-[5px] w-28 rounded-full bg-gradient-to-r from-[#22D8FF] to-[#0C64D5]" />
            </div>

            <div className="divide-y divide-white/10">
              <ContactItem icon={<MapPin size={24} />}>
                H#B120, Road#7, New DOHS,
                <br />
                Mohakhali, Dhaka 1207
              </ContactItem>

              <ContactItem icon={<Globe size={24} />}>
                www.ciprb.org
              </ContactItem>

              <ContactItem icon={<Mail size={24} />}>
                info@ciprb.org
              </ContactItem>

              <ContactItem icon={<Phone size={24} />}>
                +880 258814988
              </ContactItem>

              <ContactItem icon={<Clock3 size={24} />}>
                Sun - Thu: 8.30am to 5.00pm
              </ContactItem>
            </div>
          </div>

          {/* RIGHT: SUBSCRIBE */}
          <div className="flex items-center">
            <div className="relative w-full overflow-hidden rounded-[46px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(140,215,255,0.14)_38%,rgba(59,137,255,0.08)_100%)] px-6 py-8 shadow-[0_35px_60px_-30px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-2xl sm:px-8 sm:py-10 lg:px-10">

              {/* Decorative glossy background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(31,170,255,0.28),transparent_35%)]" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/25 text-[#0A63D4] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl">
                    <Mail size={30} />
                  </span>

                  <div>
                    <h3 className="font-serif text-[48px] leading-none tracking-[-0.04em] text-white sm:text-[54px]">
                      Subscribe
                    </h3>

                    <div className="mt-3 h-[4px] w-24 rounded-full bg-gradient-to-r from-[#BDF6FF] to-[#55C8FF]" />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >
                  <label className="group relative block">
                    <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#C9F2FF] transition-colors group-focus-within:text-white">
                      <User size={22} />
                    </span>

                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="h-16 w-full rounded-[22px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] pl-14 pr-5 text-[19px] text-white placeholder:text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(255,255,255,0.04),0_15px_35px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl outline-none transition-all focus:border-[#A7EBFF] focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] focus:shadow-[0_0_0_4px_rgba(120,220,255,0.14),inset_0_1px_0_rgba(255,255,255,0.3)]"
                    />
                  </label>

                  <label className="group relative block">
                    <span className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#C9F2FF] transition-colors group-focus-within:text-white">
                      <Mail size={22} />
                    </span>

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="h-16 w-full rounded-[22px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] pl-14 pr-5 text-[19px] text-white placeholder:text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(255,255,255,0.04),0_15px_35px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl outline-none transition-all focus:border-[#A7EBFF] focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.1))] focus:shadow-[0_0_0_4px_rgba(120,220,255,0.14),inset_0_1px_0_rgba(255,255,255,0.3)]"
                    />
                  </label>

                  <button
                    type="submit"
                    className="group inline-flex h-16 w-full items-center justify-center gap-3 rounded-[24px] bg-[linear-gradient(90deg,#1DD6F4_0%,#0C64D5_48%,#083F97_100%)] px-6 text-[28px] font-semibold tracking-[-0.02em] text-white shadow-[0_22px_40px_-18px_rgba(4,29,83,0.72),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-18px_rgba(4,29,83,0.85)]"
                  >
                    <Send
                      size={24}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="relative mt-14 pt-8">
          <div className="absolute left-0 top-1/2 h-px w-[30%] bg-gradient-to-r from-transparent to-white/30" />
          <div className="absolute right-0 top-1/2 h-px w-[30%] bg-gradient-to-l from-transparent to-white/30" />

          <p className="text-center text-[20px] font-medium tracking-[-0.01em] text-white/95 sm:text-[22px]">
            © 2026 CIPRB. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* BOTTOM WAVES */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-6 h-[110px] w-full overflow-hidden sm:h-[135px]"
      >
        <svg
          viewBox="0 0 1600 180"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 78C174 118 324 132 509 101C705 68 905 40 1118 66C1328 92 1452 127 1600 114V180H0Z"
            fill="#0E67D8"
          />
          <path
            d="M0 98C160 126 286 130 478 104C699 73 872 61 1077 82C1312 106 1458 145 1600 132V180H0Z"
            fill="#5ED4FF"
            fillOpacity="0.95"
          />
          <path
            d="M0 126C193 155 330 149 541 126C738 105 927 95 1137 110C1325 123 1468 160 1600 149V180H0Z"
            fill="#F6FBFF"
          />
        </svg>
      </div>
    </footer>
  );
}
