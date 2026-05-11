import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'danger' | 'neutral';
type Appearance = 'filled' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const colorStyles: Record<Variant, Record<Appearance, string>> = {
  primary: {
    filled: 'bg-accent text-text-black hover:bg-accent-hover',
    outline: 'border border-accent text-accent hover:bg-accent-subtle',
    ghost: 'text-accent hover:text-accent-hover',
  },
  danger: {
    filled: 'bg-danger text-white hover:bg-danger-hover',
    outline: 'border border-danger text-danger hover:bg-red-50',
    ghost: 'text-danger hover:text-danger-hover',
  },
  neutral: {
    filled: 'bg-neutral text-text hover:bg-neutral-hover',
    outline: 'border border-neutral text-text hover:border-accent',
    ghost: 'text-text hover:text-accent',
  },
};

const sizeStyles: Record<
  Size,
  { text: string; iconOnly: string; gap: string }
> = {
  sm: { text: 'text-base px-3 py-1.5', iconOnly: 'p-1.5', gap: 'gap-1.5' },
  md: { text: 'text-base px-4 py-2', iconOnly: 'p-2', gap: 'gap-2' },
  lg: { text: 'text-base px-6 py-3', iconOnly: 'p-3', gap: 'gap-2' },
};

export default function Button({
  variant = 'primary',
  appearance = 'filled',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = !!icon && !children;
  const { text, iconOnly, gap } = sizeStyles[size];
  const sizeClass = isIconOnly ? iconOnly : `${text} ${icon ? gap : ''}`;

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${colorStyles[variant][appearance]} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}
