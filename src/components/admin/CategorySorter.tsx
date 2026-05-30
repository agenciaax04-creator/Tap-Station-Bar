import { useMemo, useRef, useState } from 'preact/hooks';

type Category = {
  id: string;
  nombre: string;
};

type DragState = {
  activeId: string;
  overId: string | null;
} | null;

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  if (item === undefined) return next;
  next.splice(to, 0, item);
  return next;
}

export default function CategorySorter() {
  const initial = useMemo<Category[]>(
    () => [
      { id: 'c1', nombre: 'Promos 🔥' },
      { id: 'c2', nombre: 'Cervezas 🍻' },
      { id: 'c3', nombre: 'Hamburguesas 🍔' },
      { id: 'c4', nombre: 'Snacks 🍗' },
    ],
    [],
  );

  const [categories, setCategories] = useState<Category[]>(initial);
  const [drag, setDrag] = useState<DragState>(null);

  const orderRef = useRef<string[]>(initial.map((c) => c.id));

  const idToIndex = (id: string) => categories.findIndex((c) => c.id === id);

  const onDragStart = (id: string) => (e: DragEvent) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setDrag({ activeId: id, overId: id });
  };

  const onDragOver = (overId: string) => (e: DragEvent) => {
    e.preventDefault();
    if (!drag) return;
    if (drag.overId === overId) return;
    setDrag({ ...drag, overId });
  };

  const onDrop = (overId: string) => (e: DragEvent) => {
    e.preventDefault();
    const activeId = e.dataTransfer?.getData('text/plain');
    if (!activeId) {
      setDrag(null);
      return;
    }

    if (activeId === overId) {
      setDrag(null);
      return;
    }

    const from = idToIndex(activeId);
    const to = idToIndex(overId);
    if (from < 0 || to < 0) {
      setDrag(null);
      return;
    }

    const next = arrayMove(categories, from, to);
    setCategories(next);
    orderRef.current = next.map((c) => c.id);
    setDrag(null);
  };

  const onDragEnd = () => {
    setDrag(null);
  };

  return (
    <div class="space-y-2">
      <div class="text-xs text-zinc-400">
        Orden actual:{' '}
        <span class="text-zinc-200">{orderRef.current.join(' · ')}</span>
      </div>

      <ul class="space-y-2" role="list">
        {categories.map((c) => {
          const isActive = drag?.activeId === c.id;
          const isOver = drag?.overId === c.id;

          return (
            <li
              key={c.id}
              draggable
              onDragStart={onDragStart(c.id) as any}
              onDragOver={onDragOver(c.id) as any}
              onDrop={onDrop(c.id) as any}
              onDragEnd={onDragEnd as any}
              class={[
                'flex items-center justify-between gap-3 rounded-xl px-3 py-3',
                'bg-zinc-900/55 ring-1 ring-white/10',
                'select-none',
                isActive ? 'opacity-70' : 'opacity-100',
                isOver && !isActive ? 'ring-brand-amber/40 bg-brand-amber/10' : '',
              ].join(' ')}
            >
              <div class="min-w-0">
                <div class="text-sm font-black text-zinc-100 truncate">{c.nombre}</div>
                <div class="text-xs text-zinc-400">Arrastrar para reordenar</div>
              </div>
              <div
                class="h-9 w-9 shrink-0 grid place-items-center rounded-lg bg-zinc-950/40 ring-1 ring-white/10 text-zinc-300"
                aria-hidden="true"
                title="Arrastrar"
              >
                ⋮⋮
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
