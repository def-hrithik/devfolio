interface CaseStudySectionProps {
  heading: string;
  body: string;
  style?: "default" | "pipeline" | "list" | "metrics";
  note?: string;
}

export function CaseStudySection({ heading, body, style, note }: CaseStudySectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 font-serif text-lg font-semibold text-foreground sm:text-xl">
        {heading}
      </h2>

      {style === "pipeline" ? (
        // Monospace pre-formatted pipeline block
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-[11px] leading-[1.9] text-muted-foreground sm:text-xs">
          {body}
        </pre>
      ) : style === "list" ? (
        // Bullet list — body items separated by \n
        <ul className="space-y-2" role="list">
          {body
            .split("\n")
            .filter(Boolean)
            .map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-1.75 size-1 shrink-0 rounded-full bg-muted-foreground/40"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
        </ul>
      ) : style === "metrics" ? (
        // Metrics cards display
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {body
            .split("\n")
            .filter(Boolean)
            .map((item, i) => {
              const colonIndex = item.indexOf(":");
              const label = colonIndex !== -1 ? item.slice(0, colonIndex).trim() : item;
              const val = colonIndex !== -1 ? item.slice(colonIndex + 1).trim() : "";
              return (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card/60 p-4"
                >
                  <div className="font-mono text-2xl font-bold tracking-tight text-foreground">
                    {val || label}
                  </div>
                  {val && (
                    <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        // Default: prose paragraphs
        <div className="space-y-4 text-sm leading-[1.8] text-muted-foreground sm:text-base">
          {body
            .split("\n\n")
            .filter(Boolean)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      )}

      {note && (
        <p className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground italic">
          {note}
        </p>
      )}
    </section>
  );
}
