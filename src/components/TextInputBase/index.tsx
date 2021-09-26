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
import { Colors, DeviceUiInfo } from 'src/utils';

export interface TextInputBaseProps extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPressRight?: () => void;
  disabledPressRight?: boolean;
}

const TextInputBase = (
  {
    iconLeft,
    iconRight,
    containerStyles,
    style,
    onPressRight,
    disabledPressRight,
    ...textInputProp
  }: TextInputBaseProps,
  ref: React.Ref<TextInput>,
) => {
  return (
    <View style={[styles.container, containerStyles]}>
      {iconLeft && iconLeft}
      <TextInput ref={ref} style={[styles.textInput, style]} {...textInputProp} />
      {iconRight && (
        <TouchableOpacity activeOpacity={0.8} disabled={disabledPressRight} onPress={onPressRight}>
          {iconRight}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.forwardRef(TextInputBase);

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
    textAlignVertical: 'top',
    fontSize: DeviceUiInfo.scale(13),
    paddingHorizontal: DeviceUiInfo.scale(5),
  },
});
