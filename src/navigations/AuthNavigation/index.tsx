import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from 'src/screens/LoginScreen';
import RegisterScreen from 'src/screens/RegisterScreen';
import { RootAuthParamList } from '../models';

const Stack = createNativeStackNavigator<RootAuthParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'LOGIN_SCREEN'}>
      <Stack.Screen
        name={'LOGIN_SCREEN'}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'REGISTER_SCREEN'}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
