import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandMark } from "@/components/BrandLogos";
import { ArrowLeft, Check } from "lucide-react";
import { getWorkflowById } from "@/lib/workflows";

export const Route = createFileRoute("/workflows/$id")({
  component: WorkflowDetailPage,
  loader: ({ params }) => {
    const workflow = getWorkflowById(params.id);
    if (!workflow) throw notFound();
    return { workflow };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.workflow.title} — Dennis Gathonjia` },
      { name: "description", content: loaderData.workflow.description },
      { property: "og:title", content: `${loaderData.workflow.title} — Dennis Gathonjia` },
      { property: "og:description", content: loaderData.workflow.description },
    ],
  }),
});

function WorkflowDetailPage() {
  const { workflow } = Route.useLoaderData();

  // If there's rich HTML content, render the case-study version
  if (workflow.caseStudy) {
    return (
      <article className="mx-auto max-w-4xl px-4 py-8">
        {/* Back link */}
        <Link
          to="/workflows"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workflows
        </Link>

        {/* Hero image */}
        {workflow.image && (
          <div className="mb-6 overflow-hidden rounded-xl border border-border">
            <img
              src={workflow.image}
              alt={`${workflow.title} preview`}
              className="h-full w-full object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {workflow.category}
            </span>
            {workflow.featured && (
              <Badge variant="secondary" className="font-normal text-xs">Featured</Badge>
            )}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{workflow.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{workflow.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {workflow.tags.map((t) => (
                <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tools:</span>
            {workflow.tools.map((t) => (
              <div
                key={t}
                title={t}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card"
              >
                <BrandMark name={t} className="h-4 w-4" />
              </div>
            ))}
          </div>
        </header>

        <hr className="mb-10 border-border" />

        {/* Rich HTML content rendered with Tailwind typography */}
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: workflow.caseStudy }}
        />

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-border bg-[color:var(--surface)] px-8 py-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Need a similar workflow?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Let's build your automation. Send a quick description and I'll scope it out.
          </p>
          <Button asChild className="mt-5">
            <Link to="/contact">Let's talk</Link>
          </Button>
        </div>
      </article>
    );
  }

  // Fallback: structured version (no rich-text content)
  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <Link
        to="/workflows"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to workflows
      </Link>

      {workflow.image && (
        <div className="mb-8 overflow-hidden rounded-xl border border-border">
          <img
            src={workflow.image}
            alt={`${workflow.title} preview`}
            className="h-full w-full object-cover"
            style={{ maxHeight: "420px" }}
          />
        </div>
      )}

      <header className="mb-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {workflow.category}
          </span>
          {workflow.featured && (
            <Badge variant="secondary" className="font-normal text-xs">Featured</Badge>
          )}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{workflow.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{workflow.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {workflow.tags.map((t) => (
              <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tools:</span>
          {workflow.tools.map((t) => (
            <div
              key={t}
              title={t}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card"
            >
              <BrandMark name={t} className="h-4 w-4" />
            </div>
          ))}
        </div>
      </header>

      <hr className="mb-10 border-border" />

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The Problem</h2>
          <p className="leading-relaxed text-muted-foreground">{workflow.problem}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">The Solution</h2>
          <p className="leading-relaxed text-muted-foreground">{workflow.solution}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold tracking-tight">How It Works</h2>
          <ol className="space-y-3">
            {workflow.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-soft)] text-xs font-medium text-[color:var(--brand)]">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-xl border border-border bg-[color:var(--surface)] p-6">
          <h2 className="mb-3 text-xl font-semibold tracking-tight">Outcome</h2>
          <div className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
            <p className="leading-relaxed text-muted-foreground">{workflow.outcome}</p>
          </div>
        </section>
      </div>

      <div className="mt-16 rounded-2xl border border-border bg-[color:var(--surface)] px-8 py-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Need a similar workflow?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Let's build your automation. Send a quick description and I'll scope it out.
        </p>
        <Button asChild className="mt-5">
          <Link to="/contact">Let's talk</Link>
        </Button>
      </div>
    </article>
  );
}