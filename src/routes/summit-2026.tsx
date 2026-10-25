import { createFileRoute } from "@tanstack/react-router";

import { FundingProgrammePage } from "@/frontend/features/funding-programme/page";

export const Route = createFileRoute("/summit-2026")({
  head: () => ({ meta: [
    { title: "RIPL Startup Summit 2026 — Gwalior" },
    { name: "description", content: "RIPL Startup Summit 2026 in Gwalior, Madhya Pradesh: pitch to jury and investors, ₹20 lakh grant opportunity, funding opportunity up to ₹5 crore, prototype grants and free stay for selected startups." },
    { property: "og:title", content: "RIPL Startup Summit 2026 — Gwalior" },
    { property: "og:description", content: "A dedicated startup summit in Gwalior with a five-stage founder journey, mentorship and investor pitches. Subject to eligibility, selection and terms." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/summit-2026" }] }),
  component: Page,
});
function Page() { return <div className="min-h-screen bg-background"><FundingProgrammePage /></div>; }
