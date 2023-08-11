export class Notifications {
  static succes = (message: string) => {
    toast.show(message, {
      type: 'success',
      placement: 'top',
      duration: 2000,
      animationType: 'zoom-in',
    });
  };

  static error = (message: string) => {
    toast.show(message, {
      type: 'warning',
      placement: 'top',
      duration: 2000,
      animationType: 'zoom-in',
    });
  };

  static danger = (message: string) => {
    toast.show(message, {
      type: 'danger',
      placement: 'top',
      duration: 2000,
      animationType: 'zoom-in',
    });
  };
}
