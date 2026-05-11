import type { TileDisplayState } from '../../types';

type EmptyTileProps = {
  state: Extract<TileDisplayState, 'empty' | 'active'>;
  letter?: never;
};

type FilledTileProps = {
  state: Extract<TileDisplayState, 'filled' | 'correct' | 'present' | 'absent'>;
  letter: string;
};

type TileProps = EmptyTileProps | FilledTileProps;

const colorStyles: Record<TileDisplayState, string> = {
  empty: 'bg-bg border-neutral',
  active: 'bg-bg border-accent',
  filled: 'bg-surface border-border text-text',
  correct: 'bg-correct-bg border-correct-border text-correct',
  present: 'bg-present-bg border-present-border text-present',
  absent: 'bg-absent-bg border-absent-border text-absent',
};

export default function Tile({ letter, state }: TileProps) {
  const sizeClass = 'w-10 h-10 sm:w-12 sm:h-12';
  const fontSizeClass = 'text-xl sm:text-2xl';
  return (
    <div
      className={`transition-all duration-300 ease-in-out border rounded-lg flex items-center justify-center ${sizeClass} ${fontSizeClass} ${
        colorStyles[state]
      }`}
    >
      {state !== 'empty' && state !== 'active' && letter && (
        <span className="font-mono">{letter}</span>
      )}
    </div>
  );
}
