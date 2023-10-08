import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {MyOrganizationkHeader} from './components/_Header';
import {TabMenu} from '../../../components/tabMenu/TabMenu';
import {TabMenuOrganization} from './mock/TabMenuOrganization';
import {MainContainer} from '../../../template/containers/MainContainer';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {getPersonalOrganizations} from '../../../modules/organizations/_thunks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {OrganizationHelper} from '../../../modules/organizations/helpers/OrganizationHelper';
import {PersonalOrganizations} from '../../../modules/organizations/models/PersonalOrganizations';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {FlatList, View} from 'react-native';
import {MyOrganization} from './components/_MyOrganization';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ag, TextUI} from '../../../template/ui/TextUI';

export const MyOrganizationsScreen = () => {
  const {personalOrganizations, isPersonalOrganizationsLoad} = useAppSelector(
    selectOrganizationsValues,
  );

  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(TabMenuOrganization.active);
  const [isLoad, setIsLoad] = useState(true);

  const [activeList, setActiveList] = useState<PersonalOrganizations[]>([]);
  const [disabledList, setDisabledList] = useState<PersonalOrganizations[]>([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getPersonalOrganizations()).finally(() => {
        setIsLoad(false);
      });
    }, 0);
  }, []);

  useEffect(() => {
    setActiveList(
      OrganizationHelper.formattedMyOrganizations(personalOrganizations)
        .activeList,
    );

    setDisabledList(
      OrganizationHelper.formattedMyOrganizations(personalOrganizations)
        .disabledList,
    );
  }, [personalOrganizations]);

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

      {isLoad || isPersonalOrganizationsLoad ? (
        <CenterContainer $mt={20}>
          <Loader size={20} />
        </CenterContainer>
      ) : activeTab === TabMenuOrganization.active ? (
        <>
          {!activeList.length ? (
            <MainContainer $pt={20}>
              <TextUI $align={'center'} ag={Ag['600_16']}>
                {'Нет активных организаий'}
              </TextUI>
            </MainContainer>
          ) : null}
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: insets.bottom + 30,
            }}
            data={activeList}
            renderItem={({item}) => (
              <MyOrganization key={`my-active-${item._id}`} item={item} />
            )}
          />
        </>
      ) : (
        <>
          {!disabledList.length ? (
            <MainContainer $pt={20}>
              <TextUI $align={'center'} ag={Ag['600_16']}>
                {'Нет неактивных организаий'}
              </TextUI>
            </MainContainer>
          ) : null}
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 20,
              paddingBottom: insets.bottom + 30,
            }}
            data={disabledList}
            renderItem={({item}) => (
              <MyOrganization key={`my-disabled-${item._id}`} item={item} />
            )}
          />
        </>
      )}
    </ColumnContainerFlex>
  );
};
