import React from 'react';
import {MainContainer} from '../../template/containers/MainContainer';
import Carousel from 'react-native-reanimated-carousel';
import {AbsoluteContainer} from '../../template/containers/AbsoluteContainer';
import {ImageUI} from '../../template/ui/ImageUI';

import {ViewFlexPress} from '../../template/containers/ViewPress';
import {Dots} from './components/Dots';

interface OrganizationPreviewUIProps {
  list: string[];
  width: number;
  height: number;
  currentIndex: number;
  onChangeItem: (value: number) => void;
  onPressImage: () => void;
  isAutoPlay?: boolean;
}

export const CarouselUI = (props: OrganizationPreviewUIProps) => {
  return (
    <MainContainer>
      <Carousel
        loop
        autoPlay={props.isAutoPlay}
        autoPlayInterval={3000}
        width={props.width}
        height={props.height}
        data={props.list || []}
        scrollAnimationDuration={1000}
        renderItem={({item, index}) => (
          <ViewFlexPress
            key={`preview-${index}`}
            activeOpacity={1}
            onPress={props.onPressImage}>
            <ImageUI $isFlex source={{uri: item}} />
          </ViewFlexPress>
        )}
        onProgressChange={(_, process) =>
          props.onChangeItem(Math.round(process))
        }
      />

      <AbsoluteContainer $bottom={10} $widthPRC={100}>
        <Dots list={props.list} currentIndex={props.currentIndex} />
      </AbsoluteContainer>
    </MainContainer>
  );
};
