import {Platform} from 'react-native';
import {
  getBuildNumber,
  getVersion,
  getUniqueId,
} from 'react-native-device-info';

const getDevideId = (): string => {
  let deviceID: string = '';

  getUniqueId().then(id => {
    deviceID = id;
  });

  return deviceID;
};

export const appConfig = {
  apiUrl: '/',
  deviceId: getDevideId(),
  version: `${getVersion()} (${getBuildNumber()})`,
  isIOS: Platform.OS === 'ios',
};
