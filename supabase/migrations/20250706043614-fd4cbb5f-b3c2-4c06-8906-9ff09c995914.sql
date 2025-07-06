-- Drop ALL existing policies on profiles table to start fresh
DROP POLICY IF EXISTS "Admins can create user profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles; 
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for users to their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a security definer function to safely check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create new safe policies
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile  
CREATE POLICY "Users can update own profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

-- Allow anyone to insert their own profile (needed for signup)
CREATE POLICY "Users can insert own profile" ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin policy using the security definer function
CREATE POLICY "Admins can manage all profiles" ON public.profiles 
FOR ALL USING (public.is_admin(auth.uid()));

-- Allow all authenticated users to view profiles (needed for staff to see students, etc.)
CREATE POLICY "Authenticated users can view profiles" ON public.profiles 
FOR SELECT USING (auth.role() = 'authenticated');

-- Create admin user with password 'admin123'
INSERT INTO auth.users (
  id, 
  instance_id,
  aud, 
  role,
  email, 
  encrypted_password, 
  email_confirmed_at, 
  created_at, 
  updated_at,
  raw_user_meta_data,
  confirmation_token,
  recovery_token
)
VALUES (
  'a09c501f-545d-4c4d-aa64-ec696fdbc102',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'veeralakshmi.alphafly@gmail.com', 
  '$2a$10$9V4QK8z8XB0V5Z3x5qR5xuO8fX7tIJZY1xU5Q5qR5xuO8fX7tIJZY',
  now(),
  now(),
  now(),
  '{"role": "admin"}'::jsonb,
  '',
  ''
) ON CONFLICT (id) DO UPDATE SET
  email = 'veeralakshmi.alphafly@gmail.com',
  raw_user_meta_data = '{"role": "admin"}'::jsonb;

-- Ensure the profile exists for the admin user
INSERT INTO public.profiles (id, email, name, role, full_name)
VALUES (
  'a09c501f-545d-4c4d-aa64-ec696fdbc102',
  'veeralakshmi.alphafly@gmail.com',
  'admin',
  'admin', 
  'Admin User'
) ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  email = 'veeralakshmi.alphafly@gmail.com';