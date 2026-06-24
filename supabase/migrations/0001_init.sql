-- ============================================================================
--  DJ Moogli — Supabase Schema (ersetzt Sanity)
--  Einmalig im Supabase Dashboard → SQL Editor ausführen ("Run").
--  Idempotent: kann gefahrlos erneut ausgeführt werden.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) Singleton: alle Fließtexte, Bild-URLs und der "Nächste Gig" in EINER Zeile
-- ---------------------------------------------------------------------------
create table if not exists public.site_content (
  id                 int primary key default 1,
  -- Hero / Sound / About / Stats
  hero_bio           text not null default '',
  tagline            text not null default '',
  sound_intro        text not null default '',
  about_title        text not null default '',
  about_title_accent text not null default '',
  about_body         text not null default '',
  regions            text[] not null default '{}',
  stats_quote        text not null default '',
  -- Bilder (null => Frontend nutzt das lokale Standardbild als Fallback)
  img_hero           text,
  img_about          text,
  img_stats          text,
  img_boombox        text,
  img_epk            text[] not null default '{}',
  -- Nächster Gig
  event_active       boolean not null default true,
  event_date         text not null default '',
  event_venue        text not null default '',
  event_city         text not null default '',
  event_note         text,
  event_ticket_url   text,
  event_image        text,
  updated_at         timestamptz not null default now(),
  -- erzwingt genau eine Zeile (id = 1)
  constraint site_content_singleton check (id = 1)
);

-- ---------------------------------------------------------------------------
-- 2) Sammlungen (sortierbare Listen)
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  quote      text not null,
  author     text not null,
  role       text,
  rating     int,
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.mixtapes (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  tag         text not null default '',
  href        text not null default '',
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.sound_pillars (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  text       text not null,
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.stat_items (
  id         uuid primary key default gen_random_uuid(),
  value      text not null,
  label      text not null,
  sort_order int  not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3) Row Level Security
--    Lesen: alle (öffentliche Website).  Schreiben: nur eingeloggte Nutzer.
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'site_content','reviews','faq_items','mixtapes','sound_pillars','stat_items'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public read %1$s" on public.%1$I;', t);
    execute format(
      'create policy "public read %1$s" on public.%1$I for select using (true);', t);

    execute format('drop policy if exists "auth write %1$s" on public.%1$I;', t);
    execute format(
      'create policy "auth write %1$s" on public.%1$I for all
         to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- 4) Storage-Bucket für Bilder: öffentlich lesbar, Upload nur eingeloggt
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public read site-images" on storage.objects;
create policy "public read site-images" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "auth manage site-images" on storage.objects;
create policy "auth manage site-images" on storage.objects
  for all to authenticated
  using (bucket_id = 'site-images')
  with check (bucket_id = 'site-images');

-- ---------------------------------------------------------------------------
-- 5) Erstbefüllung mit den echten Inhalten (nur falls noch leer)
-- ---------------------------------------------------------------------------
insert into public.site_content (id, hero_bio, tagline, sound_intro,
  about_title, about_title_accent, about_body, regions, stats_quote,
  event_active, event_date, event_venue, event_city, event_note, event_ticket_url)
values (
  1,
  'Ich bin Moogli, Urban-DJ aus dem Raum Heilbronn und Resident im Frankfurter Cooky''s Club. Ich lese den Floor und lege Hip-Hop, R''n''B, Afro, Baile Funk und Latin so übereinander, dass die Energie über die ganze Nacht trägt.',
  'Hip-Hop. R''n''B. Afro. Baile Funk. Latin.',
  'Hip-Hop. R''n''B. Afro. Baile Funk. Latin. Meine Handschrift ist die Verbindung. Ich baue aus Sounds verschiedener Welten einen Groove, der niemanden stehen lässt, von der ersten bis zur letzten Stunde.',
  'Bundesweit im Einsatz.',
  'Zu Hause in den Clubs.',
  'Ob in Frankfurt, Stuttgart, Heilbronn oder quer durch die Republik: Als DJ Moogli liefere ich den perfekten Sound für unvergessliche Nächte. Mit einem feinen Gespür für feinsten Hip-Hop und Urban Beats begleite ich Clubs, exklusive Events und private Feiern. Vom ersten Warm-up-Track bis zur allerletzten Zugabe sorge ich für die richtige Energie auf dem Dancefloor.',
  array['Frankfurt','Stuttgart','Heilbronn','Bundesweit'],
  'Wenn der Raum kippt und alle Hände hochgehen, dafür mache ich das.',
  true,
  'Sa · 12. Juli 2026', 'Cooky''s Club', 'Frankfurt am Main',
  'Resident Night · Urban & Hip-Hop · ab 23 Uhr', ''
)
on conflict (id) do nothing;

insert into public.sound_pillars (title, text, sort_order)
select * from (values
  ('Crowd-Reading', 'Kein Set von der Stange. Ich lese den Floor in Echtzeit und dreh den Vibe genau dann, wenn der Raum danach verlangt.', 0),
  ('Genre-Crossing', 'Hip-Hop trifft Afro, R''n''B kippt in Baile Funk, Latin hält die Hüften in Bewegung. Ich mixe das übergangslos und mit Gefühl.', 1),
  ('Club-Sound', 'Geschult als Resident im Cooky''s Club Frankfurt. Ich bringe Energie, Timing und ein Gespür für den perfekten Drop mit.', 2)
) as v(title, text, sort_order)
where not exists (select 1 from public.sound_pillars);

insert into public.stat_items (value, label, sort_order)
select * from (values
  ('5+', 'Genres im Set', 0),
  ('Resident', 'Cooky''s Club FFM', 1),
  ('2', 'DJs als Boombox-Society', 2),
  ('100%', 'Floor-Energie', 3)
) as v(value, label, sort_order)
where not exists (select 1 from public.stat_items);

insert into public.reviews (quote, author, role, rating, sort_order)
select * from (values
  ('Liest den Floor wie kaum ein anderer. Aus einem ruhigen Warm-up wurde innerhalb von Minuten eine volle Tanzfläche — und die blieb bis zum Schluss.', 'Platzhalter-Stimme', 'Club-Booking · Frankfurt', 5, 0),
  ('Genau der Sound, den wir wollten: Hip-Hop, Afro und Latin nahtlos verbunden. Professionell von der Anfrage bis zur letzten Zugabe.', 'Platzhalter-Stimme', 'Private Feier · Stuttgart', 5, 1),
  ('Energie pur. Unsere Gäste reden heute noch von der Nacht. Buchen wir jederzeit wieder.', 'Platzhalter-Stimme', 'Event · Heilbronn', 5, 2)
) as v(quote, author, role, rating, sort_order)
where not exists (select 1 from public.reviews);

insert into public.faq_items (question, answer, sort_order)
select * from (values
  ('Welche Musik legt DJ Moogli auf?', 'Ich spiele Urban Music mit Schwerpunkt Hip-Hop und R''n''B, dazu Afro, Baile Funk und Latin. Mein Ding ist das Genre-Crossing: Ich führe diese Stile zu einem Groove zusammen, der den Floor die ganze Nacht in Bewegung hält.', 0),
  ('Wo kann ich DJ Moogli live erleben?', 'Live spiele ich regelmäßig als Resident im Cooky''s Club in Frankfurt am Main, dazu auf Clubnächten, Festivals und privaten Events. Aktuelle Termine und Mixe findest du auf meinem Instagram (@djmoogli) und auf Mixcloud.', 1),
  ('Wie kann ich DJ Moogli für mein Event buchen?', 'Am schnellsten über das Booking-Formular auf dieser Seite oder direkt per E-Mail an info@djmoogli.de. Offizielle Buchungen und Presseanfragen laufen außerdem über mein Management KOMA Music in Frankfurt (Tel. +49 69 677 38 346).', 2),
  ('Was ist die Boombox-Society?', 'Boombox-Society ist mein DJ-Duo mit DJ Soulrocca. Wir legen back-to-back auf: zwei Handschriften, doppelte Energie und ein durchgehender Flow, ideal für Clubnächte und größere Events.', 3),
  ('Für welche Art von Events ist DJ Moogli buchbar?', 'Ich spiele von Clubnächten und Festivals über Firmenfeiern bis zu privaten Partys und Hochzeiten. Durch mein breites Genre-Spektrum passe ich das Set flexibel an Publikum und Anlass an, vom dezenten Warm-up bis zum Peak-Time-Set.', 4),
  ('In welcher Region ist DJ Moogli unterwegs?', 'Ich komme aus dem Raum Heilbronn und bin Resident in Frankfurt. Gebucht werde ich bundesweit; Anfragen für andere Regionen und das Ausland gehen jederzeit über mein Management.', 5)
) as v(question, answer, sort_order)
where not exists (select 1 from public.faq_items);

insert into public.mixtapes (title, description, tag, href, sort_order)
select v.title, v.description, v.tag, v.href, v.sort_order
from (values
  ('Urban Heat Vol. 1', 'Hip-Hop und R''n''B Selection, straight aus der Cooky''s-Booth.', 'Hip-Hop / R''n''B', 'https://www.mixcloud.com/DjMoogli/', 0),
  ('Afro x Baile Funk', 'Tropical Heat, Afrobeats trifft brasilianischen Baile Funk.', 'Afro / Baile Funk', 'https://www.mixcloud.com/DjMoogli/', 1),
  ('Latin Nights', 'Reggaeton, Latin & Dembow für die späte Stunde.', 'Latin', 'https://www.mixcloud.com/DjMoogli/', 2)
) as v(title, description, tag, href, sort_order)
where not exists (select 1 from public.mixtapes);
