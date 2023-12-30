import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Screens} from '../models/Screens';
import {ReportScreen} from '../../screens/reports/ReportScreen';
import {ReportSendModal} from '../../screens/reports/questions/ReportSendModal';
import { useAppSelector } from '../../settings/redux/hooks';

const Stack = createStackNavigator();

export const ReportStack = () => {


  return (
    <Stack.Group screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.REPORT_MODAL} component={ReportScreen} />

      <Stack.Screen
        name={Screens.REPORT_CONFIRMED_MODAL}
        component={ReportSendModal}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
    </Stack.Group>
  );
};
