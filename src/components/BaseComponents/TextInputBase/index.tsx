import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, DeviceUiInfo, Fonts } from 'src/utils';

export interface TextInputBaseProps extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPressRight?: () => void;
  disabledPressRight?: boolean;
}

const _TextInputBase = (
  {
    iconLeft,
    iconRight,
    containerStyles,
    style,
    onPressRight,
    disabledPressRight,
    ...textInputProp
  }: TextInputBaseProps,
  ref: React.LegacyRef<TextInput>,
) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {iconLeft && iconLeft}
      <TextInput
        allowFontScaling={false}
        ref={ref}
        style={[styles.textInput, style]}
        {...textInputProp}
      />
      {iconRight && (
        <TouchableOpacity activeOpacity={0.8} disabled={disabledPressRight} onPress={onPressRight}>
          {iconRight}
        </TouchableOpacity>
      )}
    </View>
  );
};

export const TextInputBase = React.forwardRef(_TextInputBase);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.darkgray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DeviceUiInfo.scale(5),
    paddingHorizontal: DeviceUiInfo.scale(5),
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.OpenSans,
    paddingVertical: 0,
    fontSize: DeviceUiInfo.scale(13),
    paddingHorizontal: DeviceUiInfo.scale(5),
  },
});
