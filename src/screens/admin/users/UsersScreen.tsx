import React, {useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {FlatList, StyleSheet} from 'react-native';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {useAppDispatch} from '../../../settings/redux/hooks';
import {getUsers} from '../../../modules/admin/thunks/getUsers.thunk';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {Dealer} from '../../../modules/admin/models/Dealer';
import {useDebouncedEffect} from '../../../template/hooks/useDebouncedEffect';
import {InputUI} from '../../../template/ui/InputUI';
import {
  RowContainer,
  RowContainerJustEnd,
} from '../../../template/containers/RowContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {MaskHelper} from '../../../helper/MaskHelper';
import {ViewPress} from '../../../template/containers/ViewPress';
import {Insets} from '../../../template/styles/Insets';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {UnderLineText} from '../../../components/UnderLineText';
import Clipboard from '@react-native-clipboard/clipboard';
import {Notifications} from '../../../template/notifications/Notifications';
import {useRoute} from '@react-navigation/native';
import {AdminUsersParams} from '../../../routes/params/RouteParams';
import {adminService} from '../../../modules/admin/service/admin.service';

export const UsersScreen = () => {
  const params = useRoute<AdminUsersParams>().params;
  const cityModal = useRef<Modalize>(null);

  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<Dealer[]>([]);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    if (params) {
      setCity(params.city || '');
      dispatch(getUsers({city: params.city || '', dealerId: params.id}))
        .then(res => {
          setUsers(res.payload as Dealer[]);
        })
        .finally(() => {
          setIsLoading(false);
          setIsReady(true);
        });
    } else {
      dispatch(getUsers({city}))
        .then(res => {
          setUsers(res.payload as Dealer[]);
        })
        .finally(() => {
          setIsLoading(false);
          setIsReady(true);
        });
    }
  }, []);

  useDebouncedEffect(
    async () => {
      if (!isReady || isLoading) {
        return;
      }

      setIsLoading(true);

      if (search.length && users.length) {
        dispatch(getUsers({city}))
          .then(res => {
            const filter = (res.payload as Dealer[]).filter(dealer =>
              `${dealer.dealer._id}${dealer.dealer.full_name}${dealer.dealer.phone_number}`.includes(
                search,
              ),
            );

            setUsers(filter);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        dispatch(getUsers({city}))
          .then(res => {
            setUsers(res.payload as Dealer[]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    1000,
    [search, city],
  );

  const handlePickCity = (city: string) => {
    if (isLoading) {
      return;
    }
    setCity(city);

    setIsLoading(true);
    dispatch(getUsers({city}))
      .then(res => {
        setUsers(res.payload as Dealer[]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateBanUser = async (id: string) => {
    setIsLoading(true);

    await adminService.banUser(id);

    await dispatch(getUsers({city}))
      .then(response => {
        const filter = (response.payload as Dealer[]).filter(dealer =>
          `${dealer.dealer._id}${dealer.dealer.full_name}${dealer.dealer.phone_number}`.includes(
            search,
          ),
        );

        setUsers(filter);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Пользователи'} />
      <ColumnContainerFlex style={compStyles.gap20} $ph={20} $pt={20}>
        <InputSelectUI
          value={city || 'Выберите город'}
          onPress={() => {
            cityModal.current?.open();
          }}
        />
        <InputUI
          placeholder={'Поиск по ID, имени и номеру'}
          value={search}
          onChangeText={setSearch}
        />
        {isLoading ? (
          <CenterContainer>
            <Loader size={20} />
          </CenterContainer>
        ) : (
          <FlatList
            data={users}
            contentContainerStyle={{paddingBottom: Insets.bottom}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <BorderTopUI style={compStyles.gep10} $pv={20}>
                <RowContainer>
                  <TextUI ag={Ag['400_16']}>{'ID: '}</TextUI>
                  <UnderLineText
                    text={item.dealer._id}
                    color={ColorsUI.blue.second}
                    onPress={() => {
                      Clipboard.setString(item.dealer._id);

                      Notifications.succes('ID скопирован');
                    }}
                  />
                </RowContainer>
                {item.dealer.is_banned && (
                  <TextUI ag={Ag['400_16']} color={ColorsUI.red}>
                    {'Заблокирован'}
                  </TextUI>
                )}

                <TextUI ag={Ag['400_16']}>{`г.${item.dealer.city}`}</TextUI>
                <TextUI ag={Ag['400_16']}>{`${item.dealer.full_name}`}</TextUI>
                <TextUI ag={Ag['400_16']}>
                  {MaskHelper.formatPhoneNumber(item.dealer.phone_number)}
                </TextUI>
                <ViewPress
                  disabled={isLoading}
                  onPress={() => handleUpdateBanUser(item.dealer._id)}>
                  <TextUI ag={Ag['400_16']} color={ColorsUI.red}>
                    {item.dealer.is_banned ? 'Разблокировать' : 'Заблокировать'}
                  </TextUI>
                </ViewPress>
                <RowContainerJustEnd>
                  <ViewPress
                    onPress={() =>
                      Navigation.navigate(Screens.ADMIN_USER_ORGANIZATIONS, {
                        id: item.dealer._id,
                      })
                    }>
                    <TextUI
                      color={ColorsUI.green}
                      ag={
                        Ag['500_16']
                      }>{`Организации: ${item.organisation_count}`}</TextUI>
                  </ViewPress>
                </RowContainerJustEnd>
              </BorderTopUI>
            )}
            keyExtractor={item => item.dealer._id}
          />
        )}

        <CitiesModal modalizeRef={cityModal} onPickCity={handlePickCity} />
      </ColumnContainerFlex>
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  gep10: {
    gap: 10,
  },
  gap20: {
    gap: 20,
  },
});
