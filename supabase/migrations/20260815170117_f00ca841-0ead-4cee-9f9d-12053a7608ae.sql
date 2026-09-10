ALTER TABLE public.orders ALTER COLUMN customer_id DROP NOT NULL;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS guest_name text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS guest_phone text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS guest_email text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS track_token text NOT NULL DEFAULT encode(gen_random_bytes(9), 'hex');
CREATE UNIQUE INDEX IF NOT EXISTS orders_track_token_key ON public.orders(track_token);

-- Comptes de test
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::app_role FROM auth.users WHERE email = 'admin@byawa.test'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.vendors (user_id, full_name, shop_name, slug, phone, whatsapp, email, city, zone, description, status, commission_rate, payout_method, payout_details)
SELECT u.id, 'Vendeur Test', 'Boutique Test BYAWA', 'boutique-test-byawa', '+221770000001', '+221770000001', u.email, 'Dakar', 'Plateau',
       'Boutique de démonstration pour tester l''espace vendeur BYAWA.', 'approved'::vendor_status, 10, 'Wave', '+221770000001'
FROM auth.users u WHERE u.email = 'vendeur@byawa.test'
  AND NOT EXISTS (SELECT 1 FROM public.vendors v WHERE v.user_id = u.id);

INSERT INTO public.drivers (user_id, full_name, phone, city, vehicle, is_available, is_active)
SELECT u.id, 'Livreur Test', '+221770000002', 'Dakar', 'Moto', true, true
FROM auth.users u WHERE u.email = 'livreur@byawa.test'
  AND NOT EXISTS (SELECT 1 FROM public.drivers d WHERE d.user_id = u.id);

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'driver'::app_role FROM auth.users WHERE email = 'livreur@byawa.test'
ON CONFLICT (user_id, role) DO NOTHING;