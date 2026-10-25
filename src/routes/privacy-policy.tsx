import { createFileRoute } from "@tanstack/react-router";
import { BilingualLegal } from "@/frontend/features/legal/bilingual-legal";
import en from "@/frontend/content/legal/privacy-en.md?raw";
import hi from "@/frontend/content/legal/privacy-hi.md?raw";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ links: [{ rel: "canonical", href: "/privacy-policy" }],
    meta: [
      { title: "Privacy Policy — Rishishwar Industry Pvt. Ltd." },
      { name: "description", content: "How Rishishwar Industry collects, uses and protects the details you share through our website forms." },
      { property: "og:title", content: "Privacy Policy — Rishishwar Industry" },
      { property: "og:description", content: "How Rishishwar Industry collects, uses and protects the details you share through our website forms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <BilingualLegal title="Privacy Policy" hiTitle="गोपनीयता नीति" en={en} hi={hi} />;
}
