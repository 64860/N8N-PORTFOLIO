import { ArrowRight } from "lucide-react";
import type { Workflow } from "@/data/workflows";
import { BrandMark } from "@/components/BrandLogos";
import placeholder from "@/assets/workflows/placeholder.svg";
import { Link } from "@tanstack/react-router";

type Props = {
  workflow: Workflow;
};

export function WorkflowCard({ workflow }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-neutral-300">
      {/* Top Section — Image or fallback icon */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-neutral-50">
        {workflow.image ? (
          <img
            src={workflow.image}
            alt={`${workflow.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {/* Fallback: show tool brand logos scattered or a generic icon */}
            <div className="flex -space-x-3">
              {workflow.tools.slice(0, 3).map((t) => (
                <div
                  key={t}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm"
                >
                  <BrandMark name={t} className="h-7 w-7" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section — Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Top Row: Category + Case Study link */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
            {workflow.category}
          </span>
          <Link
            to="/workflows/$id"
            params={{ id: workflow.id }}
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            Case study
          </Link>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold text-neutral-900">{workflow.title}</h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {workflow.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer — Tech badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {workflow.tools.map((t) => (
            <span
              key={t}
              className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold uppercase text-neutral-600"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}