REVOKE ALL ON public.verification_audit_log FROM anon, authenticated;
GRANT SELECT ON public.verification_audit_log TO authenticated;
GRANT ALL ON public.verification_audit_log TO service_role;