-- Boombox-Society Texte editierbar machen (Admin-Portal).
-- In Supabase → SQL Editor einfügen und ausführen.
alter table public.site_content
  add column if not exists duo_tagline     text not null default '',
  add column if not exists duo_claim       text not null default '',
  add column if not exists duo_partner     text not null default '',
  add column if not exists duo_description text not null default '';

-- Aktuelle Texte vorbefüllen, damit sie im Editor bereits dort stehen.
update public.site_content set
  duo_tagline     = 'The Urban Sound Experience',
  duo_claim       = 'Zwei Artists. Eine Vision. Maximale Energie.',
  duo_partner     = 'DJ Soulrocca',
  duo_description = 'Als Boombox-Society stehe ich gemeinsam mit DJ Soulrocca hinter den Decks. Gebündelte Expertise, perfekte musikalische Synergie und ein präzises Gespür für den Dancefloor, das die Energie von der ersten bis zur letzten Minute hochhält.'
where id = 1;
