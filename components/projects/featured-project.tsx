import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "cn";
import type { Project } from "@/lib/schemas";

interface FeaturedProjectProps {
  project: Project;
  index: number;
}

/** Max tech badges shown on featured cards before overflow indicator */
const MAX_TECH = 6;

export function FeaturedProject({ project, index }: FeaturedProjectProps) {
  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const overflow = project.technologies.length - MAX_TECH;

  return (
    <article
      className={cn(
        // Base card — no shadow, minimal border, clean bg
        "group relative flex flex-col rounded-xl border border-border bg-card",
        "p-6 sm:p-8",
        // Not the last featured project → bottom gap
        "mb-4 last:mb-0"
      )}
      aria-label={project.name}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="mb-5">
        {/* Category + year + index */}
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </>
            )}
          </div>
          <span
            aria-hidden="true"
            className="font-mono text-[11px] tabular-nums text-muted-foreground/40"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Project title */}
        <h3 className="mb-2 font-serif text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
          {project.name}
        </h3>

        {/* Tagline — the one-liner hook */}
        <p className="text-[13px] font-medium leading-snug text-muted-foreground">
          {project.tagline}
        </p>
      </header>

      {/* ── Description ────────────────────────────────────────────────────── */}
      {/*
        We show the description (2–3 sentences), not the raw problem/solution
        blocks. The full detail lives on /work/[slug].
      */}
      <p className="mb-5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* ── Technology badges ──────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {visibleTech.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded border border-border/60 bg-muted/40 px-2 py-[3px] font-mono text-[10px] leading-none text-muted-foreground transition-colors duration-150 hover:border-border hover:text-foreground/80"
          >
            {tech}
          </span>
        ))}
        {overflow > 0 && (
          <span className="inline-flex items-center rounded border border-border/40 bg-muted/20 px-2 py-[3px] font-mono text-[10px] leading-none text-muted-foreground/60">
            +{overflow}
          </span>
        )}
      </div>

      {/* ── CTAs ───────────────────────────────────────────────────────────── */}
      <footer className="flex flex-wrap items-center gap-2.5">
        {/* Primary: case study */}
        {project.caseStudyHref && (
          <Link
            href={project.caseStudyHref}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3.5 text-xs font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View case study
            <ArrowRight className="size-3 shrink-0" aria-hidden="true" />
          </Link>
        )}

        {/* Secondary: GitHub */}
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GitHubIcon className="size-3.5 shrink-0" aria-hidden="true" />
          GitHub
        </Link>

        {/* Live Demo */}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.name}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            Live Demo
          </Link>
        )}
      </footer>
    </article>
  );
}
