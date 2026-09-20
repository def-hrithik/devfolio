import Link from "next/link";
import { ExternalLink, FlaskConical } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import type { Lab } from "@/lib/schemas";

interface LabCardProps {
  lab: Lab;
}

export function LabCard({ lab }: LabCardProps) {
  return (
    <article
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:p-6"
      aria-label={lab.name}
    >
      {/* Icon + category */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
          <FlaskConical className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {lab.category}
        </span>
      </div>

      {/* Name */}
      <h2 className="mb-2 text-sm font-semibold text-foreground">
        {lab.name}
      </h2>

      {/* Description */}
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        {lab.description}
      </p>

      {/* Metric / disclaimer */}
      {lab.metric && (
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          {lab.metric}
        </p>
      )}

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-1">
        {lab.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Technical takeaway */}
      <p className="mb-4 flex-1 border-l-2 border-border pl-3 text-xs italic leading-relaxed text-muted-foreground">
        {lab.technicalTakeaway}
      </p>

      {/* Links */}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        <Link
          href={`/labs/${lab.id}`}
          className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Read more →
        </Link>
        <Link
          href={lab.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${lab.name} on GitHub`}
          className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <GitHubIcon className="size-3" aria-hidden="true" />
          GitHub
        </Link>
        {lab.liveUrl && (
          <Link
            href={lab.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${lab.name}`}
            className="inline-flex h-7 items-center gap-1 rounded px-2.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink className="size-3" aria-hidden="true" />
            Demo
          </Link>
        )}
      </div>
    </article>
  );
}
