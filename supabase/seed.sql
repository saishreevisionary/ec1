-- Seed Data for LendoraStore (Premium Botanical Hair Care E-commerce)

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
(1, 'Botanical Oils', 'botanical-oils', 'Nourishing, cold-pressed scalp and hair elixirs with rich natural lipids.', 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop'),
(2, 'Active Serums', 'active-serums', 'Molecular peptide treatments formulated to activate growth and repair bonds.', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'),
(3, 'Hair Mists', 'hair-mists', 'Lightweight ambient hydrates that provide UV defense and delicate scent trails.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop'),
(4, 'Scalp Therapy', 'scalp-therapy', 'Soothing tonics, clay scrubs, and salicylic exfoliators for the root ecosystem.', 'https://images.unsplash.com/photo-1615396879814-490192568c37?q=80&w=600&auto=format&fit=crop'),
(5, 'Treatment Sets', 'treatment-sets', 'Curated routine collections for complete hair density and scalp restoration.', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- Adjust identity sequence
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM public.categories));

-- 2. SEED DEFAULT SETTINGS
INSERT INTO public.settings (key, value) VALUES
('gst_settings', '{"rate": 18, "enabled": true}'),
('qr_settings', '{"company_name": "LendoraStore Premium Ltd", "upi_id": "lendorastore@upi", "instructions": "Please open any UPI enabled payment app. Scan the QR code, verify the amount, and submit the payment. Take a screenshot of the successful transaction and upload it below to verify your order."}'),
('contact_settings', '{"email": "botanicals@lendorastore.com", "phone": "+1 (800) 854-8290", "address": "One Infinite Loop, Cupertino, CA 95014, USA"}'),
('logo_settings', '{"text": "LendoraStore", "url": ""}'),
('banner_settings', '{"title": "Active Botanical Formulations", "subtitle": "Meticulously designed elixirs and molecular peptide serums for hair density and scalp health. Scientifically validated, organically sourced.", "cta_text": "Shop the Collection", "bg_gradient": "from-slate-900 via-emerald-950 to-slate-900"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
