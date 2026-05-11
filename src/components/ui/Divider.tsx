interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Divider({ children, className }: DividerProps) {
  if (children) {
    return (
      <div className={`flex items-center gap-3 w-full ${className}`}>
        <div className="flex-1 border-t border-border"></div>
        <span className="text-text-muted text-sm">{children}</span>
        <div className="flex-1 border-t border-border"></div>
      </div>
    );
  }
  return <hr className={`w-full border border-border ${className}`} />;
}
