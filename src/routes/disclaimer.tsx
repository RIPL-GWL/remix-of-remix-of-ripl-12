import { createFileRoute } from "@tanstack/react-router";
import { BilingualLegal } from "@/frontend/features/legal/bilingual-legal";
import en from "@/frontend/content/legal/disclaimer-en.md?raw";
import hi from "@/frontend/content/legal/disclaimer-hi.md?raw";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({ links: [{ rel: "canonical", href: "/disclaimer" }],
    meta: [
      { title: "Disclaimer — Rishishwar Industry Pvt. Ltd." },
      { name: "description", content: "Important notes on funding, valuation estimates, rent estimates and global market information on the RIPL website." },
      { property: "og:title", content: "Disclaimer — Rishishwar Industry" },
      { property: "og:description", content: "Important notes on funding, valuation estimates, rent estimates and global market information on the RIPL website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  return <BilingualLegal title="Disclaimer" hiTitle="अस्वीकरण" en={en} hi={hi} />;
}
