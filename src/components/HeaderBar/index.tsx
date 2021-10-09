import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { DeviceUiInfo } from 'src/utils';

interface Props {
  children?: React.ReactChild;
  leftArea?: React.ReactNode;
  centerArea?: React.ReactNode;
  rightArea?: React.ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  containerLeftStyle?: StyleProp<ViewStyle>;
  containerCenterStyle?: StyleProp<ViewStyle>;
  containerRightStyle?: StyleProp<ViewStyle>;
}

const HeaderBar = (props: Props) => {
  const {
    children,
    leftArea,
    centerArea,
    rightArea,
    headerStyle,
    containerLeftStyle,
    containerCenterStyle,
    containerRightStyle,
  } = props;
  return (
    <View style={styles.container}>
      {children ? (
        children
      ) : (
        <View style={[styles.wrapContent, headerStyle]}>
          {leftArea && <View style={[styles.wrapAreaLeft, containerLeftStyle]}>{leftArea}</View>}
          {centerArea && (
            <View style={[styles.wrapAreaCenter, containerCenterStyle]}>{centerArea}</View>
          )}
          {rightArea && (
            <View style={[styles.wrapAreaRight, containerRightStyle]}>{rightArea}</View>
          )}
        </View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: DeviceUiInfo.StatusBarHeight,
  },
  wrapContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrapAreaLeft: {
    flex: 1,
  },
  wrapAreaCenter: {
    flex: 2,
  },
  wrapAreaRight: {
    flex: 1,
  },
});
