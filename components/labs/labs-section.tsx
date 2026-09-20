import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { LabCard } from "@/components/labs/lab-card";
import type { Lab } from "@/lib/schemas";

interface LabsSectionProps {
  labs: Lab[];
}

export function LabsSection({ labs }: LabsSectionProps) {
  return (
    <section
      id="labs"
      aria-label="Labs & Experiments"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <div className="flex items-center justify-between">
        <SectionHeading label="Labs & Experiments" />
        <Link
          href="/labs"
          className="mb-8 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {labs.slice(0, 4).map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </section>
  );
}
