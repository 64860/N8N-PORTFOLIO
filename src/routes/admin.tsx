import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Workflow, workflows as defaultWorkflows } from "@/data/workflows";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const ADMIN_PASSWORD = "Dennis45gh@";
const STORAGE_KEY = "admin_workflows";
const SESSION_KEY = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const workflowSchema = z.object({
  id: z.string().min(1, "ID required"),
  title: z.string().min(1, "Title required").max(100),
  description: z.string().min(1, "Description required").max(500),
  category: z.enum(["AI Automations", "E-commerce", "Productivity", "Data Automation"]),
  tags: z.string().min(1, "Tags required"),
  tools: z.string().min(1, "Tools required"),
  problem: z.string().min(1, "Problem required").max(1000),
  solution: z.string().min(1, "Solution required").max(1000),
  steps: z.string().min(1, "Steps required"),
  outcome: z.string().min(1, "Outcome required").max(500),
  featured: z.boolean(),
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      const { timestamp } = JSON.parse(storedSession);
      if (Date.now() - timestamp < SESSION_DURATION) {
        setIsAuthenticated(true);
        loadWorkflows();
        return;
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const loadWorkflows = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedWorkflows = stored ? JSON.parse(stored) : {};

    const merged = defaultWorkflows.map((w) => storedWorkflows[w.id] || w);
    const customWorkflows = Object.values(storedWorkflows).filter(
      (w: any) => !defaultWorkflows.find((dw) => dw.id === w.id)
    );

    setWorkflows([...merged, ...customWorkflows] as Workflow[]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      setPassword("");
      loadWorkflows();
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid password");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  const saveWorkflows = (updatedWorkflows: Workflow[]) => {
    const stored: Record<string, Workflow> = {};
    updatedWorkflows.forEach((w) => {
      stored[w.id] = w;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setWorkflows(updatedWorkflows);
  };

  const handleDelete = () => {
    if (deleteId) {
      const updated = workflows.filter((w) => w.id !== deleteId);
      saveWorkflows(updated);
      setDeleteId(null);
      toast.success("Workflow deleted");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Workflows Admin</h1>
          <p className="mt-2 text-muted-foreground">Manage all workflows</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="mb-6 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingId(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Workflow" : "Add New Workflow"}
              </DialogTitle>
            </DialogHeader>
            <WorkflowForm
              workflow={
                editingId ? workflows.find((w) => w.id === editingId) : undefined
              }
              onSubmit={(data) => {
                if (editingId) {
                  const updated = workflows.map((w) =>
                    w.id === editingId ? data : w
                  );
                  saveWorkflows(updated);
                  toast.success("Workflow updated");
                } else {
                  saveWorkflows([...workflows, data]);
                  toast.success("Workflow added");
                }
                setEditingId(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => (
                  <TableRow key={workflow.id} className="border-border">
                    <TableCell className="font-medium">{workflow.title}</TableCell>
                    <TableCell className="text-sm">{workflow.category}</TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {workflow.featured ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingId(workflow.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Workflow</DialogTitle>
                            </DialogHeader>
                            <WorkflowForm
                              workflow={workflow}
                              onSubmit={(data) => {
                                const updated = workflows.map((w) =>
                                  w.id === workflow.id ? data : w
                                );
                                saveWorkflows(updated);
                                toast.success("Workflow updated");
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(workflow.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => {
        if (!open) setDeleteId(null);
      }}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface WorkflowFormProps {
  workflow?: Workflow;
  onSubmit: (data: Workflow) => void;
}

function WorkflowForm({ workflow, onSubmit }: WorkflowFormProps) {
  const [form, setForm] = useState(
    workflow || {
      id: "",
      title: "",
      description: "",
      category: "Productivity" as const,
      tags: "",
      tools: "",
      problem: "",
      solution: "",
      steps: "",
      outcome: "",
      featured: false,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id: form.id,
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()),
      tools: form.tools.split(",").map((t) => t.trim()),
      problem: form.problem,
      solution: form.solution,
      steps: form.steps.split("\n").map((s) => s.trim()).filter(Boolean),
      outcome: form.outcome,
      featured: form.featured,
    };

    const result = workflowSchema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fe[issue.path[0] as string] = issue.message;
      }
      setErrors(fe);
      return;
    }

    setErrors({});
    onSubmit(result.data as Workflow);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="id" className="text-xs font-semibold uppercase tracking-wider">
            ID
          </Label>
          <Input
            id="id"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            disabled={!!workflow}
            placeholder="ai-lead-qualifier"
          />
          {errors.id && <p className="text-xs text-destructive">{errors.id}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider">
            Title
          </Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="AI Lead Qualifier"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider">
          Description
        </Label>
        <Input
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description..."
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider">
            Category
          </Label>
          <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AI Automations">AI Automations</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Productivity">Productivity</SelectItem>
              <SelectItem value="Data Automation">Data Automation</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-xs text-destructive">{errors.category}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="featured" className="text-xs font-semibold uppercase tracking-wider">
            Featured
          </Label>
          <div className="flex items-center gap-2 pt-2">
            <Checkbox
              id="featured"
              checked={form.featured}
              onCheckedChange={(checked) => setForm({ ...form, featured: checked as boolean })}
            />
            <Label htmlFor="featured" className="font-normal cursor-pointer">
              Mark as featured
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags" className="text-xs font-semibold uppercase tracking-wider">
          Tags (comma-separated)
        </Label>
        <Input
          id="tags"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          placeholder="AI, API, Slack"
        />
        {errors.tags && <p className="text-xs text-destructive">{errors.tags}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tools" className="text-xs font-semibold uppercase tracking-wider">
          Tools (comma-separated)
        </Label>
        <Input
          id="tools"
          value={form.tools}
          onChange={(e) => setForm({ ...form, tools: e.target.value })}
          placeholder="n8n, Gemini AI, Slack"
        />
        {errors.tools && <p className="text-xs text-destructive">{errors.tools}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="problem" className="text-xs font-semibold uppercase tracking-wider">
          Problem
        </Label>
        <Textarea
          id="problem"
          value={form.problem}
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
          placeholder="Describe the problem..."
          rows={3}
        />
        {errors.problem && <p className="text-xs text-destructive">{errors.problem}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="solution" className="text-xs font-semibold uppercase tracking-wider">
          Solution
        </Label>
        <Textarea
          id="solution"
          value={form.solution}
          onChange={(e) => setForm({ ...form, solution: e.target.value })}
          placeholder="Describe the solution..."
          rows={3}
        />
        {errors.solution && <p className="text-xs text-destructive">{errors.solution}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="steps" className="text-xs font-semibold uppercase tracking-wider">
          Steps (one per line)
        </Label>
        <Textarea
          id="steps"
          value={form.steps}
          onChange={(e) => setForm({ ...form, steps: e.target.value })}
          placeholder="Step 1&#10;Step 2&#10;Step 3"
          rows={4}
        />
        {errors.steps && <p className="text-xs text-destructive">{errors.steps}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="outcome" className="text-xs font-semibold uppercase tracking-wider">
          Outcome
        </Label>
        <Textarea
          id="outcome"
          value={form.outcome}
          onChange={(e) => setForm({ ...form, outcome: e.target.value })}
          placeholder="Describe the outcome..."
          rows={3}
        />
        {errors.outcome && <p className="text-xs text-destructive">{errors.outcome}</p>}
      </div>

      <Button type="submit" className="w-full">
        {workflow ? "Update Workflow" : "Add Workflow"}
      </Button>
    </form>
  );
}
