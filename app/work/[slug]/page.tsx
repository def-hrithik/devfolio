import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkBySlug, getAllWorkSlugs } from "@/lib/content";
import { CaseStudyHeader } from "@/components/work/case-study-header";
import { CaseStudySection } from "@/components/work/case-study-section";
import { ArchitectureDiagram } from "@/components/work/architecture-diagram";
import { NextProjectLink } from "@/components/work/next-project-link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return { title: "Not Found" };
  }

  return {
    title: work.name,
    description: work.tagline,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <article>
      {/* Divider between header and sections */}
      <div className="border-b border-border/50">
        <CaseStudyHeader work={work} />
      </div>

      {/* Content sections */}
      {work.sections.map((section, index) => (
        <div key={section.id} className={index < work.sections.length - 1 ? "border-b border-border/30" : ""}>
          <CaseStudySection
            heading={section.heading}
            body={section.body}
            note={section.note}
          />
          {section.id === "architecture" && slug === "certchain" && (
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <ArchitectureDiagram />
            </div>
          )}
        </div>
      ))}

      {/* Next project */}
      {work.nextProject && (
        <NextProjectLink
          slug={work.nextProject.slug}
          name={work.nextProject.name}
        />
      )}
    </article>
  );
}
