import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "./ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import heroPhoto from "@/assets/investment-program-hero.webp";
import "./funding-popup.css";

const fundingPaths = new Set([
  "/",
  "/fund-your-business", "/fund-your-startup", "/funding-programme",
  "/startup-with-ripl", "/scale-your-startup", "/our-services/funding-support", "/summit-2026",
]);

const highlights = [
  ["Up to ₹5 Crore", "Funding opportunity"],
  ["₹20 Lakh", "Grant opportunity"],
  ["₹25K–₹50K", "Prototype grants"],
  ["3 Months", "Free mentorship"],
];

export function FundingPopup() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    if (!fundingPaths.has((pathname.replace(/\/$/, "") || "/")) || hash === "register") return;
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  async function register() {
    setOpen(false);
    await navigate({ to: "/summit-2026", hash: "register" });
    window.requestAnimationFrame(() => {
      document.getElementById("register")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  }

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogPortal>
      <DialogOverlay className="funding-popup-overlay" />
      <DialogPrimitive.Content className="funding-popup" onCloseAutoFocus={(event) => event.preventDefault()}>
        <img loading="lazy" decoding="async" src={heroPhoto} alt="" width={1920} height={1024} className="funding-popup-photo" />
        <div className="funding-popup-body">
          <p className="funding-popup-eyebrow">RIPL Startup Summit 2026 · 29–31 December · Gwalior</p>
          <DialogTitle className="funding-popup-title">Turn Your Idea Into a <em>Fundable</em> Business</DialogTitle>
          <DialogDescription className="funding-popup-text">Three days of jury and investor pitches, grants, prototype support and mentorship in Gwalior — registrations are open.</DialogDescription>
          <dl className="funding-popup-facts">{highlights.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
          <Button className="funding-popup-register" onClick={register}>Register for Summit 2026 <ArrowRight /></Button>
          <p className="funding-popup-terms">Subject to eligibility, evaluation, selection, investor interest and Terms &amp; Conditions. Funding is not guaranteed.</p>
        </div>
        <DialogClose asChild><Button variant="ghost" size="icon" className="funding-popup-close" aria-label="Close funding popup"><X /></Button></DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  </Dialog>;
}
