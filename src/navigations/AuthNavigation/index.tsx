import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from 'src/screens/LoginScreen';
import RegisterScreen from 'src/screens/RegisterScreen';
import { SCREEN } from '../config';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.LOGIN}>
      <Stack.Screen name={SCREEN.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
