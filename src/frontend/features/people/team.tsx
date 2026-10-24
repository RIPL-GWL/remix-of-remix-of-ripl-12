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
          <p className="people-note"><ShieldCheck />To confirm this person works with us, use <Link to="/verification">Verify Our Team Member</Link>.</p></div>
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
