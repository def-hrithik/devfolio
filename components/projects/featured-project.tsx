import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/schemas";

interface FeaturedProjectProps {
  project: Project;
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <article
      className="group mb-10 rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-sm sm:p-8"
      aria-label={project.name}
    >
      {/* Category pill */}
      <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {project.category}
      </span>

      {/* Name */}
      <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="mb-4 text-sm font-medium text-muted-foreground">
        {project.tagline}
      </p>

      {/* Problem → Solution */}
      {project.problem && (
        <div className="mb-4 space-y-2 border-l-2 border-border pl-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/70">Problem — </span>
            {project.problem}
          </p>
          {project.solution && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground/70">Solution — </span>
              {project.solution}
            </p>
          )}
        </div>
      )}

      {/* Full description */}
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3">
        {project.caseStudyHref && (
          <Link
            href={project.caseStudyHref}
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Case study
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        )}
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${project.name} on GitHub`}
        >
          <GitHubIcon className="size-3" aria-hidden="true" />
          GitHub
        </Link>
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Live demo of ${project.name}`}
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            Live
          </Link>
        )}
      </div>
    </article>
  );
}
