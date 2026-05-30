import { useMemo, useState } from 'preact/hooks';
import Toggle from './Toggle';

type Item = {
  id: string;
  nombre: string;
  precio: string;
};

type Availability = Record<string, boolean>;

export default function ProductAvailabilityList() {
  const items = useMemo<Item[]>(
    () => [
      { id: 'p1', nombre: 'Combo Sports Bar', precio: '$189' },
      { id: 'p2', nombre: 'IPA de la Casa', precio: '$85' },
      { id: 'p3', nombre: 'Boneless BBQ', precio: '$149' },
    ],
    [],
  );

  const [availability, setAvailability] = useState<Availability>(() => ({
    p1: true,
    p2: true,
    p3: false,
  }));

  return (
    <div class="space-y-2">
      {items.map((p) => {
        const checked = Boolean(availability[p.id]);

        return (
          <div
            key={p.id}
            class="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl px-3 py-3 bg-zinc-900/55 ring-1 ring-white/10"
          >
            <div class="min-w-0">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-sm font-black text-zinc-100 truncate">{p.nombre}</div>
                  <div class="text-xs text-zinc-400">Disponibilidad</div>
                </div>
                <div class="shrink-0 text-sm font-black text-brand-amber">{p.precio}</div>
              </div>
            </div>

            <div class="w-28">
              <Toggle
                label={checked ? 'Activo' : 'Inactivo'}
                checked={checked}
                onChange={(next) =>
                  setAvailability((prev) => ({
                    ...prev,
                    [p.id]: next,
                  }))
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
