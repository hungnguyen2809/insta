import { TakePictureOptions, TakePictureResponse } from 'react-native-camera';

export type RootAuthParamList = {
  LOGIN_SCREEN: object | undefined;
  REGISTER_SCREEN: object | undefined;
};

export type RootMainParamList = {
  HOME_TAB: object | undefined;
  DISCOVER_TAB: object | undefined;
  QUICK_VIDEO_TAB: object | undefined;
  NOTIFICATION_TAB: object | undefined;
  PROFILE_TAB: object | undefined;
};

/** Home Tab */
export type HomeTabParamList = {
  HOME_SCREEN: object | undefined;
  TAKE_PHOTO: TakePhotoScreenParam | undefined;
};

export type TakePhotoScreenParam = {
  takePhoto: (photo: TakePictureResponse) => void;
  optionPhoto?: TakePictureOptions;
};

/** Discover Tab */
export type DiscoverTabParamList = {
  DISCOVER_SCREEN: object | undefined;
};

/** QuickVideo Tab */
export type QuickVideoTabParamList = {
  QUICK_VIDEO_SCREEN: object | undefined;
};

/** Notification Tab */
export type NotificationTabParamList = {
  NOTIFICATION_SCREEN: object | undefined;
};

/** Profile Tab */
export type ProfileTabParamList = {
  PROFILE_SCREEN: object | undefined;
};
