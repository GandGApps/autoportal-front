import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../settings/redux/store';
import {CitiesStateModel} from './types/types';
import {getCities} from './thunks/cities.thunk';

const initialState: CitiesStateModel = {
  cities: [],

  isLoad: false,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setIsLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },

    resetCities: (state, _) => {
      state.cities = [];
    },
  },

  extraReducers(builder) {
    // Get App
    builder.addCase(getCities.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }

      state.cities = action.payload;
    });
  },
});

export const {setIsLoad, resetCities} = citiesSlice.actions;

export const selectCitiesValues = (state: RootState) => state.citiesSlice;

export default citiesSlice.reducer;
