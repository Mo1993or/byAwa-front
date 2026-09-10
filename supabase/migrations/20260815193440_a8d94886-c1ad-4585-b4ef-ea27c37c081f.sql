CREATE OR REPLACE FUNCTION public.handle_vendor_provision()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.wallets (vendor_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  IF NEW.status <> 'rejected' AND NEW.status <> 'blocked' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'vendor')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;

-- Rattraper les vendeurs existants sans rôle vendeur
INSERT INTO public.user_roles (user_id, role)
SELECT v.user_id, 'vendor'::app_role FROM public.vendors v
WHERE v.status NOT IN ('rejected','blocked')
ON CONFLICT (user_id, role) DO NOTHING;