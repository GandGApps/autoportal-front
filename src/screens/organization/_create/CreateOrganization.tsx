import React, {useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {BottomMenu} from '../../../components/bottomMenu/BottomMenu';
import {GradientHeader} from '../../../components/GradientHeader';
import {Platform, StatusBar} from 'react-native';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  createChangeForm,
  resetOrganizationFilter,
  selectOrganizationsValues,
  setDefaultCreateForm,
} from '../../../modules/organizations/OrganizationsSlice';
import {
  CreateFormKeys,
  CreateFormValue,
  DefaultCreateForm,
  isFormValidation,
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
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {CitiesModal} from '../../../components/CitiesModal';
import {CategoriesModal} from '../../../components/CategoriesModal';
import {Modalize} from 'react-native-modalize';
import {FilterModal} from '../../../components/filterModal/FilterModal';
import {Nullable} from '../../../settings/types/BaseTypes';
import {FilterFormKeys} from '../../../modules/organizations/form/FilterForm';
import {getOrganizationFilter} from '../../../modules/organizations/_thunks';
import {Category} from '../../../modules/organizations/models/Category';
import {ViewPress} from '../../../template/containers/ViewPress';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {selectEmployeersValues} from '../../../modules/employeers/EmployeersSlice';
import {createOrganization} from '../../../modules/organizations/thunks/create.thunk';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {FileHelper} from '../../../modules/files/FilesHelper';

interface CreateScreenProps {
  isEdit?: boolean;
  id?: string;
}

export const CreateOrganizationScreen = (props: CreateScreenProps) => {
  const {createForm, organizationFilter} = useAppSelector(
    selectOrganizationsValues,
  );

  const employeersState = useAppSelector(selectEmployeersValues);

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const filterModalRef = useRef<Modalize>(null);
  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const [typeModal, setTypeModal] = useState<Nullable<FilterFormKeys>>(null);
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (props.id) {
        dispatch(getOrganizationFilter(props.id));
      }
    }, 0);
  }, []);

  const handleChangeForm = (key: CreateFormKeys, value: CreateFormValue) => {
    setIsError(false);
    if (key === 'category') {
      setTimeout(() => {
        dispatch(getOrganizationFilter((value as Category)._id));
      }, 0);
    }
    dispatch(createChangeForm({key, value}));
  };

  const resetCreateForm = () => {
    dispatch(resetOrganizationFilter());
    dispatch(setDefaultCreateForm(DefaultCreateForm));
    setIsError(false);
  };

  const handleChangeSchedule = (dayWork: ScheduleModel, isRemove?: boolean) => {
    const temp = createForm.schedule.filter(day => day.title !== dayWork.title);

    if (!isRemove) {
      temp.push(dayWork);
    }

    handleChangeForm('schedule', [...temp]);
  };

  const handlePickImage = async () => {
    const res = await FileHelper.pickFile({limit: 1, isLogo: true});

    if (res && res.length) {
      handleChangeForm('logo', {
        uri: res[0].uri!,
        name: res[0].fileName || 'logouser',
        type: res[0].type! || 'image/jpg',
      });
    }
  };

  const handlePickImages = async () => {
    if (createForm.photos.length === 5) {
      Notifications.danger('Максимум 5 фотографий');
      return;
    }

    const res = await FileHelper.pickFile({
      limit: 5 - createForm.photos.length,
    });

    if (res && res.length) {
      const images = res.map(image => {
        return {
          uri: image.uri!,
          name: image.fileName || 'photouser',
          type: image.type! || 'image/jpg',
        };
      });

      handleChangeForm('photos', [...createForm.photos, ...images]);
    }
  };

  const removePickPhoto = (url: string) => {
    handleChangeForm(
      'photos',
      createForm.photos.filter(image => image.uri !== url),
    );
  };

  const handleSaveOrganization = () => {
    if (!isFormValidation(createForm)) {
      setIsError(true);
      return;
    }

    const employeers = OrganizationHelper.getEmployeers(employeersState);

    if (employeers.length) {
      handleChangeForm('employeers', employeers);
    }

    setIsLoading(true);

    dispatch(createOrganization())
      .then(() => {
        if (props.isEdit) {
          Navigation.pop();
        } else {
          Navigation.navigate(Screens.ORGANIZATION_MY);
          resetCreateForm();
        }
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveOrganization = () => {
    Navigation.navigate(Screens.ORGANIZATION_REMOVE);
  };

  const handleOpenFilterModal = (type: FilterFormKeys) => {
    setTypeModal(type);

    filterModalRef.current?.open();
  };

  const handleOpenModalCity = () => {
    citiesModalRef.current?.open();
  };

  const handleOpenModalCategory = () => {
    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <StatusBar barStyle={'light-content'} backgroundColor={ColorsUI.black} />
      {!props.isEdit ? (
        <GradientHeader
          title={'Создание организации'}
          rightComonent={
            <ViewPress
              $bg={ColorsUI.firm}
              $br={50}
              $pv={5}
              $ph={10}
              $mr={10}
              onPress={resetCreateForm}>
              <TextUI ag={Ag['500_14']}>{'Очистить'}</TextUI>
            </ViewPress>
          }
          isBack
        />
      ) : null}

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
          categoryValue={createForm.category?.title}
          typeServices={organizationFilter?.typeService}
          brandsCars={organizationFilter?.brandCar}
          onChangeName={value => handleChangeForm('name', value)}
          onChangeCategories={handleOpenModalCategory}
          onChangeService={() => handleOpenFilterModal('typeService')}
          onChangeBrandsCars={() => handleOpenFilterModal('brandCar')}
        />

        <CreateContactInfo
          city={createForm.city}
          onPressCity={handleOpenModalCity}
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

        {isError ? (
          <MainContainer $ph={20}>
            <TextUI $mb={10} color={ColorsUI.red} ag={Ag['700_16']}>
              {'Заполните:'}
            </TextUI>
            {!createForm.name.length ? (
              <TextUI $mb={10} ag={Ag['500_14']} color={ColorsUI.red}>
                {'- Название организации'}
              </TextUI>
            ) : null}
            {!createForm.category?.title ? (
              <TextUI $mb={10} ag={Ag['500_14']} color={ColorsUI.red}>
                {'- Категорию'}
              </TextUI>
            ) : null}
            {!createForm.city ? (
              <TextUI $mb={10} ag={Ag['500_14']} color={ColorsUI.red}>
                {'- Местоположение'}
              </TextUI>
            ) : null}
            {!createForm.address.length ? (
              <TextUI $mb={10} ag={Ag['500_14']} color={ColorsUI.red}>
                {'- Адрес'}
              </TextUI>
            ) : null}
            {!createForm.description.length ? (
              <TextUI $mb={10} ag={Ag['500_14']} color={ColorsUI.red}>
                {'- Описание'}
              </TextUI>
            ) : null}
          </MainContainer>
        ) : null}

        <CreateSave
          isDisabled={isLoading}
          isEdit={props.isEdit}
          onRemovePress={handleRemoveOrganization}
          onSavePress={handleSaveOrganization}
        />
      </KeyboardAwareScrollView>

      <FilterModal
        isCreate
        createForm={createForm}
        typeModal={typeModal}
        modalizeRef={filterModalRef}
      />
      <CitiesModal
        modalizeRef={citiesModalRef}
        onPickCity={value => handleChangeForm('city', value)}
      />
      <CategoriesModal
        modalizeRef={categoriesModalRef}
        onPickCategories={cat => handleChangeForm('category', cat)}
      />

      {!props.isEdit ? <BottomMenu /> : null}
    </ColumnContainerFlex>
  );
};
