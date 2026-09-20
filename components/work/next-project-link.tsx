import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextProjectLinkProps {
  slug: string;
  name: string;
}

export function NextProjectLink({ slug, name }: NextProjectLinkProps) {
  return (
    <div className="mx-auto max-w-3xl border-t border-border/50 px-4 py-12 sm:px-6">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Next project
      </p>
      <Link
        href={`/work/${slug}`}
        className="group inline-flex items-center gap-2 font-serif text-xl font-semibold text-foreground transition-opacity hover:opacity-70 sm:text-2xl"
      >
        {name}
        <ArrowRight
          className="size-5 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
