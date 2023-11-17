import React, {FC, RefObject, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {Loader} from '../../components/Loader';
import {organizationService} from '../../modules/organizations/services/OrganizationsService';
import Navigation from '../../routes/navigation/Navigation';
import {CenterContainer} from '../../template/containers/CenterContainer';
import {ColumnContainerFlex} from '../../template/containers/ColumnContainer';
import {RowContainerBeetwenEnd} from '../../template/containers/RowContainer';
import {ViewPress} from '../../template/containers/ViewPress';
import {CloseIcon} from '../../template/icons/CloseIcon';

export const WebviewOffer: FC = function WebviewOffer() {
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    organizationService.getOffer().then(res => {
      setLink(res);
    });
  }, []);

  return (
    <ColumnContainerFlex $pt={20}>
      {(!link || isLoading) && (
        <CenterContainer>
          <Loader size={20} />
        </CenterContainer>
      )}
      <WebView
        onError={() => {
          Navigation.pop();
        }}
        source={{uri: link}}
        style={!isLoading && compStyles.flex}
        onLoadStart={() => {
          setIsLoading(true);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
      />
    </ColumnContainerFlex>
  );
};

const compStyles = StyleSheet.create({
  flex: {
    flex: 1,
    marginHorizontal: 20,
  },
});
