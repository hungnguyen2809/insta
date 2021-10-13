import React from 'react';
import { Control, useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, DeviceUiInfo } from 'src/utils';
import { TextInputBase, TextInputBaseProps } from '../BaseComponents';

interface Props extends TextInputBaseProps {
  name: string;
  control: Control<any>;
}

const InputField = ({ name, control, ...textInputProps }: Props) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <View style={styles.containter}>
      <TextInputBase
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        ref={ref}
        {...textInputProps}
      />
      {invalid && (
        <Text allowFontScaling={false} style={styles.textError}>
          {error?.message}
        </Text>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  containter: {},
  textError: {
    marginTop: DeviceUiInfo.scale(5),
    fontSize: DeviceUiInfo.scale(12),
    color: Colors.red,
  },
});
