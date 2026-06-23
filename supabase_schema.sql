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

-- Profiles Policies
create policy "Users can read own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Admins can read all profiles" 
  on public.profiles for select 
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);


-- 2. DOCUMENTS TABLE
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
create policy "Users can read own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can insert own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Users can update own documents"
  on public.documents for update
  using (auth.uid() = user_id);

create policy "Users can delete own documents"
  on public.documents for delete
  using (auth.uid() = user_id);

create policy "Admins can read all documents"
  on public.documents for select
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can delete any document"
  on public.documents for delete
  using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );


-- 3. TRIGGER FOR AUTH SIGNUP
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
