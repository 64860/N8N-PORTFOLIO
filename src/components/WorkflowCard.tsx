import type { Workflow } from "@/data/workflows";
import { BrandMark } from "@/components/BrandLogos";
import placeholder from "@/assets/workflows/placeholder.svg";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Props = {
  workflow: Workflow;
};

export function WorkflowCard({ workflow }: Props) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E2E2E2] bg-[#F9F9F9] transition-all hover:border-[#D5D5D5] hover:shadow-lg" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
      {/* Preview area */}
      <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[#F0F0F0]">
        {workflow.image ? (
          <img
            src={workflow.image}
            alt={`${workflow.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex -space-x-3">
            {workflow.tools.slice(0, 3).map((t) => (
              <div
                key={t}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm"
              >
                <BrandMark name={t} className="h-6 w-6" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Top row: category + case study link */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#534AB7" }}>
            {workflow.category}
          </span>
          <Link
            to="/workflows/$id"
            params={{ id: workflow.id }}
            className="rounded-full border border-[#E2E2E2] bg-transparent px-3 py-1 text-xs font-medium text-neutral-800 transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
          >
            Case study
          </Link>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold" style={{ color: "#111111" }}>{workflow.title}</h3>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed" style={{ color: "#555555" }}>
          {workflow.description}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tool tags */}
        <div className="flex flex-wrap gap-1.5 border-t border-[#E2E2E2] pt-3">
          {workflow.tools.map((t) => (
            <span
              key={t}
              className="rounded px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: "#EEEEEE", color: "#333333" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}