import React, {useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {FlatList, StyleSheet} from 'react-native';
import {CitiesModal} from '../../../components/CitiesModal';
import {Modalize} from 'react-native-modalize';
import {SelectUI} from '../../../template/ui/SelectUI';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectAdminValues} from '../../../modules/admin/AdminSlice';
import {getUsers} from '../../../modules/admin/thunks/getUsers.thunk';
import {BorderTopUI} from '../../../template/ui/BorderTopUI';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {Dealer} from '../../../modules/admin/models/Dealer';
import {useDebouncedEffect} from '../../../template/hooks/useDebouncedEffect';
import {InputUI} from '../../../template/ui/InputUI';
import {RowContainerJustEnd} from '../../../template/containers/RowContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {MaskHelper} from '../../../helper/MaskHelper';
import {ViewPress} from '../../../template/containers/ViewPress';
import {Insets} from '../../../template/styles/Insets';

export const UsersScreen = () => {
  const cityModal = useRef<Modalize>(null);

  const {dealers: data} = useAppSelector(selectAdminValues);
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<Dealer[]>([]);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);
    dispatch(getUsers(city)).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (data.length) {
      setUsers(data);
    }
  }, [data]);

  useDebouncedEffect(
    () => {
      if (search.length) {
        setUsers(
          data.filter(dealer =>
            `${dealer.dealer.full_name}${dealer.dealer.phone_number}`.includes(
              search,
            ),
          ),
        );
      } else if (data.length) {
        setUsers(data);
      }
    },
    1000,
    [search],
  );

  const handlePickCity = (city: string) => {
    if (isLoading) return;
    setCity(city);

    setIsLoading(true);
    dispatch(getUsers(city)).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Пользователи'} />
      <ColumnContainerFlex style={compStyles.gap20} $ph={20} $pt={20}>
        <SelectUI
          text={city || 'Выберите город'}
          onPress={() => {
            cityModal.current?.open();
          }}
        />
        <InputUI
          placeholder={'Поиск по имени и номеру'}
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={users}
          contentContainerStyle={{paddingBottom: Insets.bottom}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            isLoading ? (
              <CenterContainer>
                <Loader size={20} />
              </CenterContainer>
            ) : null
          }
          renderItem={({item}) => (
            <BorderTopUI style={compStyles.gep10} $pv={20}>
              {item.dealer.is_banned && (
                <TextUI ag={Ag['400_16']} color={ColorsUI.red}>
                  {'Заблокирован'}
                </TextUI>
              )}
              <TextUI ag={Ag['400_16']}>{`ID: ${item.dealer._id}`}</TextUI>
              <TextUI ag={Ag['400_16']}>{`г.${item.dealer.city}`}</TextUI>
              <TextUI ag={Ag['400_16']}>{`${item.dealer.full_name}`}</TextUI>
              <TextUI ag={Ag['400_16']}>
                {MaskHelper.formatPhoneNumber(item.dealer.phone_number)}
              </TextUI>
              {item.dealer.is_banned ? (
                <ViewPress>
                  <TextUI ag={Ag['400_16']} color={ColorsUI.red}>
                    {'Разблокировать'}
                  </TextUI>
                </ViewPress>
              ) : (
                <ViewPress>
                  <TextUI ag={Ag['400_16']} color={ColorsUI.red}>
                    {'Заблокировать'}
                  </TextUI>
                </ViewPress>
              )}
              <RowContainerJustEnd>
                <ViewPress>
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
