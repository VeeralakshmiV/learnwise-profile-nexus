-- Create custom types first
CREATE TYPE public.content_type AS ENUM ('text', 'video', 'image', 'document', 'quiz');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE public.question_type AS ENUM ('multiple_choice', 'true_false', 'short_answer', 'essay');

-- Create missing tables
CREATE TABLE public.course_inquiries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NULL,
  course_interest text NULL,
  message text NOT NULL,
  status text NULL DEFAULT 'new'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT course_inquiries_pkey PRIMARY KEY (id),
  CONSTRAINT course_inquiries_status_check CHECK (
    status = ANY (ARRAY['new'::text, 'contacted'::text, 'converted'::text, 'closed'::text])
  )
);

CREATE TABLE public.enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid NULL,
  course_id uuid NULL,
  enrolled_at timestamp with time zone NULL DEFAULT now(),
  progress integer NULL DEFAULT 0,
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_student_id_course_id_key UNIQUE (student_id, course_id),
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles (id) ON DELETE CASCADE
);

CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid NULL,
  course_id uuid NULL,
  amount numeric(10, 2) NOT NULL,
  stripe_payment_id text NULL,
  status public.payment_status NULL DEFAULT 'pending'::payment_status,
  created_at timestamp with time zone NULL DEFAULT now(),
  updated_at timestamp with time zone NULL DEFAULT now(),
  method text NULL,
  paid_on timestamp without time zone NULL,
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
  CONSTRAINT payments_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles (id) ON DELETE CASCADE
);

CREATE TABLE public.quiz_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid NULL,
  student_id uuid NULL,
  answers jsonb NOT NULL,
  score integer NOT NULL,
  total_points integer NOT NULL,
  started_at timestamp with time zone NULL DEFAULT now(),
  completed_at timestamp with time zone NULL,
  CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE,
  CONSTRAINT quiz_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles (id) ON DELETE CASCADE
);

CREATE TABLE public.quiz_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid NULL,
  question_text text NOT NULL,
  question_type public.question_type NOT NULL,
  options jsonb NULL,
  correct_answer text NOT NULL,
  points integer NULL DEFAULT 1,
  order_index integer NOT NULL,
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE CASCADE
);

CREATE TABLE public.student_certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid NOT NULL,
  file_url text NOT NULL,
  issued_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT student_certificates_pkey PRIMARY KEY (id),
  CONSTRAINT student_certificates_course_id_fkey FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE,
  CONSTRAINT student_certificates_student_id_fkey FOREIGN KEY (student_id) REFERENCES profiles (id) ON DELETE CASCADE
);

-- Enable RLS on new tables
ALTER TABLE public.course_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_certificates ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Staff can manage course inquiries" ON public.course_inquiries
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);

CREATE POLICY "Students can view their own enrollments" ON public.enrollments
FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Staff can manage enrollments" ON public.enrollments
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);

CREATE POLICY "Students can view their own payments" ON public.payments
FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Staff can manage payments" ON public.payments
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);

CREATE POLICY "Students can manage their own quiz attempts" ON public.quiz_attempts
FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Staff can view all quiz attempts" ON public.quiz_attempts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);

CREATE POLICY "Everyone can view quiz questions" ON public.quiz_questions
FOR SELECT USING (true);

CREATE POLICY "Staff can manage quiz questions" ON public.quiz_questions
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);

CREATE POLICY "Students can view their own certificates" ON public.student_certificates
FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Staff can manage certificates" ON public.student_certificates
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'staff')
  )
);