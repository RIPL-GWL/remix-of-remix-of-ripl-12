import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optional = z.string().trim().max(120).optional();

const employeeSchema = z
  .object({
    employeeId: optional,
    employeeCode: optional,
    email: optional,
    phone: optional,
  })
  .refine((v) => [v.employeeId, v.employeeCode, v.email, v.phone].filter((x) => x && x.length > 0).length >= 2, {
    message: "Fill at least two fields",
  });

export type VerifiedEmployeeFlex = {
  employeeId: string;
  name: string;
  designation: string;
  department: string;
  workLocation: string;
  dateOfJoining: string | null;
  officialEmail: string | null;
  matchedFields: string[];
};

/** Verifies an active employee when ANY TWO of ID, code, email and phone match. */
export const verifyEmployeeFlexible = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => employeeSchema.parse(input))
  .handler(async ({ data }): Promise<{ verified: true; employee: VerifiedEmployeeFlex } | { verified: false }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { recordVerificationAttempt } = await import("./verification-audit.server");
    const fields = Object.entries(data).filter(([, v]) => v?.trim()).map(([k]) => k);
    const { data: rows, error } = await supabaseAdmin
      .from("employees")
      .select("id, employee_id, employee_code, full_name, designation, department, work_location, date_of_joining, official_email, phone, is_active")
      .eq("is_active", true)
      .limit(2000);
    if (error) { await recordVerificationAttempt(supabaseAdmin, "employee", "error", fields); throw new Error("Verification is temporarily unavailable."); }
    const norm = (v?: string | null) => (v ?? "").trim().toLowerCase();
    const normPhone = (v?: string | null) => (v ?? "").replace(/\D/g, "").slice(-10);
    for (const row of rows ?? []) {
      const matched: string[] = [];
      if (data.employeeId && norm(row.employee_id) === norm(data.employeeId)) matched.push("Employee ID");
      if (data.employeeCode && norm(row.employee_code) === norm(data.employeeCode)) matched.push("Employee Code");
      if (data.email && norm(row.official_email) === norm(data.email)) matched.push("Email");
      if (data.phone && normPhone(row.phone) && normPhone(row.phone) === normPhone(data.phone)) matched.push("Phone");
      if (matched.length >= 2) {
        await recordVerificationAttempt(supabaseAdmin, "employee", "verified", fields, row.id, row.employee_id);
        return {
          verified: true,
          employee: {
            employeeId: row.employee_id,
            name: row.full_name,
            designation: row.designation,
            department: row.department,
            workLocation: row.work_location,
            dateOfJoining: row.date_of_joining,
            officialEmail: row.official_email,
            matchedFields: matched,
          },
        };
      }
    }
    await recordVerificationAttempt(supabaseAdmin, "employee", "not_verified", fields);
    return { verified: false };
  });

const documentSchema = z.object({
  letterNumber: z.string().trim().min(2).max(80),
  referenceNumber: z.string().trim().min(2).max(80),
  issuedDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type VerifiedDocument = {
  letterNumber: string;
  referenceNumber: string;
  issuedTo: string;
  issuedBy: string;
  category: string;
  docType: string;
  department: string;
  dispatchMode: string;
  dispatchDate: string | null;
  subject: string;
  description: string | null;
};

/** Verifies a letter/document only when letter number, reference number AND issue date all match. */
export const verifyDocument = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => documentSchema.parse(input))
  .handler(async ({ data }): Promise<{ verified: true; document: VerifiedDocument } | { verified: false }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { recordVerificationAttempt } = await import("./verification-audit.server");
    const fields = ["letterNumber", "referenceNumber", "issuedDate"];
    const { data: row, error } = await supabaseAdmin
      .from("verification_documents")
      .select("id, letter_number, reference_number, issued_date, issued_to, issued_by, category, doc_type, department, dispatch_mode, dispatch_date, subject, description")
      .eq("is_active", true)
      .ilike("letter_number", data.letterNumber)
      .ilike("reference_number", data.referenceNumber)
      .eq("issued_date", data.issuedDate)
      .maybeSingle();
    if (error) { await recordVerificationAttempt(supabaseAdmin, "document", "error", fields); throw new Error("Verification is temporarily unavailable."); }
    await recordVerificationAttempt(supabaseAdmin, "document", row ? "verified" : "not_verified", fields, row?.id, row?.letter_number);
    if (!row) return { verified: false };
    return {
      verified: true,
      document: {
        letterNumber: row.letter_number,
        referenceNumber: row.reference_number,
        issuedTo: row.issued_to,
        issuedBy: row.issued_by,
        category: row.category,
        docType: row.doc_type,
        department: row.department,
        dispatchMode: row.dispatch_mode,
        dispatchDate: row.dispatch_date,
        subject: row.subject,
        description: row.description,
      },
    };
  });

const mentorSchema = z
  .object({
    mentorCode: optional,
    email: optional,
    phone: optional,
  })
  .refine((v) => [v.mentorCode, v.email, v.phone].filter((x) => x && x.length > 0).length >= 2, {
    message: "Fill at least two fields",
  });

export type VerifiedMentor = {
  mentorCode: string;
  name: string;
  title: string;
  focus: string[];
  regions: string[];
  bio: string | null;
  matchedFields: string[];
};

/** Verifies a mentor when ANY TWO of mentor code, email and phone match; returns the mentor profile. */
export const verifyMentor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => mentorSchema.parse(input))
  .handler(async ({ data }): Promise<{ verified: true; mentor: VerifiedMentor } | { verified: false }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { recordVerificationAttempt } = await import("./verification-audit.server");
    const fields = Object.entries(data).filter(([, v]) => v?.trim()).map(([k]) => k);
    const { data: rows, error } = await supabaseAdmin
      .from("verified_mentors")
      .select("id, mentor_code, full_name, title, email, phone, focus, regions, bio")
      .eq("is_active", true)
      .limit(1000);
    if (error) { await recordVerificationAttempt(supabaseAdmin, "mentor", "error", fields); throw new Error("Verification is temporarily unavailable."); }
    const norm = (v?: string | null) => (v ?? "").trim().toLowerCase();
    const normPhone = (v?: string | null) => (v ?? "").replace(/\D/g, "").slice(-10);
    for (const row of rows ?? []) {
      const matched: string[] = [];
      if (data.mentorCode && norm(row.mentor_code) === norm(data.mentorCode)) matched.push("Mentor Code");
      if (data.email && norm(row.email) === norm(data.email)) matched.push("Email");
      if (data.phone && normPhone(row.phone) && normPhone(row.phone) === normPhone(data.phone)) matched.push("Phone");
      if (matched.length >= 2) {
        await recordVerificationAttempt(supabaseAdmin, "mentor", "verified", fields, row.id, row.mentor_code);
        return {
          verified: true,
          mentor: {
            mentorCode: row.mentor_code,
            name: row.full_name,
            title: row.title,
            focus: row.focus ?? [],
            regions: row.regions ?? [],
            bio: row.bio,
            matchedFields: matched,
          },
        };
      }
    }
    await recordVerificationAttempt(supabaseAdmin, "mentor", "not_verified", fields);
    return { verified: false };
  });
