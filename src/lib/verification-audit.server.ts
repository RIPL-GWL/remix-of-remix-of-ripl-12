import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function recordVerificationAttempt(client: SupabaseClient<Database>, recordType: "employee" | "mentor" | "document", result: "verified" | "not_verified" | "error", fields: string[], recordId: string | null = null, recordLabel: string | null = null) {
  const { error } = await client.from("verification_audit_log").insert({
    event_type: "public_attempt", record_type: recordType, action: "verify", result,
    record_id: recordId, record_label: recordLabel, fields,
  });
  if (error) throw new Error("Verification is temporarily unavailable. Please try again.");
}