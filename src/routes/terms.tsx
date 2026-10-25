import { createFileRoute } from "@tanstack/react-router";
import { BilingualLegal } from "@/frontend/features/legal/bilingual-legal";
import en from "@/frontend/content/legal/terms-en.md?raw";

export const Route = createFileRoute("/terms")({
  head: () => ({ links: [{ rel: "canonical", href: "/terms" }],
    meta: [
      { title: "Terms & Conditions — Rishishwar Industry Pvt. Ltd." },
      { name: "description", content: "Terms that apply when you use the Rishishwar Industry website, calculators and enquiry forms." },
      { property: "og:title", content: "Terms & Conditions — Rishishwar Industry" },
      { property: "og:description", content: "Terms that apply when you use the Rishishwar Industry website, calculators and enquiry forms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <BilingualLegal title="Terms & Conditions" hiTitle="नियम एवं शर्तें" en={en} />;
}
