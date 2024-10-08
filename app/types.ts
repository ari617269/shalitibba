export enum ToastLevel {
  success = 'success',
  warning = 'warning',
  error = 'error',
  information = 'information',
  default = 'default',
}

export interface Toast {
  url: string;
  title: string;
  message: string;
  style?: ToastLevel;
  startTimestamp?: number;
  visible?: boolean;
}

export type IToastContext = {
  toastList: Array<Toast>;
  createToast: (toast: Toast) => void;
  removeToastAtIndex: (index: number) => void;
  secondsTicker: () => void;
};
