import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {BottomMenu} from '../../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../../components/GradientHeader';
import {Keyboard, Platform, StatusBar} from 'react-native';
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
import {launchImageLibrary} from 'react-native-image-picker';
import {CreateAddPhotos} from './components/_AddPhotos';
import {Notifications} from '../../../template/notifications/Notifications';
import {CreateSave} from './components/_Save';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MainContainer} from '../../../template/containers/MainContainer';

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

  const handlePickImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
    })
      .then(res => {
        if (res.assets) {
          handleChangeForm('logo', {
            uri: res.assets[0].uri!,
            name: res.assets[0].fileName || 'logouser',
            type: res.assets[0].type! || 'image/jpg',
          });
        }
      })
      .catch(() => {});
  };

  const handlePickImages = () => {
    if (createForm.photos.length === 5) {
      Notifications.danger('Максимум 5 фотографий');
      return;
    }

    launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5 - createForm.photos.length,
    })
      .then(res => {
        if (res.assets?.length) {
          const images = res.assets.map(image => {
            return {
              uri: image.uri!,
              name: image.fileName || 'logouser',
              type: image.type! || 'image/jpg',
            };
          });

          handleChangeForm('photos', [...createForm.photos, ...images]);
        }
      })
      .catch(() => {});
  };

  const removePickPhoto = (url: string) => {
    handleChangeForm(
      'photos',
      createForm.photos.filter(image => image.uri !== url),
    );
  };

  const handleSaveOrganization = () => {};

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      <GradientHeader title={'Создание организации'} isBack />
      <KeyboardAwareScrollView
        enableOnAndroid={Platform.OS === 'android'}
        extraHeight={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: insets.bottom + 70,
        }}
        enableResetScrollToCoords={false}
        stickyHeaderHiddenOnScroll={false}>
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

        <CreateAddLogo logo={createForm.logo} onPickImage={handlePickImage} />

        <CreateAddPhotos
          photos={createForm.photos}
          onPickImages={handlePickImages}
          onRemovePickPhoto={removePickPhoto}
        />

        <CreateSave onSavePress={handleSaveOrganization} />
      </KeyboardAwareScrollView>

      <MainContainer>
        <BottomMenu />
      </MainContainer>
    </ColumnContainerFlex>
  );
};
