-- Priority 1: Fix Critical RLS Policy Vulnerabilities

-- 1. SECURE COURSES TABLE
-- Remove overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON public.courses;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.courses;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.courses;

-- Create secure policies for courses
CREATE POLICY "Only staff and admins can create courses" 
ON public.courses 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff and admins can update courses" 
ON public.courses 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff and admins can delete courses" 
ON public.courses 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 2. SECURE COURSE SECTIONS
-- Remove overly permissive policies
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.course_sections;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.course_sections;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.course_sections;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.course_sections;

-- Create secure policies for course sections
CREATE POLICY "Only staff can create course sections" 
ON public.course_sections 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can update course sections" 
ON public.course_sections 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete course sections" 
ON public.course_sections 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 3. SECURE COURSE CONTENT
-- Remove overly permissive policies
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON public.course_content;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.course_content;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON public.course_content;

-- Create secure policies for course content
CREATE POLICY "Only staff can create course content" 
ON public.course_content 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can update course content" 
ON public.course_content 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete course content" 
ON public.course_content 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 4. SECURE COURSE DISCUSSIONS
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view course discussions" ON public.course_discussions;

-- Create secure policy for course discussions - only enrolled users can view
CREATE POLICY "Only enrolled users can view course discussions" 
ON public.course_discussions 
FOR SELECT 
USING (
  is_user_enrolled_in_course(course_id) OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 5. PREVENT ROLE PRIVILEGE ESCALATION
-- Add policy to prevent users from updating their own role
CREATE POLICY "Users cannot update their own role" 
ON public.profiles 
FOR UPDATE 
USING (
  auth.uid() = id AND (
    -- Allow updating own profile but not role
    (OLD.role = NEW.role) OR 
    -- Only admins can change roles
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- 6. SECURE ENROLLMENTS
-- Remove overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can manage enrollments" ON public.enrollments;

-- Create secure enrollment policies
CREATE POLICY "Only staff can create enrollments" 
ON public.enrollments 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  ) OR 
  -- Allow students to enroll themselves in free courses
  (auth.uid() = student_id AND EXISTS (
    SELECT 1 FROM public.courses 
    WHERE id = course_id AND is_free = true
  ))
);

CREATE POLICY "Only staff can update enrollments" 
ON public.enrollments 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete enrollments" 
ON public.enrollments 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 7. SECURE PAYMENTS
-- Remove overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can manage payments" ON public.payments;

-- Create secure payment policies
CREATE POLICY "Only staff can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can update payments" 
ON public.payments 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete payments" 
ON public.payments 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 8. SECURE QUIZZES AND ASSIGNMENTS
-- Remove overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can manage quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Authenticated users can manage assignments" ON public.assignments;

-- Create secure quiz policies
CREATE POLICY "Only staff can create quizzes" 
ON public.quizzes 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can update quizzes" 
ON public.quizzes 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete quizzes" 
ON public.quizzes 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- Create secure assignment policies
CREATE POLICY "Only staff can create assignments" 
ON public.assignments 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can update assignments" 
ON public.assignments 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Only staff can delete assignments" 
ON public.assignments 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'staff')
  )
);

-- 9. CREATE AUDIT LOG TABLE FOR SECURITY MONITORING
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_action text,
  p_table_name text,
  p_record_id uuid DEFAULT NULL,
  p_old_data jsonb DEFAULT NULL,
  p_new_data jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, old_data, new_data)
  VALUES (auth.uid(), p_action, p_table_name, p_record_id, p_old_data, p_new_data);
END;
$$;