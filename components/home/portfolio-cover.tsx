/**
 * PortfolioCover — Notion-style visual cover banner.
 *
 * Uses the Hokusai "Great Wave" image as a full-bleed banner placed
 * between the navbar and the hero section.
 *
 * Responsive strategy:
 * - Full viewport width, no max-width constraint
 * - Aspect-ratio container keeps proportions on every device
 *   · Desktop (≥640px): 5:2  — wide cinematic strip
 *   · Mobile  (<640px): 16:9 — taller crop keeps the wave prominent
 * - next/image with fill + object-cover handles all screen sizes
 * - Bottom gradient fades into the page background (Notion-style)
 */

import Image from "next/image";

export function PortfolioCover() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="relative w-full overflow-hidden border-b border-border/30"
      style={{
        /* 5:2 on desktop, 16:9 on mobile — via CSS custom property trick */
        aspectRatio: "5 / 2",
      }}
    >
      {/* On mobile override aspect ratio to 16:9 via a style tag */}
      <style>{`
        @media (max-width: 639px) {
          #portfolio-cover-wrap { aspect-ratio: 16 / 9; }
        }
      `}</style>

      {/* Inner wrapper so we can target it with the media query id */}
      <div
        id="portfolio-cover-wrap"
        className="absolute inset-0"
        style={{ aspectRatio: "inherit" }}
      />

      {/* The Great Wave image */}
      <Image
        src="/images/cover-banner.png"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: "center 25%",
        }}
      />

      {/* Bottom gradient — fades into the page background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background via-background/50 to-transparent" />

      {/* Top gradient — blends with the navbar bottom border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-background/30 to-transparent" />
    </div>
  );
}
