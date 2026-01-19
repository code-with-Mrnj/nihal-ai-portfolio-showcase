-- Fix gallery storage policies - restrict to admin role only
-- Currently allows any authenticated user to upload/update/delete

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;

-- Create admin-only policies for gallery bucket
CREATE POLICY "Admins can upload gallery images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (
  bucket_id = 'gallery' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update gallery images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (
  bucket_id = 'gallery' AND 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete gallery images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (
  bucket_id = 'gallery' AND 
  public.has_role(auth.uid(), 'admin')
);