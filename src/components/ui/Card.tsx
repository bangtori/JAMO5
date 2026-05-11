interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`w-full bg-surface border border-border rounded-xl py-4 px-6 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
