-- MBOOBEN AUTO'S — Supabase schema
-- Run this in Supabase → SQL Editor

-- Cars inventory
create table if not exists cars (
  id text primary key,
  make text not null,
  model text not null,
  year int,
  price numeric not null default 0,
  currency text default 'GMD',
  color text,
  plate text,
  transmission text default 'Automatic',
  fuel text default 'Petrol',
  status text default 'available', -- available | sold | reserved
  featured boolean default false,
  images jsonb default '[]'::jsonb,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enquiries from website
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  interest text,
  message text,
  car_id text references cars(id),
  status text default 'new', -- new | contacted | closed
  created_at timestamptz default now()
);

-- Simple sales log (optional)
create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  car_id text references cars(id),
  customer_name text,
  amount numeric,
  invoice_no text,
  notes text,
  sold_at timestamptz default now()
);

-- Allow public read on cars (website)
alter table cars enable row level security;

create policy "Public can read available cars"
  on cars for select
  using (true);

-- For admin writes you will use the service role or authenticated user.
-- After enabling Auth, add policies for insert/update/delete for authenticated users.

-- Seed sample cars (optional — matches local js/cars.js)
insert into cars (id, make, model, year, price, color, plate, featured, images, description, status) values
(
  'charger-black',
  'Dodge',
  'Charger SXT',
  2018,
  1850000,
  'Black with Yellow Stripes',
  'KM 7302 F',
  true,
  '["images/charger-2.jpg","images/charger-3.jpg","images/charger-1.jpg","images/charger-4.jpg","images/charger-5.jpg"]'::jsonb,
  'Striking black Dodge Charger SXT with bold yellow racing stripes. Powerful presence, automatic transmission, and ready for the road.',
  'available'
),
(
  'bmw-white',
  'BMW',
  '3 Series',
  2017,
  1650000,
  'Alpine White',
  '',
  true,
  '["images/bmw-1.jpg","images/bmw-2.jpg"]'::jsonb,
  'Elegant white BMW 3 Series in excellent condition. Sporty yet refined.',
  'available'
),
(
  'explorer-white',
  'Ford',
  'Explorer',
  2018,
  1950000,
  'White / Cream',
  'KM 7205 F',
  true,
  '["images/explorer-white.jpg"]'::jsonb,
  'Spacious Ford Explorer SUV — ideal for family and business. Plate KM 7205 F.',
  'available'
),
(
  'explorer-blue',
  'Ford',
  'Explorer',
  2019,
  2100000,
  'Blue',
  '',
  false,
  '["images/explorer-blue.jpg"]'::jsonb,
  'Blue Ford Explorer with a strong presence. Reliable American SUV.',
  'available'
)
on conflict (id) do nothing;
