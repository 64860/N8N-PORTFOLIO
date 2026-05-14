import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { featuredStack } from "@/components/BrandLogos";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools — Dennis Gathonjia" },
      { name: "description", content: "Tools and platforms I use to ship automation." },
      { property: "og:title", content: "Tools — Dennis Gathonjia" },
      { property: "og:description", content: "Tools and platforms I use to ship automation." },
    ],
  }),
  component: ToolsPage,
});

const descriptions: Record<string, string> = {
  n8n: "Workflow engine — the core of every build.",
  OpenAI: "LLM intelligence for classification, drafting and reasoning.",
  "Google Sheets": "Lightweight CRMs, dashboards, and data pipelines.",
  Notion: "Internal docs, project trackers, and knowledge bases.",
  Airtable: "Structured data with views and automations.",
  Stripe: "Payments, subscriptions, and revenue events.",
  Supabase: "Postgres, auth and storage as a backend.",
  Discord: "Realtime team and community notifications.",
  Telegram: "Operational alerts and bot interactions.",
  WhatsApp: "Customer messaging and order workflows.",
  Zapier: "Bridging niche apps that aren't yet on n8n.",
};

function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Stack</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">My automation stack</h1>
        <p className="mt-3 text-muted-foreground">
          A curated set of tools I reach for daily — and the ones I integrate with most.
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featuredStack.map((t) => (
          <Card key={t.name} className="border-border transition-all hover:-translate-y-0.5 hover:shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <img src={t.src} alt={t.name} className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold tracking-tight">{t.name}</div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {descriptions[t.name] ?? "Integrated regularly into client builds."}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
