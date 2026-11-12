
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/motion/SmoothScroll";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Focus from "@/components/sections/Focus";
import Innovations from "@/components/sections/Innovations";
import Updates from "@/components/sections/Updates";
import Transformation from "@/components/sections/Transformation";
import Partners from "@/components/sections/Partners";
import QuickLinks from "@/components/sections/QuickLinks";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />

      <Navbar />

      <main
        id="main-content"
        className="min-h-svh bg-[#F7F9FC]"
      >
        {/*
          HERO + ABOUT SCROLL OVERLAP

          Both sections must share the SAME parent.

          Hero stays sticky while About scrolls
          above it. Scrolling upward reverses
          the effect naturally.
        */}
        <div className="relative isolate">
          {/* Hero: stays behind About */}
          <div className="sticky top-0 z-0">
            <Hero />
          </div>

          {/* About: slides over Hero on scroll */}
          <div className="relative z-10">
            <About />
          </div>
        </div>

        {/* Remaining sections stay unchanged */}
        <Focus />
        <Innovations />
        <Updates />
        <Transformation />
        <Partners />
        <QuickLinks />
      </main>

      <Footer />
    </>
  );
}
