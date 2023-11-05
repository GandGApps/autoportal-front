import React, {FC, useState} from 'react';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {ImageUI} from '../../../template/ui/ImageUI';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {ColorsUI} from '../../../template/styles/ColorUI';
interface CompProps {
  url: string;
}
export const CarouselItem: FC<CompProps> = ({url}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <ViewPress $isFlex activeOpacity={0.8}>
      <ColumnContainerFlex>
        {isLoading && (
          <CenterContainerFlex $br={10} $borderColor={ColorsUI.gray.disabled}>
            <Loader size={20} />
          </CenterContainerFlex>
        )}
        <ImageUI
          $isFlex={!isLoading}
          $br={10}
          source={{uri: url}}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </ColumnContainerFlex>
    </ViewPress>
  );
};
