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
  community:  "bg-[--status-community-bg] text-[--status-community-fg]",
  leadership: "bg-[--status-leadership-bg] text-[--status-leadership-fg]",
};

export function ExperienceItemComponent({ item, isLast }: ExperienceItemProps) {
  return (
    <div
      className={cn(
        // Grid: [dot col] [content col]
        // Dot col is exactly 20px wide so the 11px dot sits centered in it.
        "relative grid grid-cols-[20px_1fr] gap-x-5",
        !isLast && "pb-10"
      )}
    >
      {/* ── Vertical timeline line ─────────────────────────────────────────── */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[9px] top-[18px] bottom-0 w-px bg-border"
        />
      )}

      {/* ── Timeline dot ───────────────────────────────────────────────────── */}
      {/*
        The dot is 11px. Its left col is 20px.
        We offset it by (20-11)/2 = 4.5 ≈ 4px to centre it in the col.
        top-[5px] aligns it with the cap-height of the org name (text-sm ≈ 20px line,
        cap-height ≈ 0.72em, so roughly 10px → centre of cap ≈ 5px).
      */}
      <div
        aria-hidden="true"
        className="relative z-10 mt-[5px] self-start justify-self-center size-[11px] shrink-0 rounded-full border-2 border-border bg-background transition-colors duration-200 group-hover:border-foreground/40"
      />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="group min-w-0">

        {/* Header: org name + type badge */}
        <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {item.organization}
          </h3>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide leading-none",
              TYPE_COLORS[item.type]
            )}
          >
            {TYPE_LABELS[item.type]}
          </span>
        </div>

        {/* Role */}
        <p className="mb-0.5 text-[13px] font-medium text-foreground/75 leading-snug">
          {item.role}
        </p>

        {/* Date + location */}
        <p className="mb-3 font-mono text-[11px] leading-none text-muted-foreground/70 tracking-wide">
          {item.displayDuration}
          {item.location && (
            <>
              <span className="mx-1.5 opacity-40">·</span>
              {item.location}
            </>
          )}
        </p>

        {/* Description */}
        <p className="mb-3.5 text-[13px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Technology badges */}
        {item.technologies.length > 0 && (
          <div className="mb-3.5 flex flex-wrap gap-1.5">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded border border-border/60 bg-muted/40 px-2 py-[3px] font-mono text-[10px] leading-none text-muted-foreground transition-colors duration-150 hover:border-border hover:text-foreground/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Footer: evidence + links */}
        {(item.evidence || item.repository || item.caseStudyHref) && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {/* Evidence label (non-linked) */}
            {item.evidence && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full bg-current"
                />
                {item.evidence.label}
              </span>
            )}

            {/* Separator when evidence and links coexist */}
            {item.evidence && (item.repository || item.caseStudyHref) && (
              <span aria-hidden="true" className="h-3 w-px bg-border" />
            )}

            {/* Repository link */}
            {item.repository && (
              <Link
                href={item.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <ExternalLink className="size-3 shrink-0" aria-hidden="true" />
                Repository
              </Link>
            )}

            {/* Case study link */}
            {item.caseStudyHref && (
              <Link
                href={item.caseStudyHref}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/80 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Case study
                <span aria-hidden="true" className="translate-x-0 transition-transform duration-150 group-hover:translate-x-0.5">→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
