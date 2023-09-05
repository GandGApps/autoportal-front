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

interface CreateScreenProps {
  isEdit?: boolean;
  id?: string;
}

export const CreateOrganizationScreen = (props: CreateScreenProps) => {
  const {createForm, categories, organizationFilter} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const filterModalRef = useRef<Modalize>(null);
  const citiesModalRef = useRef<Modalize>(null);
  const categoriesModalRef = useRef<Modalize>(null);

  const [typeModal, setTypeModal] = useState<Nullable<FilterFormKeys>>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (props.id) {
        dispatch(getOrganizationFilter(props.id));
      }
    }, 0);
  }, []);

  const handleChangeForm = (key: CreateFormKeys, value: CreateFormValue) => {
    if (key === 'category') {
      setTimeout(() => {
        dispatch(getOrganizationFilter((value as Category)._id));
      }, 0);
    }
    setHasUnsavedChanges(true);
    dispatch(createChangeForm({key, value}));
  };

  const resetCreateForm = () => {
    dispatch(resetOrganizationFilter());
    dispatch(setDefaultCreateForm(DefaultCreateForm));
  };

  const handleChangeSchedule = (dayWork: ScheduleModel, isRemove?: boolean) => {
    const temp = createForm.schedule.filter(day => day.title !== dayWork.title);

    if (!isRemove) {
      temp.push(dayWork);
    }

    handleChangeForm('schedule', [...temp]);
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

        <CreateSave
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
