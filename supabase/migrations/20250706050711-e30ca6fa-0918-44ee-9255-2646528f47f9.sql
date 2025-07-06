-- Fix course_content table to add missing content_data column and content_type column
ALTER TABLE public.course_content 
ADD COLUMN IF NOT EXISTS content_data jsonb,
ADD COLUMN IF NOT EXISTS content_type text DEFAULT 'text';

-- Update existing records to have proper content_type values
UPDATE public.course_content 
SET content_type = CASE 
    WHEN type = 'lesson' THEN 'text'
    WHEN type = 'video' THEN 'video' 
    WHEN type = 'document' THEN 'pdf'
    ELSE 'text'
END
WHERE content_type IS NULL OR content_type = 'text';

-- Migrate existing content to content_data jsonb format
UPDATE public.course_content 
SET content_data = jsonb_build_object('html', content)
WHERE content IS NOT NULL AND content_data IS NULL;