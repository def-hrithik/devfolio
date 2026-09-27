"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "cn";
import { AnimatedBrand } from "@/components/nav/animated-brand";

const RESUME_URL =
  "https://drive.google.com/file/d/1i42O7sJFbGInzUEbbVENjhTdDolBB3mm/view?usp=sharing";

const NAV_LINKS = [
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#work", id: "work" },
  { label: "Skills", href: "/#skills", id: "skills" },
] as const;

const emptySubscribe = () => () => {};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="size-8 rounded-md" aria-hidden="true" />
    );
  }

  return (
    <button
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["experience", "work", "skills"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );
          setActiveSection(visibleEntries[0].target.id);
        } else if (window.scrollY < 200) {
          setActiveSection("");
        }
      },
      {
        rootMargin: "-15% 0px -50% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-3 sm:px-6">
        {/* Wordmark */}
        <AnimatedBrand />

        {/* Nav + Theme */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav
            className="flex items-center gap-0.5 sm:gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href, id }) => {
              const isActive =
                id === "work"
                  ? activeSection === "work" ||
                    pathname.startsWith("/work") ||
                    pathname.startsWith("/labs")
                  : activeSection === id;

              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "rounded-md px-2 py-1 text-xs font-medium transition-colors sm:px-2.5 sm:py-1.5 sm:text-sm",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}

            {/* Resume button linking to Google Drive PDF */}
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume in Google Drive (opens in new tab)"
              className="inline-flex items-center gap-0.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:gap-1 sm:px-2.5 sm:py-1.5 sm:text-sm"
            >
              <span>Resume</span>
              <ArrowUpRight
                className="size-3 sm:size-3.5 opacity-70"
                aria-hidden="true"
              />
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
