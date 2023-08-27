export class MaskHelper {
  static formatPhoneNumber = (text?: string) => {
    if (!text) {
      return;
    }

    if (text.length <= 4 && text.length !== 1) {
      return '';
    }

    if (text.length === 1) {
      text = '7' + text;
    }

    const cleaned = text.replace(/\D/g, '');

    let formattedPhoneNumber = '+';

    for (let i = 0; i < cleaned.length && i < 11; i++) {
      if (i === 1) {
        formattedPhoneNumber += ' (' + cleaned[i];
      } else if (i === 4) {
        formattedPhoneNumber += ') ' + cleaned[i];
      } else if (i === 7 || i === 9) {
        formattedPhoneNumber += ' ' + cleaned[i];
      } else {
        formattedPhoneNumber += cleaned[i];
      }
    }

    return formattedPhoneNumber;
  };

  static clearFormat = (phone: string) => {
    return '+' + phone.replace(/\D/g, '');
  };
}
