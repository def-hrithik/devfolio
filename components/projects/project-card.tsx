import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/schemas";

interface ProjectCardProps {
  project: Project;
}

/** Max tech badges on secondary cards */
const MAX_TECH = 5;

export function ProjectCard({ project }: ProjectCardProps) {
  // Labs projects link to /labs/[slug], case-study projects link to /work/[slug]
  const primaryHref = project.caseStudyHref ?? project.labsHref;
  const isLab = Boolean(project.labsHref && !project.caseStudyHref);

  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const overflow = project.technologies.length - MAX_TECH;

  return (
    <article
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors duration-200 hover:border-border/80 hover:bg-card/80"
      aria-label={project.name}
    >
      {/* ── Category ─────────────────────────────────────────────────────── */}
      <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
        {project.category}
      </span>

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <h3 className="mb-1.5 text-sm font-semibold leading-snug text-foreground">
        {project.name}
      </h3>

      {/* ── Tagline ──────────────────────────────────────────────────────── */}
      <p className="mb-4 text-[12px] leading-relaxed text-muted-foreground">
        {project.tagline}
      </p>

      {/* ── Tech badges ──────────────────────────────────────────────────── */}
      <div className="mb-4 flex flex-wrap gap-1">
        {visibleTech.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded border border-border/50 bg-muted/40 px-1.5 py-[3px] font-mono text-[10px] leading-none text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {overflow > 0 && (
          <span className="inline-flex items-center rounded border border-border/30 bg-muted/20 px-1.5 py-[3px] font-mono text-[10px] leading-none text-muted-foreground/50">
            +{overflow}
          </span>
        )}
      </div>

      {/* ── Spacer pushes links to bottom ────────────────────────────────── */}
      <div className="flex-1" aria-hidden="true" />

      {/* ── Links ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 pt-3 border-t border-border/40">
        {/* Primary CTA: case study or lab */}
        {primaryHref && (
          <Link
            href={primaryHref}
            className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {isLab ? (
              <>
                <FlaskConical className="size-3 shrink-0" aria-hidden="true" />
                Lab demo
              </>
            ) : (
              <>Case study →</>
            )}
          </Link>
        )}

        {/* GitHub */}
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
          className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GitHubIcon className="size-3 shrink-0" aria-hidden="true" />
          GitHub
        </Link>
      </div>
    </article>
  );
}
