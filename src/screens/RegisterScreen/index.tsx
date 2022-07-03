import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootAuthParamList } from 'src/navigations/models';

type RegisterScreenNavigation = NativeStackNavigationProp<RootAuthParamList, 'REGISTER_SCREEN'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigation>();

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={onGoBack}>
          <Text>BACK</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
