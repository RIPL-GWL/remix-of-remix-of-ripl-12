import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, Award, BadgeIndianRupee, BriefcaseBusiness, Building2, ChartNoAxesCombined, ChevronDown, Code2, Compass,
  Cpu, FileCheck2, FileSignature, FlaskConical, Gavel, Gem, Globe2, GraduationCap, Handshake, Headphones, Hotel, Landmark, Layers,
  Lightbulb, Mail, MapPin, Mic, Network, PenTool, Plane, Presentation, Rocket, Scale, Server,
  ShieldCheck, Sparkles, Target, TrendingUp, Trophy, UserRoundCheck, Users, Wrench, type LucideIcon,
} from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/frontend/components/ui/accordion";
import { SiteFooter, SiteHeader } from "@/frontend/components/site-chrome";
import heroPhoto from "@/assets/investment-program-hero.webp";
import technologyPhoto from "@/assets/investment-program-technology.webp";
import legalPhoto from "@/assets/investment-program-legal.webp";
import gwaliorAsset from "@/assets/funding-gwalior-hero.webp.asset.json";
import pitchAsset from "@/assets/funding-programme-benefit-1.webp.asset.json";
import { formatRupeeWords, grantPool, opportunityRules as rules, programmeRules, registrationTotal, rewardPool } from "./rules";
import { SUMMIT_REGISTRATION_URL, ZohoRegistrationForm } from "./zoho-form";
import "./investment.css";

const grant = formatRupeeWords(grantPool());
const crore = formatRupeeWords(rules.investmentOpportunityMax);
const prototypeRange = `₹${rules.prototypeGrantMin / 1000}K–₹${rules.prototypeGrantMax / 1000}K`;
const DISCLAIMER = "All grants, rewards, benefits and funding opportunities are subject to eligibility, evaluation, selection, investor interest, applicable program guidelines and Terms & Conditions.";

const trust = ["Grant", "Prototype", "Mentorship", "Investor Connect", "Technology", "Legal Support"];
const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeIndianRupee, title: "Funding", text: "Grant opportunities and investor funding pathways." },
  { icon: FlaskConical, title: "Prototype Support", text: "Turn your idea into a working MVP." },
  { icon: Compass, title: "Mentorship", text: `${rules.mentorshipMonths} months of focused founder guidance.` },
  { icon: Handshake, title: "Investor Connect", text: "Pitch before investors and industry experts." },
  { icon: Cpu, title: "Technology", text: "Domain, website, hosting and digital setup." },
  { icon: Scale, title: "Legal Support", text: "Agreements, compliance and IP guidance." },
];
const ranks = ["1st", "2nd", "3rd", "4th", "5th"];
const prototypeUses = ["MVP Development", "Prototype Creation", "Product Development", "Technology Development", "Testing & Validation", "Proof of Concept"];
const fundingSteps = ["Business Evaluation", "Funding Readiness", "Investor Pitch", "Investor Connect", "Potential Funding"];
const audiences: { icon: LucideIcon; title: string }[] = [
  { icon: Landmark, title: "Investors" }, { icon: BriefcaseBusiness, title: "Industry Experts" },
  { icon: GraduationCap, title: "Mentors" }, { icon: Network, title: "Startup Ecosystem Stakeholders" },
];
const selectedBenefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Hotel, title: "Free Accommodation", text: "Accommodation support for eligible selected participants." },
  { icon: Plane, title: "Free One-Side Travel Support", text: "One-side ticket fare / travel support." },
  { icon: MapPin, title: "Free Gwalior Local Tour", text: "Experience Gwalior’s heritage and local attractions." },
  { icon: Mic, title: "Investor Pitching", text: "Opportunity to present before investors." },
  { icon: Compass, title: "Mentorship", text: "Business, funding and pitch guidance." },
  { icon: Users, title: "Networking", text: "Connect with investors, experts and founders." },
];
const mentorship: { icon: LucideIcon; title: string; points: string[] }[] = [
  { icon: Target, title: "Business Strategy", points: ["Business Model", "Revenue Model", "Market Positioning"] },
  { icon: Wrench, title: "Product & Prototype", points: ["MVP", "Product Validation", "Market Feedback"] },
  { icon: BadgeIndianRupee, title: "Funding Preparation", points: ["Funding Requirement", "Financial Planning", "Investor Readiness"] },
  { icon: Presentation, title: "Pitch Preparation", points: ["Pitch Deck", "Business Story", "Investor Q&A"] },
  { icon: TrendingUp, title: "Growth Strategy", points: ["Sales", "Marketing", "Customer Acquisition", "Scaling"] },
];
const technology: { icon: LucideIcon; title: string }[] = [
  { icon: Globe2, title: "Free Domain Name" }, { icon: Code2, title: "Free Website / Landing Page" },
  { icon: Layers, title: "Free Web Hosting" }, { icon: Server, title: "Server Support" },
  { icon: Cpu, title: "Software / Technology Support" }, { icon: Sparkles, title: "Basic Digital Setup" },
];
const legal: { icon: LucideIcon; title: string }[] = [
  { icon: FileCheck2, title: "Business Documentation Guidance" }, { icon: Gavel, title: "Legal Guidance" },
  { icon: FileSignature, title: "Agreements" }, { icon: ShieldCheck, title: "Compliance Guidance" },
  { icon: PenTool, title: "Trademark / IP Guidance" }, { icon: Scale, title: "Startup Legal Support" },
];
const evaluation: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Lightbulb, title: "Innovation", text: "Is the idea solving a meaningful problem?" },
  { icon: ChartNoAxesCombined, title: "Market", text: "Is there a real market opportunity?" },
  { icon: BadgeIndianRupee, title: "Business Model", text: "Can the business generate sustainable revenue?" },
  { icon: TrendingUp, title: "Scalability", text: "Can the startup grow?" },
  { icon: UserRoundCheck, title: "Execution", text: "Can the team turn the idea into reality?" },
  { icon: Gem, title: "Funding Readiness", text: "Is the startup ready for investment or funding?" },
];
const ecosystem = ["Idea", "Prototype", "Mentorship", "Business Validation", "Pitch", "Investor Connect", "Funding", "Growth", "Scale"];
const access: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: BadgeIndianRupee, label: "Funding", value: `Up to ${grant} Grant Opportunity` },
  { icon: Landmark, label: "Investment", value: `Funding Opportunity up to ${crore}` },
  { icon: FlaskConical, label: "Prototype", value: `${prototypeRange} for Top ${rules.prototypeIdeas} Ideas` },
  { icon: Award, label: "Reward", value: `₹${rules.ideaReward / 1000}K × ${rules.rewardIdeas} Selected Ideas` },
  { icon: Compass, label: "Mentorship", value: `${rules.mentorshipMonths} Months FREE` },
  { icon: Cpu, label: "Technology", value: `Up to ${formatRupeeWords(rules.technologySupportMax)} Value` },
  { icon: Scale, label: "Legal", value: "Startup Legal Support" },
  { icon: Mic, label: "Investor Pitch", value: "Selected Startups" },
  { icon: Hotel, label: "Accommodation", value: "Selected Participants" },
  { icon: Plane, label: "Travel", value: "One-Side Fare Support" },
  { icon: MapPin, label: "Gwalior Tour", value: "Selected Participants" },
  { icon: Users, label: "Networking", value: "Investors + Experts + Founders" },
];
const whyApply = [
  "Your idea can get funding.", "Your prototype can get support.", "Your startup can meet investors.",
  "Your business can get expert mentorship.", "Your technology costs can be reduced.", "Your startup can get legal guidance.",
  "Your journey can move from idea to investment.",
];
const whoCanApply = [
  "Early-Stage Startups", "Existing Startups", "Student Founders", "First-Time Entrepreneurs", "Innovators",
  "Technology Startups", "Product Startups", "Service Startups", "Scalable Business Ideas", "Founders with MVP / Prototype",
];
const finalHighlights = [
  `${grant} Grant Opportunity`, `${prototypeRange} Prototype Grant`, `₹${rules.ideaReward / 1000}K Reward for ${rules.rewardIdeas} Ideas`,
  `Up to ${crore} Funding Opportunity`, "Investor Pitching", `${rules.mentorshipMonths} Months Free Mentorship`,
  "Free Technology & Legal Support", "Travel & Accommodation Support for Selected Startups",
];
const faqs: [string, string][] = [
  ["Is the ₹5 crore funding guaranteed?", `No. The program offers a funding opportunity of up to ${crore}. Funding is subject to investor interest, due diligence, eligibility, valuation and applicable terms.`],
  ["Is a grant the same as investment?", `No. Grants (up to ${grant} in total across five ranks) are non-refundable awards decided through evaluation. Investment comes from participating investors and depends on their own decisions.`],
  ["What is the registration fee?", `The fee is ₹${programmeRules.registrationFee.toLocaleString("en-IN")} plus ${programmeRules.gstPercent}% GST (₹${registrationTotal(2).toLocaleString("en-IN")} total) for up to two people per startup. Each additional participant costs ₹${programmeRules.additionalParticipantFee.toLocaleString("en-IN")} plus GST.`],
  ["Can I apply with only an idea?", `Yes. Early-stage ideas can apply. The top ${rules.prototypeIdeas} ideas may receive prototype support, and ${rules.rewardIdeas} selected ideas may receive a ₹${rules.ideaReward.toLocaleString("en-IN")} reward.`],
  ["How is my startup evaluated?", "Applications are reviewed for innovation, market, business model, scalability, execution and funding readiness, followed by jury and senior jury rounds."],
];

function scrollToRegister(event?: React.MouseEvent) {
  event?.preventDefault();
  document.getElementById("register")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
function Cta({ label, variant = "gold" }: { label: string; variant?: "gold" | "ghost" | "crimson" }) {
  return <Button asChild variant="ghost" className={`invest-cta invest-cta-${variant}`}><a href="#register" onClick={scrollToRegister}>{label}<ArrowRight /></a></Button>;
}
function SectionHead({ eyebrow, title, children, center = false }: { eyebrow?: string; title: ReactNode; children?: ReactNode; center?: boolean }) {
  return <div className={`invest-head ${center ? "invest-head-center" : ""}`} data-reveal>
    {eyebrow && <p className="invest-eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {children && <div className="invest-lead">{children}</div>}
  </div>;
}
function Flow({ steps, tone = "light" }: { steps: string[]; tone?: "light" | "dark" }) {
  return <ol className={`invest-flow invest-flow-${tone}`} aria-label={steps.join(" to ")}>{steps.map((step, i) => <li key={step}><span>{step}</span>{i < steps.length - 1 && <ArrowRight aria-hidden="true" />}</li>)}</ol>;
}
function Counter({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(value * (1 - Math.pow(1 - t, 3)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}>{prefix}{shown.toFixed(decimals)}{suffix}</span>;
}
function useReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.classList.add("invest-animate");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    el.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [root]);
}

export function FundingProgrammePage() {
  const pageRef = useRef<HTMLElement>(null);
  useReveal(pageRef);
  return <><SiteHeader />
    <main ref={pageRef} className="invest-page">
      <section className="invest-hero">
        <img src={heroPhoto} alt="Startup founder pitching a prototype to investors in a boardroom" width={1920} height={1024} fetchPriority="high" className="invest-hero-photo" />
        <div className="invest-hero-veil" />
        <div className="page-shell invest-hero-inner">
          <div className="invest-hero-copy">
            <p className="invest-eyebrow">Startup Funding &amp; Investment Program</p>
            <h1>Turn Your Idea Into a <em>Fundable</em> &amp; <em>Scalable</em> Business</h1>
            <p className="invest-support">Free Grants • Prototype Support • Mentorship • Investor Pitch • Funding • Technology • Legal Support</p>
            <div className="invest-hero-highlights">
              <div className="invest-glass invest-glass-gold"><small>Up to</small><strong>{crore}</strong><span>Funding Opportunity</span></div>
              <div className="invest-glass"><small>Up to</small><strong>{grant}</strong><span>Non-Refundable Grant Opportunities</span></div>
            </div>
            <div className="invest-actions"><Cta label="Apply Now" /><Cta label="Submit Your Idea" variant="ghost" /></div>
            <p className="invest-positioning">“We don't just fund startups — we help them build, validate, pitch, raise and scale.”</p>
          </div>
        </div>
        <ul className="invest-trust" aria-label="Program support">{trust.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="invest-stats" aria-label="Program highlights">
        <div className="page-shell">
          <dl>
            <div><dt><Counter value={5} prefix="₹" suffix=" Cr" /></dt><dd>Funding opportunity</dd></div>
            <div><dt><Counter value={grantPool() / 100000} prefix="₹" suffix=" L" /></dt><dd>Total grant opportunity</dd></div>
            <div><dt><Counter value={rules.prototypeIdeas} /></dt><dd>Prototype grants</dd></div>
            <div><dt><Counter value={rules.rewardIdeas} /></dt><dd>Idea rewards</dd></div>
            <div><dt><Counter value={rules.mentorshipMonths} suffix=" Mo" /></dt><dd>Free mentorship</dd></div>
          </dl>
        </div>
      </section>

      <section id="about-programme" className="invest-section">
        <div className="page-shell">
          <SectionHead eyebrow="Why this program?" title={<>More Than Just <em>Funding</em></>} center>
            <p>Your startup needs more than capital. We help founders move from:</p>
          </SectionHead>
          <Flow steps={["Idea", "Prototype", "Validation", "Pitch", "Funding", "Growth"]} />
          <div className="invest-card-grid invest-grid-3">{pillars.map(({ icon: Icon, title, text }) => <article key={title} className="invest-card" data-reveal><span className="invest-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section id="grant" className="invest-section invest-crimson">
        <div className="page-shell invest-grant">
          <SectionHead eyebrow="Non-refundable grant opportunity" title={<>{grant} Total <em>Grant</em> Opportunity</>}>
            <p>Five top-performing startups share the grant pool — awarded on merit, with no repayment.</p>
            <p className="invest-note">Grants are subject to eligibility, evaluation, selection and applicable Terms &amp; Conditions.</p>
          </SectionHead>
          <div className="invest-ranks" data-reveal>
            {rules.grantAwards.map((amount, i) => <div key={amount} className="invest-rank" style={{ "--rank-fill": `${(amount / rules.grantAwards[0]) * 100}%` } as React.CSSProperties}>
              <span className="invest-rank-place">{i === 0 ? <Trophy /> : null}{ranks[i]}</span>
              <span className="invest-rank-bar"><span /></span>
              <strong>{formatRupeeWords(amount)}</strong>
            </div>)}
            <div className="invest-rank-total"><span>Total</span><strong>{grant}</strong></div>
          </div>
        </div>
      </section>

      <section className="invest-section">
        <div className="page-shell invest-duo">
          <article className="invest-feature" data-reveal>
            <p className="invest-eyebrow">Top {rules.prototypeIdeas} prototype grant</p>
            <h2>Have an Idea? <em>Build It.</em></h2>
            <div className="invest-amount"><small>Top {rules.prototypeIdeas} Ideas</small><strong>₹{rules.prototypeGrantMin.toLocaleString("en-IN")}–₹{rules.prototypeGrantMax.toLocaleString("en-IN")}</strong><span>Prototype Grant Opportunity</span></div>
            <p className="invest-sub">Support can be used for:</p>
            <ul className="invest-checks">{prototypeUses.map((use) => <li key={use}><FlaskConical aria-hidden="true" />{use}</li>)}</ul>
            <Flow steps={["Idea", "Prototype", "Validation", "Funding"]} />
            <p className="invest-note">Funding opportunities may be available after successful prototype development and evaluation.</p>
          </article>
          <article className="invest-feature invest-reward" data-reveal>
            <p className="invest-eyebrow">₹10,000 idea reward</p>
            <h2>{rules.rewardIdeas} Ideas. ₹{rules.ideaReward.toLocaleString("en-IN")} Each.</h2>
            <div className="invest-reward-coin"><Award aria-hidden="true" /><strong>₹{rules.ideaReward.toLocaleString("en-IN")}</strong><span>Flat Reward</span></div>
            <dl className="invest-reward-facts"><div><dt>For</dt><dd>{rules.rewardIdeas} Selected Ideas</dd></div><div><dt>Total reward pool</dt><dd>{formatRupeeWords(rewardPool())}</dd></div></dl>
            <blockquote>“Even early-stage ideas deserve recognition.”</blockquote>
          </article>
        </div>
      </section>

      <section id="investment" className="invest-section invest-dark">
        <div className="page-shell invest-split">
          <SectionHead eyebrow="Investment opportunity" title={<>Get Funding Opportunity Up to <em>{crore}</em></>}>
            <p>Selected and investment-ready startups may get opportunities to connect with investors and present their businesses for potential funding.</p>
            <p className="invest-note">Funding is subject to investor interest, due diligence, eligibility, valuation and applicable terms. Grant opportunity ≠ investment.</p>
            <Cta label="Apply Now" />
          </SectionHead>
          <ol className="invest-ladder" data-reveal>{fundingSteps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><b>{step}</b>{i < fundingSteps.length - 1 && <ChevronDown aria-hidden="true" />}</li>)}</ol>
        </div>
      </section>

      <section id="process" className="invest-section">
        <div className="page-shell invest-split invest-pitch">
          <div className="invest-photo" data-reveal><img src={pitchAsset.url} alt="Founders pitching their startup to an investor panel" width={592} height={298} loading="lazy" /></div>
          <div>
            <SectionHead eyebrow="Investor pitching" title={<>Put Your Startup in Front of <em>Investors</em></>}>
              <p>Selected startups can receive opportunities to present their businesses before:</p>
            </SectionHead>
            <ul className="invest-audience">{audiences.map(({ icon: Icon, title }) => <li key={title}><Icon aria-hidden="true" />{title}</li>)}</ul>
            <Flow steps={["Jury Pitch", "Senior Jury", "Investor Pitch"]} />
            <p className="invest-tagline">Your Startup. Your Pitch. Your Opportunity.</p>
          </div>
        </div>
      </section>

      <section id="benefits" className="invest-section invest-soft">
        <div className="page-shell">
          <SectionHead eyebrow="Selected startup benefits" title={<>Selected Startups Get <em>More</em></>} center />
          <div className="invest-card-grid invest-grid-3">{selectedBenefits.map(({ icon: Icon, title, text }) => <article key={title} className="invest-card invest-card-line" data-reveal><span className="invest-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="invest-gwalior" data-reveal><img src={gwaliorAsset.url} alt="Gwalior fort and palace at sunset" width={1944} height={700} loading="lazy" /><p><MapPin aria-hidden="true" /> Gwalior, Madhya Pradesh — heritage, hospitality and a founder community.</p></div>
          <p className="invest-note invest-center">Benefits are subject to eligibility, selection and applicable program guidelines.</p>
        </div>
      </section>

      <section id="mentorship" className="invest-section">
        <div className="page-shell">
          <SectionHead eyebrow={`${rules.mentorshipMonths} months free mentorship`} title={<>Build a <em>Funding-Ready</em> Startup</>} center />
          <div className="invest-card-grid invest-grid-5">{mentorship.map(({ icon: Icon, title, points }, i) => <article key={title} className="invest-card invest-mentor" data-reveal><span className="invest-step-no">{String(i + 1).padStart(2, "0")}</span><span className="invest-icon"><Icon /></span><h3>{title}</h3><ul>{points.map((p) => <li key={p}>{p}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section id="technology" className="invest-section invest-soft">
        <div className="page-shell invest-split">
          <div>
            <SectionHead eyebrow="Free technology support" title={<>Build Without Heavy <em>Initial Cost</em></>}>
              <div className="invest-amount invest-amount-inline"><small>Up to</small><strong>{formatRupeeWords(rules.technologySupportMax)}</strong><span>Technology Support Value</span></div>
            </SectionHead>
            <ul className="invest-tiles">{technology.map(({ icon: Icon, title }) => <li key={title}><Icon aria-hidden="true" />{title}</li>)}</ul>
            <p className="invest-note">Eligible startups may receive technology support with an indicative value of up to {formatRupeeWords(rules.technologySupportMax)}, subject to scope and eligibility.</p>
          </div>
          <div className="invest-photo" data-reveal><img src={technologyPhoto} alt="Startup team developing a product prototype" width={1200} height={912} loading="lazy" /></div>
        </div>
      </section>

      <section id="legal" className="invest-section">
        <div className="page-shell invest-split invest-reverse">
          <div className="invest-photo" data-reveal><img src={legalPhoto} alt="Legal advisor reviewing agreements with a startup founder" width={1200} height={912} loading="lazy" /></div>
          <div>
            <SectionHead eyebrow="Free legal support" title={<>Legal Support for Your <em>Startup</em></>} />
            <ul className="invest-tiles">{legal.map(({ icon: Icon, title }) => <li key={title}><Icon aria-hidden="true" />{title}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="evaluation" className="invest-section invest-dark">
        <div className="page-shell">
          <SectionHead eyebrow="Startup evaluation" title={<>Your Idea Will Be Evaluated for Its <em>Potential</em></>} center />
          <div className="invest-card-grid invest-grid-3">{evaluation.map(({ icon: Icon, title, text }) => <article key={title} className="invest-card invest-card-dark" data-reveal><span className="invest-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
          <Flow steps={["Jury", "Senior Jury", "Funding Opportunity"]} tone="dark" />
        </div>
      </section>

      <section className="invest-section">
        <div className="page-shell">
          <SectionHead eyebrow="Complete startup ecosystem" title={<>From Idea to <em>Scale</em></>} center />
          <ol className="invest-ecosystem" data-reveal>{ecosystem.map((step, i) => <li key={step}><span>{i + 1}</span><b>{step}</b></li>)}</ol>
        </div>
      </section>

      <section className="invest-section invest-soft">
        <div className="page-shell">
          <SectionHead eyebrow="Everything you can access" title={<>One Program. <em>Every</em> Growth Lever.</>} center />
          <div className="invest-access">{access.map(({ icon: Icon, label, value }) => <article key={label} data-reveal><Icon aria-hidden="true" /><div><small>{label}</small><strong>{value}</strong></div></article>)}</div>
        </div>
      </section>

      <section id="why-participate" className="invest-section invest-crimson">
        <div className="page-shell invest-split">
          <SectionHead eyebrow="Why apply?" title={<>Why Should <em>You</em> Apply?</>}>
            <p>IDEA → BUILD → VALIDATE → PITCH → FUND → GROW</p>
          </SectionHead>
          <ul className="invest-statements" data-reveal>{whyApply.map((line) => <li key={line}><Sparkles aria-hidden="true" />{line}</li>)}</ul>
        </div>
      </section>

      <section className="invest-section">
        <div className="page-shell">
          <SectionHead eyebrow="Who can apply?" title={<>Built for <em>Founders</em> at Every Stage</>} center />
          <ul className="invest-chips" data-reveal>{whoCanApply.map((item) => <li key={item}><Rocket aria-hidden="true" />{item}</li>)}</ul>
          <div className="invest-banner" data-reveal><p>Your idea doesn't have to be perfect. <em>It has to have potential.</em></p><Cta label="Submit Your Idea" variant="crimson" /></div>
        </div>
      </section>

      <section className="invest-final">
        <div className="page-shell">
          <p className="invest-eyebrow">Ready when you are</p>
          <h2>Your Idea Could Be Worth <em>More</em> Than You Think.</h2>
          <ul>{finalHighlights.map((item) => <li key={item}><Trophy aria-hidden="true" />{item}</li>)}</ul>
          <div className="invest-actions"><Cta label="Submit Your Startup / Idea Now" /><Cta label="Apply Now" variant="ghost" /></div>
        </div>
      </section>

      <section id="register" className="invest-section invest-register">
        <div className="page-shell">
          <SectionHead eyebrow="Registration form" title={<>Submit Your <em>Application</em></>} center>
            <p>Share your founder, startup, stage, funding and product details. Your application will be reviewed as per program guidelines.</p>
          </SectionHead>
          <div className="invest-register-actions"><Button asChild variant="ghost" className="invest-cta invest-cta-crimson"><a href={SUMMIT_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">Open Form in New Tab <ArrowRight /></a></Button></div>
          <div className="invest-form-shell"><ZohoRegistrationForm /></div>
        </div>
      </section>

      <section id="programme-faq" className="invest-section invest-soft">
        <div className="page-shell invest-faq">
          <div>
            <SectionHead eyebrow="Questions" title={<>Frequently Asked <em>Questions</em></>} />
            <aside className="invest-help"><Headphones aria-hidden="true" /><h3>Still have questions?</h3><p>Talk to the RIPL startup team.</p><Button asChild variant="ghost" className="invest-cta invest-cta-crimson"><Link to="/contact">Contact Us <Mail /></Link></Button></aside>
          </div>
          <Accordion type="single" collapsible className="invest-accordion">{faqs.map(([q, a], i) => <AccordionItem value={`faq-${i}`} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion>
        </div>
      </section>

      <p className="invest-disclaimer"><Building2 aria-hidden="true" /><span>Organised by Rishishwar Industry Private Limited (RIPL). {DISCLAIMER}</span></p>
    </main>
    <SiteFooter />
  </>;
}
