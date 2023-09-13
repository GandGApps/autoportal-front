import {createAsyncThunk} from '@reduxjs/toolkit';
import {cityhService} from '../services/city.service';
import {RootState} from '../../../settings/redux/store';
import {setIsLoad} from '../CitiesSlice';

export const getCities = createAsyncThunk(
  'cities/cities',
  async (query: string, {getState, dispatch}) => {
    if (!query.length) {
      return;
    }

    const {isLoad} = (getState() as RootState).citiesSlice;

    if (isLoad) {
      return;
    }

    dispatch(setIsLoad(true));

    const cities = await cityhService.getCities(query).finally(() => {
      dispatch(setIsLoad(false));
    });

    return cities;
  },
);
