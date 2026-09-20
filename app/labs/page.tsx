import type { Metadata } from "next";
import { getLabs } from "@/lib/content";
import { LabCard } from "@/components/labs/lab-card";
import { SectionHeading } from "@/components/home/section-heading";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Experiments, side projects, and technical explorations — computer vision, machine learning, blockchain, and more.",
};

export default function LabsPage() {
  const labs = getLabs();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header */}
      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          /labs
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Labs & Experiments
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Side projects, explorations, and technical experiments across
          computer vision, machine learning, and data — built to learn,
          not shipped as products.
        </p>
      </header>

      <SectionHeading label={`${labs.length} experiments`} />

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    </div>
  );
}
