import toastr from 'toastr';

// Configure toastr defaults
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  timeOut: 5000,
};

export const toast = {
  success: (message: string, title?: string) => {
    toastr.success(message, title);
  },
  error: (message: string, title?: string) => {
    toastr.error(message, title);
  },
  warning: (message: string, title?: string) => {
    toastr.warning(message, title);
  },
  info: (message: string, title?: string) => {
    toastr.info(message, title);
  },
};

export const handleError = (error: any) => {
  const message = error?.message || 'An unexpected error occurred';
  toastr.error(message);
  console.error(error);
}; 