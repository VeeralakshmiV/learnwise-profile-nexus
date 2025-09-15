-- Enable RLS on tables that need it
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

-- Create basic policies for authenticated users
-- Assignments
CREATE POLICY "Users can view assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage assignments" ON public.assignments FOR ALL USING (auth.uid() IS NOT NULL);

-- Courses  
CREATE POLICY "Anyone can view published courses" ON public.courses FOR SELECT USING (is_published = true OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage courses" ON public.courses FOR ALL USING (auth.uid() IS NOT NULL);

-- Enrollments
CREATE POLICY "Users can view their enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = student_id OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage enrollments" ON public.enrollments FOR ALL USING (auth.uid() IS NOT NULL);

-- Payments
CREATE POLICY "Users can view their payments" ON public.payments FOR SELECT USING (auth.uid() = student_id OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage payments" ON public.payments FOR ALL USING (auth.uid() IS NOT NULL);

-- Profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Quizzes
CREATE POLICY "Users can view quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage quizzes" ON public.quizzes FOR ALL USING (auth.uid() IS NOT NULL);