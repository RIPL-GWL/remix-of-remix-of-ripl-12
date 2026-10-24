CREATE TABLE public.verification_audit_log (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), occurred_at timestamptz NOT NULL DEFAULT now(), event_type text NOT NULL CHECK (event_type IN ('record_change','public_attempt')), record_type text NOT NULL CHECK (record_type IN ('employee','document','mentor')), record_id uuid, record_label text, actor_id uuid, action text NOT NULL, result text NOT NULL, fields text[] NOT NULL DEFAULT '{}'
);
GRANT SELECT ON public.verification_audit_log TO authenticated;
GRANT ALL ON public.verification_audit_log TO service_role;
ALTER TABLE public.verification_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Verification admins read audit" ON public.verification_audit_log FOR SELECT TO authenticated USING (public.is_admin(auth.uid()) OR public.has_role(auth.uid(),'hr_manager'));
CREATE INDEX verification_audit_time_idx ON public.verification_audit_log(occurred_at DESC);
CREATE FUNCTION public.audit_verification_record_change() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE before_row jsonb; after_row jsonb; row_data jsonb; changed text[]; kind text; label text;
BEGIN
 before_row := CASE WHEN TG_OP = 'INSERT' THEN '{}'::jsonb ELSE to_jsonb(OLD) END;
 after_row := CASE WHEN TG_OP = 'DELETE' THEN '{}'::jsonb ELSE to_jsonb(NEW) END;
 row_data := CASE WHEN TG_OP = 'DELETE' THEN before_row ELSE after_row END;
 SELECT coalesce(array_agg(k),'{}') INTO changed FROM (SELECT jsonb_object_keys(before_row || after_row) AS k) keys WHERE before_row->k IS DISTINCT FROM after_row->k;
 kind := CASE TG_TABLE_NAME WHEN 'employees' THEN 'employee' WHEN 'verification_documents' THEN 'document' ELSE 'mentor' END;
 label := CASE kind WHEN 'employee' THEN row_data->>'employee_id' WHEN 'document' THEN row_data->>'letter_number' ELSE row_data->>'mentor_code' END;
 INSERT INTO public.verification_audit_log(event_type,record_type,record_id,record_label,actor_id,action,result,fields) VALUES('record_change',kind,(row_data->>'id')::uuid,label,auth.uid(),lower(TG_OP),'saved',changed);
 RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END $$;
REVOKE ALL ON FUNCTION public.audit_verification_record_change() FROM PUBLIC;
CREATE TRIGGER audit_verification_documents AFTER INSERT OR UPDATE OR DELETE ON public.verification_documents FOR EACH ROW EXECUTE FUNCTION public.audit_verification_record_change();
CREATE TRIGGER audit_verified_mentors AFTER INSERT OR UPDATE OR DELETE ON public.verified_mentors FOR EACH ROW EXECUTE FUNCTION public.audit_verification_record_change();
CREATE TRIGGER audit_verification_employees AFTER INSERT OR UPDATE OR DELETE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.audit_verification_record_change();