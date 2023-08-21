import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ColorsUI} from '../styles/ColorUI';

interface NoImageProps {
  color?: string;
  size?: number;
}

export const NoImage = ({color, size}: NoImageProps) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 20.7L3.3 2L2 3.3L3 4.3V19C3 20.1 3.9 21 5 21H19.7L20.7 22L22 20.7ZM5 19V6.3L12.6 13.9L11.1 15.8L9 13.1L6 17H15.7L17.7 19H5ZM8.8 5L6.8 3H19C20.1 3 21 3.9 21 5V17.2L19 15.2V5H8.8Z"
        fill={color || ColorsUI.black}
      />
    </Svg>
  );
};
