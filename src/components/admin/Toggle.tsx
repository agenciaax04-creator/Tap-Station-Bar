import { useId } from 'preact/hooks';

type Props = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
};

export default function Toggle({ checked, onChange, label }: Props) {
  const id = useId();

  return (
    <div class="flex items-center justify-between gap-3">
      <label for={id} class="text-sm font-semibold text-zinc-200">
        {label}
      </label>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        class={[
          'relative inline-flex h-7 w-12 items-center rounded-full',
          'ring-1 ring-white/10 bg-zinc-900',
          'transition-colors',
          checked ? 'bg-brand-amber/30 ring-brand-amber/30' : '',
        ].join(' ')}
        style={{ flex: '0 0 auto' }}
      >
        <span
          class={[
            'inline-block h-5 w-5 transform rounded-full bg-zinc-100',
            'transition-transform',
            checked ? 'translate-x-6 bg-brand-amber' : 'translate-x-1',
          ].join(' ')}
        />
      </button>
    </div>
  );
}
