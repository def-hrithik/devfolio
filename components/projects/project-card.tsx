import Link from "next/link";
import { ExternalLink, FlaskConical } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/schemas";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const href = project.caseStudyHref ?? project.labsHref;

  return (
    <article
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm"
      aria-label={project.name}
    >
      {/* Category */}
      <span className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {project.category}
      </span>

      {/* Name */}
      <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">
        {project.name}
      </h3>

      {/* Tagline */}
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        {project.tagline}
      </p>

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-1">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Links */}
      <div className="flex items-center gap-2 pt-2">
        {href && (
          <Link
            href={href}
            className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {project.labsHref ? (
              <>
                <FlaskConical className="size-3" aria-hidden="true" />
                Lab
              </>
            ) : (
              "Case study →"
            )}
          </Link>
        )}
        <Link
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} on GitHub`}
          className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GitHubIcon className="size-3" aria-hidden="true" />
          GitHub
        </Link>
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.name}`}
            className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            Live
          </Link>
        )}
      </div>
    </article>
  );
}
