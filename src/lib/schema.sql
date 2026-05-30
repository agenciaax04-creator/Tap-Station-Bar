create table if not exists categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  orden int not null default 0
);

create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  precio numeric(10,2) not null default 0,
  imagen_url text,
  categoria_id uuid not null references categorias(id) on delete cascade,
  disponible boolean not null default true
);

create index if not exists idx_productos_categoria_id on productos(categoria_id);
create index if not exists idx_categorias_orden on categorias(orden);
