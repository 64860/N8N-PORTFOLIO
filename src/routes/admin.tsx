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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Workflow, workflows as defaultWorkflows } from "@/data/workflows";
import { RichTextEditor } from "@/components/RichTextEditor";
import { supabase } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Upload, X, Loader2, Mail } from "lucide-react";

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
  const [editDialogId, setEditDialogId] = useState<string | null>(null);

  const [messageCount, setMessageCount] = useState(0);

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

  // Fetch message count when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .then(({ count }) => {
          if (count !== null) setMessageCount(count);
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

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

  type Message = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
  };

  function MessagesPanel() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Message | null>(null);

    useEffect(() => {
      supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            toast.error("Failed to load messages");
            console.error(error);
          } else {
            setMessages(data || []);
          }
          setLoading(false);
        });
    }, []);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {messages.length} message{messages.length !== 1 ? "s" : ""} received
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLoading(true);
              supabase
                .from("contact_messages")
                .select("*")
                .order("created_at", { ascending: false })
                .then(({ data, error }) => {
                  if (error) {
                    toast.error("Failed to refresh");
                  } else {
                    setMessages(data || []);
                  }
                  setLoading(false);
                });
            }}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Refresh"}
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
              <Mail className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                className="cursor-pointer border-border transition-colors hover:bg-muted/30"
                onClick={() => setSelected(selected?.id === msg.id ? null : msg)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{msg.name}</span>
                        <span className="text-xs text-muted-foreground">{msg.email}</span>
                      </div>
                      {msg.company && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{msg.company}</p>
                      )}
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {msg.message}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {selected?.id === msg.id && (
                    <div className="mt-3 border-t border-border pt-3">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {msg.message}
                      </p>
                      <a
                        href={`mailto:${msg.email}?subject=Re: Project inquiry`}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-[color:var(--brand)] hover:underline"
                      >
                        Reply via email →
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 text-muted-foreground">Manage workflows and messages</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs defaultValue="workflows">
        <TabsList className="mb-6">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            <span className="ml-1.5 rounded-full bg-muted-foreground/10 px-1.5 py-0.5 text-[10px] font-medium">
              {messageCount}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="flex justify-end">
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
                            <Dialog open={editDialogId === workflow.id} onOpenChange={(open) => {
                              if (!open) setEditDialogId(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingId(workflow.id);
                                    setEditDialogId(workflow.id);
                                  }}
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
                                    setEditDialogId(null);
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
        </TabsContent>

        <TabsContent value="messages">
          <MessagesPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface WorkflowFormProps {
  workflow?: Workflow;
  onSubmit: (data: Workflow) => void;
}

/** Converts a selected image file to a base64 data URL */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

function toForm(w?: Workflow) {
  if (!w) return null;
  return {
    id: w.id,
    title: w.title,
    description: w.description,
    category: w.category,
    tags: Array.isArray(w.tags) ? w.tags.join(", ") : w.tags || "",
    tools: Array.isArray(w.tools) ? w.tools.join(", ") : w.tools || "",
    problem: w.problem,
    solution: w.solution,
    steps: Array.isArray(w.steps) ? w.steps.join("\n") : w.steps || "",
    outcome: w.outcome,
    featured: w.featured ?? false,
    caseStudy: w.caseStudy || "",
  };
}

function WorkflowForm({ workflow, onSubmit }: WorkflowFormProps) {
  const [form, setForm] = useState(
    toForm(workflow) || {
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
      caseStudy: "",
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState<string | undefined>(
    workflow?.image
  );

  // Reset when workflow changes
  useEffect(() => {
    setSavedImageUrl(workflow?.image);
    setSelectedFile(null);
    setImagePreview(null);
  }, [workflow?.id]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only .png, .jpg, .jpeg, and .webp files are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    const result = workflowSchema.safeParse({
      ...data,
      tags: form.tags,
      tools: form.tools,
      steps: form.steps,
    });

    if (!result.success) {
      const fe: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fe[issue.path[0] as string] = issue.message;
      }
      setErrors(fe);
      return;
    }

    setErrors({});
    setIsProcessing(true);

    try {
      let finalImage = savedImageUrl;

      if (selectedFile) {
        const base64 = await fileToBase64(selectedFile);
        finalImage = base64;
        setSavedImageUrl(base64);
        toast.success("Image processed successfully");
      }

      setIsProcessing(false);
      onSubmit({
        ...data,
        image: finalImage,
        caseStudy: form.caseStudy || undefined,
      } as Workflow);
    } catch (error) {
      setIsProcessing(false);
      const message =
        error instanceof Error ? error.message : "Failed to process image";
      toast.error(message);
    }
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

      {/* Image Upload Section */}
      <div className="space-y-2 rounded-lg border border-border p-4">
        <Label className="text-xs font-semibold uppercase tracking-wider">
          Card Image
        </Label>

        {/* Show the saved or preview image */}
        {savedImageUrl && !selectedFile && (
          <div className="relative w-full overflow-hidden rounded-md border border-border">
            <img
              src={savedImageUrl}
              alt="Current card image"
              className="h-40 w-full object-cover"
            />
          </div>
        )}

        {/* New file preview */}
        {imagePreview && selectedFile && (
          <div className="relative w-full overflow-hidden rounded-md border border-border">
            <img
              src={imagePreview}
              alt="New image preview"
              className="h-40 w-full object-cover"
            />
            <button
              type="button"
              onClick={removeSelectedFile}
              className="absolute right-2 top-2 rounded-full bg-background/80 p-1 shadow-sm transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* File input */}
        <div className="flex items-center gap-3">
          <Label
            htmlFor="image"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Upload className="h-4 w-4" />
            {savedImageUrl || imagePreview ? "Change Image" : "Choose Image"}
          </Label>
          <Input
            id="image"
            type="file"
            accept=".png,.jpg,.jpeg,.webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          {selectedFile && (
            <span className="text-xs text-muted-foreground">
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
            </span>
          )}
          {savedImageUrl && !selectedFile && (
            <span className="text-xs text-muted-foreground">Image saved</span>
          )}
        </div>
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

      {/* Case Study (Rich Text) */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider">
          Case Study (full-page content)
        </Label>
        <RichTextEditor
          value={form.caseStudy}
          onChange={(html) => setForm({ ...form, caseStudy: html })}
          placeholder="Write the full case study here with headings, lists, links..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {selectedFile ? "Processing..." : "Saving..."}
          </>
        ) : (
          workflow ? "Update Workflow" : "Add Workflow"
        )}
      </Button>
    </form>
  );
}