import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import {selectOrganizationsValues} from '../../modules/organizations/OrganizationsSlice';
import {useAppSelector} from '../../settings/redux/hooks';
import {CenterContainerFlex} from '../../template/containers/CenterContainer';
import {MockBanners} from './mock/MockBanners';
import {Dimensions, View} from 'react-native';
import {MainContainer} from '../../template/containers/MainContainer';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {InputSelectUI} from '../../template/ui/InputSelectUI';
import {SearchIcon} from '../../template/icons/SearchIcon';
import {SelectUI} from '../../template/ui/SelectUI';
import {MockCategories} from './mock/MockCategories';

export const CategoriesScreen = () => {
  const {banners} = useAppSelector(selectOrganizationsValues);

  const insets = useSafeAreaInsets();

  const carouselWidth = Dimensions.get('window').width - 40;
  const carouselHeight = carouselWidth / 2.5;

  return (
    <ColumnContainerFlex
      $pt={Math.max(insets.top, 20)}
      $pb={Math.max(insets.bottom, 20)}>
      <MainContainer $ph={20} $mb={20}>
        <Carousel
          loop
          autoPlay={true}
          autoPlayInterval={3000}
          width={carouselWidth}
          height={carouselHeight}
          data={MockBanners}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <ColumnContainerFlex key={item.id} $bg={item.url} />
          )}
        />
        <MainContainer $mt={18}>
          <InputSelectUI value={'Поиск'} rightIcon={<SearchIcon />} />
          <MainContainer $mt={10} $widthPRC={50}>
            <SelectUI text={'Местоположение'} />
          </MainContainer>
        </MainContainer>
      </MainContainer>

      {MockCategories.map(item => (
        <View key={item._id} />
      ))}
    </ColumnContainerFlex>
  );
};
