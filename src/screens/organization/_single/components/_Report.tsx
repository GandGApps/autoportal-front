import React from 'react';
import {BorderTopUI} from '../../../../template/ui/BorderTopUI';
import {
  RowContainer,
  RowContainerBeetwen,
} from '../../../../template/containers/RowContainer';
import {ViewPress} from '../../../../template/containers/ViewPress';
import {Ag, TextUI} from '../../../../template/ui/TextUI';
import {ColorsUI} from '../../../../template/styles/ColorUI';
import {ReportIcon} from '../../../../template/icons/ReportIcon';
import {MainContainer} from '../../../../template/containers/MainContainer';
import Navigation from '../../../../routes/navigation/Navigation';
import {Screens} from '../../../../routes/models/Screens';

interface ReportProps {
  organizationId: string;
}

export const OrgReport = ({organizationId}: ReportProps) => {
  return (
    <BorderTopUI $ph={20} $pv={20}>
      <RowContainerBeetwen>
        <ViewPress onPress={() => Navigation.navigate(Screens.REPORT_MODAL)}>
          <RowContainer>
            <MainContainer $mr={5}>
              <ReportIcon />
            </MainContainer>
            <TextUI
              ag={Ag['600_12']}
              color={ColorsUI.lightRed}>{`Жалоба`}</TextUI>
          </RowContainer>
        </ViewPress>

        <TextUI ag={Ag['400_12']}>{`ID: ${organizationId}`}</TextUI>
      </RowContainerBeetwen>
    </BorderTopUI>
  );
};
