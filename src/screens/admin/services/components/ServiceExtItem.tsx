import React from 'react';
import {ServiceExt} from '../../../../modules/organizations/models/ServiceExt';
import {RowContainer} from '../../../../template/containers/RowContainer';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {CenterContainerFlex} from '../../../../template/containers/CenterContainer';
import {CloseIcon} from '../../../../template/icons/CloseIcon';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';
import {useAppSelector} from '../../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../../modules/organizations/OrganizationsSlice';

interface CompProps {
  extService: ServiceExt;
}

export const ServiceExtItem = ({extService}: CompProps) => {
  const {filterForm} = useAppSelector(selectOrganizationsValues);
  return (
    <RowContainer $mt={10}>
      <TextUI $isFlex ag={Ag['400_16']}>
        {extService.title}
      </TextUI>
      <ViewPress
        $bg={ColorsUI.black}
        $heightPX={20}
        $widthPX={20}
        $br={20}
        onPress={() =>
          Navigation.navigate(Screens.ADMIN_MODAL_REMOVE_SERVICE, {
            id: extService._id,
            title: extService.title,
            categoryId: filterForm.category?._id!,
          })
        }>
        <CenterContainerFlex>
          <CloseIcon size={8} color={ColorsUI.white} />
        </CenterContainerFlex>
      </ViewPress>
    </RowContainer>
  );
};
