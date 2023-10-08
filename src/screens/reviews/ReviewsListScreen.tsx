import React, {useEffect, useState} from 'react';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../../template/containers/RowContainer';
import {BackBtn} from '../../template/ui/BackBtn';
import {MainContainer} from '../../template/containers/MainContainer';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {UnderLineText} from '../../components/UnderLineText';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {ColorsUI} from '../../template/styles/ColorUI';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {Loader} from '../../components/Loader';
import {ReviewUI} from '../../components/ReviewUI';
import {BorderTopUI} from '../../template/ui/BorderTopUI';
import {getReviews} from '../../modules/organizations/thunks/reviews.thunk';

export const ReviewsListScreen = () => {
  const insets = useSafeAreaInsets();

  const {reviews} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getReviews()).finally(() => {
        setIsLoad(false);
      });
    }, 0);
  }, []);

  return (
    <ScrollViewScreen
      $isFlex
      $ph={20}
      contentContainerStyle={{
        paddingTop: Math.max(insets.top, 20),
        paddingBottom: Math.max(insets.bottom, 20),
      }}
      showsVerticalScrollIndicator={false}>
      <RowContainerBeetwen $mb={20}>
        <RowContainer>
          <MainContainer $mr={10}>
            <BackBtn />
          </MainContainer>

          <TextUI ag={Ag['500_18']}>{'Отзывы'}</TextUI>
        </RowContainer>

        <UnderLineText
          ag={Ag['400_16']}
          color={ColorsUI.green}
          text={'Добавить отзыв+'}
          onPress={() => Navigation.navigate(Screens.REVIEWS_CREATE)}
        />
      </RowContainerBeetwen>

      {isLoad ? (
        <CenterContainerFlex>
          <Loader />
        </CenterContainerFlex>
      ) : (
        <>
          {reviews.map(review => (
            <BorderTopUI $pt={20} key={`review-${review._id}`}>
              <ReviewUI review={review} />
            </BorderTopUI>
          ))}

          {!reviews.length ? (
            <TextUI $align={'center'} ag={Ag['600_16']}>
              {'Нет отзывов'}
            </TextUI>
          ) : null}
        </>
      )}
    </ScrollViewScreen>
  );
};
