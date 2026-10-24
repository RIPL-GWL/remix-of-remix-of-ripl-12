import { describe, expect, it, vi } from "vitest";
import { recordVerificationAttempt } from "@/lib/verification-audit.server";

describe("Verification audit events", () => {
  it("records verified attempts with related record and only field names", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const client = { from: vi.fn().mockReturnValue({ insert }) };
    await recordVerificationAttempt(client as never, "employee", "verified", ["employeeId", "email"], "record-123", "RI-EMP-1024");
    expect(insert).toHaveBeenCalledWith({ event_type: "public_attempt", record_type: "employee", action: "verify", result: "verified", record_id: "record-123", record_label: "RI-EMP-1024", fields: ["employeeId", "email"] });
  });
  it("records unsuccessful attempts without claiming a matching record", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    await recordVerificationAttempt({ from: () => ({ insert }) } as never, "document", "not_verified", ["letterNumber", "referenceNumber", "issuedDate"]);
    expect(insert.mock.calls[0]?.[0].record_id).toBeNull();
    expect(insert.mock.calls[0]?.[0].result).toBe("not_verified");
  });
  it("does not report completion if audit persistence fails", async () => {
    await expect(recordVerificationAttempt({ from: () => ({ insert: async () => ({ error: new Error("offline") }) }) } as never, "mentor", "verified", ["mentorCode", "email"])).rejects.toThrow("temporarily unavailable");
  });
});