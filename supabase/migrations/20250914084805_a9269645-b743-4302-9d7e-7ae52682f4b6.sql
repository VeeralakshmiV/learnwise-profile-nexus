-- Create admin user profile for kharalya2023@gmail.com
DO $$
DECLARE
    admin_uuid uuid := gen_random_uuid();
BEGIN
    -- Try to insert new profile, or update existing one
    INSERT INTO public.profiles (id, email, name, role, full_name, created_at, updated_at)
    VALUES (
        admin_uuid,
        'kharalya2023@gmail.com',
        'Admin User',
        'admin',
        'Admin User',
        now(),
        now()
    ) ON CONFLICT (email) DO UPDATE SET
        role = 'admin',
        name = 'Admin User',
        full_name = 'Admin User',
        updated_at = now();
END $$;

-- Update the handle_new_user function to not default to student role
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function without default student role restriction
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'), -- Changed from 'student' to 'user'
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    now(),
    now()
  );
  RETURN NEW;
END;
$$;