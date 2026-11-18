-- =====================================================================
-- ENSTP 360 · v7 — comptes étudiants, administrateurs, objets trouvés
-- partagés (photos sur stockage distant + temps réel), likes / dislikes
-- par service, BookSTP, rapports de stage, emplois du temps modifiables,
-- annonces.
--
-- À exécuter UNE SEULE FOIS dans Supabase, projet qsgnglbxgcxrhicdysxy :
--   Dashboard → SQL Editor → New query → coller tout ce fichier → Run.
-- Le script peut être relancé sans risque (idempotent).
--
-- Les droits sont contrôlés ici, côté serveur (Row Level Security) :
-- le site public ne peut rien écrire qui ne soit autorisé par ces règles.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- 1. Administrateurs
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  email text primary key check (email = lower(email))
);
-- RLS sans aucune règle : personne ne lit ni n'écrit cette table depuis le site
alter table public.admins enable row level security;

insert into public.admins (email) values
  ('nazim-abdelmalek.daoudi@enstp.edu.dz'),
  ('ailamlinamalak@gmail.com')
on conflict do nothing;

-- e-mail confirmé de l'utilisateur connecté (null sinon)
create or replace function public.my_email()
returns text language sql stable security definer set search_path = public, auth as $$
  select lower(u.email) from auth.users u
   where u.id = auth.uid() and u.email_confirmed_at is not null
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public, auth as $$
  select exists (select 1 from public.admins a where a.email = public.my_email())
$$;

-- ---------------------------------------------------------------------
-- 2. Profils étudiants (e-mail @enstp.edu.dz, niveau, département, groupe)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text not null check (length(full_name) between 2 and 80),
  level       text not null check (level in ('CP1','CP2','I1','I2','I3')),
  dept        text check (dept in ('DIB','DMS')),
  grp         text check (length(grp) <= 20),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- contrôle serveur : domaine de l'e-mail + cohérence niveau / département / groupe
create or replace function public.profiles_check()
returns trigger language plpgsql security definer set search_path = public, auth as $$
declare em text; tt text; n int; pre text; num int;
begin
  em := public.my_email();
  if em is null or new.id <> auth.uid() then raise exception 'not_authenticated'; end if;
  if em not like '%@enstp.edu.dz' and not public.is_admin() then raise exception 'bad_domain'; end if;
  new.email := em;
  new.full_name := trim(new.full_name);
  new.updated_at := now();
  if new.level in ('CP1','CP2') then
    new.dept := null;
  elsif new.dept is null then
    raise exception 'dept_required';
  end if;
  tt := case when new.level in ('CP1','CP2') then new.level else new.dept || substr(new.level, 2, 1) end;
  -- groupes de chaque emploi du temps (identiques à ceux du site)
  select p, c into pre, n from (values
    ('CP1','G',10), ('CP2','G',12), ('DMS1','SEC ',4), ('DMS2','Section ',2), ('DIB1','Col. ',4)
  ) as g(id, p, c) where g.id = tt;
  if pre is null then
    new.grp := null;                       -- toute la promotion
  else
    if new.grp is null or new.grp not like pre || '%' then raise exception 'bad_group'; end if;
    begin num := substr(new.grp, length(pre) + 1)::int; exception when others then raise exception 'bad_group'; end;
    if num < 1 or num > n or new.grp <> pre || num then raise exception 'bad_group'; end if;
  end if;
  return new;
end $$;
drop trigger if exists profiles_check on public.profiles;
create trigger profiles_check before insert or update on public.profiles
  for each row execute function public.profiles_check();

drop policy if exists "profil : lecture du sien" on public.profiles;
create policy "profil : lecture du sien" on public.profiles for select to authenticated using (id = auth.uid() or public.is_admin());
drop policy if exists "profil : création du sien" on public.profiles;
create policy "profil : création du sien" on public.profiles for insert to authenticated with check (id = auth.uid());
drop policy if exists "profil : modification du sien" on public.profiles;
create policy "profil : modification du sien" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- un « membre » = étudiant avec profil (ou administrateur)
create or replace function public.is_member()
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_admin() or exists (select 1 from public.profiles p where p.id = auth.uid())
$$;

-- ---------------------------------------------------------------------
-- 3. Objets trouvés : base centrale + photos dans le stockage distant
-- ---------------------------------------------------------------------
create table if not exists public.lf_items (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  owner       uuid default auth.uid() references auth.users (id) on delete set null,
  photo_url   text not null check (length(photo_url) < 700000),
  photo_path  text check (length(photo_path) <= 200),
  what        text check (length(what) <= 120),
  place       text check (length(place) <= 120),
  pickup      text check (length(pickup) <= 160),
  claimed_by  text check (length(claimed_by) <= 120),
  claimed_at  timestamptz
);
create index if not exists lf_items_created_idx on public.lf_items (created_at desc);
alter table public.lf_items enable row level security;
alter table public.lf_items replica identity full;

drop policy if exists "lf : lecture publique" on public.lf_items;
create policy "lf : lecture publique" on public.lf_items for select to anon, authenticated using (true);
drop policy if exists "lf : publication par un membre" on public.lf_items;
create policy "lf : publication par un membre" on public.lf_items for insert to authenticated
  with check (public.is_member() and owner = auth.uid() and claimed_by is null);
drop policy if exists "lf : suppression admin ou auteur" on public.lf_items;
create policy "lf : suppression admin ou auteur" on public.lf_items for delete to authenticated
  using (public.is_admin() or owner = auth.uid());

-- anti-spam : 10 publications par heure et par compte
create or replace function public.lf_items_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() and (select count(*) from public.lf_items where owner = auth.uid() and created_at > now() - interval '1 hour') >= 10 then
    raise exception 'too_many';
  end if;
  new.created_at := now(); new.claimed_by := null; new.claimed_at := null;
  return new;
end $$;
drop trigger if exists lf_items_limit on public.lf_items;
create trigger lf_items_limit before insert on public.lf_items for each row execute function public.lf_items_limit();

-- « C'est à moi » : l'e-mail du compte connecté est enregistré, une seule fois
create or replace function public.lf7_claim(p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
declare em text := public.my_email();
begin
  if em is null or not public.is_member() then raise exception 'not_authenticated'; end if;
  update public.lf_items set claimed_by = em, claimed_at = now() where id = p_id and claimed_by is null;
  if not found then raise exception 'already_claimed'; end if;
end $$;

-- reprise des objets publiés avant la v7 (table lost_items), sans perte
do $$ begin
  if to_regclass('public.lost_items') is not null then
    insert into public.lf_items (id, created_at, photo_url, what, place, pickup, claimed_by, claimed_at)
    select id, created_at, photo, what, place, pickup, claimed_by, claimed_at from public.lost_items
    on conflict (id) do nothing;
  end if;
end $$;

-- stockage des photos : seau public « lost-found » (lecture publique, 5 Mo, images seulement)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lost-found', 'lost-found', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "lf photos : lecture publique" on storage.objects;
create policy "lf photos : lecture publique" on storage.objects for select to anon, authenticated using (bucket_id = 'lost-found');
drop policy if exists "lf photos : envoi par un membre dans son dossier" on storage.objects;
create policy "lf photos : envoi par un membre dans son dossier" on storage.objects for insert to authenticated
  with check (bucket_id = 'lost-found' and (storage.foldername(name))[1] = auth.uid()::text and public.is_member());
drop policy if exists "lf photos : suppression admin ou auteur" on storage.objects;
create policy "lf photos : suppression admin ou auteur" on storage.objects for delete to authenticated
  using (bucket_id = 'lost-found' and (public.is_admin() or (storage.foldername(name))[1] = auth.uid()::text));

-- ---------------------------------------------------------------------
-- 4. Likes / dislikes par service (un vote par compte et par service)
-- ---------------------------------------------------------------------
create table if not exists public.service_votes (
  service  text not null check (service ~ '^[a-z0-9-]{2,80}$'),
  voter    uuid not null references auth.users (id) on delete cascade,
  vote     smallint not null check (vote in (-1, 1)),
  at       timestamptz not null default now(),
  primary key (service, voter)
);
alter table public.service_votes enable row level security;
drop policy if exists "votes : lecture des siens" on public.service_votes;
create policy "votes : lecture des siens" on public.service_votes for select to authenticated using (voter = auth.uid());

create or replace view public.service_counts with (security_invoker = false) as
  select service, count(*) filter (where vote = 1)::int as likes, count(*) filter (where vote = -1)::int as dislikes
    from public.service_votes group by service;

-- p_vote : 1 (like), -1 (dislike), 0 (retirer son vote)
create or replace function public.svc_vote(p_service text, p_vote int)
returns table (service text, likes int, dislikes int)
language plpgsql security definer set search_path = public as $$
#variable_conflict use_column
begin
  if not public.is_member() then raise exception 'not_authenticated'; end if;
  if p_service !~ '^[a-z0-9-]{2,80}$' or p_vote not in (-1, 0, 1) then raise exception 'bad_input'; end if;
  if p_vote = 0 then
    delete from public.service_votes v where v.service = p_service and v.voter = auth.uid();
  else
    insert into public.service_votes as v (service, voter, vote) values (p_service, auth.uid(), p_vote)
    on conflict (service, voter) do update set vote = excluded.vote, at = now();
  end if;
  return query select p_service, coalesce(c.likes, 0), coalesce(c.dislikes, 0)
    from (select 1) one left join public.service_counts c on c.service = p_service;
end $$;

-- ---------------------------------------------------------------------
-- 5. BookSTP : don et échange de livres
-- ---------------------------------------------------------------------
create table if not exists public.book_offers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  owner       uuid default auth.uid() references auth.users (id) on delete cascade,
  title       text not null check (length(trim(title)) between 2 and 140),
  author      text not null check (length(trim(author)) between 2 and 120),
  contact     text not null check (length(trim(contact)) between 3 and 160)
);
create index if not exists book_offers_created_idx on public.book_offers (created_at desc);
alter table public.book_offers enable row level security;
alter table public.book_offers replica identity full;
drop policy if exists "livres : lecture publique" on public.book_offers;
create policy "livres : lecture publique" on public.book_offers for select to anon, authenticated using (true);
drop policy if exists "livres : publication par un membre" on public.book_offers;
create policy "livres : publication par un membre" on public.book_offers for insert to authenticated with check (public.is_member() and owner = auth.uid());
drop policy if exists "livres : suppression admin ou auteur" on public.book_offers;
create policy "livres : suppression admin ou auteur" on public.book_offers for delete to authenticated using (public.is_admin() or owner = auth.uid());

-- ---------------------------------------------------------------------
-- 6. Rapports de stage et de visite in situ (liens vers les documents)
-- ---------------------------------------------------------------------
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  owner       uuid default auth.uid() references auth.users (id) on delete cascade,
  kind        text not null check (kind in ('stage','visite')),
  title       text not null check (length(trim(title)) between 3 and 160),
  organisme   text check (length(organisme) <= 120),
  year        int check (year between 2000 and 2100),
  level       text check (level in ('CP1','CP2','I1','I2','I3')),
  url         text not null check (url ~ '^https://' and length(url) <= 500)
);
create index if not exists reports_created_idx on public.reports (created_at desc);
alter table public.reports enable row level security;
drop policy if exists "rapports : lecture publique" on public.reports;
create policy "rapports : lecture publique" on public.reports for select to anon, authenticated using (true);
drop policy if exists "rapports : publication par un membre" on public.reports;
create policy "rapports : publication par un membre" on public.reports for insert to authenticated with check (public.is_member() and owner = auth.uid());
drop policy if exists "rapports : suppression admin ou auteur" on public.reports;
create policy "rapports : suppression admin ou auteur" on public.reports for delete to authenticated using (public.is_admin() or owner = auth.uid());

-- ---------------------------------------------------------------------
-- 7. Emplois du temps modifiés par les administrateurs
-- ---------------------------------------------------------------------
create table if not exists public.timetable_overrides (
  tt_id       text primary key check (tt_id in ('CP1','CP2','DMS1','DMS2','DMS3','DIB1','DIB2','DIB3')),
  data        jsonb not null,
  updated_at  timestamptz not null default now(),
  updated_by  text
);
alter table public.timetable_overrides enable row level security;
drop policy if exists "edt : lecture publique" on public.timetable_overrides;
create policy "edt : lecture publique" on public.timetable_overrides for select to anon, authenticated using (true);
drop policy if exists "edt : écriture admin" on public.timetable_overrides;
create policy "edt : écriture admin" on public.timetable_overrides for all to authenticated using (public.is_admin()) with check (public.is_admin());

create or replace function public.tt_stamp()
returns trigger language plpgsql security definer set search_path = public as $$
begin new.updated_at := now(); new.updated_by := public.my_email(); return new; end $$;
drop trigger if exists tt_stamp on public.timetable_overrides;
create trigger tt_stamp before insert or update on public.timetable_overrides for each row execute function public.tt_stamp();

-- ---------------------------------------------------------------------
-- 8. Annonces (gérées par les administrateurs, affichées dans Actualités)
-- ---------------------------------------------------------------------
create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  date        date not null default current_date,
  title       text not null check (length(trim(title)) between 3 and 200),
  summary     text check (length(summary) <= 600),
  image       text check (image is null or image ~ '^https://' or image ~ '^images/'),
  url         text check (url is null or url ~ '^https://')
);
alter table public.announcements enable row level security;
drop policy if exists "annonces : lecture publique" on public.announcements;
create policy "annonces : lecture publique" on public.announcements for select to anon, authenticated using (true);
drop policy if exists "annonces : écriture admin" on public.announcements;
create policy "annonces : écriture admin" on public.announcements for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- 9. Droits et temps réel
-- ---------------------------------------------------------------------
grant select on public.lf_items, public.book_offers, public.reports, public.timetable_overrides, public.announcements, public.service_counts to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant insert, delete on public.lf_items, public.book_offers, public.reports to authenticated;
grant select on public.service_votes to authenticated;
grant insert, update, delete on public.timetable_overrides, public.announcements to authenticated;
grant execute on function public.is_admin(), public.is_member(), public.my_email() to anon, authenticated;
grant execute on function public.lf7_claim(uuid), public.svc_vote(text, int) to authenticated;
revoke execute on function public.lf7_claim(uuid), public.svc_vote(text, int) from anon;

-- publications diffusées en temps réel (objets trouvés, livres)
do $$ begin
  begin alter publication supabase_realtime add table public.lf_items; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.book_offers; exception when duplicate_object then null; end;
end $$;

-- ---------------------------------------------------------------------
-- 10. Anciennes fonctions de la v6 (écriture anonyme) : fermées, le site v7 ne les utilise plus
-- ---------------------------------------------------------------------
do $$ begin
  if to_regprocedure('public.lf_post(text,text,text,text)') is not null then
    revoke execute on function public.lf_post(text, text, text, text) from anon, authenticated, public;
  end if;
  if to_regprocedure('public.lf_claim(uuid,text)') is not null then
    revoke execute on function public.lf_claim(uuid, text) from anon, authenticated, public;
  end if;
  if to_regprocedure('public.react(text,integer,integer)') is not null then
    revoke execute on function public.react(text, integer, integer) from anon, authenticated, public;
  end if;
end $$;
