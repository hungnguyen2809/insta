import { StyleSheet } from 'react-native';
import { Colors, DeviceUiInfo } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: DeviceUiInfo.StatusBarHeight,
  },
  logo: {
    flex: 2,
    justifyContent: 'center',
  },
  titleLogo: {
    textAlign: 'center',
    fontSize: DeviceUiInfo.scale(20),
  },
  content: {
    flex: 5,
    marginHorizontal: DeviceUiInfo.scale(25),
  },
  textInputEmail: {
    borderRadius: 6,
    backgroundColor: Colors.aliceblue,
  },
  textInputPass: {
    borderRadius: 6,
    backgroundColor: Colors.aliceblue,
    marginTop: DeviceUiInfo.scale(15),
  },
  heightInput: {
    height: DeviceUiInfo.scale(23),
  },
  warpAction: {
    flex: 1,
    marginTop: DeviceUiInfo.scale(20),
  },
  btnLogin: {
    backgroundColor: Colors.dodgerblue,
    paddingHorizontal: DeviceUiInfo.scale(10),
    paddingVertical: DeviceUiInfo.scale(7),
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: DeviceUiInfo.scale(13),
    lineHeight: DeviceUiInfo.scale(24),
  },
  textHaveAccount: {
    textAlign: 'center',
    marginTop: DeviceUiInfo.scale(10),
    fontSize: DeviceUiInfo.scale(11),
  },
  btnCreate: {
    alignItems: 'center',
    marginTop: DeviceUiInfo.scale(10),
  },
  textCreate: {
    textDecorationLine: 'underline',
    fontSize: DeviceUiInfo.scale(12),
    lineHeight: DeviceUiInfo.scale(18),
    color: Colors.dodgerblue,
  },
  btnLoginOther: {
    backgroundColor: Colors.orangered,
    marginTop: DeviceUiInfo.scale(15),
    paddingHorizontal: DeviceUiInfo.scale(10),
    paddingVertical: DeviceUiInfo.scale(7),
    borderRadius: 5,
  },
});
