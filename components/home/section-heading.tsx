import { cn } from "cn";

interface SectionHeadingProps {
  label: string;
  className?: string;
}

export function SectionHeading({ label, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 flex items-center gap-3", className)}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}
