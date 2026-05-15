import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Webhook, MailCheck, BrainCircuit, PackageCheck, SlidersHorizontal, ArrowRight, Check } from "lucide-react";
import { BrandMark } from "@/components/BrandLogos";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Dennis Gathonjia" },
      { name: "description", content: "n8n setup, API integrations, AI workflows, and custom automation services." },
      { property: "og:title", content: "Services — Dennis Gathonjia" },
      { property: "og:description", content: "n8n setup, API integrations, AI workflows, and custom automation services." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: GitBranch,
    title: "n8n Automation Setup",
    desc: "End-to-end n8n deployment, workflow design, and self-hosting on your infra.",
    bullets: ["Self-hosted or cloud", "Versioned workflows", "Logging & alerts"],
    logos: ["n8n", "Supabase"],
  },
  {
    icon: Webhook,
    title: "API Integrations",
    desc: "Connect any REST or webhook API with retries, validation and error handling.",
    bullets: ["Auth & rate limits", "Idempotent writes", "Schema validation"],
    logos: ["Stripe", "Notion", "Airtable", "Webhooks"],
  },
  {
    icon: MailCheck,
    title: "Google Workspace",
    desc: "Automate Gmail, Drive, Sheets and Calendar across your team.",
    bullets: ["Inbox triage", "Drive folder ops", "Sheets as a CRM"],
    logos: ["Gmail", "Google Sheets", "Google Drive"],
  },
  {
    icon: BrainCircuit,
    title: "AI Workflows",
    desc: "Embed Gemini or OpenAI into your processes with structured outputs.",
    bullets: ["Lead scoring", "Auto-classification", "Drafted replies"],
    logos: ["OpenAI", "Gemini"],
  },
  {
    icon: PackageCheck,
    title: "E-commerce Automation",
    desc: "Sync orders, inventory and notifications across Shopify and your stack.",
    bullets: ["Order sync", "Refund workflows", "Customer comms"],
    logos: ["Shopify", "Stripe"],
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Business Workflows",
    desc: "Tailored systems mapped to your exact internal operations.",
    bullets: ["Process discovery", "Custom dashboards", "Team handoffs"],
    logos: ["Sentry", "Grafana", "Slack"],
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Services</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">What I help teams ship</h1>
        <p className="mt-3 text-muted-foreground">
          From a single workflow to a full automation backbone — picked, scoped and shipped.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="group border-border transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-soft)] text-[color:var(--brand)]">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
              <ul className="space-y-1.5 pt-1">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
                {s.logos.map((name) => (
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

      <div className="mt-16 rounded-2xl border border-border bg-[color:var(--surface)] px-8 py-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Not sure which fits?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Send a quick description of the workflow — I'll suggest the right scope.
        </p>
        <Button asChild className="mt-5">
          <Link to="/contact">Talk to me <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}
