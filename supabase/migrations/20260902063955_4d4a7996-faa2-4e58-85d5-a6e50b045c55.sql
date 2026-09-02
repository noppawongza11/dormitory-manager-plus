CREATE POLICY "Users can upload own report images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'report-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users and admins can view report images"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'report-images' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin'::app_role)));

CREATE POLICY "Users can delete own report images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'report-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'phone')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'tenant')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();