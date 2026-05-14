import type { TileState } from '../../types';

interface KeyButtonProps {
  letter: string;
  state: TileState | undefined;
  onClick: () => void;
  className?: string;
}

const colorStyles: Record<TileState, string> = {
  correct: 'bg-correct-bg text-correct-border border-correct-border',
  present: 'bg-present-bg text-present-border border-present-border',
  absent: 'bg-absent-bg text-absent border-absent-border',
};
export const KEY_BUTTON_BASE_CLASS = `flex justify-center items-center rounded-lg px-2 py-4 border active:scale-95 transition-all text-sm font-title`;
export default function KeyButton({
  letter,
  state,
  onClick,
  className,
}: KeyButtonProps) {
  const colorClass = state
    ? colorStyles[state]
    : 'bg-surface border-border text-text';

  return (
    <button
      className={`${KEY_BUTTON_BASE_CLASS} flex-1 ${colorClass} ${className ?? ''}`}
      onClick={onClick}
    >
      {letter}
    </button>
  );
}
