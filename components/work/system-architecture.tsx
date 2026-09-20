import { Fragment } from "react";
import {
  ArrowRight,
  ArrowDown,
  Database,
  FileText,
  Layers,
  ShieldCheck,
  Wallet,
  Monitor,
  Server,
  User,
  Camera,
  Eye,
  Cpu,
  BarChart3,
  Upload,
  Code,
  Activity,
  LucideIcon,
} from "lucide-react";
import { cn } from "cn";
import type { Architecture } from "@/lib/schemas";

interface SystemArchitectureProps {
  architecture: Architecture;
}

const ICON_MAP: Record<string, LucideIcon> = {
  browser: Monitor,
  client: Monitor,
  monitor: Monitor,
  server: Server,
  api: Server,
  database: Database,
  storage: Database,
  ipfs: Database,
  file: FileText,
  doc: FileText,
  blockchain: Layers,
  shield: ShieldCheck,
  contract: ShieldCheck,
  wallet: Wallet,
  user: User,
  camera: Camera,
  webcam: Camera,
  eye: Eye,
  vision: Eye,
  cpu: Cpu,
  model: Cpu,
  ai: Cpu,
  chart: BarChart3,
  analytics: BarChart3,
  upload: Upload,
  code: Code,
  activity: Activity,
  layers: Layers,
};

const COLOR_MAP: Record<string, { dot: string }> = {
  blue: { dot: "bg-blue-500" },
  emerald: { dot: "bg-emerald-500" },
  amber: { dot: "bg-amber-500" },
  purple: { dot: "bg-purple-500" },
  rose: { dot: "bg-rose-500" },
  cyan: { dot: "bg-cyan-500" },
};

function getIcon(name?: string): LucideIcon {
  if (!name) return Layers;
  return ICON_MAP[name.toLowerCase()] ?? Layers;
}

export function SystemArchitecture({ architecture }: SystemArchitectureProps) {
  return (
    <div
      className="my-6 rounded-xl border border-border bg-card p-5 sm:p-6"
      aria-label="System architecture & data flows"
    >
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          System Architecture & Data Flows
        </span>
        {architecture.badge && (
          <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {architecture.badge}
          </span>
        )}
      </div>

      {/* Summary if provided */}
      {architecture.summary && (
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          {architecture.summary}
        </p>
      )}

      {/* Data flow paths */}
      <div className="space-y-4 text-xs">
        {architecture.flows.map((flow) => {
          const color = COLOR_MAP[flow.color ?? "blue"] ?? COLOR_MAP.blue;

          return (
            <div
              key={flow.title}
              className="rounded-lg border border-border/80 bg-background/50 p-3.5"
            >
              {/* Path title */}
              <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] font-medium text-foreground">
                <span
                  className={cn("size-2 rounded-full", color.dot)}
                  aria-hidden="true"
                />
                {flow.title}
              </div>

              {/* Node sequence */}
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {flow.nodes.map((node, nodeIndex) => {
                  const Icon = getIcon(node.icon);
                  return (
                    <Fragment key={node.label}>
                      <div className="flex w-full flex-1 min-w-32.5 items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
                        <Icon
                          className="size-4 shrink-0 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-foreground">
                            {node.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {node.description}
                          </p>
                        </div>
                      </div>

                      {nodeIndex < flow.nodes.length - 1 && (
                        <div
                          className="flex shrink-0 items-center justify-center py-0.5 sm:py-0"
                          aria-hidden="true"
                        >
                          <ArrowRight className="hidden size-3.5 text-muted-foreground/60 sm:block" />
                          <ArrowDown className="block size-3.5 text-muted-foreground/60 sm:hidden" />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
