import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { toast } from "sonner";
import gmail from "@/assets/contact/gmail.svg";
import linkedin from "@/assets/contact/linkedin.svg";
import github from "@/assets/contact/github-dark.svg";
import upwork from "@/assets/contact/upwork.svg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dennis Gathonjia" },
      { name: "description", content: "Get in touch about n8n automation and integration projects." },
      { property: "og:title", content: "Contact — Dennis Gathonjia" },
      { property: "og:description", content: "Get in touch about n8n automation and integration projects." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  company: z.string().trim().max(120).optional(),
  message: z.string().trim().min(1, "Tell me about your project").max(1000),
});

const tiles = [
  { label: "Email", value: "gathonjiadennis@g…", href: "mailto:gathonjiadennis@gmail.com", src: gmail },
  { label: "LinkedIn", value: "Dennis Gathonjia", href: "https://www.linkedin.com/in/dennis-gathonjia-b54a63252", src: linkedin },
  { label: "GitHub", value: "@64860", href: "https://github.com/64860", src: github },
  { label: "Upwork", value: "Hire on Upwork", href: "https://www.upwork.com/freelancers/~0119c08e78d3853c0d?mp_source=share", src: upwork },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      for (const issue of result.error.issues) fe[issue.path[0] as string] = issue.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Project inquiry from ${result.data.name}`);
    const body = encodeURIComponent(
      `${result.data.message}\n\nCompany: ${result.data.company ?? "—"}\n— ${result.data.name} (${result.data.email})`
    );
    window.location.href = `mailto:gathonjiadennis@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Let's build something <br className="hidden sm:block" /> that runs itself.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Tell me about your processes — I'll reply within 24 hours with a quick assessment and next steps.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {tiles.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target={t.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-[color:var(--surface)]">
                  <img src={t.src} alt="" className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.label}
                  </div>
                  <div className="truncate text-sm font-medium text-foreground">{t.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <Card className="border-border">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Company</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  maxLength={120}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Project details</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="What would you like to automate?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={1000}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                Send Message <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
