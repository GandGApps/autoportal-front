import React from 'react';
import {Review} from '../modules/organizations/models/Review';
import {RowContainerBeetwenStart} from '../template/containers/RowContainer';
import {MainContainer} from '../template/containers/MainContainer';
import {Ag, TextUI} from '../template/ui/TextUI';
import {RatingCount} from './RatingCount';

interface ReviewUIProps {
  review: Review;
}

export const ReviewUI = ({review}: ReviewUIProps) => {
  return (
    <>
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
    </>
  );
};
