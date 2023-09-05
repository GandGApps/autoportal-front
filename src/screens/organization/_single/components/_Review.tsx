import React from 'react';
import {Review} from '../../../../modules/organizations/models/Review';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {RatingCount} from '../../../../components/RatingCount';
import {
  RowContainerBeetwen,
  RowContainerBeetwenStart,
} from '../../../../template/containers/RowContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {Nullable} from '../../../../settings/types/BaseTypes';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import {ReviewUI} from '../../../../components/ReviewUI';

interface OrgReviewProps {
  review: Nullable<Review>;
}

export const OrgReview = ({review}: OrgReviewProps) => {
  const handleGoToScreen = (screen: string) => {
    Navigation.navigate(screen);
  };

  return (
    <BorderTopUI $ph={20} $pv={20}>
      <TextUI $mb={20} ag={Ag['600_16']}>
        {'Отзывы'}
      </TextUI>

      {review ? <ReviewUI review={review} /> : null}

      <RowContainerBeetwen>
        <ViewPress onPress={() => handleGoToScreen(Screens.REVIEWS)}>
          <TextUI $mb={20} ag={Ag['600_14']} color={ColorsUI.green}>
            {'Смотреть все отзывы'}
          </TextUI>
        </ViewPress>
        <ViewPress onPress={() => handleGoToScreen(Screens.REVIEWS_CREATE)}>
          <TextUI $mb={20} ag={Ag['600_14']} color={ColorsUI.brown}>
            {'Добавить отзыв+'}
          </TextUI>
        </ViewPress>
      </RowContainerBeetwen>
    </BorderTopUI>
  );
};
