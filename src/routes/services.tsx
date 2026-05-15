import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Dennis Gathonjia" },
      { name: "description", content: "n8n setup, API integrations, AI workflows, and custom automation services." },
      { property: "og:title", content: "Services — Dennis Gathonjia" },
      { property: "og:description", content: "n8n setup, API integrations, AI workflows, and custom automation services." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    title: "n8n Automation Setup",
    desc: "End-to-end n8n deployment, workflow design, and self-hosting on your infrastructure.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Waveform / flow lines */}
        <path d="M10 90 Q 40 30, 70 60 T 130 40 T 190 80" stroke="#534AB7" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M10 100 Q 40 50, 70 75 T 130 55 T 190 90" stroke="#534AB7" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <circle cx="10" cy="90" r="3" fill="#534AB7" />
        <circle cx="190" cy="80" r="3" fill="#534AB7" />
        {/* Small nodes */}
        <circle cx="70" cy="60" r="2.5" fill="#534AB7" opacity="0.6" />
        <circle cx="130" cy="40" r="2.5" fill="#534AB7" opacity="0.6" />
      </svg>
    ),
  },
  {
    title: "API Integrations",
    desc: "Connect any REST or webhook API with retries, validation and error handling.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Starburst / radial connections */}
        <circle cx="100" cy="60" r="12" fill="#534AB7" />
        <circle cx="100" cy="60" r="6" fill="white" />
        {/* Radial lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 100 + 35 * Math.cos(rad);
          const y2 = 60 + 35 * Math.sin(rad);
          return (
            <line key={i} x1={100} y1={60} x2={x2} y2={y2} stroke="#534AB7" strokeWidth="1.5" strokeLinecap="round" opacity={0.4 + i * 0.06} />
          );
        })}
        {/* Endpoint dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + 35 * Math.cos(rad);
          const cy = 60 + 35 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="2.5" fill="#534AB7" opacity="0.7" />;
        })}
      </svg>
    ),
  },
  {
    title: "Google Workspace",
    desc: "Automate Gmail, Drive, Sheets and Calendar across your team.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Concentric circles */}
        <circle cx="100" cy="60" r="48" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.25" />
        <circle cx="100" cy="60" r="36" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.4" />
        <circle cx="100" cy="60" r="24" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.55" />
        <circle cx="100" cy="60" r="12" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.7" />
        <circle cx="100" cy="60" r="4" fill="#534AB7" />
        {/* Connect rings with small arcs */}
        <path d="M100 36 A 24 24 0 0 1 124 60" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M100 24 A 36 36 0 0 0 64 60" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.35" />
      </svg>
    ),
  },
  {
    title: "AI Workflows",
    desc: "Embed Gemini or OpenAI into your processes with structured outputs.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Neural net node diagram */}
        {/* Layer 1 (input) */}
        <circle cx="40" cy="30" r="5" fill="#534AB7" />
        <circle cx="40" cy="60" r="5" fill="#534AB7" />
        <circle cx="40" cy="90" r="5" fill="#534AB7" />
        {/* Layer 2 (hidden) */}
        <circle cx="100" cy="20" r="5" fill="#534AB7" opacity="0.8" />
        <circle cx="100" cy="45" r="5" fill="#534AB7" opacity="0.8" />
        <circle cx="100" cy="75" r="5" fill="#534AB7" opacity="0.8" />
        <circle cx="100" cy="100" r="5" fill="#534AB7" opacity="0.8" />
        {/* Layer 3 (output) */}
        <circle cx="160" cy="40" r="5" fill="#534AB7" />
        <circle cx="160" cy="80" r="5" fill="#534AB7" />
        {/* Connections L1->L2 */}
        {[
          [0,0],[0,1],[0,2],[0,3],
          [1,0],[1,1],[1,2],[1,3],
          [2,0],[2,1],[2,2],[2,3],
        ].map(([l1, l2], i) => {
          const y1 = [30, 60, 90][l1];
          const y2 = [20, 45, 75, 100][l2];
          return <line key={i} x1={45} y1={y1} x2={95} y2={y2} stroke="#534AB7" strokeWidth="0.7" opacity="0.3" />;
        })}
        {/* Connections L2->L3 */}
        {[
          [0,0],[0,1],[1,0],[1,1],[2,0],[2,1],[3,0],[3,1],
        ].map(([l2, l3], i) => {
          const y1 = [20, 45, 75, 100][l2];
          const y2 = [40, 80][l3];
          return <line key={`o${i}`} x1={105} y1={y1} x2={155} y2={y2} stroke="#534AB7" strokeWidth="0.7" opacity="0.3" />;
        })}
      </svg>
    ),
  },
  {
    title: "E-commerce Automation",
    desc: "Sync orders, inventory and notifications across Shopify and your stack.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Grid / data table lines */}
        <rect x="15" y="20" width="170" height="80" rx="4" stroke="#534AB7" strokeWidth="1.5" fill="none" />
        {/* Header row */}
        <line x1="15" y1="45" x2="185" y2="45" stroke="#534AB7" strokeWidth="1.5" />
        {/* Divider */}
        <line x1="15" y1="65" x2="185" y2="65" stroke="#534AB7" strokeWidth="1" opacity="0.3" />
        <line x1="15" y1="83" x2="185" y2="83" stroke="#534AB7" strokeWidth="1" opacity="0.3" />
        {/* Column dividers */}
        <line x1="70" y1="20" x2="70" y2="100" stroke="#534AB7" strokeWidth="0.7" opacity="0.2" />
        <line x1="130" y1="20" x2="130" y2="100" stroke="#534AB7" strokeWidth="0.7" opacity="0.2" />
        {/* Sample data cells (filled) */}
        <rect x="20" y="50" width="40" height="10" rx="2" fill="#534AB7" opacity="0.12" />
        <rect x="75" y="50" width="50" height="10" rx="2" fill="#534AB7" opacity="0.12" />
        <rect x="20" y="70" width="40" height="10" rx="2" fill="#534AB7" opacity="0.08" />
        <rect x="75" y="70" width="50" height="10" rx="2" fill="#534AB7" opacity="0.08" />
        {/* Header column glow */}
        <rect x="20" y="26" width="40" height="4" rx="2" fill="#534AB7" opacity="0.5" />
        <rect x="75" y="26" width="50" height="4" rx="2" fill="#534AB7" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Custom Business Workflows",
    desc: "Tailored systems mapped to your exact internal operations.",
    illustration: (
      <svg viewBox="0 0 200 120" fill="none" className="h-full w-full max-w-[200px]">
        {/* Interlocking shapes / Venn diagram */}
        <g opacity="0.85">
          {/* Left shape — rounded square with gear teeth */}
          <rect x="25" y="35" width="60" height="50" rx="8" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.06" />
          {/* Inner detail */}
          <circle cx="55" cy="60" r="12" stroke="#534AB7" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="55" cy="60" r="5" fill="#534AB7" opacity="0.4" />
          {/* Right shape — diamond */}
          <path d="M130 20 L170 60 L130 100 L90 60 Z" stroke="#534AB7" strokeWidth="1.5" fill="#534AB7" fillOpacity="0.06" />
          <path d="M130 35 L155 60 L130 85 L105 60 Z" stroke="#534AB7" strokeWidth="1" fill="none" opacity="0.35" />
          {/* Connection lines */}
          <line x1="85" y1="50" x2="95" y2="45" stroke="#534AB7" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 3" />
          <line x1="85" y1="70" x2="95" y2="75" stroke="#534AB7" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 3" />
        </g>
      </svg>
    ),
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Services</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          What I help teams ship
        </h1>
        <p className="mt-3 text-muted-foreground">
          From a single workflow to a full automation backbone — picked, scoped and shipped.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="flex flex-col overflow-hidden rounded-xl border border-[#E5E5E5] bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Illustration area — tall, light gray bg */}
            <div className="flex h-44 items-center justify-center bg-[#F5F5F5]">
              {s.illustration}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold tracking-tight text-neutral-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-neutral-900">Not sure which fits?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600">
          Send a quick description of the workflow — I'll suggest the right scope.
        </p>
        <Button asChild className="mt-5">
          <Link to="/contact">Talk to me <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}