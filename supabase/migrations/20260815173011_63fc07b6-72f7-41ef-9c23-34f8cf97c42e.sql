
ALTER TABLE public.vendors
  ADD COLUMN IF NOT EXISTS membership_fee numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS membership_status text NOT NULL DEFAULT 'unpaid',
  ADD COLUMN IF NOT EXISTS membership_method text,
  ADD COLUMN IF NOT EXISTS membership_reference text,
  ADD COLUMN IF NOT EXISTS membership_paid_at timestamptz;

ALTER TABLE public.vendors
  ADD CONSTRAINT vendors_membership_status_chk
  CHECK (membership_status IN ('unpaid','pending','paid','waived'));

INSERT INTO public.settings (key, value) VALUES
  ('vendor_membership_fee', '10000'),
  ('membership_payment_instructions', 'Envoyez les frais d''adhésion par Wave ou Orange Money au 77 298 60 05 (BYAWA), puis indiquez la référence de la transaction.')
ON CONFLICT (key) DO NOTHING;

-- appliquer les valeurs par défaut aux boutiques existantes
UPDATE public.vendors v
SET membership_fee = COALESCE(NULLIF(membership_fee,0), (SELECT value::numeric FROM public.settings WHERE key='vendor_membership_fee')),
    membership_status = CASE WHEN v.status = 'approved' THEN 'paid' ELSE v.membership_status END,
    membership_paid_at = CASE WHEN v.status = 'approved' AND v.membership_paid_at IS NULL THEN now() ELSE v.membership_paid_at END,
    commission_rate = COALESCE(v.commission_rate, (SELECT value::numeric FROM public.settings WHERE key='global_commission_rate'));

-- valeurs par défaut à la création d'une boutique
CREATE OR REPLACE FUNCTION public.set_vendor_defaults()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.membership_fee IS NULL OR NEW.membership_fee = 0 THEN
    NEW.membership_fee := COALESCE((SELECT value::numeric FROM public.settings WHERE key='vendor_membership_fee'), 0);
  END IF;
  IF NEW.commission_rate IS NULL THEN
    NEW.commission_rate := COALESCE((SELECT value::numeric FROM public.settings WHERE key='global_commission_rate'), 10);
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.set_vendor_defaults() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS trg_set_vendor_defaults ON public.vendors;
CREATE TRIGGER trg_set_vendor_defaults
BEFORE INSERT ON public.vendors
FOR EACH ROW EXECUTE FUNCTION public.set_vendor_defaults();

-- empêcher un vendeur de valider lui-même son adhésion ou sa commission
CREATE OR REPLACE FUNCTION public.protect_vendor_membership()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_admin(auth.uid()) THEN
    RETURN NEW;
  END IF;
  NEW.membership_fee := OLD.membership_fee;
  NEW.commission_rate := OLD.commission_rate;
  NEW.membership_paid_at := OLD.membership_paid_at;
  IF NEW.membership_status IS DISTINCT FROM OLD.membership_status
     AND NOT (OLD.membership_status IN ('unpaid','pending') AND NEW.membership_status = 'pending') THEN
    NEW.membership_status := OLD.membership_status;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.protect_vendor_membership() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS trg_protect_vendor_membership ON public.vendors;
CREATE TRIGGER trg_protect_vendor_membership
BEFORE UPDATE ON public.vendors
FOR EACH ROW EXECUTE FUNCTION public.protect_vendor_membership();
