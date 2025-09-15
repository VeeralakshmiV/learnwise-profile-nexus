-- First, let's check if there are any recent signups that didn't get profiles created
DO $$
DECLARE
    user_record RECORD;
BEGIN
    -- Find users without profiles and create them
    FOR user_record IN 
        SELECT id, email, raw_user_meta_data, created_at 
        FROM auth.users 
        WHERE id NOT IN (SELECT id FROM public.profiles)
        AND created_at > (NOW() - INTERVAL '1 day')
    LOOP
        INSERT INTO public.profiles (id, email, name, role, full_name, created_at, updated_at)
        VALUES (
            user_record.id,
            user_record.email,
            COALESCE(user_record.raw_user_meta_data->>'full_name', user_record.email),
            COALESCE(user_record.raw_user_meta_data->>'role', 'student'),
            COALESCE(user_record.raw_user_meta_data->>'full_name', 'New User'),
            user_record.created_at,
            NOW()
        );
        
        RAISE NOTICE 'Created profile for user: %', user_record.email;
    END LOOP;
END $$;

-- Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    RAISE NOTICE 'Creating profile for user: % with email: %', NEW.id, NEW.email;
    
    INSERT INTO public.profiles (id, email, name, role, full_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'Successfully created profile for user: %', NEW.email;
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating profile for user %: %', NEW.email, SQLERRM;
        RETURN NEW; -- Don't block user creation if profile creation fails
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();