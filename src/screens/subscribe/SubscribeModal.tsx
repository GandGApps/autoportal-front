import React, {useState} from 'react';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import WebView from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SubscribeModalParams} from '../../routes/params/RouteParams';
import Navigation from '../../routes/navigation/Navigation';
import {Loader} from '../../components/Loader';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {useAppDispatch} from '../../settings/redux/hooks';
import {setDefaultCreateForm} from '../../modules/organizations/OrganizationsSlice';
import {DefaultCreateForm} from '../../modules/organizations/form/CreateForm';
import {approveSubscribe} from '../../modules/organizations/thunks/subscribe.thunk';

export const SubscribeModal = () => {
  const {url, organizationId, type} = useRoute<SubscribeModalParams>().params;

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
            dispatch(approveSubscribe({id: organizationId, type}));
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
