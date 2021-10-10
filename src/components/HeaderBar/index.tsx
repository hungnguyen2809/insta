import React from 'react';
import { StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children?: React.ReactChild;
  leftArea?: React.ReactElement;
  centerArea?: React.ReactElement;
  rightArea?: React.ReactElement;
  headerStyle?: StyleProp<ViewStyle>;
  headerContentStyle?: StyleProp<ViewStyle>;
  containerLeftStyle?: StyleProp<ViewStyle>;
  containerCenterStyle?: StyleProp<ViewStyle>;
  containerRightStyle?: StyleProp<ViewStyle>;
  barStyle?: 'dark-content' | 'light-content' | 'default';
}

const HeaderBar = (props: Props) => {
  const {
    children,
    leftArea,
    centerArea,
    rightArea,
    headerStyle,
    headerContentStyle,
    containerLeftStyle,
    containerCenterStyle,
    containerRightStyle,
    barStyle = 'dark-content',
  } = props;

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, headerStyle, { paddingTop: insets.top }]}>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={barStyle} />
      {children ? (
        children
      ) : (
        <View style={[styles.wrapContent, headerContentStyle]}>
          <View style={[styles.wrapAreaLeft, containerLeftStyle]}>{leftArea && leftArea}</View>
          <View style={[styles.wrapAreaCenter, containerCenterStyle]}>
            {centerArea && centerArea}
          </View>
          <View style={[styles.wrapAreaRight, containerRightStyle]}>{rightArea && rightArea}</View>
        </View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'tomato',
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
