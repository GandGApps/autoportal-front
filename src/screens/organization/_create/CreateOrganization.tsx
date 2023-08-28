import React from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {BottomMenu} from '../../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../../components/GradientHeader';
import {Platform, StatusBar} from 'react-native';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {KeyboardView} from '../../../template/containers/KeyboardView';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  createChangeForm,
  selectOrganizationsValues,
} from '../../../modules/organizations/OrganizationsSlice';
import {
  CreateFormKeys,
  CreateFormValue,
} from '../../../modules/organizations/form/CreateForm';
import {CreateOrganization} from './components/_Organization';
import {CreateContactInfo} from './components/_ContactInfo';
import {CreateEmployeers} from './components/_Employeers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CreateDescription} from './components/_Description';
import {CreateSchedules} from './components/_Schedules';
import {ScheduleModel} from '../../../modules/organizations/types/OrganizationTypes';
import {CreateAddLogo} from './components/_AddLogo';

export const CreateOrganizationScreen = () => {
  const {createForm} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const handleChangeForm = (key: CreateFormKeys, value: CreateFormValue) => {
    dispatch(createChangeForm({key, value}));
  };

  const handleChangeSchedule = (dayWork: ScheduleModel) => {
    const temp = createForm.schedule.filter(day => day.title !== dayWork.title);

    handleChangeForm('schedule', [...temp, dayWork]);
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Создание организации'} isBack />
      <KeyboardView
        $isFlex
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollViewScreen
          $isFlex
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: insets.bottom + 70,
          }}>
          <CreateOrganization
            nameValue={createForm.name}
            onChangeName={value => handleChangeForm('name', value)}
            onChangeService={() => {}}
            onChangeBrandsCars={() => {}}
          />

          <CreateContactInfo
            city={createForm.city}
            onPressCity={() => {}}
            address={createForm.address}
            onChangeAddress={(value: string) =>
              handleChangeForm('address', value)
            }
            mainPhone={createForm.mainPhone}
            onChangePhone={(value: string) =>
              handleChangeForm('mainPhone', value)
            }
            whatsApp={createForm.whatsApp}
            onChangeWhatsapp={(value: string) =>
              handleChangeForm('whatsApp', value)
            }
          />

          <CreateEmployeers />

          <CreateDescription
            value={createForm.description}
            onChangeText={value => handleChangeForm('description', value)}
          />

          <CreateSchedules onChangeSchedule={handleChangeSchedule} />

          <CreateAddLogo logo={createForm.logo} />
        </ScrollViewScreen>
      </KeyboardView>

      <BottomMenu />
    </ColumnContainerFlex>
  );
};
