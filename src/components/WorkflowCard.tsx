import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Workflow } from "@/data/workflows";
import { BrandMark } from "@/components/BrandLogos";
import placeholder from "@/assets/workflows/placeholder.svg";

type Props = {
  workflow: Workflow;
  onView: (w: Workflow) => void;
};

export function WorkflowCard({ workflow, onView }: Props) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border p-0 transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-[color:var(--surface)]">
        <img
          src={workflow.image ?? placeholder}
          alt={`${workflow.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-3 left-3 flex -space-x-1.5">
          {workflow.tools.slice(0, 4).map((t) => (
            <div
              key={t}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card shadow-sm"
            >
              <BrandMark name={t} className="h-3.5 w-3.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {workflow.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="secondary" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold tracking-tight">{workflow.title}</h3>
          <p className="text-sm text-muted-foreground">{workflow.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">{workflow.category}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onView(workflow)}
            className="h-8 gap-1 px-2 text-sm text-[color:var(--brand)] hover:text-[color:var(--brand)]"
          >
            Case study <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
