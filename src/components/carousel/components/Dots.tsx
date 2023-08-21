import React from 'react';
import {RowContainerCenter} from '../../../template/containers/RowContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

interface DotsProps {
  list: string[];
  currentIndex: number;
}

export const Dots = ({list, currentIndex}: DotsProps) => {
  return (
    <RowContainerCenter>
      <MainContainer>
        <AnimatedDotsCarousel
          length={list.length}
          currentIndex={currentIndex}
          maxIndicators={list.length}
          activeIndicatorConfig={{
            color: ColorsUI.white,
            margin: 3,
            opacity: 1,
            size: 8,
          }}
          inactiveIndicatorConfig={{
            color: ColorsUI.white,
            margin: 3,
            opacity: 0.5,
            size: 8,
          }}
          decreasingDots={[
            {
              config: {
                color: ColorsUI.white,
                margin: 3,
                opacity: 0.5,
                size: 6,
              },
              quantity: 1,
            },
            {
              config: {
                color: ColorsUI.white,
                margin: 3,
                opacity: 0.5,
                size: 4,
              },
              quantity: 1,
            },
          ]}
        />
      </MainContainer>
    </RowContainerCenter>
  );
};
