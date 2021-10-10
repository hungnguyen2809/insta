import { Alert, Platform, Rationale } from 'react-native';
import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

const alertOpenSettings = () => {
  Alert.alert('Vui lòng cấp quyền cho thiết bị', 'Mở cài đặt thiết bị', [
    {
      text: 'Hủy',
      style: 'destructive',
      onPress: () => {},
    },
    {
      text: 'Đồng ý',
      onPress: () => {
        openSettings();
      },
    },
  ]);
};

const requestPermissions = async (devicePermissions: Permission, rationale?: Rationale) => {
  let granted = false;
  try {
    const permissions = await check(devicePermissions);
    if (permissions === RESULTS.GRANTED || permissions === RESULTS.LIMITED) {
      granted = true;
    }
    if (permissions === RESULTS.UNAVAILABLE) {
      Alert.alert('Thông báo', 'Tính năng này không khả dụng trên thiết bị');
    }
    if (permissions === RESULTS.BLOCKED) {
      alertOpenSettings();
    }
    if (permissions === RESULTS.DENIED) {
      const allowPermissions = await request(devicePermissions, rationale);
      if (allowPermissions === RESULTS.GRANTED) {
        granted = true;
      }
      if (allowPermissions === RESULTS.BLOCKED) {
        alertOpenSettings();
      }
    }
  } catch (error) {
    Alert.alert('Thông báo', 'Lỗi khi yêu cầu quyền thiết bị ' + JSON.stringify(error));
  }
  return granted;
};

// device permissions can set null if don't need permission
// examp: { ios: null, android: PERMISSIONS.ANDROID.SEND_SMS }

export const checkPermissionsCamera = async (rationale?: Rationale) => {
  const devicePermissions = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  return devicePermissions ? await requestPermissions(devicePermissions, rationale) : false;
};

export const checkPermissionsPhoto = async (rationale?: Rationale) => {
  const devicePermissions = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  });
  return devicePermissions ? await requestPermissions(devicePermissions, rationale) : false;
};

export const checkPermissionsAudio = async (rationale?: Rationale) => {
  const devicePermissions = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });
  return devicePermissions ? await requestPermissions(devicePermissions, rationale) : false;
};
