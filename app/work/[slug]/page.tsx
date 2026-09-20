import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkBySlug, getAllWorkSlugs } from "@/lib/content";
import { CaseStudyHeader } from "@/components/work/case-study-header";
import { CaseStudySection } from "@/components/work/case-study-section";
import { SystemArchitecture } from "@/components/work/system-architecture";
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
    return { title: "Case Study Not Found" };
  }

  const title = `${work.name} — Engineering Case Study | Hrithik Singh`;
  const description = work.tagline || work.about;

  return {
    title,
    description,
    alternates: {
      canonical: `/work/${work.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/work/${work.slug}`,
      siteName: "Hrithik Singh Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
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
        <div
          key={section.id}
          className={index < work.sections.length - 1 ? "border-b border-border/30" : ""}
        >
          <CaseStudySection
            heading={section.heading}
            body={section.body}
            style={section.style}
            note={section.note}
          />
          {section.id === "architecture" && work.architecture && (
            <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
              <SystemArchitecture architecture={work.architecture} />
            </div>
          )}
        </div>
      ))}

      {/* Next project navigation */}
      {work.nextProject && (
        <NextProjectLink
          slug={work.nextProject.slug}
          name={work.nextProject.name}
        />
      )}
    </article>
  );
}
