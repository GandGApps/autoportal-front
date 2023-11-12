import React, {useState} from 'react';
import {QuestionModal} from '../../../../components/QuestionModal';
import {useRoute} from '@react-navigation/native';
import {AdminServiceRemoveParams} from '../../../../routes/params/RouteParams';
import Navigation from '../../../../routes/navigation/Navigation';
import {organizationService} from '../../../../modules/organizations/services/OrganizationsService';
import {useAppDispatch} from '../../../../settings/redux/hooks';
import {getServices} from '../../../../modules/organizations/thunks/services.thunk';
import {CenterContainerFlex} from '../../../../template/containers/CenterContainer';
import {Loader} from '../../../../components/Loader';
import {Screens} from '../../../../routes/models/Screens';

export const RemoveService = () => {
  const {title, id, categoryId} = useRoute<AdminServiceRemoveParams>().params;
  const dispatch = useAppDispatch();

  const [isLoad, setIsLoad] = useState(false);

  if (isLoad) {
    return (
      <CenterContainerFlex>
        <Loader />
      </CenterContainerFlex>
    );
  }

  return (
    <QuestionModal
      title={'Вы хотите удалить услугу'}
      greenTitle={title}
      btnMainTitle={'Удалить'}
      btnSecondTitle={'Назад'}
      onMainPress={async () => {
        setIsLoad(true);
        await organizationService.removeService(id);

        dispatch(getServices(categoryId)).finally(() => {
          setIsLoad(false);
        });

        Navigation.navigate(Screens.ADMIN_SERVICES);
        Navigation.pop();
      }}
      onSecondPress={() => Navigation.pop()}
    />
  );
};
