/*
  # Remove All Role-Based Access Controls

  1. Purpose
    - Removes all Row Level Security (RLS) policies from all tables
    - Disables RLS on all tables to allow unrestricted access
    - Simplifies database access by removing role-based restrictions

  2. Tables Affected
    - profiles: Remove role-based policies, allow all operations
    - courses: Remove instructor/staff restrictions
    - course_sections: Remove staff-only policies
    - course_content: Remove enrollment-based restrictions
    - course_materials: Remove enrollment checks
    - course_discussions: Remove user-specific policies
    - enrollments: Remove student/staff restrictions
    - assignments: Remove instructor-only policies
    - assignment_submissions: Remove student-specific policies
    - quizzes: Remove instructor restrictions
    - quiz_questions: Remove staff-only access
    - quiz_attempts: Remove student-specific policies
    - payments: Remove student/staff restrictions
    - student_certificates: Remove student-specific access
    - user_progress: Remove user-specific restrictions
    - course_inquiries: Remove staff-only policies

  3. Security Changes
    - All tables will have RLS disabled
    - All existing policies will be dropped
    - Data will be accessible to any authenticated user
    - No role-based restrictions will remain

  4. Important Notes
    - This removes all security restrictions
    - Consider implementing application-level security if needed
    - All users will have full access to all data
*/

-- Drop all policies from profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Drop all policies from courses table
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON courses;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON courses;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON courses;
DROP POLICY IF EXISTS "Everyone can view courses" ON courses;
DROP POLICY IF EXISTS "Staff and admins can manage courses" ON courses;

-- Drop all policies from course_sections table
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON course_sections;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON course_sections;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON course_sections;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON course_sections;
DROP POLICY IF EXISTS "Enrolled users can view course sections" ON course_sections;
DROP POLICY IF EXISTS "Staff can manage course sections" ON course_sections;

-- Drop all policies from course_content table
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON course_content;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON course_content;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON course_content;
DROP POLICY IF EXISTS "Enrolled users can view course content" ON course_content;
DROP POLICY IF EXISTS "Staff can manage course content" ON course_content;

-- Drop all policies from course_materials table
DROP POLICY IF EXISTS "Enrolled users can view course materials" ON course_materials;
DROP POLICY IF EXISTS "Staff can manage course materials" ON course_materials;

-- Drop all policies from course_discussions table
DROP POLICY IF EXISTS "Users can create their own discussions" ON course_discussions;
DROP POLICY IF EXISTS "Users can delete their own discussions" ON course_discussions;
DROP POLICY IF EXISTS "Users can update their own discussions" ON course_discussions;
DROP POLICY IF EXISTS "Users can view course discussions" ON course_discussions;

-- Drop all policies from enrollments table
DROP POLICY IF EXISTS "Staff can manage enrollments" ON enrollments;
DROP POLICY IF EXISTS "Students can view their own enrollments" ON enrollments;

-- Drop all policies from assignments table
DROP POLICY IF EXISTS "Instructors can manage their course assignments" ON assignments;

-- Drop all policies from assignment_submissions table
DROP POLICY IF EXISTS "Staff can update all submissions" ON assignment_submissions;
DROP POLICY IF EXISTS "Staff can view all submissions" ON assignment_submissions;
DROP POLICY IF EXISTS "Students can create their own submissions" ON assignment_submissions;
DROP POLICY IF EXISTS "Students can update their own submissions" ON assignment_submissions;
DROP POLICY IF EXISTS "Students can view their own submissions" ON assignment_submissions;

-- Drop all policies from quizzes table
DROP POLICY IF EXISTS "Instructors can manage their course quizzes" ON quizzes;

-- Drop all policies from quiz_questions table
DROP POLICY IF EXISTS "Staff and admins can view all quiz question data" ON quiz_questions;
DROP POLICY IF EXISTS "Staff can manage quiz questions" ON quiz_questions;
DROP POLICY IF EXISTS "Students cannot directly access quiz questions" ON quiz_questions;

-- Drop all policies from quiz_attempts table
DROP POLICY IF EXISTS "Staff can view all quiz attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Students can manage their own quiz attempts" ON quiz_attempts;

-- Drop all policies from payments table
DROP POLICY IF EXISTS "Staff can manage payments" ON payments;
DROP POLICY IF EXISTS "Students can view their own payments" ON payments;

-- Drop all policies from student_certificates table
DROP POLICY IF EXISTS "Staff can manage certificates" ON student_certificates;
DROP POLICY IF EXISTS "Students can view their own certificates" ON student_certificates;

-- Drop all policies from user_progress table
DROP POLICY IF EXISTS "Staff can view all progress" ON user_progress;
DROP POLICY IF EXISTS "Users can manage their own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;

-- Drop all policies from course_inquiries table
DROP POLICY IF EXISTS "Staff can manage course inquiries" ON course_inquiries;

-- Disable RLS on all tables
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_discussions DISABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;
ALTER TABLE assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_inquiries DISABLE ROW LEVEL SECURITY;

-- Create simple policies that allow all operations for authenticated users
-- This provides basic authentication requirement while removing role restrictions

-- Profiles - allow all operations for authenticated users
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON profiles
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Courses - allow all operations for authenticated users
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON courses
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course sections - allow all operations for authenticated users
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON course_sections
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course content - allow all operations for authenticated users
ALTER TABLE course_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON course_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course materials - allow all operations for authenticated users
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON course_materials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course discussions - allow all operations for authenticated users
ALTER TABLE course_discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON course_discussions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enrollments - allow all operations for authenticated users
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON enrollments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Assignments - allow all operations for authenticated users
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON assignments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Assignment submissions - allow all operations for authenticated users
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON assignment_submissions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Quizzes - allow all operations for authenticated users
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON quizzes
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Quiz questions - allow all operations for authenticated users
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON quiz_questions
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Quiz attempts - allow all operations for authenticated users
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON quiz_attempts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Payments - allow all operations for authenticated users
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON payments
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Student certificates - allow all operations for authenticated users
ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON student_certificates
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- User progress - allow all operations for authenticated users
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON user_progress
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Course inquiries - allow all operations for authenticated users
ALTER TABLE course_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for authenticated users" ON course_inquiries
  FOR ALL TO authenticated USING (true) WITH CHECK (true);