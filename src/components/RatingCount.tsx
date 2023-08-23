import React from 'react';
import {StarIcon} from '../template/icons/StarIcon';
import {RowContainer} from '../template/containers/RowContainer';

interface RatingCountProps {
  rating: number;
}

export const RatingCount = ({rating}: RatingCountProps) => {
  return (
    <RowContainer>
      {Array.from({length: 5}, (_, index) => (
        <StarIcon key={`star-${index}`} isActive={rating >= index + 1} />
      ))}
    </RowContainer>
  );
};
