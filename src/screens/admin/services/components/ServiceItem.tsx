import React, {useCallback, useEffect, useState} from 'react';
import {Service} from '../../../../modules/organizations/models/Service';
import {MainContainer} from '../../../../template/containers/MainContainer';
import {StyleSheet} from 'react-native';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {EditIcon} from '../../../../template/icons/EditIcon';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import {organizationService} from '../../../../modules/organizations/services/OrganizationsService';
import {ServiceExt} from '../../../../modules/organizations/models/ServiceExt';
import {ServiceExtList} from './ServiceExtList';
import {UpIcon} from '../../../../template/icons/UpIcon';
import {DownV2Icon} from '../../../../template/icons/DownV2Icon';
import {CenterContainer} from '../../../../template/containers/CenterContainer';
import {useFocusEffect} from '@react-navigation/native';

interface CompProps {
  service: Service;
}

export const ServiceItem = ({service}: CompProps) => {
  const [extServices, setExtServices] = useState<ServiceExt[]>([]);
  const [openList, setOpenList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      organizationService.getExtServices(service._id).then(res => {
        setExtServices(res);
      });
    }, []),
  );

  return (
    <MainContainer style={compStyles.container}>
      <RowContainer style={compStyles.row} $ph={20} $pv={20}>
        <ViewPress
          onPress={() =>
            Navigation.navigate(Screens.ADMIN_EDIT_SERVICE, {
              service,
            })
          }>
          <EditIcon size={18} />
        </ViewPress>

        <TextUI $isFlex ag={Ag['400_16']}>
          {service.title || ''}
        </TextUI>

        <MainContainer $heightPX={24} $widthPX={24}>
          {Boolean(extServices.length) && (
            <ViewPress $isFlex onPress={() => setOpenList(!openList)}>
              <CenterContainer $isFlex>
                {openList ? <UpIcon /> : <DownV2Icon />}
              </CenterContainer>
            </ViewPress>
          )}
        </MainContainer>
      </RowContainer>

      {openList && (
        <MainContainer $mb={20}>
          <ServiceExtList extList={extServices} />
        </MainContainer>
      )}
    </MainContainer>
  );
};

const compStyles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: ColorsUI.gray.light,
  },
  row: {
    gap: 10,
  },
});
