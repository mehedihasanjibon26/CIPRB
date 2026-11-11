
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // GSAP controls the animation loop.
      autoRaf: false,

      // Premium, controlled easing.
      duration: 1.3,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Smooth desktop wheel input.
      smoothWheel: true,
      wheelMultiplier: 0.9,

      // Preserve natural touch behavior.
      syncTouch: false,
      touchMultiplier: 1,

      // Smooth anchor navigation.
      anchors: {
        offset: -95,
      },

      // Avoid carrying scroll momentum
      // into another internal page.
      stopInertiaOnNavigate: true,

      // Respect reduced-motion settings.
      respectReducedMotion: true,

      // Keep all movement vertical.
      orientation: "vertical",
      gestureOrientation: "vertical",

      // Preserve browser-native nested scrolling.
      prevent: (node: HTMLElement) =>
        node.hasAttribute("data-lenis-prevent"),
    });

    // Update GSAP when Lenis scrolls.
    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", updateScrollTrigger);

    // One shared animation loop.
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh triggers when content loads.
    const refresh = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refresh);

    // Initial measurement.
    refresh();

    return () => {
      window.removeEventListener("load", refresh);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
