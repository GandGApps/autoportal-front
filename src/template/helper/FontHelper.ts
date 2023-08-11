import {TWeight} from '../ui/TextUI';

type TFontFamily =
  | 'Montserrat-Bold'
  | 'Montserrat-SemiBold'
  | 'Montserrat-Medium'
  | 'Montserrat-Regular';

export class FontHelper {
  static getTextFamily = (weight: TWeight): TFontFamily => {
    switch (weight) {
      case 700:
        return 'Montserrat-Bold';
      case 600:
        return 'Montserrat-SemiBold';
      case 500:
      default:
        return 'Montserrat-Medium';
      case 400:
        return 'Montserrat-Regular';
    }
  };
}
