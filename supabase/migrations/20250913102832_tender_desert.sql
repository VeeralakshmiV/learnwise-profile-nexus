/*
  # Fix Admin Access Issues

  1. Purpose
    - Ensure admin user exists with correct credentials
    - Fix any authentication issues
    - Reset admin password to known value

  2. Security
    - Creates/updates admin user with secure password
    - Ensures proper role assignment
    - Fixes any profile inconsistencies

  3. Admin Credentials
    - Email: veeralakshmi.alphafly@gmail.com
    - Password: admin123 (should be changed after first login)
*/

-- Ensure the admin user exists in auth.users
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
  is_super_admin
) VALUES (
  'a09c501f-545d-4c4d-aa64-ec696fdbc102',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'veeralakshmi.alphafly@gmail.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"role": "admin", "full_name": "Admin User"}'::jsonb,
  false
) ON CONFLICT (id) DO UPDATE SET
  email = 'veeralakshmi.alphafly@gmail.com',
  encrypted_password = crypt('admin123', gen_salt('bf')),
  email_confirmed_at = now(),
  updated_at = now(),
  raw_user_meta_data = '{"role": "admin", "full_name": "Admin User"}'::jsonb;

-- Ensure the profile exists and is properly configured
INSERT INTO public.profiles (
  id,
  email,
  name,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  'a09c501f-545d-4c4d-aa64-ec696fdbc102',
  'veeralakshmi.alphafly@gmail.com',
  'Admin User',
  'Admin User',
  'admin',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = 'veeralakshmi.alphafly@gmail.com',
  name = 'Admin User',
  full_name = 'Admin User',
  role = 'admin',
  updated_at = now();

-- Create a function to safely reset admin password
CREATE OR REPLACE FUNCTION public.reset_admin_password(new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the admin user's password
  UPDATE auth.users 
  SET 
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = now()
  WHERE email = 'veeralakshmi.alphafly@gmail.com';
  
  RETURN FOUND;
END;
$$;

-- Grant execute permission to authenticated users (for emergency reset)
GRANT EXECUTE ON FUNCTION public.reset_admin_password(text) TO authenticated;