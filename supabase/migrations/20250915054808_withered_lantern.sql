/*
  # Create Admin User

  1. New Operations
    - Insert admin user into auth.users table
    - Create corresponding profile in profiles table
  
  2. Security
    - Set email as confirmed
    - Use secure password hash
    - Set admin role in profile
  
  3. Notes
    - This creates the admin user: veeralakshmi.alphafly@gmail.com
    - Password: admin123
    - Role: admin
*/

-- First, check if the admin user already exists and delete if present
DELETE FROM auth.users WHERE email = 'veeralakshmi.alphafly@gmail.com';
DELETE FROM profiles WHERE email = 'veeralakshmi.alphafly@gmail.com';

-- Insert admin user into auth.users table
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'veeralakshmi.alphafly@gmail.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Admin User", "role": "admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert corresponding profile
INSERT INTO profiles (
  id,
  email,
  name,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'veeralakshmi.alphafly@gmail.com'),
  'veeralakshmi.alphafly@gmail.com',
  'admin',
  'Admin User',
  'admin',
  NOW(),
  NOW()
);