import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "cn";
import type { ExperienceItem } from "@/lib/schemas";

interface ExperienceItemProps {
  item: ExperienceItem;
  isLast: boolean;
}

const TYPE_LABELS: Record<ExperienceItem["type"], string> = {
  internship: "Internship",
  community: "Community",
  leadership: "Leadership",
};

const TYPE_COLORS: Record<ExperienceItem["type"], string> = {
  internship: "bg-[--status-live-bg] text-[--status-live-fg]",
  community: "bg-[--status-community-bg] text-[--status-community-fg]",
  leadership: "bg-[--status-leadership-bg] text-[--status-leadership-fg]",
};

export function ExperienceItemComponent({ item, isLast }: ExperienceItemProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-[auto_1fr] gap-x-4 pb-8",
        !isLast && "before:absolute before:left-[5px] before:top-3 before:h-full before:w-px before:bg-border"
      )}
    >
      {/* Timeline dot */}
      <div
        className="relative z-10 mt-[5px] size-[11px] shrink-0 rounded-full border-2 border-border bg-background"
        aria-hidden="true"
      />

      {/* Content */}
      <div>
        {/* Header row */}
        <div className="mb-1 flex flex-wrap items-start gap-2">
          <h3 className="text-sm font-semibold text-foreground leading-snug">
            {item.organization}
          </h3>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
              TYPE_COLORS[item.type]
            )}
          >
            {TYPE_LABELS[item.type]}
          </span>
        </div>

        {/* Role + duration */}
        <p className="mb-2 text-sm text-foreground/80">{item.role}</p>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          {item.displayDuration}
          {item.location && ` · ${item.location}`}
        </p>

        {/* Description */}
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Tech tags */}
        {item.technologies.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Evidence + links row */}
        <div className="flex flex-wrap items-center gap-3">
          {item.evidence && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-muted-foreground/60" aria-hidden="true" />
              {item.evidence.label}
            </span>
          )}
          {item.repository && (
            <Link
              href={item.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="size-3" aria-hidden="true" />
              Repository
            </Link>
          )}
          {item.caseStudyHref && (
            <Link
              href={item.caseStudyHref}
              className="inline-flex items-center gap-1 text-xs font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Case study →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
