export type ToastType = 'default' | 'danger' | 'warning';

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};
