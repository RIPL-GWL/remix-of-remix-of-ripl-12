import { createFileRoute } from "@tanstack/react-router";

import { InvestmentProgramPage } from "@/frontend/features/funding-programme/investment-page";

export const Route = createFileRoute("/startup-investment-program")({
  head: () => ({ meta: [
    { title: "Startup Funding & Investment Program — RIPL" },
    { name: "description", content: "Funding opportunity up to ₹5 crore, ₹20 lakh grant opportunity, prototype grants, mentorship, investor pitching, technology and legal support for startups." },
    { property: "og:title", content: "Startup Funding & Investment Program — RIPL" },
    { property: "og:description", content: "Build, validate, pitch, raise and scale with RIPL. Subject to eligibility, selection and terms." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/startup-investment-program" }] }),
  component: Page,
});
function Page() { return <div className="min-h-screen bg-background"><InvestmentProgramPage /></div>; }
