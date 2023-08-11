import React from 'react';
import Toast from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {store} from './src/settings/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import {RouterApp} from './src/routes/RouterApp';

export const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <Host>
          <RouterApp />
        </Host>
      </Provider>

      {/* @ts-ignore */}
      <Toast ref={ref => (global['toast'] = ref)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
