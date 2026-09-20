interface CaseStudySectionProps {
  heading: string;
  body: string;
  note?: string;
}

export function CaseStudySection({ heading, body, note }: CaseStudySectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 font-serif text-lg font-semibold text-foreground sm:text-xl">
        {heading}
      </h2>
      <p className="text-sm leading-[1.8] text-muted-foreground sm:text-base">
        {body}
      </p>
      {note && (
        <p className="mt-4 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground italic">
          {note}
        </p>
      )}
    </section>
  );
}
