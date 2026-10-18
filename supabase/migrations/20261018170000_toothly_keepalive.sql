-- Free projects pause after a week Supabase counts as idle; the read-only
-- toothly_health() did not count. The daily check writes this one row instead.
create table public.toothly_keepalive (
  id smallint primary key default 1 check (id = 1),
  pinged_at timestamptz not null default now()
);

alter table public.toothly_keepalive enable row level security;
revoke all on public.toothly_keepalive from anon, authenticated;
grant all on public.toothly_keepalive to service_role;
insert into public.toothly_keepalive default values;

create function public.toothly_keepalive() returns boolean
language sql volatile security definer set search_path = ''
as $$
  update public.toothly_keepalive set pinged_at = now() where id = 1;
  select true;
$$;
revoke all on function public.toothly_keepalive() from public;
grant execute on function public.toothly_keepalive() to anon, authenticated, service_role;
