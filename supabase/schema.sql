-- Supabase Database Schema for LendoraStore (Premium E-commerce)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS PROFILE TABLE
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.users enable row level security;

-- 2. CATEGORIES
create table public.categories (
  id serial primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

-- 3. PRODUCTS
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric not null check (price >= 0),
  gst_rate numeric not null default 18 check (gst_rate >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  sku text unique,
  category_id integer references public.categories on delete set null,
  image_url text, -- Main display image
  status text not null default 'active' check (status in ('active', 'draft')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

-- 4. PRODUCT IMAGES (For gallery slider)
create table public.product_images (
  id serial primary key,
  product_id uuid references public.products on delete cascade not null,
  image_url text not null,
  display_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.product_images enable row level security;

-- 5. WISHLIST
create table public.wishlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  product_id uuid references public.products on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

alter table public.wishlist enable row level security;

-- 6. CART
create table public.cart (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  product_id uuid references public.products on delete cascade not null,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

alter table public.cart enable row level security;

-- 7. ORDERS
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete set null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric not null check (subtotal >= 0),
  gst_amount numeric not null check (gst_amount >= 0),
  grand_total numeric not null check (grand_total >= 0),
  shipping_name text not null,
  shipping_phone text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_pincode text not null,
  payment_method text not null default 'qr_code',
  payment_screenshot_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

-- 8. ORDER ITEMS
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  quantity integer not null check (quantity > 0),
  price_at_purchase numeric not null check (price_at_purchase >= 0),
  gst_rate_at_purchase numeric not null default 18,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;

-- 9. INVOICES
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders on delete cascade not null unique,
  invoice_number text not null unique,
  pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.invoices enable row level security;

-- 10. SETTINGS (Store Settings)
create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.settings enable row level security;

-- ADDRESSES (For User Dashboard profiles)
create table public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  name text not null,
  phone text not null,
  street_address text not null,
  city text not null,
  pincode text not null,
  is_default boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.addresses enable row level security;


----------------- ROW LEVEL SECURITY (RLS) POLICIES -----------------

-- Profile/Users Policies
create policy "Allow public read of profiles" on public.users for select using (true);
create policy "Allow users to update own profile" on public.users for update using (auth.uid() = id);
create policy "Admins have full access on profiles" on public.users for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Categories Policies
create policy "Allow public read of categories" on public.categories for select using (true);
create policy "Admins have full access on categories" on public.categories for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Products Policies
create policy "Allow public read of active products" on public.products for select using (status = 'active' or exists (select 1 from public.users where id = auth.uid() and role = 'admin'));
create policy "Admins have full access on products" on public.products for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Product Images Policies
create policy "Allow public read of product images" on public.product_images for select using (true);
create policy "Admins have full access on product images" on public.product_images for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Wishlist Policies
create policy "Users can read own wishlist" on public.wishlist for select using (auth.uid() = user_id);
create policy "Users can insert own wishlist" on public.wishlist for insert with check (auth.uid() = user_id);
create policy "Users can delete own wishlist" on public.wishlist for delete using (auth.uid() = user_id);

-- Cart Policies
create policy "Users can read own cart" on public.cart for select using (auth.uid() = user_id);
create policy "Users can insert own cart" on public.cart for insert with check (auth.uid() = user_id);
create policy "Users can update own cart" on public.cart for update using (auth.uid() = user_id);
create policy "Users can delete own cart" on public.cart for delete using (auth.uid() = user_id);

-- Orders Policies
create policy "Users can read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Admins have full access on orders" on public.orders for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Order Items Policies
create policy "Users can read own order items" on public.order_items for select using (
  exists (select 1 from public.orders where id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can insert own order items" on public.order_items for insert with check (
  exists (select 1 from public.orders where id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Admins have full access on order items" on public.order_items for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Invoices Policies
create policy "Users can read own invoices" on public.invoices for select using (
  exists (select 1 from public.orders where id = invoices.order_id and orders.user_id = auth.uid())
);
create policy "Admins have full access on invoices" on public.invoices for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Settings Policies
create policy "Allow public read of settings" on public.settings for select using (true);
create policy "Admins have full access on settings" on public.settings for all using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Addresses Policies
create policy "Users can read own addresses" on public.addresses for select using (auth.uid() = user_id);
create policy "Users can insert own addresses" on public.addresses for insert with check (auth.uid() = user_id);
create policy "Users can update own addresses" on public.addresses for update using (auth.uid() = user_id);
create policy "Users can delete own addresses" on public.addresses for delete using (auth.uid() = user_id);


----------------- AUTOMATIC PROFILE CREATION TRIGGER -----------------

-- Trigger to create a user profile when a user registers in auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
