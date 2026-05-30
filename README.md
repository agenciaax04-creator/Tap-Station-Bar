# Tap Station

Menú Digital Inteligente (Astro + Tailwind) con:

- Vista cliente: `/`
- Panel admin: `/admin`
- Preparado para Supabase (`src/lib/supabase.js`)

## Requisitos

- Node.js 18+

## Setup

1. Instala dependencias

```bash
npm install
```

2. Variables de entorno

Copia `.env.example` a `.env` y completa:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

3. Correr en dev

```bash
npm run dev
```

## Esquema sugerido (Supabase)

- `src/lib/schema.sql`
- `src/lib/types.ts`
