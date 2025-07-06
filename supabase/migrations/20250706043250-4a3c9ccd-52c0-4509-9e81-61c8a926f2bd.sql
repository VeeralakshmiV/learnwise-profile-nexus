-- Fix infinite recursion in profiles RLS policies
-- Drop problematic policies that cause recursion
DROP POLICY IF EXISTS "Admins can create user profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles; 
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create safer policies that don't cause recursion
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles 
FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile  
CREATE POLICY "Users can update own profile" ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

-- Allow anyone to insert their own profile (needed for signup)
CREATE POLICY "Users can insert own profile" ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

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

-- Admin policy using the security definer function
CREATE POLICY "Admins can manage all profiles" ON public.profiles 
FOR ALL USING (public.is_admin(auth.uid()));

-- Ensure we have an admin user for testing
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES (
  'a09c501f-545d-4c4d-aa64-ec696fdbc102',
  'veeralakshmi.alphafly@gmail.com', 
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"role": "admin"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

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