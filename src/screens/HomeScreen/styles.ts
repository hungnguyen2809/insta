import { StyleSheet } from 'react-native';
import { Colors, DeviceUiInfo, Fonts } from 'src/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  titleHeader: {
    flex: 1,
    fontFamily: Fonts.BonheurRoyale,
    fontSize: DeviceUiInfo.scale(30),
    lineHeight: DeviceUiInfo.scale(37),
    marginLeft: DeviceUiInfo.scale(20),
  },
  wrapActionRight: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: DeviceUiInfo.scale(10),
  },
  btnAction: {
    marginHorizontal: DeviceUiInfo.scale(10),
  },
  contentMain: {
    flex: 1,
  },
  wrapStotyThumb: {
    borderBottomColor: Colors.darkgray,
    borderBottomWidth: 0.3,
  },
});
