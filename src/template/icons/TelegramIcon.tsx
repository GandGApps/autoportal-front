import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface TelegramIconProps {
  size?: number;
}

export const TelegramIcon = ({size}: TelegramIconProps) => {
  return (
    <Svg width={size || 18} height={size || 18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 17C13.4193 17 17 13.4193 17 9C17 4.58067 13.4193 1 9 1C4.58067 1 1 4.58067 1 9C1 13.4193 4.58067 17 9 17ZM4.66067 8.82667L12.374 5.85267C12.732 5.72333 13.0447 5.94 12.9287 6.48133L12.9293 6.48067L11.616 12.668C11.5187 13.1067 11.258 13.2133 10.8933 13.0067L8.89333 11.5327L7.92867 12.462C7.822 12.5687 7.732 12.6587 7.52533 12.6587L7.66733 10.6233L11.374 7.27467C11.5353 7.13267 11.338 7.05267 11.1253 7.194L6.54467 10.078L4.57 9.462C4.14133 9.326 4.132 9.03333 4.66067 8.82667Z"
        fill="black"
      />
    </Svg>
  );
};
