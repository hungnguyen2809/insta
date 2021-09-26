import { Dimensions, PixelRatio, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window');

export class DeviceUiInfo {
  private static screenSizeWithPixelRatio = {
    width: width * PixelRatio.get(),
    height: height * PixelRatio.get(),
  }; //calculate the width & height based on device pixel ratio
  private static guidelineBaseWidth = 350; //standard width which will be used as base for calculating the scale.
  private static guidelineBaseHeight = 680; //standard height which will be used as base for calculating the scale.

  public static ScreenSize = { width, height }; //gives the width & height of device
  public static FontScale = PixelRatio.getFontScale(); //gives font scale based on pixel ratio
  public static OS = Platform.OS; //gives the device platform iOS or Android
  public static StatusBarHeight = getStatusBarHeight(); //gives height statusbar
  public static IsTablet = DeviceInfo.isTablet(); //check if device is Tablet
  public static AppVersion = DeviceInfo.getVersion(); //gives app version
  public static IsIphoneX = isIphoneX(); //check if device is iPhoneX

  public static getScreenSizeWithPixelRatio() {
    return this.screenSizeWithPixelRatio;
  }

  public static scale(size: number) {
    return (this.ScreenSize.width / this.guidelineBaseWidth) * size;
  }

  public static verticalScale(size: number) {
    return (this.ScreenSize.height / this.guidelineBaseHeight) * size;
  }

  public static moderateScale(size: number, factor = 0.5) {
    return size + (this.scale(size) - size) * factor;
  }

  public static actualScale(size: number) {
    const inputSize = DeviceUiInfo.moderateScale(size);
    return inputSize / this.FontScale;
  }
}
