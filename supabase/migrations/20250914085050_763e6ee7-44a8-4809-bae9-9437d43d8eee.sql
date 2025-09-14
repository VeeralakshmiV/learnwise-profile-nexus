-- Fix security definer view issue by updating the view to be security invoker
DROP VIEW IF EXISTS student_quiz_questions;

-- Note: The student_quiz_questions view was already dropped in previous migration
-- This is just to ensure it's not recreated with SECURITY DEFINER

-- Create a proper view without security definer for quiz questions accessible to students
-- Using the existing function get_quiz_questions_for_student instead