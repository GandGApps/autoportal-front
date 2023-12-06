import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {GradientHeader} from '../../../components/GradientHeader';
import {InputSelectUI} from '../../../template/ui/InputSelectUI';
import {Modalize} from 'react-native-modalize';
import {CategoriesModal} from '../../../components/CategoriesModal';
import {Nullable} from '../../../settings/types/BaseTypes';
import {Category} from '../../../modules/organizations/models/Category';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {Insets} from '../../../template/styles/Insets';
import {CenterContainer} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {Service} from '../../../modules/organizations/models/Service';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {getServices} from '../../../modules/organizations/thunks/services.thunk';
import {RowContainerBeetwen} from '../../../template/containers/RowContainer';
import {MainContainer} from '../../../template/containers/MainContainer';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {ViewPress} from '../../../template/containers/ViewPress';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ServiceItem} from './components/ServiceItem';
import {AddService} from './components/AddService';

function renderItem({item}: ListRenderItemInfo<Service>) {
  return <ServiceItem service={item} />;
}

export const AdminServices = () => {
  const categoriesModalRef = useRef<Modalize>(null);

  const addServiceModal = useRef<Modalize>(null);

  const {services, filterForm} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const category = filterForm.category;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      dispatch(getServices(category._id)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [category]);

  const handleOpenModalCategory = () => {
    if (isLoading) {
      return;
    }

    categoriesModalRef.current?.open();
  };

  const renderHeader = useCallback(
    () => (
      <Fragment>
        <MainContainer $ph={20}>
          <InputSelectUI
            placeholder={'Выберете категорию'}
            value={category?.title}
            onPress={handleOpenModalCategory}
          />
        </MainContainer>

        {category ? (
          <RowContainerBeetwen
            $mt={20}
            $ph={20}
            $pv={20}
            $bg={ColorsUI.gray.bg}>
            <TextUI ag={Ag['400_16']} $isFlex>
              {'Создать новую услугу?'}
            </TextUI>
            <ViewPress
              $bg={ColorsUI.green}
              $ml={10}
              $pv={5}
              $ph={20}
              $br={20}
              onPress={() => addServiceModal.current?.open()}>
              <TextUI
                $align={'center'}
                ag={Ag['400_16']}
                color={ColorsUI.white}>
                {'Создать'}
              </TextUI>
            </ViewPress>
          </RowContainerBeetwen>
        ) : (
          <MainContainer $mt={20}>
            <TextUI ag={Ag['500_16']} $align={'center'}>
              {'Категория не выбрана'}
            </TextUI>
          </MainContainer>
        )}
      </Fragment>
    ),
    [category],
  );

  return (
    <ColumnContainerFlex>
      <GradientHeader isBack={true} title={'Услуги'} />
      <ColumnContainerFlex>
        <FlatList
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{paddingTop: 20, paddingBottom: Insets.bottom}}
          data={category ? services : []}
          renderItem={renderItem}
          ListEmptyComponent={
            <Fragment>
              {!isLoading && Boolean(category) && (
                <MainContainer $mt={20}>
                  <TextUI ag={Ag['500_16']} $align={'center'}>
                    {'В выбранной категории нет услуг'}
                  </TextUI>
                </MainContainer>
              )}
            </Fragment>
          }
          ListFooterComponent={
            <Fragment>
              {isLoading && (
                <CenterContainer $pv={20}>
                  <Loader size={20} />
                </CenterContainer>
              )}
            </Fragment>
          }
        />
      </ColumnContainerFlex>

      <CategoriesModal modalizeRef={categoriesModalRef} />

      <AddService modalizeRef={addServiceModal} categoryId={category?._id!} />
    </ColumnContainerFlex>
  );
};
