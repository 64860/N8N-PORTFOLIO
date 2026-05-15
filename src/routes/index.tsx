import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { workflows } from "@/data/workflows";
import { LogoMarquee } from "@/components/LogoMarquee";
import { BrandMark } from "@/components/BrandLogos";
import workflowPlaceholder from "@/assets/workflows/placeholder.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dennis Gathonjia — n8n Automation Engineer" },
      { name: "description", content: "I build automation systems that connect tools, reduce manual work, and scale workflows." },
      { property: "og:title", content: "Dennis Gathonjia — n8n Automation Engineer" },
      { property: "og:description", content: "I build automation systems that connect tools, reduce manual work, and scale workflows." },
    ],
  }),
  component: Index,
});

const metrics = [
  { value: "10+", label: "Automations shipped" },
  { value: "5+", label: "Platforms integrated" },
  { value: "70%", label: "Avg. time saved" },
  { value: "24/7", label: "Workflows running" },
];

const features = [
  {
    title: "End-to-end n8n builds",
    desc: "From self-hosting to production-grade workflows with retries, logging and alerts.",
    illustration: (
      <svg viewBox="0 0 160 100" fill="none" className="h-full w-full max-w-[160px]">
        {/* Flow diagram / pipeline */}
        <rect x="10" y="20" width="30" height="20" rx="4" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.08" />
        <rect x="65" y="35" width="30" height="20" rx="4" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.08" />
        <rect x="120" y="50" width="30" height="20" rx="4" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.08" />
        {/* Arrows */}
        <path d="M40 30 L60 40" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <path d="M95 45 L115 55" stroke="#534AB7" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        {/* Circle nodes */}
        <circle cx="25" cy="30" r="4" fill="#534AB7" opacity="0.6" />
        <circle cx="80" cy="45" r="4" fill="#534AB7" opacity="0.6" />
        <circle cx="135" cy="60" r="4" fill="#534AB7" opacity="0.6" />
        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#534AB7" />
          </marker>
        </defs>
      </svg>
    ),
  },
  {
    title: "AI-powered logic",
    desc: "OpenAI & Gemini embedded into your processes — classification, drafting, scoring.",
    illustration: (
      <svg viewBox="0 0 160 100" fill="none" className="h-full w-full max-w-[160px]">
        {/* Brain / neural nodes */}
        <circle cx="50" cy="35" r="7" fill="#534AB7" opacity="0.15" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="110" cy="35" r="7" fill="#534AB7" opacity="0.15" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="35" cy="65" r="7" fill="#534AB7" opacity="0.15" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="125" cy="65" r="7" fill="#534AB7" opacity="0.15" stroke="#534AB7" strokeWidth="1.5" />
        <circle cx="80" cy="50" r="9" fill="#534AB7" opacity="0.25" stroke="#534AB7" strokeWidth="1.5" />
        {/* Connections */}
        <line x1="57" y1="38" x2="71" y2="47" stroke="#534AB7" strokeWidth="1" opacity="0.4" />
        <line x1="103" y1="38" x2="89" y2="47" stroke="#534AB7" strokeWidth="1" opacity="0.4" />
        <line x1="42" y1="62" x2="71" y2="53" stroke="#534AB7" strokeWidth="1" opacity="0.4" />
        <line x1="118" y1="62" x2="89" y2="53" stroke="#534AB7" strokeWidth="1" opacity="0.4" />
        {/* Core dot */}
        <circle cx="80" cy="50" r="3" fill="#534AB7" />
      </svg>
    ),
  },
  {
    title: "API & webhook integrations",
    desc: "Connect anything with a REST API. Stripe, Shopify, Notion, Airtable, custom systems.",
    illustration: (
      <svg viewBox="0 0 160 100" fill="none" className="h-full w-full max-w-[160px]">
        {/* Hub and spoke diagram */}
        <circle cx="80" cy="50" r="14" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.08" />
        <circle cx="80" cy="50" r="5" fill="#534AB7" />
        {/* Spokes to endpoints */}
        {[
          { angle: 30, label: "" },
          { angle: 90, label: "" },
          { angle: 150, label: "" },
          { angle: 210, label: "" },
          { angle: 270, label: "" },
          { angle: 330, label: "" },
        ].map(({ angle }, i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = 80 + 32 * Math.cos(rad);
          const ey = 50 + 32 * Math.sin(rad);
          const sx = 80 + 14 * Math.cos(rad);
          const sy = 50 + 14 * Math.sin(rad);
          return (
            <g key={i}>
              <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#534AB7" strokeWidth="1.2" opacity={0.3 + i * 0.08} />
              <circle cx={ex} cy={ey} r="4" fill="#534AB7" fillOpacity="0.12" stroke="#534AB7" strokeWidth="1" />
            </g>
          );
        })}
      </svg>
    ),
  },
  {
    title: "Reliable by default",
    desc: "Idempotent steps, error branches, and observability so workflows don't silently break.",
    illustration: (
      <svg viewBox="0 0 160 100" fill="none" className="h-full w-full max-w-[160px]">
        {/* Shield / checkmark diagram */}
        <path d="M80 15 L120 35 L120 65 C120 78 100 88 80 88 C60 88 40 78 40 65 L40 35 Z" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.06" />
        {/* Checkmark */}
        <path d="M65 52 L76 63 L96 42" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Small lock detail */}
        <rect x="72" y="68" width="16" height="12" rx="3" stroke="#534AB7" strokeWidth="1.2" fill="none" opacity="0.5" />
        <path d="M75 68 V63 C75 59 79 58 80 58 C81 58 85 59 85 63 V68" stroke="#534AB7" strokeWidth="1.2" fill="none" opacity="0.5" />
      </svg>
    ),
  },
];

function Index() {
  const featured = workflows.find((w) => w.featured) ?? workflows[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-dot-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-sm">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for freelance work
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Automate the work that
              <br className="hidden sm:block" /> shouldn't need humans.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              I'm Dennis — an n8n automation engineer. I design and ship workflows that connect your tools,
              integrate AI, and scale operations without adding headcount.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/workflows">
                  View Workflows <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Start a project</Link>
              </Button>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="mt-16">
            <p className="mb-6 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Tools I integrate with
            </p>
            <LogoMarquee />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">What I do</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Production-grade automation, end to end.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Illustration area */}
              <div className="flex h-32 items-center justify-center bg-[#F5F5F5]">
                {f.illustration}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured workflow */}
      <section style={{ backgroundColor: "#F9F9F9", borderColor: "#E2E2E2" }} className="border-y">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#534AB7" }}>Featured</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#111111" }}>Recent build</h2>
            </div>
            <Link to="/workflows" className="hidden text-sm font-medium sm:inline-flex" style={{ color: "#555555" }}>
              All workflows →
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#E2E2E2] bg-white transition-all hover:shadow-lg" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div className="grid md:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4 p-6 sm:p-8">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: "#EEEEEE", color: "#333333" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold" style={{ color: "#111111" }}>{featured.title}</h3>
                <p className="leading-relaxed" style={{ color: "#555555" }}>{featured.description}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {featured.tools.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E2E2] bg-[#F9F9F9] px-2.5 py-1 text-xs font-medium"
                      style={{ color: "#333333" }}
                    >
                      <BrandMark name={t} className="h-3.5 w-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
                <Button asChild className="mt-3" style={{ backgroundColor: "#534AB7", borderColor: "#534AB7" }}>
                  <Link to="/workflows/$id" params={{ id: featured.id }}>
                    View case study <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative hidden overflow-hidden border-l border-[#E2E2E2] bg-[#F0F0F0] md:block">
                <img
                  src={featured.image ?? workflowPlaceholder}
                  alt={`${featured.title} preview`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card p-6 text-center">
              <div className="text-3xl font-semibold tracking-tight text-foreground">{m.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="rounded-2xl border border-border bg-foreground px-8 py-14 text-center text-background sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Have a workflow worth automating?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-background/70 sm:text-base">
            Tell me what's slow, manual, or breaking. I'll come back with a concrete n8n plan.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Get in touch <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}