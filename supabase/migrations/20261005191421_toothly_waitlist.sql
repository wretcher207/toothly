create table public.toothly_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),
  constraint waitlist_email_valid check (
    length(email) between 3 and 254
    and email = lower(btrim(email))
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  )
);

alter table public.toothly_waitlist enable row level security;
revoke all on public.toothly_waitlist from anon, authenticated;
grant insert (email) on public.toothly_waitlist to anon, authenticated;
grant all on public.toothly_waitlist to service_role;
create policy "Join the waitlist" on public.toothly_waitlist
  for insert to anon, authenticated with check (true);

-- A scheduled read checks database availability without exposing subscribers.
create function public.toothly_health() returns boolean
language sql stable security invoker set search_path = ''
as $$ select true $$;
revoke all on function public.toothly_health() from public;
grant execute on function public.toothly_health() to anon, authenticated, service_role;
