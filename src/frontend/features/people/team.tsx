import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, CalendarDays, ClipboardList, FileCheck2, Globe, GraduationCap, IdCard, KeyRound, Mail, MapPin, Phone, Search, ShieldCheck, ShieldX, UserRound, Users, BarChart3 } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/frontend/components/site-chrome";
import { Button } from "@/frontend/components/ui/button";
import { Portrait, SectionHeading } from "@/frontend/features/investors/shared";
import { verifyEmployeeFlexible, verifyDocument, verifyMentor, type VerifiedDocument, type VerifiedEmployeeFlex, type VerifiedMentor } from "@/lib/verification.functions";
import { DEPARTMENTS, filterTeam, team, type TeamMember } from "./data";

export function TeamPage({ members = team }: { members?: TeamMember[] }) {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const results = filterTeam(query, dept, members);
  return <><SiteHeader /><main className="investor-page people-page">
    <section className="people-hero"><div className="page-shell">
      <nav className="investor-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>›</span><b>Our Team</b></nav>
      <p className="investor-eyebrow">Our Team</p>
      <h1>The People Behind <em>Our Purpose</em></h1>
      <p className="people-lead">A passionate team working together to empower businesses and build a better tomorrow.</p>
      <dl className="people-stats">{[[Users, "75+", "Team Members"], [MapPin, "6+", "Cities"], [Building2, "Multiple", "Departments"], [BarChart3, "One", "Vision"]].map(([I, v, l]) => { const Icon = I as typeof Users; return <div key={String(l)}><Icon /><dt>{String(v)}</dt><dd>{String(l)}</dd></div>; })}</dl>
    </div></section>
    <div className="page-shell people-section">
      <VerifyEmployee />
      <div className="people-team-head">
        <SectionHeading eyebrow="Our Team">Meet Our <em>Team Members</em></SectionHeading>
        <label className="people-search"><Search /><input aria-label="Search team" placeholder="Search by name, department or designation..." value={query} onChange={(e) => setQuery(e.target.value.slice(0, 80))} /></label>
      </div>
      <div className="people-chips">{["", ...DEPARTMENTS].map((d) => <Button key={d || "all"} size="sm" variant={dept === d ? "default" : "outline"} onClick={() => setDept(d)}>{d || "All"}</Button>)}</div>
      <div className="people-team-grid">{results.map((p) => <Link key={p.slug} to="/our-team/$slug" params={{ slug: p.slug }} className="people-team-card">
        <Portrait index={p.portrait} name={p.name} />
        <div><h3>{p.name}</h3><p>{p.designation}</p><small>{p.department}</small><span className="people-link">View Profile<ArrowRight /></span></div>
      </Link>)}</div>
      {!results.length && <p className="people-empty">No team members match your search.</p>}
    </div>
  </main><SiteFooter /></>;
}

type VerifyTab = "employee" | "document" | "mentor";

function VerifyEmployee() {
  const [tab, setTab] = useState<VerifyTab>("employee");
  return <section className="people-verify" aria-labelledby="verify-title">
    <div className="people-verify-main">
      <div className="people-verify-title"><ShieldCheck /><div><h2 id="verify-title">Verify Our Team Member</h2><p>Verify the authenticity of a Rishishwar Industry employee, an official letter or document, or a mentor.</p></div></div>
      <div className="people-verify-tabs" role="tablist" aria-label="Verification type">
        {([["employee", "Employee", IdCard], ["document", "Document", FileCheck2], ["mentor", "Mentor", Users]] as [VerifyTab, string, typeof IdCard][]).map(([key, label, Icon]) => (
          <Button key={key} size="sm" variant={tab === key ? "default" : "outline"} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}><Icon />{label}</Button>
        ))}
      </div>
      {tab === "employee" && <EmployeeVerifyForm />}
      {tab === "document" && <DocumentVerifyForm />}
      {tab === "mentor" && <MentorVerifyForm />}
    </div>
    <aside><ShieldCheck /><h3>Secure Verification</h3><p>Details are shown only when the required fields match our records. Employee and mentor verification needs any two matching fields; document verification needs the letter number, reference number and issue date.</p></aside>
  </section>;
}

function EmployeeVerifyForm() {
  const [form, setForm] = useState({ employeeId: "", employeeCode: "", email: "", phone: "" });
  const verify = useServerFn(verifyEmployeeFlexible);
  const m = useMutation({ mutationFn: () => verify({ data: { employeeId: form.employeeId || undefined, employeeCode: form.employeeCode || undefined, email: form.email || undefined, phone: form.phone || undefined } }) });
  const filled = [form.employeeId, form.employeeCode, form.email, form.phone].filter((v) => v.trim().length >= 3).length;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm((f) => ({ ...f, [key]: e.target.value })); m.reset(); };
  return <>
    <form className="people-verify-form" onSubmit={(e) => { e.preventDefault(); if (filled >= 2) m.mutate(); }}>
      <label><UserRound /><input aria-label="Employee ID" placeholder="Employee ID" value={form.employeeId} maxLength={40} onChange={set("employeeId")} /></label>
      <label><KeyRound /><input aria-label="Employee Code" type="password" autoComplete="off" placeholder="Employee Code" value={form.employeeCode} maxLength={40} onChange={set("employeeCode")} /></label>
      <label><Mail /><input aria-label="Employee email" type="email" placeholder="Official Email" value={form.email} maxLength={120} onChange={set("email")} /></label>
      <label><Phone /><input aria-label="Employee phone" type="tel" placeholder="Contact Number" value={form.phone} maxLength={20} onChange={set("phone")} /></label>
      <Button type="submit" disabled={filled < 2 || m.isPending}>{m.isPending ? "Verifying..." : "Verify Employee"}<ArrowRight /></Button>
    </form>
    <p className="people-verify-hint">Fill any two of the four fields above.</p>
    {m.data?.verified && <IdCardResult e={m.data.employee} />}
    {m.data && !m.data.verified && <p className="people-verify-fail" role="alert"><ShieldX />Not verified. The details do not match any active Rishishwar Industry employee.</p>}
    {m.isError && <p className="people-verify-fail" role="alert"><ShieldX />Please check the details and try again.</p>}
  </>;
}

function DocumentVerifyForm() {
  const [form, setForm] = useState({ letterNumber: "", referenceNumber: "", issuedDate: "" });
  const verify = useServerFn(verifyDocument);
  const m = useMutation({ mutationFn: () => verify({ data: form }) });
  const ready = form.letterNumber.trim().length >= 2 && form.referenceNumber.trim().length >= 2 && /^\d{4}-\d{2}-\d{2}$/.test(form.issuedDate);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm((f) => ({ ...f, [key]: e.target.value })); m.reset(); };
  return <>
    <form className="people-verify-form" onSubmit={(e) => { e.preventDefault(); if (ready) m.mutate(); }}>
      <label><FileCheck2 /><input aria-label="Letter number" placeholder="Letter Number" value={form.letterNumber} maxLength={80} onChange={set("letterNumber")} /></label>
      <label><ClipboardList /><input aria-label="Reference number" placeholder="Reference Number" value={form.referenceNumber} maxLength={80} onChange={set("referenceNumber")} /></label>
      <label><CalendarDays /><input aria-label="Issue date" type="date" value={form.issuedDate} onChange={set("issuedDate")} /></label>
      <Button type="submit" disabled={!ready || m.isPending}>{m.isPending ? "Verifying..." : "Verify Document"}<ArrowRight /></Button>
    </form>
    <p className="people-verify-hint">All three — letter number, reference number and issue date — must match.</p>
    {m.data?.verified && <DocumentResult d={m.data.document} />}
    {m.data && !m.data.verified && <p className="people-verify-fail" role="alert"><ShieldX />Not verified. No matching letter or document was found in our records.</p>}
    {m.isError && <p className="people-verify-fail" role="alert"><ShieldX />Please check the details and try again.</p>}
  </>;
}

function DocumentResult({ d }: { d: VerifiedDocument }) {
  const fmt = (v: string | null) => (v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null);
  const rows: [string, string | null][] = [
    ["Letter Number", d.letterNumber], ["Reference Number", d.referenceNumber], ["Issued To", d.issuedTo], ["Issued By", d.issuedBy],
    ["Letter / Document Category", d.category], ["Letter / Document Type", d.docType], ["Issued Department", d.department],
    ["Dispatch Mode", d.dispatchMode], ["Dispatch Date", fmt(d.dispatchDate)], ["Subject", d.subject], ["Description", d.description],
  ];
  return <div className="people-verified" role="status">
    <p className="people-badge"><BadgeCheck />Document Verified</p>
    <h3>{d.subject}</h3>
    <table><tbody>{rows.filter(([, v]) => v).map(([l, v]) => <tr key={l}><th><FileCheck2 />{l}</th><td>{v}</td></tr>)}</tbody></table>
  </div>;
}

function MentorVerifyForm() {
  const [form, setForm] = useState({ mentorCode: "", email: "", phone: "" });
  const verify = useServerFn(verifyMentor);
  const m = useMutation({ mutationFn: () => verify({ data: { mentorCode: form.mentorCode || undefined, email: form.email || undefined, phone: form.phone || undefined } }) });
  const filled = [form.mentorCode, form.email, form.phone].filter((v) => v.trim().length >= 3).length;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm((f) => ({ ...f, [key]: e.target.value })); m.reset(); };
  return <>
    <form className="people-verify-form" onSubmit={(e) => { e.preventDefault(); if (filled >= 2) m.mutate(); }}>
      <label><KeyRound /><input aria-label="Mentor code" placeholder="Mentor Code" value={form.mentorCode} maxLength={40} onChange={set("mentorCode")} /></label>
      <label><Mail /><input aria-label="Mentor email" type="email" placeholder="Mentor Email" value={form.email} maxLength={120} onChange={set("email")} /></label>
      <label><Phone /><input aria-label="Mentor phone" type="tel" placeholder="Mentor Contact Number" value={form.phone} maxLength={20} onChange={set("phone")} /></label>
      <Button type="submit" disabled={filled < 2 || m.isPending}>{m.isPending ? "Verifying..." : "Verify Mentor"}<ArrowRight /></Button>
    </form>
    <p className="people-verify-hint">Fill any two of the three fields above.</p>
    {m.data?.verified && <MentorResult mentor={m.data.mentor} />}
    {m.data && !m.data.verified && <p className="people-verify-fail" role="alert"><ShieldX />Not verified. The details do not match any mentor in our network.</p>}
    {m.isError && <p className="people-verify-fail" role="alert"><ShieldX />Please check the details and try again.</p>}
  </>;
}

function MentorResult({ mentor: mt }: { mentor: VerifiedMentor }) {
  return <div className="people-verified" role="status">
    <p className="people-badge"><BadgeCheck />Verified Mentor</p>
    <h3>{mt.name}</h3>
    <p className="people-role">{mt.title}</p>
    {mt.bio && <p>{mt.bio}</p>}
    <table><tbody>
      <tr><th><IdCard />Mentor Code</th><td>{mt.mentorCode}</td></tr>
      {mt.focus.length > 0 && <tr><th><ClipboardList />Expertise</th><td>{mt.focus.join(", ")}</td></tr>}
      {mt.regions.length > 0 && <tr><th><MapPin />Regions</th><td>{mt.regions.join(" | ")}</td></tr>}
    </tbody></table>
  </div>;
}

function IdCardResult({ e }: { e: VerifiedEmployeeFlex }) {
  const rows: [typeof IdCard, string, string | null][] = [
    [IdCard, "Employee ID", e.employeeId], [Building2, "Department", e.department], [UserRound, "Designation", e.designation],
    [MapPin, "Work Location", e.workLocation], [CalendarDays, "Date of Joining", e.dateOfJoining ? new Date(e.dateOfJoining).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : null], [Mail, "Official Email", e.officialEmail],
  ];
  return <div className="people-verified" role="status">
    <p className="people-badge"><BadgeCheck />Verified Employee</p>
    <h3>{e.name}</h3>
    <table><tbody>{rows.filter(([, , v]) => v).map(([I, l, v]) => <tr key={l}><th><I />{l}</th><td>{v}</td></tr>)}</tbody></table>
  </div>;
}

export function TeamProfile({ member: p }: { member: TeamMember }) {
  const [first, ...rest] = p.name.split(" ");
  const rows: [typeof IdCard, string, string][] = [[IdCard, "Employee ID", p.employeeId], [Building2, "Department", p.department], [UserRound, "Designation", p.designation], [MapPin, "Work Location", p.location], [Users, "Reporting To", p.reportingTo]];
  return <><SiteHeader /><main className="investor-page people-page">
    <div className="page-shell people-section">
      <nav className="investor-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>›</span><Link to="/our-team">Our Team</Link><span>›</span><b>Employee Profile</b></nav>
      <p className="investor-eyebrow">Employee Profile</p>
      <h1>{first} <em>{rest.join(" ")}</em></h1><h2 className="people-sub">{p.designation}</h2><p className="people-lead">{p.department}</p>
      <section className="people-employee">
        <div className="people-profile-photo"><Portrait index={p.portrait} name={p.name} large /></div>
        <div className="people-card-box"><h3><ClipboardList />Employee Details</h3><table><tbody>{rows.map(([I, l, v]) => <tr key={l}><th><I />{l}</th><td>{v}</td></tr>)}</tbody></table>
          <p className="people-note"><ShieldCheck />To confirm this person works with us, use <Link to="/our-team">Verify Our Employee</Link> with their Employee ID and Code.</p></div>
      </section>
      <dl className="people-facts">{[[Building2, "Department", p.department], [Users, "Team", p.team], [MapPin, "Work Location", p.location]].map(([I, l, v]) => { const Icon = I as typeof Users; return <div key={String(l)}><Icon /><dt>{String(l)}</dt><dd>{String(v)}</dd></div>; })}</dl>
      <div className="people-two">
        <section className="people-card-box"><h3><ClipboardList />Role & Responsibilities</h3><ul className="people-bullets">{p.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul></section>
        <section className="people-card-box"><h3><BarChart3 />Skills & Expertise</h3><div className="people-pills">{p.skills.map((s) => <span key={s}>{s}</span>)}</div></section>
        <section className="people-card-box"><h3><GraduationCap />Education</h3><p><b>{p.education.degree}</b><br />{p.education.school}</p></section>
        <section className="people-card-box"><h3><Globe />Languages</h3><div className="people-pills">{p.languages.map((s) => <span key={s}>{s}</span>)}</div></section>
      </div>
      <Button asChild variant="outline" className="mt-8"><Link to="/our-team"><ArrowLeft />Back to Team Members</Link></Button>
    </div>
  </main><SiteFooter /></>;
}

export { team };
