-- =====================================================================
-- ENSTP 360 · base partagée (objets trouvés + likes / dislikes)
-- À exécuter UNE SEULE FOIS dans Supabase : projet SSC (qsgnglbxgcxrhicdysxy)
--   Dashboard → SQL Editor → New query → coller tout ce fichier → Run.
-- Les réservations SSC utilisent déjà les tables du site SSC : rien à faire pour elles.
-- Le site fonctionne avant l'exécution (les données restent alors sur l'appareil) ;
-- dès que ce script est exécuté, tout devient partagé entre les étudiants, sans rien changer au site.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- Objets trouvés ----------
create table if not exists public.lost_items (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  photo       text not null check (length(photo) < 700000),
  what        text check (length(what) <= 120),
  place       text check (length(place) <= 120),
  pickup      text check (length(pickup) <= 160),
  claimed_by  text check (length(claimed_by) <= 120),
  claimed_at  timestamptz
);
create index if not exists lost_items_created_idx on public.lost_items (created_at desc);
alter table public.lost_items enable row level security;
drop policy if exists "lost_items lecture publique" on public.lost_items;
create policy "lost_items lecture publique" on public.lost_items for select to anon, authenticated using (true);
-- aucune écriture directe : uniquement via les fonctions ci-dessous

create or replace function public.lf_post(p_photo text, p_what text, p_place text, p_pickup text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v uuid;
begin
  if p_photo is null or p_photo not like 'data:image/%' or length(p_photo) >= 700000 then
    raise exception 'bad_photo';
  end if;
  -- anti-spam simple : 20 publications maximum par heure pour tout le site
  if (select count(*) from public.lost_items where created_at > now() - interval '1 hour') >= 20 then
    raise exception 'too_many';
  end if;
  insert into public.lost_items (photo, what, place, pickup)
  values (p_photo, nullif(left(trim(p_what), 120), ''), nullif(left(trim(p_place), 120), ''), nullif(left(trim(p_pickup), 160), ''))
  returning id into v;
  return v;
end $$;

create or replace function public.lf_claim(p_id uuid, p_email text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_email is null or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(p_email) > 120 then
    raise exception 'bad_email';
  end if;
  update public.lost_items set claimed_by = lower(trim(p_email)), claimed_at = now()
   where id = p_id and claimed_by is null;
  if not found then raise exception 'already_claimed'; end if;
end $$;

-- ---------- Likes / dislikes de chaque page ----------
create table if not exists public.page_reactions (
  page     text primary key check (length(page) <= 80),
  likes    integer not null default 0,
  dislikes integer not null default 0
);
alter table public.page_reactions enable row level security;
drop policy if exists "page_reactions lecture publique" on public.page_reactions;
create policy "page_reactions lecture publique" on public.page_reactions for select to anon, authenticated using (true);

create or replace function public.react(p_page text, p_like integer, p_dislike integer)
returns public.page_reactions language plpgsql security definer set search_path = public as $$
declare r public.page_reactions;
begin
  if p_page is null or length(p_page) > 80 or p_like not between -1 and 1 or p_dislike not between -1 and 1 then
    raise exception 'bad_input';
  end if;
  insert into public.page_reactions as t (page, likes, dislikes)
  values (p_page, greatest(p_like, 0), greatest(p_dislike, 0))
  on conflict (page) do update
     set likes = greatest(0, t.likes + p_like), dislikes = greatest(0, t.dislikes + p_dislike)
  returning * into r;
  return r;
end $$;

grant select on public.lost_items, public.page_reactions to anon, authenticated;
grant execute on function public.lf_post(text, text, text, text), public.lf_claim(uuid, text), public.react(text, integer, integer) to anon, authenticated;
