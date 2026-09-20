import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import type { Site } from "@/lib/schemas";

interface HeroProps {
  site: Site;
}

export function Hero({ site }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="mx-auto max-w-3xl px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:pt-24"
    >
      {/* Name + location */}
      <div className="opacity-initial animate-fade-in mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {site.location}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <MapPin className="size-3" aria-hidden="true" />
          Open to opportunities
        </span>
      </div>

      {/* Headline */}
      <h1
        className="opacity-initial animate-fade-in delay-100 mb-6 font-serif text-[clamp(2rem,5vw+0.5rem,3.75rem)] font-semibold leading-[1.1] tracking-tight text-foreground"
      >
        {site.headline}
      </h1>

      {/* Bio */}
      <p className="opacity-initial animate-fade-in delay-200 mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {site.bio}
      </p>

      {/* CTAs */}
      <div className="opacity-initial animate-fade-in delay-300 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={site.ctaPrimary.href}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {site.ctaPrimary.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        <Link
          href={site.ctaSecondary.href}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {site.ctaSecondary.label}
        </Link>

        {site.resumeUrl && (
          <Link
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Resume
          </Link>
        )}
      </div>

      {/* Social links */}
      <div className="opacity-initial animate-fade-in delay-400 mt-6 flex items-center gap-4">
        <Link
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub: def-hrithik"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <GitHubIcon className="size-4" aria-hidden="true" />
          def-hrithik
        </Link>
        <span className="text-border" aria-hidden="true">·</span>
        <Link
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedInIcon className="size-4" aria-hidden="true" />
          LinkedIn
        </Link>
      </div>
    </section>
  );
}
