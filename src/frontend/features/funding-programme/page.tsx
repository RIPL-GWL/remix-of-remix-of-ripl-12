import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, CalendarDays, BadgeIndianRupee, CalendarCheck, Car, ChartNoAxesCombined, ClipboardCheck, Compass, Cpu, FilePenLine, FlaskConical, Handshake, Headphones, Hotel, Lightbulb, MapPin, Mic, Plane, Rocket, Scale, ScanSearch, Star, Trophy, Users, Utensils, type LucideIcon } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/frontend/components/ui/accordion";
import heroPhoto from "@/assets/funding-gwalior-hero.webp.asset.json";
import supportPhotos from "@/assets/funding-support-photos.webp.asset.json";
import logo from "@/assets/header-wordmark-dark.webp.asset.json";
import { formatRupeeWords, grantPool, opportunityRules as rules, programmeRules, registrationTotal, rewardPool } from "./rules";
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
const grant = formatRupeeWords(grantPool());
const crore = formatRupeeWords(rules.investmentOpportunityMax);
const techValue = formatRupeeWords(rules.technologySupportMax);
const prototypeRange = `₹${rules.prototypeGrantMin.toLocaleString("en-IN")}–₹${rules.prototypeGrantMax.toLocaleString("en-IN")}`;
const DISCLAIMER = "All grants, rewards, benefits and funding opportunities are subject to eligibility, evaluation, selection, investor interest, applicable program guidelines and Terms & Conditions.";

const benefits = [
  { icon: Users, title: "Mentor Support", text: "Refine your idea and pitch.", image: benefit0Asset.url },
  { icon: Handshake, title: "Investor Connect", text: "Pitch to investors and experts.", image: benefit1Asset.url },
  { icon: ClipboardCheck, title: "Business Evaluation", text: "Know your growth potential.", image: benefit2Asset.url },
  { icon: Users, title: "Strategic Networking", text: "Meet founders and leaders.", image: benefit3Asset.url },
  { icon: Mic, title: "National Visibility", text: "Showcase on a national stage.", image: benefit4Asset.url },
  { icon: ChartNoAxesCombined, title: "Growth Support", text: "Scale on a larger platform.", image: benefit5Asset.url },
];
const journey = [
  { icon: FilePenLine, title: "Register", text: "Submit your startup." },
  { icon: ScanSearch, title: "Startup Scanning", text: `Rated within ${programmeRules.scanningDays} days.` },
  { icon: Users, title: "First Pitch", text: "Pitch to the jury panel." },
  { icon: Star, title: "Senior Jury", text: "Shortlisted startups pitch again." },
  { icon: Mic, title: "Investor Pitch", text: "Final pitch to investors." },
];
const support = [
  { icon: Hotel, title: "Accommodation", note: "Stay" },
  { icon: Utensils, title: "Food", note: "Meals" },
  { icon: Plane, title: "One-Side Travel Ticket", note: "Fare support" },
  { icon: Car, title: "Local Travel", note: "In Gwalior" },
  { icon: MapPin, title: "Local Tour", note: "Gwalior highlights" },
];
const ranks = ["1st", "2nd", "3rd", "4th", "5th"];
const prototypeUses = ["MVP Development", "Prototype Creation", "Product Development", "Proof of Concept"];
const fundingSteps = ["Business Evaluation", "Funding Readiness", "Investor Pitch", "Investor Connect", "Potential Funding"];
const extras: { icon: LucideIcon; label: string; value: string; text: string }[] = [
  { icon: Compass, label: "Mentorship", value: `${rules.mentorshipMonths} Months`, text: "Strategy, funding and pitch guidance — free." },
  { icon: Cpu, label: "Technology", value: `Up to ${techValue}`, text: "Domain, website, hosting and digital setup." },
  { icon: Scale, label: "Legal", value: "Startup Legal", text: "Agreements, compliance and IP guidance." },
];
const finalHighlights = [`${grant} Grant Pool`, `Up to ${crore} Funding Opportunity`, `${prototypeRange} Prototype Grants`, `${rules.mentorshipMonths} Months Free Mentorship`];
const faqs = [
  ["What is the registration fee?", `₹${programmeRules.registrationFee.toLocaleString("en-IN")} + ${programmeRules.gstPercent}% GST (₹${registrationTotal(2).toLocaleString("en-IN")} total) for up to two people per startup. Each additional person: ₹${programmeRules.additionalParticipantFee.toLocaleString("en-IN")} + ${programmeRules.gstPercent}% GST.`],
  ["When and where is the summit?", "29–31 December 2026 in Gwalior, Madhya Pradesh. The exact venue is shared with confirmed participants."],
  ["Is the funding guaranteed?", `No. The ${grant} grant pool is shared by the top five startups. Investor funding of up to ${crore} depends on investor interest, due diligence and applicable terms. A grant is not an investment.`],
  ["Can I apply with only an idea?", `Yes. The top ${rules.prototypeIdeas} ideas may get a ${prototypeRange} prototype grant, and ${rules.rewardIdeas} ideas get ₹${rules.ideaReward.toLocaleString("en-IN")} each.`],
  ["Are travel, stay and food covered?", "Yes, for eligible selected participants, subject to program guidelines. Confirm with the team before booking."],
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
          <p className="programme-intro">Three days. One stage. {grant} in grants and up to {crore} in investor funding opportunity.</p>
          <div className="programme-hero-points">{[{ icon: Lightbulb, title: "BUILD", text: "Your prototype" }, { icon: Users, title: "PITCH", text: "To investors" }, { icon: ChartNoAxesCombined, title: "RAISE", text: `Up to ${crore}` }, { icon: Rocket, title: "GROW", text: "Your business" }].map(({ icon: Icon, title, text }) => <div key={title}><Icon /><div><b>{title}</b><small>{text}</small></div></div>)}</div>
          <div className="programme-hero-actions"><RegisterButton label="Apply Now" /><Button asChild variant="ghost" className="programme-watch programme-idea"><a href="#register" onClick={scrollToRegister}>Submit Your Idea <ArrowRight /></a></Button></div>
        </div>
        <div className="programme-gwalior"><strong>Gwalior</strong><p><MapPin /> Madhya Pradesh, India</p><em>Ideas Today.<br />Impact Tomorrow.</em></div>
        <div className="programme-date"><CalendarDays /><div><strong>29 · 30 · 31</strong><b>DECEMBER 2026</b><span>(3-Day Summit)</span></div><p><MapPin /> Gwalior, Madhya Pradesh, India</p></div>
      </div>
    </section>
    <section className="programme-strip"><div className="page-shell"><IconTiles items={[{ icon: BadgeIndianRupee, title: "Grant" }, { icon: FlaskConical, title: "Prototype" }, { icon: Users, title: "Mentorship" }, { icon: Handshake, title: "Investor Connect" }, { icon: Cpu, title: "Technology" }, { icon: Scale, title: "Legal Support" }]} /><p><img src={logo.url} alt="RIPL" width={70} height={35} />Organised by <strong>Rishishwar Industry Private Limited (RIPL)</strong><small>Grow Your Business With Us.</small></p></div></section>

    <section id="about-programme" className="programme-funding"><div className="page-shell programme-funding-grid">
      <div className="programme-opportunity"><p>TOTAL</p><h2>{grant.toUpperCase()}<span>NON-REFUNDABLE GRANT POOL</span></h2><p>Shared by the five top-performing startups.</p><p className="programme-grant-highlight"><strong>Grant ≠ investment.</strong></p></div>
      <div><div className="programme-prizes programme-prizes-five">{rules.grantAwards.map((amount, i) => <article key={amount}><Trophy /><div><h3>{ranks[i]} Performing Startup</h3><p>Up to <strong>{formatRupeeWords(amount).toUpperCase()}</strong></p></div></article>)}<article className="programme-prize-total"><Award /><div><h3>Total Grant Pool</h3><p><strong>{grant.toUpperCase()}</strong></p></div></article></div><p className="programme-terms">Subject to eligibility, evaluation, selection and Terms &amp; Conditions.</p></div>
    </div></section>

    <section className="page-shell programme-section programme-duo summit-duo">
      <article className="summit-proto">
        <p className="summit-eyebrow"><span />Top {rules.prototypeIdeas} prototype grant</p>
        <h2>Have an Idea? <em>Build It.</em></h2>
        <div className="summit-amount"><small>Top {rules.prototypeIdeas} Ideas</small><strong>{prototypeRange}</strong><span>Prototype Grant Opportunity</span></div>
        <ul className="summit-checks">{prototypeUses.map((use) => <li key={use}><FlaskConical aria-hidden="true" />{use}</li>)}</ul>
        <Flow steps={["Idea", "Prototype", "Validation", "Funding"]} />
      </article>
      <article className="summit-reward">
        <p className="summit-eyebrow"><span />₹{rules.ideaReward.toLocaleString("en-IN")} idea reward</p>
        <h2>{rules.rewardIdeas} Ideas.<br />₹{rules.ideaReward.toLocaleString("en-IN")} Each.</h2>
        <div className="summit-coin"><Award aria-hidden="true" /><strong>₹{rules.ideaReward.toLocaleString("en-IN")}</strong><span>Flat Reward</span></div>
        <dl className="summit-facts"><div><dt>For</dt><dd>{rules.rewardIdeas} Selected Ideas</dd></div><div><dt>Total reward pool</dt><dd>{formatRupeeWords(rewardPool())}</dd></div></dl>
        <blockquote>“Even early-stage ideas deserve recognition.”</blockquote>
      </article>
    </section>

    <section id="investment" className="programme-funding"><div className="page-shell programme-funding-grid">
      <div className="programme-opportunity"><p>INVESTOR FUNDING OPPORTUNITY</p><h2>UP TO {crore.toUpperCase()}<span>FOR INVESTMENT-READY STARTUPS</span></h2><p className="programme-grant-highlight">Subject to investor interest, due diligence and applicable terms.</p></div>
      <ol className="programme-ladder">{fundingSteps.map((step, i) => <li key={step}><span>0{i + 1}</span><b>{step}</b></li>)}</ol>
    </div></section>

    <section id="process" className="page-shell programme-section"><Heading note="FROM IDEA TO INVESTMENT">The 5-Stage <em>Startup</em> Journey</Heading><ol className="programme-journey">{journey.map(({ icon: Icon, title, text }, index) => <li key={title}><span className="programme-step">0{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p>{index < 4 && <ArrowRight className="programme-step-arrow" />}</li>)}</ol></section>

    <section id="benefits" className="programme-benefits"><div className="page-shell programme-section"><Heading>What You Get</Heading><div className="programme-benefit-grid">{benefits.map(({ icon: Icon, title, text, image }) => <article key={title}><img src={image} alt={title} width={592} height={298} loading="lazy" /><div><span className="programme-benefit-icon"><Icon /></span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section id="mentorship" className="page-shell programme-section"><Heading note="BEYOND THE SUMMIT">Also <em>Included</em></Heading>
      <div className="summit-extras">{extras.map(({ icon: Icon, label, value, text }) => <article key={label}><span className="summit-extra-icon"><Icon aria-hidden="true" /></span><small>{label}</small><strong>{value}</strong><p>{text}</p></article>)}</div>
    </section>

    <section className="page-shell programme-section programme-logistics">
      <div className="programme-fee"><h2 className="programme-band-title">Registration Fee</h2><div className="programme-fee-body"><div className="programme-main-fee"><Users /><p><strong>₹2,999/-</strong><span>+18% GST</span></p></div><p>Includes participation for up to 2 persons per startup.</p><div className="programme-extra-fee"><Users /><div><h3>Additional Participant</h3><strong>₹2,000/-</strong><p>+18% GST per person</p><small>Applicable beyond the first 2 persons.</small></div></div></div></div>
      <div className="programme-support"><h2 className="programme-band-title">Completely Free for Selected Participants</h2><div className="programme-support-body"><div className="programme-support-grid">{support.map(({ icon: Icon, title, note }) => <div key={title}><Icon /><h3>{title}</h3><p>({note})</p></div>)}</div><div className="programme-support-photos"><img src={supportPhotos.url} alt="Accommodation, meals, train ticket, local travel and Gwalior tour" width={1200} height={400} loading="lazy" /></div><p className="programme-support-banner">STAY · FOOD · ONE-SIDE TICKET · LOCAL TRAVEL · LOCAL TOUR<br /><strong>COMPLETELY FREE</strong></p></div></div>
      <div className="programme-event"><h2 className="programme-band-title">Event Details</h2><div><p><CalendarDays /><span><strong>29 – 31 December 2026</strong><small>(3-Day Summit)</small></span></p><p><MapPin /><strong>Gwalior, Madhya Pradesh, India</strong></p><p><CalendarCheck /><span><strong>Venue shared with confirmed participants</strong></span></p><img src={hero.url} alt="Gwalior, venue city of Startup Summit 2026" width={1944} height={700} loading="lazy" /><RegisterButton compact /></div></div>
    </section>

    <section className="page-shell programme-section">
      <div className="programme-platform summit-platform"><img src={benefit4Asset.url} alt="Founder presenting a startup to an audience" width={592} height={298} loading="lazy" /><div><h2>YOUR IDEA DOESN'T HAVE TO BE<br /><em>PERFECT.</em><br />IT HAS TO HAVE<br /><em>POTENTIAL.</em></h2><RegisterButton compact label="Submit Your Idea" /></div></div>
    </section>

    <section id="register" className="page-shell programme-section programme-app"><Heading note="REGISTER NOW">Startup <em>Summit 2026</em> Registration</Heading><p className="programme-lead">Year-round details: <Link to="/funding-programme" className="programme-inline-link">Funding &amp; Investment Program</Link>.</p><Button asChild variant="programme"><a href={SUMMIT_REGISTRATION_URL} target="_blank" rel="noopener noreferrer">Open Registration Form <ArrowRight /></a></Button><ZohoRegistrationForm /></section>
    <section id="programme-faq" className="page-shell programme-section"><Heading>Frequently Asked Questions</Heading><div className="programme-faq-layout"><Accordion type="single" collapsible className="programme-faq">{faqs.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion><aside className="programme-help"><Headphones /><h3>Still have questions?</h3><p>Get in touch with our team.</p><Button asChild variant="outline"><Link to="/contact">Contact Us <ArrowRight /></Link></Button></aside></div></section>
    <section className="programme-closing"><img src={hero.url} alt="Gwalior palace at sunset" width={1944} height={700} loading="lazy" /><div className="page-shell"><h2>Your Idea Could Be Worth More Than You Think.</h2><p className="programme-closing-date"><CalendarDays aria-hidden="true" /> 29–31 December 2026 · Gwalior, Madhya Pradesh</p><ul className="programme-final-list">{finalHighlights.map((item) => <li key={item}><Trophy aria-hidden="true" />{item}</li>)}</ul><div className="programme-hero-actions"><RegisterButton label="Register Your Startup Now" /></div></div></section>
    <p className="programme-disclaimer">{DISCLAIMER}</p>
    </main><SiteFooter />
  </>;
}
