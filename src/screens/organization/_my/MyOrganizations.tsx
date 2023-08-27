import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {MyOrganizationkHeader} from './components/_Header';
import {TabMenu} from '../../../components/tabMenu/TabMenu';
import {TabMenuOrganization} from './mock/TabMenuOrganization';
import {MainContainer} from '../../../template/containers/MainContainer';

export const MyOrganizationsScreen = () => {
  const [activeTab, setActiveTab] = useState(TabMenuOrganization.active);

  return (
    <ColumnContainerFlex>
      <MyOrganizationkHeader />

      <MainContainer $mt={20} $ph={40}>
        <TabMenu
          activeTab={activeTab}
          tabs={TabMenuOrganization}
          onChangeTab={setActiveTab}
        />
      </MainContainer>
    </ColumnContainerFlex>
  );
};
