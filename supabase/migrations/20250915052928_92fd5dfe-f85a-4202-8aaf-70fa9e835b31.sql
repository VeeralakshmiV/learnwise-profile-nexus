-- Enable RLS on the remaining table
ALTER TABLE public.profiles_backup ENABLE ROW LEVEL SECURITY;

-- Add a policy for the backup table (restrictive since it's a backup)
CREATE POLICY "Only admins can access backup table" ON public.profiles_backup FOR ALL USING (false);