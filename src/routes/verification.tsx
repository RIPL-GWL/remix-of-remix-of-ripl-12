import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/frontend/components/site-chrome";
import { VerificationCenter } from "@/frontend/features/people/verification";

const title = "Verify Our Team Member & Documents — Rishishwar Industry";
const description = "Verify Rishishwar Industry employees, mentors and official documents using matching record details.";
export const Route = createFileRoute("/verification")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <><SiteHeader /><main className="investor-page people-page"><div className="page-shell people-section"><h1 className="sr-only">Verify Our Team Member</h1><VerificationCenter /></div></main><SiteFooter /></>,
});