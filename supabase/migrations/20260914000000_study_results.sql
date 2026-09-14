-- Toothly study results: one row per finished session, one row per answered question.
-- Users are Supabase anonymous sign-ins until real accounts exist; anonymous users
-- carry the `authenticated` role, so the policies below cover them.

create table public.study_sessions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exam            text not null check (exam in ('GC', 'RHS', 'ICE')),
  domain          text,                      -- null = mixed set
  question_count  int  not null check (question_count > 0),
  correct_count   int  not null check (correct_count >= 0 and correct_count <= question_count),
  started_at      timestamptz not null,
  finished_at     timestamptz not null default now()
);

create table public.question_attempts (
  id               bigint generated always as identity primary key,
  session_id       uuid not null references public.study_sessions (id) on delete cascade,
  user_id          uuid not null default auth.uid() references auth.users (id) on delete cascade,
  question_id      text not null,            -- e.g. ICE-II-005, matches content/ice/*.json
  domain           text not null,
  selected_index   smallint not null check (selected_index between 0 and 3), -- index in the source file, not the shuffled order
  correct          boolean not null,
  flagged          boolean not null default false,
  time_ms          int check (time_ms >= 0),
  answered_at      timestamptz not null
);

create index study_sessions_user_finished on public.study_sessions (user_id, finished_at desc);
create index question_attempts_user_question on public.question_attempts (user_id, question_id, answered_at desc);
create index question_attempts_flagged on public.question_attempts (question_id) where flagged;

alter table public.study_sessions enable row level security;
alter table public.question_attempts enable row level security;

create policy "own sessions: read"   on public.study_sessions for select to authenticated using (user_id = (select auth.uid()));
create policy "own sessions: insert" on public.study_sessions for insert to authenticated with check (user_id = (select auth.uid()));

create policy "own attempts: read"   on public.question_attempts for select to authenticated using (user_id = (select auth.uid()));
create policy "own attempts: insert" on public.question_attempts for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (select 1 from public.study_sessions s where s.id = session_id and s.user_id = (select auth.uid()))
  );

grant select, insert on public.study_sessions to authenticated;
grant select, insert on public.question_attempts to authenticated;
