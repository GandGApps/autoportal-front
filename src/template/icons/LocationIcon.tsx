import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorsUI} from '../styles/ColorUI';

interface LocationIconProps {
  color?: string;
  size?: number;
}

export const LocationIcon = ({color, size}: LocationIconProps) => {
  return (
    <Svg width={size || 13} height={size || 13} viewBox="0 0 13 13" fill="none">
      <Path
        d="M6.5 1C4.019 1 2 3.033 2 5.5325C2 9.084 6.077 12.751 6.2505 12.905C6.322 12.9685 6.411 13 6.5 13C6.589 13 6.678 12.9685 6.7495 12.9055C6.923 12.751 11 9.084 11 5.5325C11 3.033 8.981 1 6.5 1ZM6.5 8C5.1215 8 4 6.8785 4 5.5C4 4.1215 5.1215 3 6.5 3C7.8785 3 9 4.1215 9 5.5C9 6.8785 7.8785 8 6.5 8Z"
        fill={color || ColorsUI.green}
      />
    </Svg>
  );
};
