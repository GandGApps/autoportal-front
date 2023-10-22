import React, {useEffect, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectAdminValues} from '../../../modules/admin/AdminSlice';
import {GradientHeader} from '../../../components/GradientHeader';
import {useRoute} from '@react-navigation/native';
import {AdminUserOrgsParams} from '../../../routes/params/RouteParams';
import {getUserOrganizations} from '../../../modules/admin/thunks/getUserOrganizations';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {FlatList} from 'react-native';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {Insets} from '../../../template/styles/Insets';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {RowContainerJustEnd} from '../../../template/containers/RowContainer';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import Clipboard from '@react-native-clipboard/clipboard';
import {Notifications} from '../../../template/notifications/Notifications';

export const UsersOrganizations = () => {
  const {userOrganization} = useAppSelector(selectAdminValues);
  const dispatch = useAppDispatch();

  const params = useRoute<AdminUserOrgsParams>().params;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);
    dispatch(getUserOrganizations(params.id)).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleCopyToClipboard = (id: string) => {
    Clipboard.setString(id);

    Notifications.succes('ID скопирован');
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader title={'Организации пользователя'} />
      {isLoading ? (
        <CenterContainerFlex>
          <Loader size={20} />
        </CenterContainerFlex>
      ) : (
        <FlatList
          data={userOrganization}
          contentContainerStyle={{paddingBottom: Insets.bottom}}
          renderItem={({item}) => (
            <BorderTopUI style={{gap: 10}} $pv={20} $ph={20}>
              <ViewPress onPress={() => handleCopyToClipboard(item._id)}>
                <TextUI
                  ag={Ag['600_12']}
                  color={ColorsUI.green}>{`ID: ${item._id}`}</TextUI>
              </ViewPress>
              <TextUI ag={Ag['400_16']}>
                {'Название: '}
                <TextUI ag={Ag['500_16']}>{item.name}</TextUI>
              </TextUI>

              <TextUI ag={Ag['400_16']}>
                {'Рейтинг: '}
                <TextUI ag={Ag['500_16']}>{item.rating}</TextUI>
              </TextUI>
              <RowContainerJustEnd>
                <ViewPress
                  onPress={() =>
                    Navigation.navigate(Screens.ORGANIZATION, {
                      _id: item._id,
                    })
                  }
                  $borderColor={ColorsUI.black}
                  $pv={5}
                  $ph={10}
                  $br={5}>
                  <TextUI ag={Ag['600_14']}>{'Перейти'}</TextUI>
                </ViewPress>
              </RowContainerJustEnd>
            </BorderTopUI>
          )}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <TextUI ag={Ag['500_16']} $align={'center'}>
              {'У пользователя нет организаций'}
            </TextUI>
          }
        />
      )}
    </ColumnContainerFlex>
  );
};
