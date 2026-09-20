import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/home/section-heading";
import type { Site } from "@/lib/schemas";

interface ContactSectionProps {
  site: Site;
}

export function ContactSection({ site }: ContactSectionProps) {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
    >
      <SectionHeading label="Let's Connect" />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {/* Message */}
        <div className="max-w-sm">
          <h2 className="mb-2 font-serif text-2xl font-semibold text-foreground">
            Get in touch
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            I&apos;m open to new opportunities, collaborations, and technical
            conversations. Reach out through any of the channels below.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <Link
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="size-4" aria-hidden="true" />
            github.com/def-hrithik
          </Link>

          <Link
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon className="size-4" aria-hidden="true" />
            linkedin.com/in/hrithik-singh-sheru
          </Link>

          {site.socials.email && (
            <Link
              href={`mailto:${site.socials.email}`}
              className="inline-flex h-10 items-center gap-2.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Send email"
            >
              <Mail className="size-4" aria-hidden="true" />
              {site.socials.email}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
