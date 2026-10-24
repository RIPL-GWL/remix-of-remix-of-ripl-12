import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/verification")({
  head: () => ({ meta: [{ title: "Verification Records — RIPL Admin" }, { name: "robots", content: "noindex" }] }),
  component: VerificationPage,
});

type DocRow = {
  id: string; letter_number: string; reference_number: string; issued_date: string;
  issued_to: string; issued_by: string; category: string; doc_type: string; department: string;
  dispatch_mode: string; dispatch_date: string | null; subject: string; description: string | null; is_active: boolean;
};
type MentorRow = {
  id: string; mentor_code: string; full_name: string; title: string; email: string | null; phone: string | null;
  focus: string[]; regions: string[]; bio: string | null; is_active: boolean;
};

const DOC_FIELDS: { key: keyof DocRow; label: string; type?: string; long?: boolean }[] = [
  { key: "letter_number", label: "Letter Number" },
  { key: "reference_number", label: "Reference Number" },
  { key: "issued_date", label: "Issue Date", type: "date" },
  { key: "issued_to", label: "Issued To" },
  { key: "issued_by", label: "Issued By" },
  { key: "category", label: "Letter / Document Category" },
  { key: "doc_type", label: "Letter / Document Type" },
  { key: "department", label: "Issued Department" },
  { key: "dispatch_mode", label: "Dispatch Mode" },
  { key: "dispatch_date", label: "Dispatch Date", type: "date" },
  { key: "subject", label: "Subject" },
  { key: "description", label: "Description", long: true },
];

const MENTOR_FIELDS: { key: keyof MentorRow; label: string; list?: boolean; long?: boolean }[] = [
  { key: "mentor_code", label: "Mentor Code" },
  { key: "full_name", label: "Full Name" },
  { key: "title", label: "Title" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "focus", label: "Expertise (comma separated)", list: true },
  { key: "regions", label: "Regions (comma separated)", list: true },
  { key: "bio", label: "Bio", long: true },
];

const cls = "mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground";

function VerificationPage() {
  const [tab, setTab] = useState<"documents" | "mentors">("documents");
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Verification Records</h1>
        <p className="text-sm text-muted-foreground">
          These records power the public “Verify Our Team Member” section. Documents verify only when letter number,
          reference number and issue date all match. Mentors verify when any two of code, email and phone match.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant={tab === "documents" ? "default" : "outline"} onClick={() => setTab("documents")}>Letters & Documents</Button>
        <Button size="sm" variant={tab === "mentors" ? "default" : "outline"} onClick={() => setTab("mentors")}>Verified Mentors</Button>
      </div>
      {tab === "documents" ? <DocumentsAdmin /> : <MentorsAdmin />}
    </div>
  );
}

function DocumentsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<DocRow> | null>(null);
  const { data: rows = [] } = useQuery({
    queryKey: ["admin-verification-docs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("verification_documents").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as DocRow[];
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-verification-docs"] });

  async function save(r: Partial<DocRow>) {
    if (!r.letter_number?.trim() || !r.reference_number?.trim() || !r.issued_date || !r.issued_to?.trim() || !r.issued_by?.trim() || !r.subject?.trim()) {
      toast.error("Letter number, reference number, issue date, issued to, issued by and subject are required.");
      return;
    }
    const payload = {
      letter_number: r.letter_number.trim(), reference_number: r.reference_number.trim(), issued_date: r.issued_date,
      issued_to: r.issued_to.trim(), issued_by: r.issued_by.trim(), category: r.category?.trim() || "General",
      doc_type: r.doc_type?.trim() || "Letter", department: r.department?.trim() || "Administration",
      dispatch_mode: r.dispatch_mode?.trim() || "Email", dispatch_date: r.dispatch_date || null,
      subject: r.subject.trim(), description: r.description?.trim() || null, is_active: r.is_active ?? true,
    };
    const { error } = r.id
      ? await supabase.from("verification_documents").update(payload).eq("id", r.id)
      : await supabase.from("verification_documents").insert(payload);
    if (error) { toast.error(error.message.includes("duplicate") ? "This letter and reference number pair already exists." : error.message); return; }
    toast.success("Saved");
    setEditing(null);
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this document record?")) return;
    const { error } = await supabase.from("verification_documents").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end"><Button size="sm" variant="secondary" onClick={() => setEditing({ is_active: true })}>Add document</Button></div>
      {editing && (
        <form key={editing.id ?? "new"} className="grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save(editing); }}>
          {DOC_FIELDS.map((f) => (
            <label key={f.key} className={`text-sm text-muted-foreground ${f.long ? "sm:col-span-2" : ""}`}>
              {f.label}
              {f.long
                ? <textarea className={cls} rows={3} maxLength={2000} defaultValue={String(editing[f.key] ?? "")} onBlur={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                : <input className={cls} type={f.type ?? "text"} maxLength={300} defaultValue={String(editing[f.key] ?? "")} onBlur={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />}
            </label>
          ))}
          <div className="flex gap-2 sm:col-span-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
        </form>
      )}
      <div className="divide-y rounded-lg border bg-card">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 p-3 text-sm">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{r.subject} {!r.is_active && <span className="text-muted-foreground">(inactive)</span>}</p>
              <p className="text-muted-foreground">Letter {r.letter_number} · Ref {r.reference_number} · {r.issued_date} · {r.issued_to}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => save({ ...r, is_active: !r.is_active })}>{r.is_active ? "Deactivate" : "Activate"}</Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(r)}>Edit</Button>
            <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
          </div>
        ))}
        {rows.length === 0 && <p className="p-4 text-sm text-muted-foreground">No document records yet. Add one so visitors can verify official letters.</p>}
      </div>
    </div>
  );
}

function MentorsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Partial<MentorRow> | null>(null);
  const { data: rows = [] } = useQuery({
    queryKey: ["admin-verified-mentors"],
    queryFn: async () => {
      const { data, error } = await supabase.from("verified_mentors").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as MentorRow[];
    },
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-verified-mentors"] });

  async function save(r: Partial<MentorRow>) {
    if (!r.mentor_code?.trim() || !r.full_name?.trim() || !r.title?.trim()) {
      toast.error("Mentor code, name and title are required.");
      return;
    }
    const payload = {
      mentor_code: r.mentor_code.trim(), full_name: r.full_name.trim(), title: r.title.trim(),
      email: r.email?.trim() || null, phone: r.phone?.trim() || null,
      focus: r.focus ?? [], regions: r.regions ?? [], bio: r.bio?.trim() || null, is_active: r.is_active ?? true,
    };
    const { error } = r.id
      ? await supabase.from("verified_mentors").update(payload).eq("id", r.id)
      : await supabase.from("verified_mentors").insert(payload);
    if (error) { toast.error(error.message.includes("duplicate") ? "That mentor code already exists." : error.message); return; }
    toast.success("Saved");
    setEditing(null);
    refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this mentor record?")) return;
    const { error } = await supabase.from("verified_mentors").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    refresh();
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end"><Button size="sm" variant="secondary" onClick={() => setEditing({ is_active: true, focus: [], regions: [] })}>Add mentor</Button></div>
      {editing && (
        <form key={editing.id ?? "new"} className="grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); save(editing); }}>
          {MENTOR_FIELDS.map((f) => {
            const v = editing[f.key];
            const text = Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v);
            const set = (s: string) => setEditing({ ...editing, [f.key]: f.list ? s.split(",").map((x) => x.trim()).filter(Boolean) : s });
            return (
              <label key={f.key} className={`text-sm text-muted-foreground ${f.long ? "sm:col-span-2" : ""}`}>
                {f.label}
                {f.long
                  ? <textarea className={cls} rows={3} maxLength={2000} defaultValue={text} onBlur={(e) => set(e.target.value)} />
                  : <input className={cls} maxLength={300} defaultValue={text} onBlur={(e) => set(e.target.value)} />}
              </label>
            );
          })}
          <div className="flex gap-2 sm:col-span-2"><Button type="submit">Save</Button><Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button></div>
        </form>
      )}
      <div className="divide-y rounded-lg border bg-card">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-3 p-3 text-sm">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{r.full_name} {!r.is_active && <span className="text-muted-foreground">(inactive)</span>}</p>
              <p className="text-muted-foreground">{r.mentor_code} · {r.title}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => save({ ...r, is_active: !r.is_active })}>{r.is_active ? "Deactivate" : "Activate"}</Button>
            <Button size="sm" variant="outline" onClick={() => setEditing(r)}>Edit</Button>
            <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>
          </div>
        ))}
        {rows.length === 0 && <p className="p-4 text-sm text-muted-foreground">No verified mentors yet. Add one so visitors can verify mentor profiles.</p>}
      </div>
    </div>
  );
}
