import React, {useCallback, useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {OrganizationEditParams} from '../../../routes/params/RouteParams';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {
  resetOrganizationFilter,
  selectOrganizationsValues,
  setDefaultCreateForm,
} from '../../../modules/organizations/OrganizationsSlice';
import {
  getCurrentOrganization,
  getOrganizationFilter,
} from '../../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {CreateOrganizationScreen} from '../_create/CreateOrganization';
import {DefaultCreateForm} from '../../../modules/organizations/form/CreateForm';
import {CurrentOrganization} from '../../../modules/organizations/models/CurrentOrganization';
import employeersSlice from '../../../modules/employeers/EmployeersSlice';

export const EditOrganizationScreen = () => {
  const {_id} = useRoute<OrganizationEditParams>().params;

  const {isCurrentOrganizationLoad, currentOrganization} = useAppSelector(
    selectOrganizationsValues,
  );
  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsLoad(true);
        resetCreateForm();

        dispatch(getCurrentOrganization(_id))
          .then(res => {


            const organization = res.payload as CurrentOrganization;
            if (!res.payload) return;
            dispatch(
              setDefaultCreateForm(
                OrganizationHelper.getDefaultCreateForm(organization),
              ),
            );

            dispatch(
              getOrganizationFilter(organization.categoryId!._id),
            ).finally(() => {
              setIsReady(true);
            });
          })
          .finally(() => {
            setIsLoad(false);
          });
      }, 0);
    }, []),
  );

  const resetCreateForm = () => {
    dispatch(resetOrganizationFilter());
    dispatch(setDefaultCreateForm(DefaultCreateForm));
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader title={'Редактирование'} isBack />

      {isLoad || !isReady || isCurrentOrganizationLoad ? (
        <CenterContainerFlex>
          <Loader size={20} />
        </CenterContainerFlex>
      ) : (
        <CreateOrganizationScreen isEdit />
      )}
    </ColumnContainerFlex>
  );
};