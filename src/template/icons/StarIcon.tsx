import React from 'react';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';

interface StarIconProps {
  size?: number;
  isActive?: boolean;
}
export const StarIcon: React.FC<StarIconProps> = ({size, isActive = true}) => {
  return (
    <Svg width={size || 14} height={size || 14} viewBox="0 0 26 26" fill="none">
      <Svg width="26" height="25" viewBox="0 0 26 25" fill="none">
        <Path
          d={
            isActive
              ? 'M12.9531 19.4838L5.31547 24.1485L7.39185 15.4428L0.596191 9.62165L9.5163 8.907L12.9531 0.643066L16.3899 8.907L25.3113 9.62165L18.5144 15.4428L20.5908 24.1485L12.9531 19.4838Z'
              : 'M13.3983 19.0571L13.1377 18.8979L12.8771 19.0571L6.26527 23.0953L8.06278 15.5588L8.13363 15.2617L7.9017 15.0631L2.0191 10.024L9.74081 9.40541L10.0453 9.38101L10.1625 9.099L13.1377 1.94516L16.1128 9.099L16.2301 9.38102L16.5346 9.40541L24.2574 10.024L18.3737 15.063L18.1417 15.2617L18.2126 15.5588L20.0101 23.0953L13.3983 19.0571Z'
          }
          fill={isActive ? '#FDCA40' : 'white'}
          stroke={isActive ? 'transparent' : '#CACACA'}
        />
      </Svg>
    </Svg>
  );
};
