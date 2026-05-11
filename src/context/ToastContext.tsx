import { createContext, useContext, useState } from 'react';
import type { ToastItem, ToastType } from '../types';
// 밖에서 꺼내 쓸 수 있는 기능 명세 = value의 타입
type ToastContextValue = {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  // 따로 x 버튼 등 수동 삭제 기능 추가 시 도입
  //   removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function showToast(message: string, type: ToastType = 'default') {
    const id = crypto.randomUUID();
    const newToast: ToastItem = {
      id,
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error(
      'useToastContext는 ToastProvider 내부에서 사용해야 합니다.',
    );
  }
  return context;
}
