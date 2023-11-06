import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputUI} from '../../../template/ui/InputUI';
import {MainContainer} from '../../../template/containers/MainContainer';
import {ButtonUI} from '../../../template/ui/ButtonUI';
import {StyleSheet} from 'react-native';
import {Insets} from '../../../template/styles/Insets';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {RowContainerBeetwenEnd} from '../../../template/containers/RowContainer';
import {UnderLineText} from '../../../components/UnderLineText';
import {ViewPress} from '../../../template/containers/ViewPress';
import {AdminEditServiceParams} from '../../../routes/params/RouteParams';
import {useRoute} from '@react-navigation/native';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {organizationService} from '../../../modules/organizations/services/OrganizationsService';
import {Notifications} from '../../../template/notifications/Notifications';
import {ServiceExt} from '../../../modules/organizations/models/ServiceExt';
import {ServiceExtList} from './components/ServiceExtList';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {getServices} from '../../../modules/organizations/thunks/services.thunk';
import Navigation from '../../../routes/navigation/Navigation';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';

export const AdminEditService = () => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);
  const dispatch = useAppDispatch();

  const params = useRoute<AdminEditServiceParams>().params;

  const [titleService, setTitleService] = useState(params?.service.title || '');
  const [titleExtService, setTitleExtService] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [extServices, setExtServices] = useState<ServiceExt[]>([]);

  useEffect(() => {
    organizationService.getExtServices(params.service._id).then(res => {
      setExtServices(res);
    });
  }, []);

  const handleCreateExtService = async () => {
    if (!titleExtService.length) {
      Notifications.error('Заполните поле');
      return;
    }

    setIsLoading(true);

    await organizationService
      .createExtService({
        service_id: params.service._id,
        title: titleExtService,
      })
      .then(() => {
        organizationService.getExtServices(params.service._id).then(res => {
          setExtServices(res);
        });
        Notifications.succes('Доп.услуга добавлена');
      })
      .catch(() => {
        Notifications.error('Ошибка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateService = () => {
    if (!titleService.length) {
      Notifications.error('Заполните поле');
      return;
    }

    setIsLoading(true);

    organizationService
      .updateService({
        serviceId: params.service._id,
        title: titleService,
      })
      .then(() => {
        Notifications.succes('Данные успешно обновлены');
        dispatch(getServices(filterForm.category?._id!));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Редактирование услуги'} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          compStyles.container,
          {paddingBottom: Insets.bottom},
        ]}>
        <MainContainer $mt={20} $ph={20}>
          <TextUI $mb={8} ag={Ag['500_14']}>
            {'Название услуги'}
          </TextUI>
          <InputUI
            placeholder={'Введите название услуги'}
            value={titleService}
            onChangeText={setTitleService}
          />
          <ButtonUI
            $btnDisabled={isLoading}
            $mt={10}
            title={'Сохранить'}
            onPress={handleUpdateService}
          />
        </MainContainer>

        <MainContainer
          $mt={20}
          $ph={20}
          $pv={20}
          style={compStyles.border}
          $bg={ColorsUI.gray.bg}>
          <TextUI $mb={8} ag={Ag['500_14']}>
            {'Добавить доп.услугу'}
          </TextUI>
          <InputUI
            containerStyles={{
              $bg: ColorsUI.white,
            }}
            placeholder={'Введите название доп.услуги'}
            value={titleExtService}
            onChangeText={setTitleExtService}
          />
          <RowContainerBeetwenEnd $mt={20}>
            <ViewPress disabled={isLoading}>
              <UnderLineText
                text={'Добавить'}
                color={ColorsUI.green}
                onPress={handleCreateExtService}
              />
            </ViewPress>
          </RowContainerBeetwenEnd>
        </MainContainer>

        <MainContainer $pv={10}>
          <ServiceExtList extList={extServices} />
        </MainContainer>

        <ColumnContainerFlex />
        <MainContainer $ph={20} $pt={20} style={compStyles.border}>
          <ButtonUI
            $btnDisabled={isLoading}
            $type={'border'}
            title={'Удалить услугу'}
          />
          <ButtonUI
            onPress={() => Navigation.pop()}
            $mt={10}
            $type={'border-white'}
            title={'Назад'}
            color={ColorsUI.black}
          />
        </MainContainer>
      </KeyboardAwareScrollView>
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: ColorsUI.gray.disabled,
  },
});
