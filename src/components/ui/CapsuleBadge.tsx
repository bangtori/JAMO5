type Variant = 'accent' | 'neutral';
type Size = 'sm' | 'md' | 'lg';

type CapsuleBadgeProps = {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
};

const colorStyles: Record<Variant, string> = {
  accent: 'bg-surface text-accent border-accent',
  neutral: 'bg-surface text-text border-neutral',
};
const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
  lg: 'px-5 py-2 text-base',
};

export default function CapsuleBadge({
  variant = 'neutral',
  size = 'md',
  children,
  className,
}: CapsuleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center border rounded-full ${colorStyles[variant]} ${sizeStyles[size]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
