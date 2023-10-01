import React from 'react';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {RowContainerJustEnd} from '../../../../template/containers/RowContainer';
import {RatingCount} from '../../../../components/RatingCount';
import {Nullable} from '../../../../settings/types/BaseTypes';

interface OrganizationTitleRatingProps {
  categoryName: string;
  name: string;
  rating: Nullable<number>;
  countReviews: Nullable<number>;
}

export const OrganizationTitleRating = (
  props: OrganizationTitleRatingProps,
) => {
  return (
    <MainContainer $mt={43} $ph={20} $mb={10}>
      <TextUI ag={Ag['400_16']} $mb={5}>
        {props.categoryName}
      </TextUI>
      <TextUI ag={Ag['700_16']}>{props.name}</TextUI>

      <RowContainerJustEnd>
        <MainContainer $mr={5} $mb={4}>
          <RatingCount rating={props.rating || 0} />
        </MainContainer>
        <MainContainer>
          <TextUI ag={Ag['400_14']} $mb={5}>
            {`${props.rating || 0} (${props.countReviews || 0})`}
          </TextUI>
        </MainContainer>
      </RowContainerJustEnd>
    </MainContainer>
  );
};
