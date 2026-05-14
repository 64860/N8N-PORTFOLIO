import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Workflow } from "@/data/workflows";

type Props = {
  workflow: Workflow | null;
  onClose: () => void;
};

export function WorkflowDialog({ workflow, onClose }: Props) {
  return (
    <Dialog open={!!workflow} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        {workflow && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">{workflow.title}</DialogTitle>
              <DialogDescription>{workflow.description}</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 text-sm">
              <Section label="Problem">{workflow.problem}</Section>
              <Section label="Solution">{workflow.solution}</Section>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Steps</p>
                <ol className="space-y-1.5">
                  {workflow.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-muted-foreground">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {workflow.tools.map((t) => (
                    <Badge key={t} variant="secondary" className="font-normal">{t}</Badge>
                  ))}
                </div>
              </div>
              <Section label="Outcome">{workflow.outcome}</Section>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-foreground">{children}</p>
    </div>
  );
}
