import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Work } from "@/lib/schemas";

interface CaseStudyHeaderProps {
  work: Work;
}

export function CaseStudyHeader({ work }: CaseStudyHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6">
      {/* Back link */}
      <Link
        href="/#work"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All work
      </Link>

      {/* Company + role + dates */}
      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
        <span>{work.category ?? work.company}</span>
        <span aria-hidden="true">·</span>
        <span>{work.role}</span>
        <span aria-hidden="true">·</span>
        <span>{work.dates}</span>
      </div>

      {/* Title */}
      <h1 className="mb-4 font-serif text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
        {work.name}
      </h1>

      {/* Tagline */}
      <p className="mb-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {work.tagline}
      </p>

      {/* About / intro */}
      <p className="mb-8 border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
        {work.about}
      </p>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {work.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={work.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View source code on GitHub"
        >
          <GitHubIcon className="size-3" aria-hidden="true" />
          GitHub
        </Link>
        {work.liveUrl && (
          <Link
            href={work.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Live demo"
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            Live
          </Link>
        )}
      </div>
    </header>
  );
}
