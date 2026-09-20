"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 30;

/**
 * Wordmark with a subtle typographic crossfade:
 *
 * • At top of page  → Lora (serif) — warm, editorial
 * • After scrolling → Geist Sans — clean, technical
 * • On hover        → Geist Sans, regardless of scroll position
 *
 * Two absolutely-stacked text layers cross-fade via opacity + tiny translateY.
 * State only updates on threshold crossing to minimise renders.
 * prefers-reduced-motion is respected via CSS.
 */
export function AnimatedBrand() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wasScrolledRef = useRef(false);

  useEffect(() => {
    const check = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;
      if (isScrolled !== wasScrolledRef.current) {
        wasScrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };

    check();

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const showAlternate = scrolled || hovered;

  return (
    <Link
      href="/"
      aria-label="Hrithik Singh — home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="animated-brand relative inline-block select-none text-base font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {/* Layer 1 — Lora serif (default / top-of-page) */}
      <span
        aria-hidden={showAlternate}
        className="animated-brand__layer font-serif"
        style={{
          opacity: showAlternate ? 0 : 1,
          transform: showAlternate ? "translateY(-2px)" : "translateY(0px)",
          position: showAlternate ? "absolute" : "relative",
          display: "block",
          whiteSpace: "nowrap",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        Hrithik Singh
      </span>

      {/* Layer 2 — Geist Sans (scrolled / hovered) */}
      <span
        aria-hidden={!showAlternate}
        className="animated-brand__layer font-sans"
        style={{
          opacity: showAlternate ? 1 : 0,
          transform: showAlternate ? "translateY(0px)" : "translateY(2px)",
          position: showAlternate ? "relative" : "absolute",
          display: "block",
          whiteSpace: "nowrap",
          letterSpacing: showAlternate ? "0.01em" : "0em",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        Hrithik Singh
      </span>
    </Link>
  );
}
