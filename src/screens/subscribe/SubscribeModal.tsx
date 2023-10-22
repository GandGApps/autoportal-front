import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import WebView from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SubscribeModalParams} from '../../routes/params/RouteParams';
import Navigation from '../../routes/navigation/Navigation';
import {Screens} from '../../routes/models/Screens';
import {Loader} from '../../components/Loader';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {useAppDispatch} from '../../settings/redux/hooks';
import {setDefaultCreateForm} from '../../modules/organizations/OrganizationsSlice';
import {DefaultCreateForm} from '../../modules/organizations/form/CreateForm';

export const SubscribeModal = () => {
  const {url} = useRoute<SubscribeModalParams>().params;

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  return (
    <ColumnContainerFlex $pt={20}>
      {isLoading && (
        <CenterContainer>
          <Loader size={20} />
        </CenterContainer>
      )}
      <WebView
        onError={event => {
          if (!event.nativeEvent.url.includes('success')) {
            Navigation.pop();
          }
        }}
        source={{uri: url}}
        style={!isLoading && compStyles.flex}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={event => {
          setIsLoading(false);

          if (event.nativeEvent.url.includes('success')) {
            dispatch(setDefaultCreateForm(DefaultCreateForm));
            Navigation.navigate(Screens.PROFILE);
            Navigation.navigate(Screens.ORGANIZATION_MY);
          }
        }}
      />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
