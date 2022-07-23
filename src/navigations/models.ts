import { HomeScreenParam, TakePhotoScreenParam } from './params';

export type ParamsListApp = RootAuthParamList & MainTabParamList & RootMainParamList;

export type RootAuthParamList = {
  LOGIN_SCREEN: object | undefined;
  REGISTER_SCREEN: object | undefined;
};

export type MainTabParamList = {
  HOME_SCREEN: HomeScreenParam | undefined;
  DISCOVER_SCREEN: object | undefined;
  QUICK_VIDEO_SCREEN: object | undefined;
  NOTIFICATION_SCREEN: object | undefined;
  PROFILE_SCREEN: object | undefined;
};

export type RootMainParamList = {
  MAIN_TAB: object | undefined;
  TAKE_PHOTO_SCREEN: TakePhotoScreenParam | undefined;
};
