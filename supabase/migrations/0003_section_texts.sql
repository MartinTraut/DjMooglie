-- Section-Köpfe (Eyebrow + Beschreibung) sitewide editierbar machen (Admin-Portal).
-- Plus die zweizeilige "Book / Contact"-Headline.
-- In Supabase → SQL Editor einfügen und ausführen.
alter table public.site_content
  -- Music / Mixtapes
  add column if not exists music_eyebrow         text not null default '',
  add column if not exists music_title           text not null default '',
  add column if not exists music_intro           text not null default '',
  -- Booking / Kontakt
  add column if not exists booking_eyebrow       text not null default '',
  add column if not exists booking_title         text not null default '',
  add column if not exists booking_title_accent  text not null default '',
  add column if not exists booking_intro         text not null default '',
  -- Sound
  add column if not exists sound_eyebrow         text not null default '',
  -- Über mich
  add column if not exists about_eyebrow         text not null default '',
  -- Nächster Gig
  add column if not exists event_eyebrow         text not null default '',
  -- Rezensionen
  add column if not exists reviews_eyebrow       text not null default '',
  add column if not exists reviews_intro         text not null default '',
  -- Referenzen / Gig History
  add column if not exists gigs_eyebrow          text not null default '',
  add column if not exists gigs_intro            text not null default '',
  -- EPK
  add column if not exists epk_eyebrow           text not null default '',
  add column if not exists epk_intro             text not null default '',
  -- Management
  add column if not exists management_eyebrow    text not null default '',
  add column if not exists management_intro       text not null default '',
  -- Boombox-Society
  add column if not exists boombox_eyebrow       text not null default '';

-- Aktuelle Texte vorbefüllen, damit sie im Editor bereits dort stehen.
update public.site_content set
  music_eyebrow        = 'Mixtapes · Mixcloud',
  music_title          = 'Music',
  music_intro          = 'Hör rein, bevor du buchst. Eine Auswahl aus der Cooky''s-Booth, tropical Heat und meinen späten Latin-Stunden.',
  booking_eyebrow      = 'Kontakt & Booking',
  booking_title        = 'Book',
  booking_title_accent = 'Contact',
  booking_intro        = 'Club-Night, Festival, Firmenevent oder Private Party? Schick mir die Eckdaten, du bekommst zeitnah eine Rückmeldung, direkt von mir oder über mein Management.',
  sound_eyebrow        = 'Welcher Sound',
  about_eyebrow        = 'Über mich',
  event_eyebrow        = 'Live · Nächster Gig',
  reviews_eyebrow      = 'Stimmen · Rezensionen',
  reviews_intro        = 'Rückmeldungen von Clubs, Veranstaltern und Gästen — der ehrlichste Maßstab für einen DJ.',
  gigs_eyebrow         = 'Referenzen · Gig History',
  gigs_intro           = 'Ich bin Resident im Frankfurter Cooky''s und lege quer durch Deutschland auf. Von Clubs über Großraumdiscos bis Private Bookings. Eine Auswahl meiner Stationen.',
  epk_eyebrow          = 'Electronic Press Kit',
  epk_intro            = 'Alles für Veranstalter und Presse auf einen Blick. Bio, Pressefotos und Logo gibt es auf Anfrage über das Booking.',
  management_eyebrow   = 'Management',
  management_intro     = 'Bookings und Presseanfragen für DJ Moogli laufen offiziell über das Management von KOMA Music in Frankfurt. Schnell, direkt und verbindlich.',
  boombox_eyebrow      = 'Das Duo · B2B'
where id = 1;
