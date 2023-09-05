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
import {getCurrentOrganization} from '../../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {CreateOrganizationScreen} from '../_create/CreateOrganization';
import {DefaultCreateForm} from '../../../modules/organizations/form/CreateForm';

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
      return () => {
        setTimeout(() => {
          resetCreateForm();
        }, 0);
      };
    }, []),
  );

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

  const resetCreateForm = () => {
    dispatch(resetOrganizationFilter());
    dispatch(setDefaultCreateForm(DefaultCreateForm));
  };

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
