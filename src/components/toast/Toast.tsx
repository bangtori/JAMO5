import type { ToastItem, ToastType } from '../../types';
import { Info, TriangleAlert, CircleX } from 'lucide-react';
interface ToastProps {
  toast: ToastItem;
}
export default function Toast({ toast }: ToastProps) {
  const colorStyles: Record<ToastType, string> = {
    default: 'border-accent bg-accent/20 text-accent',
    warning: 'border-present bg-present/20 text-present',
    danger: 'border-danger bg-danger/20 text-danger',
  };
  const iconStyles: Record<ToastType, React.ElementType> = {
    default: Info,
    warning: TriangleAlert,
    danger: CircleX,
  };
  const Icon = iconStyles[toast.type];
  return (
    <div
      className={`px-4 py-2 text-sm rounded-lg border flex items-center gap-2 shadow-lg shadow-black/20 ${colorStyles[toast.type]}`}
    >
      <Icon size={16} />
      {toast.message}
    </div>
  );
}
