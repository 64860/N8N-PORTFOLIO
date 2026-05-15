export type Workflow = {
  id: string;
  title: string;
  description: string;
  category: "AI Automations" | "E-commerce" | "Productivity" | "Data Automation";
  tags: string[];
  tools: string[];
  problem: string;
  solution: string;
  steps: string[];
  outcome: string;
  featured?: boolean;
  image?: string;
  /** Rich HTML content for the detailed case study page */
  caseStudy?: string;
};

export const workflows: Workflow[] = [
  {
    id: "ai-lead-qualifier",
    title: "AI Lead Qualifier",
    description: "Auto-scores inbound leads with Gemini and routes hot ones to Slack.",
    category: "AI Automations",
    tags: ["AI", "API", "Slack"],
    tools: ["n8n", "Gemini AI", "Slack", "Google Sheets"],
    problem: "Sales reps wasted hours triaging unqualified form leads.",
    solution: "An n8n workflow that captures form submissions, asks Gemini to score intent, and pushes qualified leads to Slack with a summary.",
    steps: [
      "Webhook receives new lead from website form",
      "Gemini scores intent and extracts company info",
      "Row appended to Google Sheets CRM",
      "Hot leads posted to #sales Slack channel",
      "Cold leads added to nurture sequence",
    ],
    outcome: "Sales team responds to hot leads within 5 minutes.",
    featured: true,
  },
  {
    id: "shopify-order-sync",
    title: "Shopify → Sheets Order Sync",
    description: "Streams new Shopify orders into a finance spreadsheet in real time.",
    category: "E-commerce",
    tags: ["E-commerce", "API"],
    tools: ["n8n", "Shopify", "Google Sheets", "Gmail"],
    problem: "Finance team manually exported orders weekly.",
    solution: "Webhook-driven sync that mirrors orders, refunds, and fulfillment events to a single sheet.",
    steps: [
      "Shopify webhook fires on order created",
      "Workflow normalizes line items and totals",
      "Row written to Orders sheet",
      "Daily summary emailed via Gmail",
    ],
    outcome: "Saved 6 hours of manual work per week.",
  },
  {
    id: "gmail-triage",
    title: "Gmail AI Triage",
    description: "Classifies inbox messages and drafts replies with OpenAI.",
    category: "AI Automations",
    tags: ["AI", "Productivity"],
    tools: ["n8n", "Gmail", "OpenAI"],
    problem: "High-volume inbox with slow response times.",
    solution: "Polls Gmail, classifies messages by intent, and drafts contextual replies for review.",
    steps: [
      "Poll Gmail every 5 minutes",
      "OpenAI classifies and summarizes",
      "Draft reply created for human approval",
      "Labels applied automatically",
    ],
    outcome: "Cut average reply time by 70%.",
  },
  {
    id: "drive-onboarding",
    title: "Client Onboarding Folders",
    description: "Spins up a Google Drive workspace per new client signup.",
    category: "Productivity",
    tags: ["Google Workspace", "Productivity"],
    tools: ["n8n", "Google Drive", "Gmail", "Google Sheets"],
    problem: "Manual folder setup delayed every kickoff.",
    solution: "Trigger creates a templated Drive folder, shares it, and emails the client a welcome packet.",
    steps: [
      "New row in Clients sheet triggers workflow",
      "Drive folder cloned from template",
      "Permissions granted to client email",
      "Welcome email sent with links",
    ],
    outcome: "Onboarding goes live in under 30 seconds.",
  },
  {
    id: "api-data-pipeline",
    title: "Multi-API Data Pipeline",
    description: "Aggregates metrics from 4 SaaS APIs into a unified daily report.",
    category: "Data Automation",
    tags: ["API", "Data"],
    tools: ["n8n", "REST APIs", "Google Sheets"],
    problem: "Reporting required logging into multiple dashboards.",
    solution: "Scheduled workflow pulls from each API, normalizes the schema, and writes a daily snapshot.",
    steps: [
      "Cron triggers at 7am",
      "Parallel HTTP requests to each API",
      "Data merged and validated",
      "Snapshot appended to dashboard sheet",
    ],
    outcome: "One source of truth, zero manual exports.",
  },
  {
    id: "support-ticket-router",
    title: "Support Ticket Router",
    description: "Routes incoming support requests to the right team via Slack.",
    category: "Productivity",
    tags: ["AI", "Slack"],
    tools: ["n8n", "Webhooks", "OpenAI", "Slack"],
    problem: "Tickets sat in a shared inbox waiting for triage.",
    solution: "AI classifies tickets by topic and pings the on-call engineer for that area.",
    steps: [
      "Webhook from helpdesk fires",
      "OpenAI tags topic and priority",
      "Slack DM sent to on-call rotation",
      "Ticket updated with assignee",
    ],
    outcome: "First-response time dropped from hours to minutes.",
  },
];

export const workflowCategories = [
  "All",
  "AI Automations",
  "E-commerce",
  "Productivity",
  "Data Automation",
] as const;
