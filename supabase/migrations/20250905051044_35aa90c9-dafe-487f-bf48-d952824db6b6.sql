-- Create a security definer function to check if user is staff/admin
CREATE OR REPLACE FUNCTION public.is_staff_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Everyone can view quiz questions" ON public.quiz_questions;

-- Create secure policies for quiz questions
CREATE POLICY "Students can view quiz questions without answers" 
ON public.quiz_questions 
FOR SELECT 
USING (
  NOT is_staff_or_admin()
);

CREATE POLICY "Staff can view all quiz question data" 
ON public.quiz_questions 
FOR SELECT 
USING (
  is_staff_or_admin()
);

-- Create a view for students that excludes correct answers
CREATE OR REPLACE VIEW public.quiz_questions_student AS
SELECT 
  id,
  quiz_id,
  question_type,
  options,
  points,
  order_index,
  question_text,
  CASE 
    WHEN is_staff_or_admin() THEN correct_answer 
    ELSE NULL 
  END as correct_answer
FROM public.quiz_questions;

-- Grant access to the view
GRANT SELECT ON public.quiz_questions_student TO authenticated;