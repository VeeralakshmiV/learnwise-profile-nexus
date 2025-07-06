/*
  # Add Missing Profile Fields

  1. New Columns
    - Add phone, address, and profession fields to profiles table
    - These fields are optional and can be null

  2. Security
    - No changes to existing RLS policies needed
    - Fields will be accessible based on existing policies
*/

-- Add missing fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS profession text;

-- Update existing records to ensure they have the new fields available
UPDATE public.profiles 
SET 
  phone = COALESCE(phone, ''),
  address = COALESCE(address, ''),
  profession = COALESCE(profession, '')
WHERE phone IS NULL OR address IS NULL OR profession IS NULL;