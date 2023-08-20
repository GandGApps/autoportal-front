import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';

interface StarIconProps {
  size?: number;
}

export const StarIcon = ({size}: StarIconProps) => {
  return (
    <Svg width={size || 17} height={size || 17} viewBox="0 0 17 17" fill="none">
      <Path
        d="M8.06876 12.1926L4.15009 14.586L5.21543 10.1193L1.72876 7.13264L6.30543 6.76598L8.06876 2.52598L9.83209 6.76598L14.4094 7.13264L10.9221 10.1193L11.9874 14.586L8.06876 12.1926Z"
        fill="#FDCA40"
      />
    </Svg>
  );
};
