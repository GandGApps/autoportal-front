import React, {useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {Modalize} from 'react-native-modalize';
import {CategoriesModal} from '../../../components/CategoriesModal';
import {Nullable} from '../../../settings/types/BaseTypes';
import {Category} from '../../../modules/organizations/models/Category';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {FlatList} from 'react-native';
import {Insets} from '../../../template/styles/Insets';

export const AdminCategories = () => {
  const categoriesModalRef = useRef<Modalize>(null);

  const [category, setCategory] = useState<Nullable<Category>>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectCategory = (category: Category) => {
    setCategory(category);
  };

  const handleOpenModalCategory = () => {
    if (isLoading) return;

    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Категории'} />
      <ColumnContainerFlex $ph={20} $pt={20}>
        <InputSelectUI
          placeholder={'Выберете категорию'}
          value={category?.title}
          onPress={handleOpenModalCategory}
        />

        <FlatList
          contentContainerStyle={{paddingTop: 20, paddingBottom: Insets.bottom}}
          data={[]}
          renderItem={() => <></>}
          ListEmptyComponent={
            <TextUI ag={Ag['500_16']} $align={'center'}>
              {'Не выбрана категория'}
            </TextUI>
          }
        />
      </ColumnContainerFlex>

      <CategoriesModal
        modalizeRef={categoriesModalRef}
        onPickCategories={handleSelectCategory}
      />
    </ColumnContainerFlex>
  );
};
