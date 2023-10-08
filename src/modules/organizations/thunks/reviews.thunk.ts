import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../settings/redux/store';
import {setIsReviewsLoad} from '../OrganizationsSlice';
import {organizationService} from '../services/OrganizationsService';
import {DateHelper} from '../../../helper/DateHelper';

interface CreateThunkProps {
  id: string;
  rating: number;
  comment: string;
}

export const createReview = createAsyncThunk(
  'organization/reviews/create',
  async ({id, rating, comment}: CreateThunkProps) => {
    const date = DateHelper.getToday();

    return organizationService.createReview(id, {rating, comment, date});
  },
);

export const getReviews = createAsyncThunk(
  'organization/reviews',
  async (_, {getState, dispatch}) => {
    const {isReviewsLoad, currentOrganization} = (getState() as RootState)
      .organizationsSlice;

    if (isReviewsLoad) {
      return;
    }

    dispatch(setIsReviewsLoad(true));

    return await organizationService
      .getReviews(currentOrganization?._id!)
      .finally(() => {
        dispatch(setIsReviewsLoad(false));
      });
  },
);
