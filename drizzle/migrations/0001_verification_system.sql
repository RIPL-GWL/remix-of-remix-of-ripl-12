ALTER TABLE public.employees ADD COLUMN phone text;

CREATE TABLE public.verification_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_number text NOT NULL,
  reference_number text NOT NULL,
  issued_date date NOT NULL,
  issued_to text NOT NULL,
  issued_by text NOT NULL,
  category text NOT NULL,
  doc_type text NOT NULL,
  department text NOT NULL,
  dispatch_mode text NOT NULL,
  dispatch_date date,
  subject text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (letter_number, reference_number)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.verification_documents TO authenticated;
GRANT ALL ON public.verification_documents TO service_role;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage verification documents" ON public.verification_documents FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE TABLE public.verified_mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_code text NOT NULL UNIQUE,
  full_name text NOT NULL,
  title text NOT NULL,
  email text,
  phone text,
  focus text[] NOT NULL DEFAULT '{}',
  regions text[] NOT NULL DEFAULT '{}',
  bio text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.verified_mentors TO authenticated;
GRANT ALL ON public.verified_mentors TO service_role;
ALTER TABLE public.verified_mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage verified mentors" ON public.verified_mentors FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));