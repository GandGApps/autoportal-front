import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../settings/redux/store';
import {EmployeersStateModel} from './types/EmployeersTypes';

const initialState: EmployeersStateModel = {
  firstName: '',
  secondName: '',
  thirdName: '',

  firstPostion: '',
  secondPostion: '',
  thirdPosition: '',

  firstPhone: '',
  secondPhone: '',
  thirdPhone: '',
};

const employeersSlice = createSlice({
  name: 'employeers',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setFirstPostion: (state, action) => {
      state.firstPostion = action.payload;
    },
    setFirstPhone: (state, action) => {
      state.firstPhone = action.payload;
    },

    setSecondName: (state, action) => {
      state.secondName = action.payload;
    },
    setSecondPostion: (state, action) => {
      state.secondPostion = action.payload;
    },
    setSecondPhone: (state, action) => {
      state.secondPhone = action.payload;
    },

    setThirdName: (state, action) => {
      state.thirdName = action.payload;
    },
    setThirdPosition: (state, action) => {
      state.thirdPosition = action.payload;
    },
    setThirdPhone: (state, action) => {
      state.thirdPhone = action.payload;
    },
    resetFirstName: state => {
      state.firstName = '';
    },
    resetFirstPosition: state => {
      state.firstPostion = '';
    },
    resetFirstPhone: state => {
      state.firstPhone = '';
    },
    resetSecondName: state => {
      state.secondName = '';
    },
    resetSecondPosition: state => {
      state.secondPostion = '';
    },
    resetSecondPhone: state => {
      state.secondPhone = '';
    },
    resetThirdName: state => {
      state.thirdName = '';
    },
    resetThirdPosition: state => {
      state.thirdPosition = '';
    },
    resetThirdPhone: state => {
      state.thirdPhone = '';
    },
  },
});

export const {
  setFirstName,
  setFirstPostion,
  setFirstPhone,
  setSecondName,
  setSecondPostion,
  setSecondPhone,
  setThirdName,
  setThirdPosition,
  setThirdPhone,
  resetFirstName,
  resetFirstPosition,
  resetFirstPhone,
  resetSecondName,
  resetSecondPosition,
  resetSecondPhone,
  resetThirdName,
  resetThirdPosition,
  resetThirdPhone,
} = employeersSlice.actions;

export const selectEmployeersValues = (state: RootState) =>
  state.employeersSlice;

export default employeersSlice.reducer;
