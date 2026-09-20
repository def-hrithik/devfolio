import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { getSiteData } from "@/lib/content";

export async function SiteFooter() {
  const site = getSiteData();

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-serif text-sm text-muted-foreground">
            {site.name}
          </span>

          <div className="flex items-center gap-4">
            <Link
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>

            <Link
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LinkedInIcon className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">LinkedIn</span>
            </Link>

            {site.socials.email && (
              <Link
                href={`mailto:${site.socials.email}`}
                aria-label="Send email"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Email</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
