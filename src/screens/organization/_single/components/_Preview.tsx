import React, {useState} from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {AbsoluteContainer} from '../../../../template/containers/AbsoluteContainer';
import {RowContainerBeetwen} from '../../../../template/containers/RowContainer';
import {BackBtn} from '../../../../template/ui/BackBtn';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {HearthIcon} from '../../../../template/icons/HearthIcon';
import {CarouselUI} from '../../../../components/carousel/CarouselUI';
import {CenterContainer} from '../../../../template/containers/CenterContainer';
import {NoImage} from '../../../../template/icons/NoImage';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {LogoUI} from '../../../../components/LogoUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {useAppDispatch} from '../../../../settings/redux/hooks';
import {changeOrganizationFavorite} from '../../../../modules/organizations/thunks/favoriteChange.thunk';
import {Notifications} from '../../../../template/notifications/Notifications';

interface OrganizationPreviewProps {
  id: string;
  isFavorite?: boolean;
  previews?: string[];
  carouselIndex: number;
  logo?: string;
  onCarouselChange: (value: number) => void;
  onPressImage: () => void;
}

export const OrganizationPreview = (props: OrganizationPreviewProps) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const carouselWidth = Dimensions.get('window').width;
  const carouselHeight = carouselWidth;

  const [isFavorite, setIsFavorite] = useState(props.isFavorite || false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToFavorite = async () => {
    setIsFavorite(!isFavorite);
    setIsLoading(true);

    await dispatch(
      changeOrganizationFavorite({
        id: props.id,
        type: isFavorite ? 'delete' : 'add',
      }),
    )
      .then(() => {
        if (isFavorite) {
          Notifications.danger('Удалено из избранного');
        } else {
          Notifications.succes('Добавлено в избранное');
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <MainContainer>
        <AbsoluteContainer
          $zIndex={100}
          $widthPRC={100}
          $top={Math.max(insets.top, 20)}>
          <RowContainerBeetwen $ph={20}>
            <BackBtn color={ColorsUI.white} />
            <ViewPress disabled={isLoading} onPress={handleAddToFavorite}>
              <HearthIcon isActive={isFavorite} />
            </ViewPress>
          </RowContainerBeetwen>
        </AbsoluteContainer>

        {props.previews?.length ? (
          <CarouselUI
            list={props.previews}
            width={carouselWidth}
            height={carouselHeight}
            currentIndex={props.carouselIndex}
            onChangeItem={props.onCarouselChange}
            onPressImage={props.onPressImage}
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
              {'Без фото'}
            </TextUI>
          </CenterContainer>
        )}
      </MainContainer>

      <MainContainer>
        <AbsoluteContainer $top={-35} $left={20}>
          <LogoUI url={props.logo} />
        </AbsoluteContainer>
      </MainContainer>
    </>
  );
};
