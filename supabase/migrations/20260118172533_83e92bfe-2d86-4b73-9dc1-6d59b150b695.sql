-- Add media_type column to gallery_items table
ALTER TABLE public.gallery_items 
ADD COLUMN media_type text NOT NULL DEFAULT 'image';

-- Add a check constraint to ensure valid media types
ALTER TABLE public.gallery_items 
ADD CONSTRAINT valid_media_type CHECK (media_type IN ('image', 'video'));