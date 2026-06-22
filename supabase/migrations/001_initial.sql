-- Lucir Editorial — Supabase migration
-- Supabase projesi pasif/paused olsa bile uygulama localStorage ile çalışmaya devam eder.
-- Projeyi restore ettikten sonra bu SQL'i SQL Editor'de çalıştır.

-- Ürünler (opsiyonel — statik katalog ile senkron tutulabilir)
create table if not exists public.products (
  id bigint primary key,
  name text not null,
  short_name text not null,
  price numeric(10, 2) not null,
  desc text not null default '',
  category text not null,
  slug text not null unique,
  img text not null,
  images jsonb default '[]'::jsonb,
  stock int not null default 10 check (stock >= 0),
  featured boolean default false,
  sizes jsonb default '[]'::jsonb,
  unavailable_sizes jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Siparişler
create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  items jsonb not null,
  subtotal numeric(10, 2) not null,
  shipping jsonb not null,
  payment_method text not null default 'bank_transfer',
  payment_status text not null default 'pending',
  customer_email text generated always as ((shipping->>'email')) stored
);

-- Newsletter
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Seed (statik katalog ile uyumlu)
insert into public.products (id, name, short_name, price, desc, category, slug, img, stock, featured, sizes, unavailable_sizes)
values
  (1, 'OVERSIZED TOTE BAG', 'Bag', 1299, 'STRUCTURAL LEATHER, ARCHITECTURAL SILHOUETTE.', 'Accessories', '/product/1',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuD2l-S8vmxu3vnpN-hrIIxnPXisCdnW5PxPtjwHBm4iOEm9BJj6JQdju6_BerWQOEqpvnSDOw9Hf1IF8Bg2ltM_QZlJ11NIPEuSXJhoFpPtIvswb1opAJC_hd1oB182eU8WDX-Du3Nl5j_kDgDdQPCNdReT55L4xRiH3y39E5mqBt8ouI_8llvywEn8c_Ln9ukFyT8bw_I5tZq8EYLEN22dTEfj2cRtSCcVlKWLSIcjf8Gv4mR6nRq8tvIbFvv0D-PqBgBXGUq-nwM', 8, true, '[]', '[]'),
  (2, 'TECHNICAL NYLON SHELL JACKET', 'Jacket', 999, 'STRUCTURAL POLYAMIDE, ARCHITECTURAL CUT.', 'Jackets', '/jacket',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDQbvVTypm1gJ0WPNwSFwku-QmG5Scc5hiZMe3ibjfVErxcgnY5VvarVCQwXdHAFeJkkqyO2Q9_ufVnsw41OEoNe7UX3cz8_mzsG3Is74thgT-f85CmqxEPMB8oN6yarT8xIhIBogVpfg7K3VEiUjidBPYrQ2yl3Bm7zGXVd_dPnJB9P4g_ppMmgI6VYhaD1edpB_dZ0rkKgeJDR6YuKYXA_P_Zy7NmYfbRLcj6Ib1qB-f8ZfF-XxG4I-BAEYIlh4PJhkpnu-gHsSc', 12, true, '["S","M","L","XL"]', '["XL"]'),
  (3, 'WRAPAROUND SHADES', 'Glasses', 759, 'SHIELD LENS, TITANIUM FRAME.', 'Accessories', '/product/3',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAsw3110AyoUwDNFS7PP9eCX4uGLZy6_Y-nDQMmmFFiNyDg16OUGHXo7fhn2F-hbkNA2PVKiMBOke-OhGmqCcaQApVoyXaUwEv0d5squ6psV2oyWo7x2lyXJx3DH3HjGhfbzrtuwqSKIrjx4ENlIciPz4_b0A_tbXgcRLNIeJ3WPWvB65N-dUvdMoAnjEHj9G50HibSZHlMew-1Itd6og5kbfwqE5Y2K99y_J-RBX9aj-3XNDJqBD8w4Y73hubJOo2pOGokxp0JqbQ', 15, true, '[]', '[]'),
  (4, 'GEO LONGSLEEVE', 'Longsleeve', 459, 'GEOMETRIC CUT COTTON BLEND.', 'Tops', '/product/4',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuD6j4o5EO4T_kLP_SXW6flxXiIAsmwGuRD_xfeH6ZsOaB1-7sBgsGdw-0xXA0JkwPUNBXlzOS_9gOrtGnWz6Uu6qXAv96ykz_VSl1z9xNjUPQ6oTc5xS1BADCb5_ndS2FvqS-b4xBBxSjtqZ4yfnhBfxRRgo_FDndG7nkG-08trytEkUgsFeoebuoQa-oCmFDx0pl4MbWs29DI3zd21b4wW4JEl3YgtFrrlBaUqfbOH5tOlRJlgKphit10erLb0bqXy7PGmKxUeCNo', 20, true, '["XS","S","M","L"]', '[]'),
  (5, 'INDUSTRIAL SNEAKER', 'Sneaker', 890, 'METALLIC FINISH, CHUNKY SOLE.', 'Shoes', '/product/5',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCtc_QJzMTgCYQgXfGGaMv02P2alv2y_-t1DHQjwEeIaq6rp_lcr9Jsb4TLrT2bzDnqD9RX7-_F3kxZy20Lbg5K4-QYk6Ai8n1nRa1tlhARL9YBMF3Dvi7yzb_4Jz89d8KZ6aq5cLNSsCe6dInANJT_LFnpnDomqnHVeyvV0IaqEmVOIgvdqdPxvmcZN4PKUOUcI7A4EzadGO6ocFSq_0o4AwEDp1yIFAndZeKOOE18dxyHK4Rd19S3qSN3vLDs7KTn40W_XFnTWLc', 6, false, '["40","41","42","43","44"]', '[]')
on conflict (id) do update set
  stock = excluded.stock,
  updated_at = now();

-- RLS
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Herkes ürünleri okuyabilir
create policy "products_public_read" on public.products for select using (true);

-- Anon sipariş oluşturabilir (checkout)
create policy "orders_anon_insert" on public.orders for insert with check (true);
create policy "orders_anon_read_own" on public.orders for select using (true);

-- Newsletter kayıt
create policy "newsletter_anon_insert" on public.newsletter_subscribers for insert with check (true);

-- Stok güncelleme: sadece service_role (Edge Function ile) — anon update yok
