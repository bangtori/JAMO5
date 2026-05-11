import { useToastContext } from '../../context/ToastContext';
import Toast from './Toast';

export default function ToastContainer() {
  const { toasts } = useToastContext();

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
