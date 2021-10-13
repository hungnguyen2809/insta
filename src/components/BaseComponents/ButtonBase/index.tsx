import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { Colors, DeviceUiInfo } from 'src/utils';
import { TextBase } from '..';

export interface ButtonBaseProp extends TouchableOpacityProps {
  children?: React.ReactChild;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const _ButtonBase = (
  { children, titleStyle, style, title, activeOpacity = 0.8, ...restProps }: ButtonBaseProp,
  ref: React.LegacyRef<TouchableOpacity>,
) => {
  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.button, style]}
      activeOpacity={activeOpacity}
      {...restProps}>
      {children ? (
        children
      ) : (
        <TextBase style={[styles.title, titleStyle]}>{title || 'title'}</TextBase>
      )}
    </TouchableOpacity>
  );
};

export const ButtonBase = React.forwardRef(_ButtonBase);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dodgerblue,
    paddingVertical: DeviceUiInfo.scale(8),
  },
  title: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: DeviceUiInfo.scale(13),
  },
});
