-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create gallery_items table
CREATE TABLE public.gallery_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Public read access (portfolio is public)
CREATE POLICY "Gallery items are publicly viewable" 
ON public.gallery_items 
FOR SELECT 
USING (true);

-- Only authenticated users can manage (you as admin)
CREATE POLICY "Authenticated users can insert gallery items" 
ON public.gallery_items 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery items" 
ON public.gallery_items 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete gallery items" 
ON public.gallery_items 
FOR DELETE 
TO authenticated
USING (true);

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true);

-- Storage policies for gallery bucket
CREATE POLICY "Gallery images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can update gallery images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can delete gallery images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'gallery');

-- Update timestamp trigger
CREATE TRIGGER update_gallery_items_updated_at
BEFORE UPDATE ON public.gallery_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();