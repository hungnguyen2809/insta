import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from 'src/screens/LoginScreen';
import RegisterScreen from 'src/screens/RegisterScreen';
import { RootAuthParamList } from '../models';

const AuthStack = createNativeStackNavigator<RootAuthParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName={'LOGIN_SCREEN'} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={'LOGIN_SCREEN'} component={LoginScreen} />
      <AuthStack.Screen name={'REGISTER_SCREEN'} component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
