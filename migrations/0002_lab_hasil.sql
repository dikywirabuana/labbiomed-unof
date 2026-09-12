create table if not exists lab_hasil (
  kode text primary key,
  payload text not null,
  updated timestamptz not null default now()
);
