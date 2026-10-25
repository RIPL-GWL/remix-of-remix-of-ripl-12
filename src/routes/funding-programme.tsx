import { createFileRoute } from "@tanstack/react-router";

import { FundingProgrammePage } from "@/frontend/features/funding-programme/page";

export const Route = createFileRoute("/funding-programme")({
  head: () => ({ meta: [
    { title: "RIPL Startup Funding & Investment Program — Gwalior" },
    { name: "description", content: "Turn your idea into a fundable, scalable business: funding opportunity up to ₹5 crore, ₹20 lakh grant opportunity, prototype grants, mentorship, investor pitching, technology and legal support." },
    { property: "og:title", content: "Startup Funding & Investment Program — RIPL" },
    { property: "og:description", content: "Build, validate, pitch, raise and scale with grants, prototype support, mentorship and investor connections. Subject to eligibility, selection and terms." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/funding-programme" }] }),
  component: Page,
});
function Page() { return <div className="min-h-screen bg-background"><FundingProgrammePage /></div>; }
