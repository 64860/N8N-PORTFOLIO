import { Workflow, workflows as defaultWorkflows } from "@/data/workflows";

const STORAGE_KEY = "admin_workflows";

/** Returns the merged list of workflows (defaults overridden by localStorage edits). */
export function getMergedWorkflows(): Workflow[] {
  if (typeof window === "undefined") return defaultWorkflows;

  const stored = localStorage.getItem(STORAGE_KEY);
  const storedWorkflows = stored ? JSON.parse(stored) : {};

  const merged = defaultWorkflows.map((w) => storedWorkflows[w.id] || w);
  const customWorkflows = Object.values(storedWorkflows).filter(
    (w: any) => !defaultWorkflows.find((dw) => dw.id === w.id)
  );

  return [...merged, ...customWorkflows] as Workflow[];
}

/** Returns a single workflow by ID, or undefined if not found. */
export function getWorkflowById(id: string): Workflow | undefined {
  return getMergedWorkflows().find((w) => w.id === id);
}