import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Platform, StatusBar} from 'react-native';
import {OrganizationPreview} from './components/_Preview';
import {OrganizationTitleRating} from './components/_TitleRating';
import {OrganizationPromo} from './components/_Promo';
import {ContactInfoContent} from './components/_ContactInfoContent';
import {OrganizationDescription} from './components/_Description';
import {OrgServices} from './components/_Services';
import {OrgCarsBrands} from './components/_CarsBrands';
import {OrgSchedules} from './components/_Schedules';
import {OrgReview} from './components/_Review';
import {OrgReport} from './components/_Report';
import {OrgBottomMenu} from './components/_BottomMenu';
import {OrganizationParams} from '../../../routes/params/RouteParams';
import {useAppDispatch, useAppSelector} from '../../../settings/redux/hooks';
import {selectOrganizationsValues} from '../../../modules/organizations/OrganizationsSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCurrentOrganization} from '../../../modules/organizations/_thunks';
import {CenterContainerFlex} from '../../../template/containers/CenterContainer';
import {Loader} from '../../../components/Loader';
import {ColumnContainerFlex} from '../../../template/containers/ColumnContainer';
import {ColorsUI} from '../../../template/styles/ColorUI';
import {ScrollViewScreen} from '../../../template/containers/ScrollViewScreen';
import {MainContainer} from '../../../template/containers/MainContainer';
import {Dots} from '../../../components/carousel/components/Dots';
import ImageView from 'react-native-image-viewing';
import {selectAuthValues} from '../../../modules/auth/AuthSlice';
import {Ag, TextUI} from '../../../template/ui/TextUI';
import {ViewPress} from '../../../template/containers/ViewPress';
import Navigation from '../../../routes/navigation/Navigation';
import {Screens} from '../../../routes/models/Screens';
import {ContactModal} from './components/ContactModal';
import {Modalize} from 'react-native-modalize';

export const OrganizationScreen = () => {
  const {_id} = useRoute<OrganizationParams>().params;
  const dispatch = useAppDispatch();

  const {isCurrentOrganizationLoad, currentOrganization} = useAppSelector(
    selectOrganizationsValues,
  );
  const {isAdmin} = useAppSelector(selectAuthValues);

    console.log('Current: ', currentOrganization)

  const contactModal = useRef<Modalize>(null);

  const insets = useSafeAreaInsets();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState(0);

  const [isLoad, setIsLoad] = useState(false);

  const [visiblePreview, setIsVisiblePreview] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
      dispatch(getCurrentOrganization(_id))
        .then(response => {})
        .finally(() => {
          setIsLoad(false);
        });
    }, 0);
  }, []);

  const handlePressImage = () => {
    setPreviewIndex(carouselIndex);
    setIsVisiblePreview(true);
  };

  if (isCurrentOrganizationLoad || !currentOrganization || isLoad) {
    return (
      <CenterContainerFlex>
        <Loader size={20} />
      </CenterContainerFlex>
    );
  }

  return (
    <ColumnContainerFlex>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'light-content'}
        backgroundColor={ColorsUI.white}
      />
      <ScrollViewScreen
        contentContainerStyle={{paddingBottom: insets.bottom + 70}}
        showsVerticalScrollIndicator={false}>
        <OrganizationPreview
          id={currentOrganization._id}
          isFavorite={currentOrganization?.isFavorite}
          previews={currentOrganization?.photos}
          carouselIndex={carouselIndex}
          onCarouselChange={setCarouselIndex}
          onPressImage={handlePressImage}
          logo={currentOrganization.logo}
        />

        <OrganizationTitleRating
          categoryName={currentOrganization?.categoryId?.title!}
          name={currentOrganization?.name}
          rating={currentOrganization?.rating}
          countReviews={currentOrganization?.countReviews}
        />

        {isAdmin && (
          <ViewPress
            $pv={20}
            $ph={20}
            $bg={ColorsUI.blue.second}
            onPress={() => {
              Navigation.navigate(Screens.ADMIN_USERS, {
                city: currentOrganization?.dealerCity || '',
                id: currentOrganization?.dealerId || '',
              });
            }}>
            <TextUI ag={Ag['500_16']} color={ColorsUI.white}>
              {'Владелец организации'}
            </TextUI>
          </ViewPress>
        )}

        {currentOrganization?.promo ? (
          <OrganizationPromo
            description={currentOrganization.promo.description}
            startPromo={currentOrganization.promo.startPromo}
            endPromo={currentOrganization.promo.endPromo}
          />
        ) : null}

        <ContactInfoContent
          mainPhone={currentOrganization.mainPhone}
          whatsApp={currentOrganization.whatsApp}
          city={currentOrganization.city}
          address={currentOrganization.address}
          employeers={currentOrganization.employeers}
        />

        <OrganizationDescription
          description={currentOrganization.description}
        />

        {currentOrganization.services.length ? (
          <OrgServices services={currentOrganization.services} />
        ) : null}

        {currentOrganization.brandsCars ? (
          <OrgCarsBrands carsBrands={currentOrganization.brandsCars} />
        ) : null}

        <OrgSchedules schedule={currentOrganization.schedule} />

        <OrgReview review={currentOrganization.lastReview} />

        <OrgReport organizationId={currentOrganization._id} />

        <ImageView
          images={
            currentOrganization?.photos.map(item => {
              return {uri: item};
            }) || []
          }
          imageIndex={carouselIndex}
          visible={visiblePreview}
          onRequestClose={() => setIsVisiblePreview(false)}
          onImageIndexChange={setPreviewIndex}
          FooterComponent={() => (
            <MainContainer $mb={Math.max(insets.bottom, 20)}>
              <Dots
                list={currentOrganization?.photos || []}
                currentIndex={previewIndex}
              />
            </MainContainer>
          )}
        />
      </ScrollViewScreen>

      <OrgBottomMenu
        organization={currentOrganization}
        openModal={() => contactModal.current?.open()}
      />
      <ContactModal
        modalizeRef={contactModal}
        mainPhone={currentOrganization.mainPhone}
        whatsApp={currentOrganization.whatsApp}
        employeers={currentOrganization.employeers}
      />
    </ColumnContainerFlex>
  );
};
