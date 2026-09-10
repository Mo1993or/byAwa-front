CREATE OR REPLACE FUNCTION public.handle_vendor_provision()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.wallets (vendor_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  IF NEW.status = 'approved' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'vendor')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_vendor_provision() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS vendors_provision ON public.vendors;
CREATE TRIGGER vendors_provision
AFTER INSERT OR UPDATE OF status ON public.vendors
FOR EACH ROW EXECUTE FUNCTION public.handle_vendor_provision();

INSERT INTO public.wallets (vendor_id)
SELECT v.id FROM public.vendors v
LEFT JOIN public.wallets w ON w.vendor_id = v.id
WHERE w.id IS NULL;