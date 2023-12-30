import React, {FC, useState} from 'react';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {ImageUI} from '../../../template/ui/ImageUI';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {ColorsUI} from '../../../template/styles/ColorUI';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {Image, TouchableOpacity, View} from 'react-native';
import {AbsoluteContainer} from '../../../template/containers/AbsoluteContainer';

interface CompProps {
  url: string;
  organizationId: string;
  width: number;
  height: number;
}

export const CarouselItem: FC<CompProps> = ({
  url,
  organizationId,
  width,
  height,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableOpacity
      style={{marginRight: 10}}
      activeOpacity={0.8}
      onPress={() =>
        Navigation.navigate(Screens.ORGANIZATION, {
          _id: organizationId,
        })
      }>
      <View>
        {isLoading && (
          <AbsoluteContainer
            $widthPX={width}
            $heightPX={height}
            $br={10}
            $borderColor={ColorsUI.gray.disabled}>
            <CenterContainerFlex>
              <Loader size={20} />
            </CenterContainerFlex>
          </AbsoluteContainer>
        )}
        <Image
          style={{borderRadius: 10}}
          width={width}
          height={height}
          source={{uri: url}}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </TouchableOpacity>
  );
};
