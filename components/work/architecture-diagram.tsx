import { ArrowRight, Database, FileText, Layers, ShieldCheck, Wallet } from "lucide-react";

export function ArchitectureDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          System Architecture & Data Flows
        </span>
        <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          Hybrid On-Chain / Off-Chain
        </span>
      </div>

      <div className="space-y-4 text-xs">
        {/* Flow 1: File Storage */}
        <div className="rounded-lg border border-border/80 bg-background/50 p-3.5">
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-medium text-foreground">
            <span className="size-2 rounded-full bg-blue-500" aria-hidden="true" />
            Path A: Document Storage (Off-Chain IPFS)
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">React Client</p>
                <p className="text-[10px] text-muted-foreground">Certificate Upload / CSV</p>
              </div>
            </div>

            <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <Layers className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Express Backend</p>
                <p className="text-[10px] text-muted-foreground">Stream to Pinata API</p>
              </div>
            </div>

            <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <Database className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">IPFS / Pinata</p>
                <p className="text-[10px] text-muted-foreground">Content-Addressed CID</p>
              </div>
            </div>
          </div>
        </div>

        {/* Flow 2: Blockchain Hash Ledger */}
        <div className="rounded-lg border border-border/80 bg-background/50 p-3.5">
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-medium text-foreground">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Path B: Cryptographic Ledger (Ethereum Smart Contract)
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <Wallet className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">MetaMask Wallet</p>
                <p className="text-[10px] text-muted-foreground">Transaction Signing</p>
              </div>
            </div>

            <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <ShieldCheck className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Ethers.js Contract</p>
                <p className="text-[10px] text-muted-foreground">SHA-256 + Metadata Hash</p>
              </div>
            </div>

            <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />

            <div className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 sm:w-auto">
              <Layers className="size-4 text-muted-foreground" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Ethereum Ledger</p>
                <p className="text-[10px] text-muted-foreground">Immutable On-Chain Proof</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
