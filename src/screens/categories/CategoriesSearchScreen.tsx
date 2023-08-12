import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {InputUI} from '../../template/ui/InputUI';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackBtn} from '../../template/ui/BackBtn';
import {Ag, TextUI} from '../../template/ui/TextUI';
import {MainContainer} from '../../template/containers/MainContainer';
import {BorderTopUI} from '../../template/ui/BorderTopUI';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';

export const CategoriesSearchScreen = () => {
  const insets = useSafeAreaInsets();

  const [searchCategory, setSearchCategory] = useState('');

  return (
    <ColumnContainerFlex $ph={20} $pt={Math.max(insets.top, 20)}>
      <BackBtn $mb={10} />

      <InputUI
        containerStyles={{
          $mb: 25,
        }}
        onChangeText={setSearchCategory}
        placeholder={searchCategory || 'Поиск по названию и услуге'}
      />

      <MainContainer $pl={8} $mb={10}>
        <TextUI ag={Ag['500_16']}>{'Рекомендации'}</TextUI>
      </MainContainer>

      <ScrollViewScreen>
        <BorderTopUI>
          <MainContainer $pv={15} $pl={8}>
            <TextUI ag={Ag['400_16']}>{'Шиномонтаж'}</TextUI>
            <TextUI ag={Ag['400_12']}>{'Автосервис '}</TextUI>
          </MainContainer>
        </BorderTopUI>
      </ScrollViewScreen>
    </ColumnContainerFlex>
  );
};
