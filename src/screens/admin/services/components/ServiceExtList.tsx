import React from 'react';
import {ServiceExt} from '../../../../modules/organizations/models/ServiceExt';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {ServiceExtItem} from './ServiceExtItem';

interface CompProps {
  extList: ServiceExt[];
}

function renderItem({item}: ListRenderItemInfo<ServiceExt>) {
  return <ServiceExtItem extService={item} />;
}

export const ServiceExtList = ({extList}: CompProps) => {
  return (
    <FlatList
      scrollEnabled={false}
      style={compStyles.container}
      data={extList}
      renderItem={renderItem}
    />
  );
};

const compStyles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 20,
  },
});
