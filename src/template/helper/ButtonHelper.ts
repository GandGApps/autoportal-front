import {ColorsUI} from './../styles/ColorUI';
import {TButton} from '../ui/ButtonUI';

export class ButtonHelper {
  static getBackColor = (type: TButton): string => {
    switch (type) {
      case 'border':
      case 'border-white':
        return ColorsUI.transparent;
      case 'firm':
        return ColorsUI.firm;
      case 'black':
      default:
        return ColorsUI.black;
    }
  };

  static getTextColor = (type: TButton) => {
    switch (type) {
      case 'border':
        return ColorsUI.black;
      case 'border-white':
        return ColorsUI.white;
      case 'firm':
        return ColorsUI.black;
      case 'black':
      default:
        return ColorsUI.firm;
    }
  };

  static getBorderColor = (type: TButton) => {
    if (type === 'border') {
      return ColorsUI.black;
    }

    return ColorsUI.white;
  };

  static checkIsBorder = (type: TButton) => {
    return type === 'border' || type === 'border-white';
  };
}
