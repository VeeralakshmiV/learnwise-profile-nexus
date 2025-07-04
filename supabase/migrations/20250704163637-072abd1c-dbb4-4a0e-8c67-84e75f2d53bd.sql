-- Fix schema mismatches to align with existing code expectations

-- Update courses table to match expected schema
ALTER TABLE public.courses 
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Copy name to title if title is empty
UPDATE public.courses SET title = name WHERE title IS NULL OR title = '';

-- Update profiles table to match expected schema  
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS full_name text;

-- Copy existing name to full_name if full_name is empty
UPDATE public.profiles SET full_name = COALESCE(name, email) WHERE full_name IS NULL OR full_name = '';

-- Update course_content table to have proper structure
ALTER TABLE public.course_content 
  DROP COLUMN IF EXISTS content_data,
  ADD COLUMN IF NOT EXISTS content text;