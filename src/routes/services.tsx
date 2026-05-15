import { createFileRoute, Link } from "@tanstack/react-router";
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-neutral-300"
          >
            {/* Top Section — Icon */}
            <div className="flex h-48 items-center justify-center bg-neutral-50">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm border border-neutral-100">
                <s.icon className="h-10 w-10 text-slate-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
              {/* Category pill */}
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Service
              </span>

              {/* Title */}
              <h3 className="mt-4 text-xl font-bold text-neutral-900">{s.title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.desc}</p>

              {/* Bullets */}
              <ul className="mt-4 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Tool badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {s.logos.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1 rounded border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold uppercase text-neutral-600"
                  >
                    <BrandMark name={name} className="h-3 w-3" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-neutral-900">Not sure which fits?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600">
          Send a quick description of the workflow — I'll suggest the right scope.
        </p>
        <Button asChild className="mt-5">
          <Link to="/contact">Talk to me <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}