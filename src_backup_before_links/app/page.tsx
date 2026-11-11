
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
        {/* Extra space between floating Navbar and Hero */}
        <div className="pt-4">
          <Hero />
        </div>

        <About />
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
