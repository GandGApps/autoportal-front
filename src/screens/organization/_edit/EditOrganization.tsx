import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {useRoute} from '@react-navigation/native';
import {OrganizationEditParams} from '../../../routes/params/RouteParams';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  selectOrganizationsValues,
  setDefaultCreateForm,
} from '../../../modules/organizations/OrganizationsSlice';
import {getCurrentOrganization} from '../../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {OrganizationScreen} from '../_single/OrganizationScreen';
import {CreateOrganizationScreen} from '../_create/CreateOrganization';

export const EditOrganizationScreen = () => {
  const {_id} = useRoute<OrganizationEditParams>().params;

  const {isCurrentOrganizationLoad, currentOrganization} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCurrentOrganization(_id)).finally(() => {
        setIsLoad(false);
      });
    }, 0);
  }, []);

  useEffect(() => {
    if (currentOrganization && !isLoad) {
      dispatch(
        setDefaultCreateForm(
          OrganizationHelper.getDefaultCreateForm(currentOrganization),
        ),
      );

      setTimeout(() => {
        setIsReady(true);
      }, 250);
    }
  }, [isLoad]);

  return (
    <ColumnContainerFlex>
      <GradientHeader title={'Редактирование'} isBack />

      {!isReady || isCurrentOrganizationLoad ? (
        <CenterContainerFlex>
          <Loader size={20} />
        </CenterContainerFlex>
      ) : (
        <CreateOrganizationScreen isEdit />
      )}
    </ColumnContainerFlex>
  );
};
