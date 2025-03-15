import { toast, ToastOptions } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastServiceOptions extends ToastOptions {
  duration?: number;
}

const defaultOptions: ToastServiceOptions = {
  duration: 5000,
};

/**
 * Custom toast service to handle different types of toasts with consistent styling
 */
export const toastService = {
  /**
   * Show a success toast with green styling
   */
  success: (message: string, options?: ToastServiceOptions) => {
    return toast.success(message, {
      ...defaultOptions,
      ...options,
      className: "bg-green-50 border-green-500 text-green-800",
    });
  },

  /**
   * Show an error toast with red styling
   */
  error: (message: string, options?: ToastServiceOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      ...options,
      className: "bg-red-50 border-red-500 text-red-800",
    });
  },

  /**
   * Show a warning toast with yellow styling
   */
  warning: (message: string, options?: ToastServiceOptions) => {
    return toast(message, {
      ...defaultOptions,
      ...options,
      className: "bg-yellow-50 border-yellow-500 text-yellow-800",
    });
  },

  /**
   * Show an info toast with blue styling
   */
  info: (message: string, options?: ToastServiceOptions) => {
    return toast(message, {
      ...defaultOptions,
      ...options,
      className: "bg-blue-50 border-blue-500 text-blue-800",
    });
  },

  /**
   * Show a custom toast with specified styling
   */
  custom: (message: string, options?: ToastServiceOptions) => {
    return toast(message, {
      ...defaultOptions,
      ...options,
    });
  },
}; 