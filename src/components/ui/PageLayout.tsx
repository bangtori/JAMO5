interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={`w-full max-w-md flex flex-col gap-6 px-6 ${className ?? ''}`}
      >
        {children}
      </div>
    </div>
  );
}
