import React, {Fragment, useRef, useState} from 'react';
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
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';

export const AdminServices = () => {
  const categoriesModalRef = useRef<Modalize>(null);

  const [category, setCategory] = useState<Nullable<Category>>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectCategory = (category: Category) => {
    setCategory(category);

    setIsLoading(true);
  };

  const handleOpenModalCategory = () => {
    if (isLoading) return;

    categoriesModalRef.current?.open();
  };

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Услуги'} />
      <ColumnContainerFlex $ph={20} $pt={20}>
        <InputSelectUI
          placeholder={'Выберете категорию'}
          value={category?.title}
          onPress={handleOpenModalCategory}
        />

        {isLoading && (
          <CenterContainer $pt={20}>
            <Loader size={20} />
          </CenterContainer>
        )}

        <FlatList
          contentContainerStyle={{paddingTop: 20, paddingBottom: Insets.bottom}}
          data={[]}
          renderItem={() => <></>}
          ListEmptyComponent={
            <Fragment>
              {!isLoading && (
                <TextUI ag={Ag['500_16']} $align={'center'}>
                  {'Не выбрана категория'}
                </TextUI>
              )}
            </Fragment>
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
