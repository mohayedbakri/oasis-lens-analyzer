
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('media','pdfs') AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('media','pdfs') AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id IN ('media','pdfs') AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins list media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id IN ('media','pdfs') AND public.has_role(auth.uid(),'admin'));
