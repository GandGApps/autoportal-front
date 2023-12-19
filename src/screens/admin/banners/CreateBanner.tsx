import React, {Fragment, useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Insets} from '../../../template/styles/Insets';
import {Platform, StyleSheet, Text} from 'react-native';
import {MainContainer} from '../../../template/containers/MainContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {PhotoIcon} from '../../../template/icons/PhotoIcon';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {InputUI} from '../../../template/ui/InputUI';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {FileHelper} from '../../../modules/files/FilesHelper';
import {ImageUI} from '../../../template/ui/ImageUI';
import DatePicker from 'react-native-date-picker';
import {DateHelper} from '../../../helper/DateHelper';
import {RowContainer} from '../../../template/containers/RowContainer';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {AdminHelper} from '../../../modules/admin/helpers/AdminHelper';
import {CreateBannerDTO} from '../../../modules/admin/types/AdminTypes';
import {Notifications} from '../../../template/notifications/Notifications';
import {fileSevice} from '../../../modules/files/api/file-service';
import {useRoute} from '@react-navigation/native';
import {AdminCreateBannerParams} from '../../../routes/params/RouteParams';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {adminService} from '../../../modules/admin/service/admin.service';
import {getBanners} from '../../../modules/organizations/_thunks';
import {AbsoluteContainer} from '../../../template/containers/AbsoluteContainer';
import {Loader} from '../../../components/Loader';
import Navigation from '../../../routes/navigation/Navigation';

export const CreateBanner = () => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const params = useRoute<AdminCreateBannerParams>().params;
  console.log('params promo is', params?.banner);

  useEffect(() => {
    if (params?.banner) {
      setIsEdit(true);

      setFrom(params?.banner.from.replaceAll('-', '.'));
      setTo(params?.banner.to.replaceAll('-', '.'));
    }
  }, [params?.banner]);

  const [isEdit, setIsEdit] = useState(false);

  const [city, setCity] = useState(filterForm.city);
  const [image, setImage] = useState<string>(params?.banner.image || '');

  const [from, setFrom] = useState(DateHelper.getToday());
  const [to, setTo] = useState(DateHelper.getToday());

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [title, setTitle] = useState(params?.banner.title || '');
  const [organizationId, setOrganizationId] = useState(
    params?.banner.organizationId || '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadImage, setIsLoadImage] = useState(false);

  const cityModal = useRef<Modalize>(null);

  const handleOpenModal = () => {
    cityModal.current?.open();
  };

  const handlePickImages = async () => {
    const res = await FileHelper.pickFile({
      limit: 1,
    });

    if (res && res.length) {
      const imageUrl: string = await fileSevice.uploadFile({
        uri: res[0].uri!,
        name: res[0].fileName || 'banner',
        type: res[0].type! || 'image/jpg',
      });

      setImage(imageUrl);
    }
  };

  const handleCreateBanner = async () => {
    const validDto: Omit<CreateBannerDTO, 'image'> = {
      title,
      city,
      from: DateHelper.getFormatDtoDate(DateHelper.getParseDate(from)),
      to: DateHelper.getFormatDtoDate(DateHelper.getParseDate(to)),
      organisation_id: organizationId,
    };

    if (!AdminHelper.isBannerValid(validDto)) {
      Notifications.error('Заполните все данные');
      return;
    }

    if (!image.length) {
      Notifications.error('Загрузите баннер');
      return;
    }

    setIsLoading(true);

    const dto: CreateBannerDTO = {
      ...validDto,
      image: image,
    };

    await adminService
      .createUpdateBanner(dto, params?.banner._id)
      .then(async () => {
        Notifications.succes(isEdit ? 'Данные обновлены' : 'Баннер создан');
        dispatch(getBanners());

        if (!isEdit) {
          Navigation.pop();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Добавление баннера'} />
      <KeyboardAwareScrollView
        enableOnAndroid={Platform.OS === 'android'}
        extraHeight={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 20,
          paddingBottom: Math.max(Insets.bottom, 20),
          paddingHorizontal: 20,
          gap: 20,
        }}
        enableResetScrollToCoords={false}
        stickyHeaderHiddenOnScroll={false}>
        <MainContainer
          $br={10}
          $borderColor={ColorsUI.gray.light}
          $widthPRC={100}
          $heightPX={135}>
          <ViewPress $isFlex onPress={handlePickImages}>
            {isLoadImage && (
              <AbsoluteContainer $widthPRC={100} $heightPX={135}>
                <CenterContainerFlex>
                  <Loader size={20} />
                </CenterContainerFlex>
              </AbsoluteContainer>
            )}
            <CenterContainerFlex style={compStyles.gap10}>
              {image.length ? (
                <Fragment>
                  <ImageUI
                    $br={10}
                    $widthPRC={100}
                    $heightPX={135}
                    onLoadStart={() => setIsLoadImage(true)}
                    onLoadEnd={() => setIsLoadImage(true)}
                    source={{uri: image}}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <PhotoIcon />
                  <TextUI color={ColorsUI.gray.main} ag={Ag['400_16']}>
                    {'Нажмите, чтобы загрузить баннер'}
                  </TextUI>
                </Fragment>
              )}
            </CenterContainerFlex>
          </ViewPress>
        </MainContainer>

        <TextUI ag={Ag['500_14']}>
          {'*Размер изображения должен быть '}
          <Text style={{color: ColorsUI.red}}>{'500x250'}</Text>
        </TextUI>

        <InputSelectUI
          placeholder={'Выберите город'}
          value={city}
          onPress={handleOpenModal}
        />

        <InputUI
          placeholder={'Название баннера'}
          value={title}
          onChangeText={setTitle}
        />

        <InputUI
          placeholder={'ID организации'}
          value={organizationId}
          onChangeText={setOrganizationId}
        />

        <MainContainer>
          <TextUI $mb={10} ag={Ag['500_14']}>
            {'Укажите период'}
          </TextUI>
          <RowContainer style={compStyles.gap10}>
            <TextUI ag={Ag['500_14']}>{'C'}</TextUI>
            <MainContainer style={compStyles.gap10}>
              <InputSelectUI value={from} onPress={() => setOpenFrom(true)} />
            </MainContainer>
            <TextUI ag={Ag['500_14']}>{'по'}</TextUI>
            <MainContainer style={compStyles.gap10}>
              <InputSelectUI value={to} onPress={() => setOpenTo(true)} />
            </MainContainer>
          </RowContainer>
        </MainContainer>

        <DatePicker
          locale={'ru'}
          is24hourSource={'locale'}
          modal
          mode={'date'}
          open={openFrom}
          date={DateHelper.getParseDate(from)}
          onConfirm={date => {
            setFrom(DateHelper.getFormatDate(date));

            if (DateHelper.isStartMoreEnd(date, to)) {
              setTo(DateHelper.getFormatDate(date));
            }
            setOpenFrom(false);
          }}
          onCancel={() => setOpenFrom(false)}
          androidVariant={'iosClone'}
          cancelText={'Отменить'}
          confirmText={'Подтвердить'}
          title={'Начало'}
        />

        <DatePicker
          locale={'ru'}
          is24hourSource={'locale'}
          modal
          minimumDate={DateHelper.getParseDate(from)}
          mode={'date'}
          open={openTo}
          date={DateHelper.getParseDate(to)}
          onConfirm={date => {
            setTo(DateHelper.getFormatDate(date));
            setOpenTo(false);
          }}
          onCancel={() => setOpenTo(false)}
          androidVariant={'iosClone'}
          cancelText={'Отменить'}
          confirmText={'Подтвердить'}
          title={'Конец'}
        />
        <ColumnContainerFlex />

        <ButtonUI
          $btnDisabled={isLoading}
          title={'Сохранить'}
          onPress={handleCreateBanner}
        />
      </KeyboardAwareScrollView>

      <CitiesModal modalizeRef={cityModal} onPickCity={setCity} />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  gap10: {
    gap: 10,
  },
});
