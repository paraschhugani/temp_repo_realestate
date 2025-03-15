import { toast } from "sonner";

export const toastService = {

  success: (message: string, options = {}) => {
    return toast.success(message, {
      className: "bg-green-50 border-green-500 text-green-800",
      duration: 5000,
      ...options,
    });
  },

  error: (message: string, options = {}) => {
    return toast.error(message, {
      className: "bg-red-50 border-red-500 text-red-800",
      duration: 5000,
      ...options,
    });
  },


  warning: (message: string, options = {}) => {
    return toast(message, {
      className: "bg-yellow-50 border-yellow-500 text-yellow-800",
      duration: 5000,
      ...options,
    });
  },

  info: (message: string, options = {}) => {
    return toast(message, {
      className: "bg-blue-50 border-blue-500 text-blue-800",
      duration: 5000,
      ...options,
    });
  },


  custom: (message: string, options = {}) => {
    return toast(message, {
      duration: 5000,
      ...options,
    });
  },
}; 