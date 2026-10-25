import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, BadgeIndianRupee, BriefcaseBusiness, Building2, CalendarCheck, Car, ChartNoAxesCombined, ClipboardCheck, Code2, Compass, Cpu, FileCheck2, FilePenLine, FileSignature, FlaskConical, Gavel, Gem, Globe2, GraduationCap, Handshake, Headphones, Hotel, Landmark, Layers, Lightbulb, MapPin, Mic, Network, PenTool, Plane, Presentation, Rocket, Scale, ScanSearch, Server, ShieldCheck, Sparkles, Star, Target, TrendingUp, Trophy, UserRoundCheck, Users, Utensils, Wrench, type LucideIcon } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/frontend/components/ui/accordion";
import heroPhoto from "@/assets/funding-gwalior-hero.webp.asset.json";
import supportPhotos from "@/assets/funding-support-photos.webp.asset.json";
import logo from "@/assets/header-wordmark-dark.webp.asset.json";
import technologyPhoto from "@/assets/investment-program-technology.webp";
import legalPhoto from "@/assets/investment-program-legal.webp";
import { formatRupeeWords, grantPool, opportunityRules as rules, programmeRules, registrationTotal, rewardPool } from "./rules";
import { CalendarDays } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/frontend/components/site-chrome";
import { SUMMIT_REGISTRATION_URL, ZohoRegistrationForm } from "./zoho-form";
import benefit0Asset from "@/assets/funding-programme-benefit-0.webp.asset.json";
import benefit1Asset from "@/assets/funding-programme-benefit-1.webp.asset.json";
import benefit2Asset from "@/assets/funding-programme-benefit-2.webp.asset.json";
import benefit3Asset from "@/assets/funding-programme-benefit-3.webp.asset.json";
import benefit4Asset from "@/assets/funding-programme-benefit-4.webp.asset.json";
import benefit5Asset from "@/assets/funding-programme-benefit-5.webp.asset.json";
import "./programme-extra.css";

const hero = { url: heroPhoto.url };
const supportPhotoUrl = supportPhotos.url;
const benefit4 = benefit4Asset.url;
const grant = formatRupeeWords(grantPool());
const crore = formatRupeeWords(rules.investmentOpportunityMax);
const techValue = formatRupeeWords(rules.technologySupportMax);
const prototypeRange = `₹${rules.prototypeGrantMin.toLocaleString("en-IN")}–₹${rules.prototypeGrantMax.toLocaleString("en-IN")}`;
const DISCLAIMER = "All grants, rewards, benefits and funding opportunities are subject to eligibility, evaluation, selection, investor interest, applicable program guidelines and Terms & Conditions.";

const benefits = [
  { icon: Users, title: "Mentor Support", text: "Get guidance from experienced mentors to refine your business idea and pitch.", image: benefit0Asset.url },
  { icon: Handshake, title: "Investor Connect", text: "Pitch to investors and connect with industry experts.", image: benefit1Asset.url },
  { icon: ClipboardCheck, title: "Business Evaluation", text: "Understand your startup’s strengths and growth potential.", image: benefit2Asset.url },
  { icon: Users, title: "Strategic Networking", text: "Connect with founders, industry leaders and ecosystem partners.", image: benefit3Asset.url },
  { icon: Mic, title: "National Visibility", text: "Showcase your startup on a national platform.", image: benefit4 },
  { icon: ChartNoAxesCombined, title: "Growth Support", text: "Access opportunities to scale your business on a larger platform.", image: benefit5Asset.url },
];
const journey = [
  { icon: FilePenLine, title: "Register", text: "Submit your startup details to the RIPL funding team." },
  { icon: ScanSearch, title: "Startup Scanning", text: `Within ${programmeRules.scanningDays} days, RIPL evaluates your startup, understands your business and provides a rating.` },
  { icon: Users, title: "First Pitch", text: "Pitch your startup to our jury panel with support from RIPL mentors." },
  { icon: Star, title: "Senior Jury Pitch", text: "Selected startups pitch to the senior jury panel with continued mentor support." },
  { icon: Mic, title: "Investor Pitch", text: "Final selected startups pitch to participating investors for potential funding." },
];
const support = [
  { icon: Hotel, title: "Accommodation", note: "Stay" },
  { icon: Utensils, title: "Food", note: "Meals" },
  { icon: Plane, title: "One-Side Travel Ticket", note: "Fare support" },
  { icon: Car, title: "Local Travel", note: "In Gwalior" },
  { icon: MapPin, title: "Local Tour", note: "Gwalior highlights" },
];
const pillars = [
  { icon: BadgeIndianRupee, title: "Funding" }, { icon: FlaskConical, title: "Prototype Support" }, { icon: Compass, title: "Mentorship" },
  { icon: Handshake, title: "Investor Connect" }, { icon: Cpu, title: "Technology" }, { icon: Scale, title: "Legal Support" },
];
const ranks = ["1st", "2nd", "3rd", "4th", "5th"];
const prototypeUses = ["MVP Development", "Prototype Creation", "Product Development", "Technology Development", "Testing & Validation", "Proof of Concept"];
const fundingSteps = ["Business Evaluation", "Funding Readiness", "Investor Pitch", "Investor Connect", "Potential Funding"];
const audiences = [
  { icon: Landmark, title: "Investors" }, { icon: BriefcaseBusiness, title: "Industry Experts" },
  { icon: GraduationCap, title: "Mentors" }, { icon: Network, title: "Startup Ecosystem Stakeholders" },
];
const selectedBenefits = [
  { icon: Hotel, title: "Free Accommodation", text: "Accommodation support for eligible selected participants." },
  { icon: Plane, title: "Free One-Side Travel Support", text: "One-side ticket fare / travel support." },
  { icon: MapPin, title: "Free Gwalior Local Tour", text: "Experience Gwalior’s heritage and local attractions." },
  { icon: Mic, title: "Investor Pitching", text: "Opportunity to present before investors." },
  { icon: Compass, title: "Mentorship", text: "Business, funding and pitch guidance." },
  { icon: Users, title: "Networking", text: "Connect with investors, experts and founders." },
];
const mentorship = [
  { icon: Target, title: "Business Strategy", points: ["Business Model", "Revenue Model", "Market Positioning"] },
  { icon: Wrench, title: "Product & Prototype", points: ["MVP", "Product Validation", "Market Feedback"] },
  { icon: BadgeIndianRupee, title: "Funding Preparation", points: ["Funding Requirement", "Financial Planning", "Investor Readiness"] },
  { icon: Presentation, title: "Pitch Preparation", points: ["Pitch Deck", "Business Story", "Investor Q&A"] },
  { icon: TrendingUp, title: "Growth Strategy", points: ["Sales", "Marketing", "Customer Acquisition", "Scaling"] },
];
const technology = [
  { icon: Globe2, title: "Free Domain Name" }, { icon: Code2, title: "Free Website / Landing Page" }, { icon: Layers, title: "Free Web Hosting" },
  { icon: Server, title: "Server Support" }, { icon: Cpu, title: "Software / Technology Support" }, { icon: Sparkles, title: "Basic Digital Setup" },
];
const legal = [
  { icon: FileCheck2, title: "Business Documentation Guidance" }, { icon: Gavel, title: "Legal Guidance" }, { icon: FileSignature, title: "Agreements" },
  { icon: ShieldCheck, title: "Compliance Guidance" }, { icon: PenTool, title: "Trademark / IP Guidance" }, { icon: Scale, title: "Startup Legal Support" },
];
const evaluation = [
  { icon: Lightbulb, title: "Innovation", text: "Is the idea solving a meaningful problem?" },
  { icon: ChartNoAxesCombined, title: "Market", text: "Is there a real market opportunity?" },
  { icon: BadgeIndianRupee, title: "Business Model", text: "Can the business generate sustainable revenue?" },
  { icon: TrendingUp, title: "Scalability", text: "Can the startup grow?" },
  { icon: UserRoundCheck, title: "Execution", text: "Can the team turn the idea into reality?" },
  { icon: Gem, title: "Funding Readiness", text: "Is the startup ready for investment or funding?" },
];
const ecosystem = ["Idea", "Prototype", "Mentorship", "Business Validation", "Pitch", "Investor Connect", "Funding", "Growth", "Scale"];
const access = [
  { icon: BadgeIndianRupee, label: "Funding", value: `Up to ${grant} Grant Opportunity` },
  { icon: Landmark, label: "Investment", value: `Funding Opportunity up to ${crore}` },
  { icon: FlaskConical, label: "Prototype", value: `₹25K–₹50K for Top ${rules.prototypeIdeas} Ideas` },
  { icon: Award, label: "Reward", value: `₹10K × ${rules.rewardIdeas} Selected Ideas` },
  { icon: Compass, label: "Mentorship", value: `${rules.mentorshipMonths} Months FREE` },
  { icon: Cpu, label: "Technology", value: `Up to ${techValue} Value` },
  { icon: Scale, label: "Legal", value: "Startup Legal Support" },
  { icon: Mic, label: "Investor Pitch", value: "Selected Startups" },
  { icon: Hotel, label: "Accommodation", value: "Selected Participants" },
  { icon: Plane, label: "Travel", value: "One-Side Fare Support" },
  { icon: MapPin, label: "Gwalior Tour", value: "Selected Participants" },
  { icon: Users, label: "Networking", value: "Investors + Experts + Founders" },
];
const whyApply = [
  "Your idea can get funding.", "Your prototype can get support.", "Your startup can meet investors.", "Your business can get expert mentorship.",
  "Your technology costs can be reduced.", "Your startup can get legal guidance.", "Your journey can move from idea to investment.",
];
const eligibility = [
  { icon: Rocket, title: "Early-Stage Startups" }, { icon: Building2, title: "Existing Startups" }, { icon: GraduationCap, title: "Student Founders" },
  { icon: Sparkles, title: "First-Time Entrepreneurs" }, { icon: Lightbulb, title: "Innovators" }, { icon: Cpu, title: "Technology Startups" },
  { icon: Layers, title: "Product Startups" }, { icon: BriefcaseBusiness, title: "Service Startups" }, { icon: TrendingUp, title: "Scalable Business Ideas" },
  { icon: FlaskConical, title: "Founders with MVP / Prototype" },
];
const finalHighlights = [
  `${grant} Grant Opportunity`, `₹25K–₹50K Prototype Grant`, `₹10K Reward for ${rules.rewardIdeas} Ideas`, `Up to ${crore} Funding Opportunity`,
  "Investor Pitching", `${rules.mentorshipMonths} Months Free Mentorship`, "Free Technology & Legal Support", "Travel & Accommodation Support for Selected Startups",
];
const faqs = [
  ["What is the registration fee?", `The fee is ₹${programmeRules.registrationFee.toLocaleString("en-IN")} plus ${programmeRules.gstPercent}% GST (₹${registrationTotal(2).toLocaleString("en-IN")} total) per startup for up to two people. Each additional participant costs ₹${programmeRules.additionalParticipantFee.toLocaleString("en-IN")} plus ${programmeRules.gstPercent}% GST (₹${(registrationTotal(3) - registrationTotal(2)).toLocaleString("en-IN")} total).`],
  ["Who can participate?", "Early-stage and existing startups, student founders, first-time entrepreneurs, innovators, technology, product and service startups, scalable business ideas and founders with an MVP or prototype. Participation is subject to review and selection."],
  ["Is the funding guaranteed?", `No. The non-refundable grant opportunity of ${grant} is shared by the top five startups (₹10 lakh, ₹5 lakh, ₹2.5 lakh, ₹1.5 lakh and ₹1 lakh). Separately, selected startups get a funding opportunity of up to ${crore} by pitching to investors. A grant is not an investment, and funding is subject to investor interest, due diligence, eligibility, valuation and applicable terms.`],
  ["Can I apply with only an idea?", `Yes. The top ${rules.prototypeIdeas} ideas may receive a ${prototypeRange} prototype grant, and ${rules.rewardIdeas} selected ideas receive ₹${rules.ideaReward.toLocaleString("en-IN")} each.`],
  ["What does the registration include?", "The stated fee covers participation for up to two people from one startup. The team will confirm participation details and applicable terms before payment."],
  ["Will travel, stay and food be provided?", "Eligible selected participants receive accommodation, food, one-side travel fare support, local travel and a Gwalior tour, subject to program guidelines and terms. Confirm eligibility and reimbursement arrangements with the team before booking."],
  ["When and where is the summit?", "Startup Summit 2026 is a three-day summit from 29 to 31 December 2026 in Gwalior, Madhya Pradesh, India. The team will share the exact venue with confirmed participants."],
];

function scrollToRegister(event: React.MouseEvent) {
  event.preventDefault();
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
}
function RegisterButton({ compact = false, label }: { compact?: boolean; label?: string }) {
  return <Button asChild variant="programme" size={compact ? "default" : "lg"} className="programme-register"><a href="#register" onClick={scrollToRegister}>{label ?? (compact ? "Apply Now" : "Register Your Startup Now")}<ArrowRight /></a></Button>;
}
function Heading({ children, note }: { children: React.ReactNode; note?: string }) {
  return <div className="programme-heading"><h2>{children}</h2><span aria-hidden="true" />{note && <p>{note}</p>}</div>;
}
function IconTiles({ items }: { items: { icon: LucideIcon; title: string }[] }) {
  return <div className="programme-icon-tiles">{items.map(({ icon: Icon, title }) => <div key={title}><Icon aria-hidden="true" /><h3>{title}</h3></div>)}</div>;
}
function Flow({ steps }: { steps: string[] }) {
  return <ol className="programme-flow" aria-label={steps.join(" to ")}>{steps.map((step, i) => <li key={step}><span>{step}</span>{i < steps.length - 1 && <ArrowRight aria-hidden="true" />}</li>)}</ol>;
}
function Cards({ items }: { items: { icon: LucideIcon; title: string; text: string }[] }) {
  return <div className="programme-cards">{items.map(({ icon: Icon, title, text }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>;
}

export function FundingProgrammePage() {
  return <><SiteHeader />
    <main className="programme-page">
    <section className="programme-hero">
      <img src={hero.url} alt="Startup founder overlooking Gwalior’s fort and palace at sunset" width={1944} height={700} fetchPriority="high" className="programme-hero-photo" />
      <div className="programme-hero-veil" />
      <div className="page-shell programme-hero-inner">
        <div className="programme-hero-copy">
          <p className="programme-eyebrow">RIPL STARTUP <span aria-hidden="true" /></p>
          <h1><span>SUMMIT</span><br />2026 · GWALIOR</h1>
          <p className="programme-tagline">Turn Your Idea Into a Fundable &amp; Scalable Business</p>
          <p className="programme-intro">29–31 December 2026 · Gwalior. The RIPL Startup Funding &amp; Investment Program comes to Gwalior with up to {crore} funding opportunity and a {grant} grant opportunity. We don't just fund startups — we help them build, validate, pitch, raise and scale. Free Grants • Prototype Support • Mentorship • Investor Pitch • Funding • Technology • Legal Support</p>
          <div className="programme-hero-points">{[{ icon: Lightbulb, title: "BUILD", text: "Your prototype" }, { icon: Users, title: "PITCH", text: "To investors" }, { icon: ChartNoAxesCombined, title: "RAISE", text: `Up to ${crore}` }, { icon: Rocket, title: "GROW", text: "Your business" }].map(({ icon: Icon, title, text }) => <div key={title}><Icon /><div><b>{title}</b><small>{text}</small></div></div>)}</div>
          <div className="programme-hero-actions"><RegisterButton label="Apply Now" /><Button asChild variant="ghost" className="programme-watch programme-idea"><a href="#register" onClick={scrollToRegister}>Submit Your Idea <ArrowRight /></a></Button></div>
        </div>
        <div className="programme-gwalior"><strong>Gwalior</strong><p><MapPin /> Madhya Pradesh, India</p><em>Ideas Today.<br />Impact Tomorrow.</em></div>
        <div className="programme-date"><CalendarDays /><div><strong>29 · 30 · 31</strong><b>DECEMBER 2026</b><span>(3-Day Summit)</span></div><p><MapPin /> Gwalior, Madhya Pradesh, India</p></div>
      </div>
    </section>
    <section className="programme-strip"><div className="page-shell"><IconTiles items={[{ icon: BadgeIndianRupee, title: "Grant" }, { icon: FlaskConical, title: "Prototype" }, { icon: Users, title: "Mentorship" }, { icon: Handshake, title: "Investor Connect" }, { icon: Cpu, title: "Technology" }, { icon: Scale, title: "Legal Support" }]} /><p><img src={logo.url} alt="RIPL" width={70} height={35} />Organised by <strong>Rishishwar Industry Private Limited (RIPL)</strong><small>Grow Your Business With Us.</small></p></div></section>

    <section className="page-shell programme-section">
      <Heading note="WHY THIS PROGRAM?">More Than Just <em>Funding</em></Heading>
      <p className="programme-lead">Your startup needs more than capital. We help founders move from:</p>
      <Flow steps={["Idea", "Prototype", "Validation", "Pitch", "Funding", "Growth"]} />
      <IconTiles items={pillars} />
    </section>

    <section id="about-programme" className="programme-funding"><div className="page-shell programme-funding-grid">
      <div className="programme-opportunity"><p>TOTAL</p><h2>{grant.toUpperCase()}<span>NON-REFUNDABLE GRANT OPPORTUNITY</span></h2><p>The five top-performing startups share the grant pool, alongside mentorship and investor connections.</p><p className="programme-grant-highlight"><strong>Grant ≠ investment.</strong> Beyond the grant, selected startups pitch to participating investors for a funding opportunity of up to {crore}.</p></div>
      <div><div className="programme-prizes programme-prizes-five">{rules.grantAwards.map((amount, i) => <article key={amount}><Trophy /><div><h3>{ranks[i]} Performing Startup</h3><p>Up to <strong>{formatRupeeWords(amount).toUpperCase()}</strong></p></div></article>)}<article className="programme-prize-total"><Award /><div><h3>Total Grant Pool</h3><p><strong>{grant.toUpperCase()}</strong></p></div></article></div><p className="programme-terms">Grants are subject to eligibility, evaluation, selection and applicable Terms &amp; Conditions.</p></div>
    </div></section>

    <section className="page-shell programme-section programme-duo">
      <div className="programme-panel">
        <Heading note={`TOP ${rules.prototypeIdeas} IDEAS`}>Have an Idea? <em>Build It.</em></Heading>
        <div className="programme-amount"><strong>{prototypeRange}</strong><span>Prototype Grant Opportunity</span></div>
        <p className="programme-lead">Support can be used for:</p>
        <IconTiles items={prototypeUses.map((title) => ({ icon: FlaskConical, title }))} />
        <Flow steps={["Idea", "Prototype", "Validation", "Funding"]} />
        <p className="programme-small">Funding opportunities may be available after successful prototype development and evaluation.</p>
      </div>
      <div className="programme-panel programme-panel-dark">
        <Heading note="IDEA REWARD">{rules.rewardIdeas} Ideas. <em>₹{rules.ideaReward.toLocaleString("en-IN")} Each.</em></Heading>
        <div className="programme-amount"><strong>₹{rules.ideaReward.toLocaleString("en-IN")}</strong><span>Flat reward for {rules.rewardIdeas} selected ideas</span></div>
        <div className="programme-amount"><strong>{formatRupeeWords(rewardPool()).toUpperCase()}</strong><span>Total reward pool</span></div>
        <p className="programme-quote">“Even early-stage ideas deserve recognition.”</p>
      </div>
    </section>

    <section id="investment" className="programme-funding"><div className="page-shell programme-funding-grid">
      <div className="programme-opportunity"><p>GET FUNDING OPPORTUNITY</p><h2>UP TO {crore.toUpperCase()}<span>INVESTOR FUNDING OPPORTUNITY</span></h2><p>Selected and investment-ready startups may get opportunities to connect with investors and present their businesses for potential funding.</p><p className="programme-grant-highlight">Funding is subject to investor interest, due diligence, eligibility, valuation and applicable terms.</p></div>
      <ol className="programme-ladder">{fundingSteps.map((step, i) => <li key={step}><span>0{i + 1}</span><b>{step}</b></li>)}</ol>
    </div></section>

    <section id="process" className="page-shell programme-section"><Heading note="FROM IDEA TO INVESTMENT">The 5-Stage <em>Startup</em> Journey</Heading><ol className="programme-journey">{journey.map(({ icon: Icon, title, text }, index) => <li key={title}><span className="programme-step">0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p>{index < 4 && <ArrowRight className="programme-step-arrow" />}</li>)}</ol></section>

    <section className="page-shell programme-section programme-split">
      <img src={benefit1Asset.url} alt="Founders pitching their startup to an investor panel" width={592} height={298} loading="lazy" />
      <div>
        <Heading note="INVESTOR PITCHING">Put Your Startup in Front of <em>Investors</em></Heading>
        <p className="programme-lead">Selected startups can receive opportunities to present their businesses before:</p>
        <IconTiles items={audiences} />
        <Flow steps={["Jury Pitch", "Senior Jury", "Investor Pitch"]} />
        <p className="programme-quote programme-quote-red">Your Startup. Your Pitch. Your Opportunity.</p>
      </div>
    </section>

    <section id="benefits" className="programme-benefits"><div className="page-shell programme-section"><Heading>What You Get</Heading><div className="programme-benefit-grid">{benefits.map(({ icon: Icon, title, text, image }) => <article key={title}><img src={image} alt={title} width={592} height={298} loading="lazy" /><div><span className="programme-benefit-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="page-shell programme-section"><Heading note="SELECTED STARTUP BENEFITS">Selected Startups Get <em>More</em></Heading><Cards items={selectedBenefits} /><p className="programme-small">Benefits are subject to eligibility, selection and applicable program guidelines.</p></section>

    <section className="page-shell programme-section programme-logistics">
      <div className="programme-fee"><h2 className="programme-band-title">Registration Fee</h2><div className="programme-fee-body"><div className="programme-main-fee"><Users /><p><strong>₹2,999/-</strong><span>+18% GST</span></p></div><p>Includes participation for up to 2 persons per startup.</p><div className="programme-extra-fee"><Users /><div><h3>Additional Participant</h3><strong>₹2,000/-</strong><p>+18% GST per person</p><small>Applicable beyond the first 2 persons.</small></div></div></div></div>
      <div className="programme-support"><h2 className="programme-band-title">Completely Free for Selected Participants</h2><div className="programme-support-body"><div className="programme-support-grid">{support.map(({ icon: Icon, title, note }) => <div key={title}><Icon /><h3>{title}</h3><p>({note})</p></div>)}</div><div className="programme-support-photos"><img src={supportPhotoUrl} alt="Accommodation, meals, train ticket, local travel and Gwalior tour" width={1200} height={400} loading="lazy" /></div><p className="programme-support-banner">STAY · FOOD · ONE-SIDE TICKET · LOCAL TRAVEL · LOCAL TOUR<br /><strong>COMPLETELY FREE</strong></p><p className="programme-small">Eligible participants receive these benefits subject to policy, eligibility and Terms & Conditions. Confirm travel support before booking.</p></div></div>
      <div className="programme-event"><h2 className="programme-band-title">Event Details</h2><div><p><CalendarDays /><span><strong>29 – 31 December 2026</strong><small>(3-Day Summit)</small></span></p><p><MapPin /><strong>Gwalior, Madhya Pradesh, India</strong></p><p><CalendarCheck /><span><strong>Exact venue shared with confirmed participants</strong></span></p><img src={hero.url} alt="Gwalior, venue city of Startup Summit 2026" width={1944} height={700} loading="lazy" /><RegisterButton compact /></div></div>
    </section>

    <section id="mentorship" className="page-shell programme-section"><Heading note="BUILD A FUNDING-READY STARTUP">{rules.mentorshipMonths} Months Free <em>Mentorship</em></Heading>
      <div className="programme-cards programme-cards-five">{mentorship.map(({ icon: Icon, title, points }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><ul>{points.map((p) => <li key={p}>{p}</li>)}</ul></article>)}</div>
    </section>

    <section id="technology" className="page-shell programme-section programme-split programme-split-reverse">
      <div>
        <Heading note="FREE TECHNOLOGY SUPPORT">Build Without Heavy <em>Initial Cost</em></Heading>
        <div className="programme-amount"><strong>UP TO {techValue.toUpperCase()}</strong><span>Technology Support Value</span></div>
        <IconTiles items={technology} />
        <p className="programme-small">Eligible startups may receive technology support with an indicative value of up to {techValue}, subject to scope and eligibility.</p>
      </div>
      <img src={technologyPhoto} alt="Startup team developing a product prototype" width={1200} height={912} loading="lazy" />
    </section>

    <section id="legal" className="page-shell programme-section programme-split">
      <img src={legalPhoto} alt="Legal advisor reviewing agreements with a startup founder" width={1200} height={912} loading="lazy" />
      <div><Heading note="FREE LEGAL SUPPORT">Legal Support for Your <em>Startup</em></Heading><IconTiles items={legal} /></div>
    </section>

    <section id="evaluation" className="page-shell programme-section"><Heading note="STARTUP EVALUATION">Your Idea Will Be Evaluated for Its <em>Potential</em></Heading><Cards items={evaluation} /><Flow steps={["Jury", "Senior Jury", "Funding Opportunity"]} /></section>

    <section className="page-shell programme-section"><Heading note="COMPLETE STARTUP ECOSYSTEM">From Idea to <em>Scale</em></Heading><ol className="programme-ecosystem">{ecosystem.map((step, i) => <li key={step}><span>{i + 1}</span><b>{step}</b></li>)}</ol></section>

    <section className="programme-benefits"><div className="page-shell programme-section"><Heading note="EVERYTHING YOU CAN ACCESS">One Program. <em>Every</em> Growth Lever.</Heading><div className="programme-access">{access.map(({ icon: Icon, label, value }) => <article key={label}><Icon aria-hidden="true" /><div><small>{label}</small><strong>{value}</strong></div></article>)}</div></div></section>

    <section className="page-shell programme-section programme-eligibility"><div><Heading>Who Can Apply?</Heading><IconTiles items={eligibility} /><div id="why-participate"><Heading>Why Should You Apply?</Heading></div><ul className="programme-statements">{whyApply.map((line) => <li key={line}><Sparkles aria-hidden="true" />{line}</li>)}</ul></div><div className="programme-platform"><img src={benefit4} alt="Founder presenting a startup to an audience" width={592} height={298} loading="lazy" /><div><h2>YOUR IDEA DOESN'T HAVE TO BE<br /><em>PERFECT.</em><br />IT HAS TO HAVE<br /><em>POTENTIAL.</em></h2><RegisterButton compact label="Submit Your Idea" /></div></div></section>

    <section id="register" className="page-shell programme-section programme-app"><Heading note="REGISTER NOW">Startup <em>Summit 2026</em> Registration</Heading><p className="programme-lead">Want to know about the year-round program? <Link to="/funding-programme" className="programme-inline-link">Explore the Funding &amp; Investment Program</Link>.</p><Button asChild variant="programme"><a href={SUMMIT_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">Open Registration Form <ArrowRight /></a></Button><ZohoRegistrationForm /></section>
    <section id="programme-faq" className="page-shell programme-section"><Heading>Frequently Asked Questions</Heading><div className="programme-faq-layout"><Accordion type="single" collapsible className="programme-faq">{faqs.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion><aside className="programme-help"><Headphones /><h3>Still have questions?</h3><p>Get in touch with our team.</p><Button asChild variant="outline"><Link to="/contact">Contact Us <ArrowRight /></Link></Button></aside></div></section>
    <section className="programme-closing"><img src={hero.url} alt="Gwalior palace at sunset" width={1944} height={700} loading="lazy" /><div className="page-shell"><h2>Your Idea Could Be Worth More Than You Think.</h2><p className="programme-closing-date"><CalendarDays aria-hidden="true" /> 29–31 December 2026 · Gwalior, Madhya Pradesh</p><ul className="programme-final-list">{finalHighlights.map((item) => <li key={item}><Trophy aria-hidden="true" />{item}</li>)}</ul><div className="programme-hero-actions"><RegisterButton label="Submit Your Startup / Idea Now" /><RegisterButton compact label="Apply Now" /></div></div></section>
    <p className="programme-disclaimer">{DISCLAIMER}</p>
    </main><SiteFooter />
  </>;
}
