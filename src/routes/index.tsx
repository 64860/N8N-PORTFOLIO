import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GitBranch, BrainCircuit, Webhook, ShieldCheck } from "lucide-react";
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
    icon: GitBranch,
    title: "End-to-end n8n builds",
    desc: "From self-hosting to production-grade workflows with retries, logging and alerts.",
    logos: ["n8n"],
  },
  {
    icon: BrainCircuit,
    title: "AI-powered logic",
    desc: "OpenAI & Gemini embedded into your processes — classification, drafting, scoring.",
    logos: ["OpenAI", "Gemini"],
  },
  {
    icon: Webhook,
    title: "API & webhook integrations",
    desc: "Connect anything with a REST API. Stripe, Shopify, Notion, Airtable, custom systems.",
    logos: ["Stripe", "Notion", "Airtable", "Shopify"],
  },
  {
    icon: ShieldCheck,
    title: "Reliable by default",
    desc: "Idempotent steps, error branches, and observability so workflows don't silently break.",
    logos: ["Sentry"],
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
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-sm">
              <CardContent className="space-y-3 p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[color:var(--brand)]">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  {f.logos.map((name) => (
                    <div
                      key={name}
                      title={name}
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card"
                    >
                      <BrandMark name={name} className="h-3.5 w-3.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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