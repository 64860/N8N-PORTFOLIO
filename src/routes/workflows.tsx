import { createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowCard } from "@/components/WorkflowCard";
import { getMergedWorkflows } from "@/lib/workflows";
import { workflowCategories, type Workflow } from "@/data/workflows";

export const Route = createFileRoute("/workflows")({
  component: WorkflowsPage,
  loader: () => ({
    workflows: getMergedWorkflows(),
  }),
  head: () => ({
    meta: [
      { title: "Workflows — Dennis Gathonjia" },
      { name: "description", content: "n8n automation case studies across AI, e-commerce, productivity, and data." },
      { property: "og:title", content: "Workflows — Dennis Gathonjia" },
      { property: "og:description", content: "n8n automation case studies across AI, e-commerce, productivity, and data." },
    ],
  }),
});

function WorkflowsPage() {
  const [filter, setFilter] = useState<string>("All");
  const matchRoute = useMatchRoute();

  // Check if we're on the exact /workflows route (not a child like /workflows/$id)
  const isGrid = matchRoute({ to: "/workflows", fuzzy: false });

  const allWorkflows = getMergedWorkflows();

  const filtered = useMemo(
    () => (filter === "All" ? allWorkflows : allWorkflows.filter((w) => w.category === filter)),
    [filter, allWorkflows]
  );

  // When a child route is active (e.g. /workflows/$id), render Outlet so the child appears
  if (!isGrid) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Case studies</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Workflows</h1>
        <p className="mt-3 text-muted-foreground">Real automation builds, structured Problem → Solution → Outcome.</p>
      </header>

      <Tabs value={filter} onValueChange={setFilter} className="mb-10 flex justify-center">
        <TabsList className="flex h-auto flex-wrap justify-center gap-1 bg-muted p-1">
          {workflowCategories.map((c) => (
            <TabsTrigger key={c} value={c} className="text-xs sm:text-sm">{c}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w) => (
          <WorkflowCard key={w.id} workflow={w} />
        ))}
      </div>
    </div>
  );
}
