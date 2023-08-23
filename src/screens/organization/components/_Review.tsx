import React from 'react';
import {Review} from '../../../modules/organizations/models/Review';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {RatingCount} from '../../../components/RatingCount';
import {
  RowContainerBeetwen,
  RowContainerBeetwenStart,
} from '../../../template/containers/RowContainer';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColorsUI} from '../../../template/styles/ColorUI';

interface OrgReviewProps {
  review: Review;
}

export const OrgReview = ({review}: OrgReviewProps) => {
  return (
    <BorderTopUI $ph={20} $pv={20}>
      <TextUI $mb={20} ag={Ag['600_16']}>
        {'Отзывы'}
      </TextUI>

      <RowContainerBeetwenStart $mb={15}>
        <MainContainer>
          <TextUI $mb={5} ag={Ag['500_16']}>
            {review.fullName}
          </TextUI>
          <TextUI ag={Ag['400_12']}>{review.date}</TextUI>
        </MainContainer>

        <RatingCount rating={review.rating || 0} />
      </RowContainerBeetwenStart>

      <TextUI $mb={30} ag={Ag['400_16']}>
        {review.comment}
      </TextUI>

      <RowContainerBeetwen>
        <ViewPress>
          <TextUI $mb={20} ag={Ag['600_14']} color={ColorsUI.green}>
            {'Смотреть все отзывы'}
          </TextUI>
        </ViewPress>
        <ViewPress>
          <TextUI $mb={20} ag={Ag['600_14']} color={ColorsUI.brown}>
            {'Добавить отзыв+'}
          </TextUI>
        </ViewPress>
      </RowContainerBeetwen>
    </BorderTopUI>
  );
};
