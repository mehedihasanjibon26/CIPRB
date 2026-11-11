import DisableCiprbRedirects from "@/components/DisableCiprbRedirects";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../styles/fonts/inter-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/inter-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Prototype metadata only. Review before any public release.
export const metadata: Metadata = {
  title: {
    default: "CIPRB | Website Prototype",
    template: "%s | CIPRB",
  },
  description:
    "Website redesign prototype for the Centre for Injury Prevention and Research, Bangladesh.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <DisableCiprbRedirects />{children}</body>
    </html>
  );
}
