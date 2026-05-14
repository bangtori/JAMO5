import type { TileState } from '../../types';
import KeyButton, { KEY_BUTTON_BASE_CLASS } from './KeyButton';

const KEYBOARD_LAYOUT = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'back'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'enter'],
];

export default function Keyboard({
  keyboardState,
  onSubmit,
  onDelete,
  onInput,
}: {
  keyboardState: Record<string, TileState | undefined>;
  onSubmit: () => void;
  onDelete: () => void;
  onInput: (letter: string) => void;
}) {
  return (
    <section className="flex flex-col gap-2">
      {KEYBOARD_LAYOUT.map((row) => (
        <div key={row[0]} className="flex gap-2">
          {row.map((letter) => {
            if (letter === 'back') {
              return (
                <button
                  key={letter}
                  className={` ${KEY_BUTTON_BASE_CLASS} flex-[1.5] bg-surface border-border text-text-muted`}
                  onClick={onDelete}
                >
                  ⌫
                </button>
              );
            } else if (letter === 'enter') {
              return (
                <button
                  key={letter}
                  className={`${KEY_BUTTON_BASE_CLASS} flex-[2] bg-accent text-black`}
                  onClick={onSubmit}
                >
                  입력
                </button>
              );
            } else {
              return (
                <KeyButton
                  key={letter}
                  letter={letter}
                  state={keyboardState[letter]}
                  onClick={() => onInput(letter)}
                />
              );
            }
          })}
        </div>
      ))}
    </section>
  );
}
