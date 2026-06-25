-- ==========================================
-- SUPABASE SCHEMA MIGRATION & RLS POLICIES
-- ==========================================

-- 1. PROFILES TABLE
-- Create profiles table that links to auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- 2. HELPER FUNCTION TO PREVENT RLS RECURSION
-- A security definer function bypasses RLS when querying profiles
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.profiles 
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql;


-- 3. PROFILES POLICIES
-- Drop existing policies first
drop policy if exists "Users can read own profile" on public.profiles;
drop policy if exists "Admins can read all profiles" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

create policy "Read profiles" 
  on public.profiles for select 
  using (auth.uid() = id or public.is_admin());

create policy "Update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);


-- 4. DOCUMENTS TABLE
-- Create documents table for writing assistant contents
create table if not exists public.documents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Documents
alter table public.documents enable row level security;

-- Documents Policies
drop policy if exists "Users can read own documents" on public.documents;
create policy "Users can read own documents"
  on public.documents for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own documents" on public.documents;
create policy "Users can insert own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own documents" on public.documents;
create policy "Users can update own documents"
  on public.documents for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete own documents" on public.documents;
create policy "Users can delete own documents"
  on public.documents for delete
  using (auth.uid() = user_id);

drop policy if exists "Admins can read all documents" on public.documents;
create policy "Admins can read all documents"
  on public.documents for select
  using (public.is_admin());

drop policy if exists "Admins can delete any document" on public.documents;
create policy "Admins can delete any document"
  on public.documents for delete
  using (public.is_admin());


-- 5. PAYMENTS TABLE
-- Create payments table to track subscription purchases
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric not null,
  plan_name text not null,
  status text default 'completed' not null,
  stripe_session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Payments
alter table public.payments enable row level security;

-- Payments Policies
drop policy if exists "Users can view own payments" on public.payments;
create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can view all payments" on public.payments;
create policy "Admins can view all payments"
  on public.payments for select
  using (public.is_admin());

drop policy if exists "Users can insert own payments" on public.payments;
create policy "Users can insert own payments"
  on public.payments for insert
  with check (auth.uid() = user_id);


-- 6. TRIGGER FOR AUTH SIGNUP
-- Automatically insert a row in profiles when auth.users is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    case 
      when new.email = 'admin@rankpilot.com' then 'admin'
      else 'user'
    end
  );
  return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger if exists
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
