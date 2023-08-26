import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import {
  filterChangeForm,
  selectOrganizationsValues,
} from '../../modules/organizations/OrganizationsSlice';
import {useAppDispatch, useAppSelector} from '../../settings/redux/hooks';
import {Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import {MainContainer} from '../../template/containers/MainContainer';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {InputSelectUI} from '../../template/ui/InputSelectUI';
import {SearchIcon} from '../../template/icons/SearchIcon';
import {ThreeMenuItem} from '../../components/ThreeMenuItem';
import {IconContainerUI} from '../../template/ui/IconContainerUI';
import {ScrollViewScreen} from '../../template/containers/ScrollViewScreen';
import {BottomMenu} from '../../components/bottomMenu/BottomMenu';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {Category} from '../../modules/organizations/models/Category';
import {useEffect} from 'react';
import {getBanners, getCategories} from '../../modules/organizations/_thunks';
import {ColorsUI} from '../../template/styles/ColorUI';

export const CategoriesScreen = () => {
  const {banners, categories} = useAppSelector(selectOrganizationsValues);

  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const carouselWidth = Dimensions.get('window').width - 40;
  const carouselHeight = carouselWidth / 2.5;

  const handleGoToSearch = () => {
    Navigation.navigate(Screens.CAT_SEARCH);
  };

  const handlePickCategory = (category: Category) => {
    dispatch(filterChangeForm({key: 'category', value: category}));

    Navigation.navigate(Screens.CAT_ORGANIZATIONS);
  };

  useEffect(() => {
    dispatch(getBanners());
    dispatch(getCategories());
  }, []);

  return (
    <ColumnContainerFlex $isRelative>
      <StatusBar barStyle={'dark-content'} backgroundColor={ColorsUI.white} />
      <ScrollViewScreen
        $mt={Math.max(insets.top, 20)}
        showsVerticalScrollIndicator={false}>
        <MainContainer $ph={20} $mb={20}>
          {banners.length ? (
            <Carousel
              loop
              autoPlay={true}
              autoPlayInterval={3000}
              width={carouselWidth}
              height={carouselHeight}
              data={banners}
              scrollAnimationDuration={1000}
              renderItem={({item}) => (
                <ColumnContainerFlex key={item.url} $bg={item.url} />
              )}
            />
          ) : null}
          <MainContainer $mt={18}>
            <InputSelectUI
              value={'Поиск по названию и услуге'}
              rightIcon={<SearchIcon />}
              onPress={handleGoToSearch}
            />
          </MainContainer>
        </MainContainer>

        <MainContainer $pb={120}>
          {categories.map(item => (
            <ThreeMenuItem
              key={item._id}
              leftIcon={<IconContainerUI />}
              title={item.title}
              onPress={() => handlePickCategory(item)}
            />
          ))}
        </MainContainer>
      </ScrollViewScreen>
      <BottomMenu />
    </ColumnContainerFlex>
  );
};
