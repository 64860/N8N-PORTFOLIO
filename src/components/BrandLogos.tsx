// Centralized brand logo registry. Use logoFor(name) to get an <img> URL.
import n8n from "@/assets/logos/n8n.svg";
import openai from "@/assets/logos/openai.svg";
import sheets from "@/assets/logos/google-sheets.svg";
import notion from "@/assets/logos/notion.svg";
import airtable from "@/assets/logos/airtable.svg";
import stripe from "@/assets/logos/stripe.svg";
import supabase from "@/assets/logos/supabase.svg";
import discord from "@/assets/logos/discord.svg";
import telegram from "@/assets/logos/telegram.svg";
import whatsapp from "@/assets/logos/whatsapp.svg";
import zapier from "@/assets/logos/zapier-dark.svg";
import gemini from "@/assets/logos/gemini.svg";
import shopify from "@/assets/logos/shopify.svg";
import sentry from "@/assets/logos/sentry.svg";
import grafana from "@/assets/logos/grafana.svg";

const map: Record<string, string> = {
  n8n,
  "n8n.io": n8n,
  openai: openai,
  "open ai": openai,
  "google sheets": sheets,
  sheets: sheets,
  "google drive": sheets,
  gmail: sheets,
  notion,
  airtable,
  stripe,
  supabase,
  discord,
  slack: discord, // fallback visual when slack unavailable
  telegram,
  whatsapp,
  zapier,
  "rest apis": zapier,
  webhooks: zapier,
  shopify,
  gemini,
  "google gemini": gemini,
  sentry,
  grafana,
};

export function logoFor(name: string): string | null {
  return map[name.trim().toLowerCase()] ?? null;
}

export type BrandLogo = { name: string; src: string };

export const featuredStack: BrandLogo[] = [
  { name: "n8n", src: n8n },
  { name: "OpenAI", src: openai },
  { name: "Google Sheets", src: sheets },
  { name: "Notion", src: notion },
  { name: "Airtable", src: airtable },
  { name: "Stripe", src: stripe },
  { name: "Supabase", src: supabase },
  { name: "Discord", src: discord },
  { name: "Telegram", src: telegram },
  { name: "WhatsApp", src: whatsapp },
  { name: "Zapier", src: zapier },
  { name: "Gemini", src: gemini },
  { name: "Shopify", src: shopify },
  { name: "Sentry", src: sentry },
];

export function BrandMark({ name, className = "" }: { name: string; className?: string }) {
  const src = logoFor(name);
  if (!src) return null;
  return <img src={src} alt={`${name} logo`} loading="lazy" className={className} />;
}
