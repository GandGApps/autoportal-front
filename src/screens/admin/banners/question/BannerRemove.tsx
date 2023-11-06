import React from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import Navigation from '../../../../routes/navigation/Navigation';
import {useRoute} from '@react-navigation/native';
import {AdminBannerRemoveParams} from '../../../../routes/params/RouteParams';
import {useAppDispatch} from '../../../../settings/redux/hooks';
import {organizationService} from '../../../../modules/organizations/services/OrganizationsService';
import {adminService} from '../../../../modules/admin/service/admin.service';
import {Screens} from '../../../../routes/models/Screens';
import {getBanners} from '../../../../modules/organizations/_thunks';

export const BannerRemove = () => {
  const params = useRoute<AdminBannerRemoveParams>().params;
  const dispatch = useAppDispatch();

  return (
    <QuestionModal
      title={'Вы действительно хотите удалить баннер?'}
      btnSecondTitle={'Удалить'}
      btnMainTitle={'Назад'}
      onSecondPress={async () => {
        adminService.deleteBanner(params.bannerId).then(() => {
          dispatch(getBanners());
        });
        Navigation.navigate(Screens.ADMIN_BANNERS);
      }}
      onMainPress={() => Navigation.pop()}
    />
  );
};
