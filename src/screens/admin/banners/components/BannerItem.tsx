import React, {FC, useState} from 'react';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {CenterContainerFlex} from '../../../../template/containers/CenterContainer';
import {Loader} from '../../../../components/Loader';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Dimensions, Image, View} from 'react-native';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {Banner} from '../../../../modules/organizations/models/Banner';
import {MainContainer} from '../../../../template/containers/MainContainer';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import {RowContainerBeetwen} from '../../../../template/containers/RowContainer';
import {UnderLineText} from '../../../../components/UnderLineText';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';

interface CompProps {
  banner: Banner;
}

export const BannerItem: FC<CompProps> = ({banner}) => {
  const [isLoading, setIsLoading] = useState(false);

  const width = Dimensions.get('window').width - 40;
  const height = width / 2;

  const handleEditBanner = () => {
    Navigation.navigate(Screens.ADMIN_CREATE_BANNER, {
      banner: banner,
    });
  };

  return (
    <MainContainer $borderBottom={ColorsUI.gray.disabled} $pb={20}>
      <TextUI $mb={10} ag={Ag['400_16']}>
        {banner.title}
      </TextUI>
      <ViewPress
        activeOpacity={0.8}
        onPress={() =>
          Navigation.navigate(Screens.ORGANIZATION, {
            _id: banner.organizationId,
          })
        }>
        <View>
          {isLoading && (
            <AbsoluteContainer $widthPX={width} $heightPX={height}>
              <CenterContainerFlex
                $br={10}
                $borderColor={ColorsUI.gray.disabled}>
                <Loader size={20} />
              </CenterContainerFlex>
            </AbsoluteContainer>
          )}
          <Image
            style={[{borderRadius: 10}]}
            width={width}
            height={height}
            source={{uri: banner.image}}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
          />
        </View>
      </ViewPress>
      <RowContainerBeetwen $mt={10}>
        <UnderLineText
          ag={Ag['400_14']}
          text={'Удалить'}
          color={ColorsUI.red}
          onPress={() =>
            Navigation.navigate(Screens.MODAL_BANNER_REMOVE, {
              bannerId: banner._id,
            })
          }
        />
        <UnderLineText
          ag={Ag['400_14']}
          text={'Редактировать'}
          color={ColorsUI.green}
          onPress={handleEditBanner}
        />
      </RowContainerBeetwen>
    </MainContainer>
  );
};
