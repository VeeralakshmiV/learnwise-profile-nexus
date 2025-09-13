-- Fix Quiz Security Issue: Hide correct answers from students during exams
-- This addresses the critical vulnerability where students can see quiz answers

-- First, drop the problematic policy that gives students direct access to quiz_questions
DROP POLICY IF EXISTS "Students can view quiz questions without answers" ON public.quiz_questions;

-- Create a security definer function to get quiz questions without answers for students
CREATE OR REPLACE FUNCTION public.get_quiz_questions_for_student(quiz_uuid uuid)
RETURNS TABLE (
  id uuid,
  quiz_id uuid,
  question_text text,
  question_type question_type,
  options jsonb,
  points integer,
  order_index integer
) 
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only return question data without correct answers for students
  SELECT 
    qq.id,
    qq.quiz_id,
    qq.question_text,
    qq.question_type,
    qq.options,
    qq.points,
    qq.order_index
  FROM quiz_questions qq
  WHERE qq.quiz_id = quiz_uuid
  ORDER BY qq.order_index;
$$;

-- Create a new restrictive policy for students that completely blocks direct access
CREATE POLICY "Students cannot directly access quiz questions" 
ON public.quiz_questions 
FOR SELECT 
USING (false);

-- Update the staff policy to be more specific
DROP POLICY IF EXISTS "Staff can view all quiz question data" ON public.quiz_questions;
CREATE POLICY "Staff and admins can view all quiz question data" 
ON public.quiz_questions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'staff')
  )
);

-- Create a view for safe student access to quiz questions
CREATE OR REPLACE VIEW public.student_quiz_questions AS
SELECT 
  qq.id,
  qq.quiz_id,
  qq.question_text,
  qq.question_type,
  qq.options,
  qq.points,
  qq.order_index
FROM quiz_questions qq
WHERE EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role = 'student'
);

-- Grant appropriate permissions
GRANT SELECT ON public.student_quiz_questions TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_quiz_questions_for_student(uuid) TO authenticated;

-- Also fix course content security issues identified in the scan
-- Add enrollment checking for course content access

-- Create function to check if user is enrolled in a course
CREATE OR REPLACE FUNCTION public.is_user_enrolled_in_course(course_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE student_id = auth.uid() 
    AND course_id = course_uuid
  ) OR EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'staff')
  );
$$;

-- Update course content policies to require enrollment
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON public.course_content;
DROP POLICY IF EXISTS "Users can view course content" ON public.course_content;

CREATE POLICY "Enrolled users can view course content" 
ON public.course_content 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.course_sections cs
    WHERE cs.id = course_content.section_id
    AND public.is_user_enrolled_in_course(cs.course_id)
  )
);

-- Update course sections policy  
DROP POLICY IF EXISTS "Users can view course sections" ON public.course_sections;
CREATE POLICY "Enrolled users can view course sections" 
ON public.course_sections 
FOR SELECT 
USING (public.is_user_enrolled_in_course(course_id));

-- Update course materials policy
DROP POLICY IF EXISTS "Instructors can manage their course materials" ON public.course_materials;
CREATE POLICY "Staff can manage course materials" 
ON public.course_materials 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'staff')
  )
);

CREATE POLICY "Enrolled users can view course materials" 
ON public.course_materials 
FOR SELECT 
USING (public.is_user_enrolled_in_course(course_id));