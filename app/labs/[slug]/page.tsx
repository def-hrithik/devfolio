import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { getLabBySlug, getAllLabSlugs } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) {
    return { title: "Not Found" };
  }

  return {
    title: lab.name,
    description: lab.description,
  };
}

export default async function LabPage({ params }: PageProps) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Back */}
      <Link
        href="/labs"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All labs
      </Link>

      {/* Category */}
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {lab.category}
      </p>

      {/* Title */}
      <h1 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {lab.name}
      </h1>

      {/* Description */}
      <p className="mb-6 border-l-2 border-border pl-4 text-base leading-relaxed text-muted-foreground">
        {lab.description}
      </p>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {lab.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Metric */}
      {lab.metric && (
        <div className="mb-6 rounded-lg border border-border bg-muted/30 px-4 py-3">
          <p className="font-mono text-xs text-muted-foreground">{lab.metric}</p>
        </div>
      )}

      {/* Technical takeaway */}
      <div className="mb-8">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Technical takeaway
        </h2>
        <p className="text-sm leading-[1.8] text-muted-foreground">
          {lab.technicalTakeaway}
        </p>
      </div>

      {/* Disclaimer */}
      {lab.disclaimer && (
        <div className="mb-8 rounded-lg border border-border bg-muted/20 px-4 py-3">
          <p className="text-xs italic leading-relaxed text-muted-foreground">
            {lab.disclaimer}
          </p>
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        <Link
          href={lab.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`View ${lab.name} source code on GitHub`}
        >
          <GitHubIcon className="size-4" aria-hidden="true" />
          View on GitHub
        </Link>
        {lab.liveUrl && (
          <Link
            href={lab.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Live demo of ${lab.name}`}
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Live demo
          </Link>
        )}
      </div>
    </article>
  );
}
