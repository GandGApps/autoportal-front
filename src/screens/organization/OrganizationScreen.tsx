import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {OrganizationParams} from '../../routes/params/RouteParams';
import {getCurrentOrganization} from '../../modules/organizations/thunks/OrganizationsThunks';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {
  CenterContainer,
  CenterContainerFlex,
} from '../../template/containers/CenterContainer';
import {Loader} from '../../components/Loader';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {MainContainer} from '../../template/containers/MainContainer';
import {ColorsUI} from '../../template/styles/ColorUI';
import {NoImage} from '../../template/icons/NoImage';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {CarouselUI} from '../../components/carousel/CarouselUI';
import ImageView from 'react-native-image-viewing';
import {Dots} from '../../components/carousel/components/Dots';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AbsoluteContainer} from '../../template/containers/AbsoluteContainer';
import {BackBtn} from '../../template/ui/BackBtn';
import {RowContainerBeetwen} from '../../template/containers/RowContainer';
import {HearthIcon} from '../../template/icons/HearthIcon';
import {ViewPress} from '../../template/containers/ViewPress';

export const OrganizationScreen = () => {
  const {_id} = useRoute<OrganizationParams>().params;
  const dispatch = useAppDispatch();

  const {isCurrentOrganizationLoad, currentOrganization} = useAppSelector(
    selectOrganizationsValues,
  );

  const insets = useSafeAreaInsets();

  const carouselWidth = Dimensions.get('window').width;
  const carouselHeight = carouselWidth / 1.5;

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  const [visiblePreview, setIsVisiblePreview] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getCurrentOrganization(_id));
  }, []);

  const handlePressImage = () => {
    setPreviewIndex(carouselIndex);
    setIsVisiblePreview(true);
  };

  if (isCurrentOrganizationLoad) {
    return (
      <CenterContainerFlex>
        <Loader size={20} />
      </CenterContainerFlex>
    );
  }

  const handleAddToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollViewScreen>
      <StatusBar barStyle={'light-content'} />
      {currentOrganization?.previews ? (
        <CarouselUI
          list={currentOrganization.previews}
          width={carouselWidth}
          height={carouselHeight}
          currentIndex={carouselIndex}
          onChangeItem={setCarouselIndex}
          onPressImage={handlePressImage}
        />
      ) : (
        <CenterContainer
          $heightPX={carouselHeight}
          $widthPX={carouselWidth}
          $bg={ColorsUI.gray.main}>
          <MainContainer $mb={20}>
            <NoImage size={40} color={ColorsUI.white} />
          </MainContainer>
          <TextUI ag={Ag['400_16']} color={ColorsUI.white}>
            {'Нет изображений'}
          </TextUI>
        </CenterContainer>
      )}

      <AbsoluteContainer $widthPRC={100} $top={Math.max(insets.top, 20)}>
        <RowContainerBeetwen $ph={20}>
          <BackBtn color={ColorsUI.white} />
          <ViewPress onPress={handleAddToFavorite}>
            <HearthIcon isActive={isFavorite} />
          </ViewPress>
        </RowContainerBeetwen>
      </AbsoluteContainer>

      <ImageView
        images={
          currentOrganization?.previews.map(item => {
            return {uri: item};
          }) || []
        }
        imageIndex={carouselIndex}
        visible={visiblePreview}
        onRequestClose={() => setIsVisiblePreview(false)}
        onImageIndexChange={setPreviewIndex}
        FooterComponent={() => (
          <MainContainer $mb={Math.max(insets.bottom, 20)}>
            <Dots
              list={currentOrganization?.previews || []}
              currentIndex={previewIndex}
            />
          </MainContainer>
        )}
      />
    </ScrollViewScreen>
  );
};
