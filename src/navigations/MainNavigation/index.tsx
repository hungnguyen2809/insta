import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TakePhotoScreen from 'src/screens/TakePhotoScreen';
import { RootMainParamList } from '../models';
import MainTab from './MainTab';

const MainStack = createNativeStackNavigator<RootMainParamList>();

const MainNavigation: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName={'MAIN_TAB'} screenOptions={{ headerShown: false }}>
      <MainStack.Group>
        <MainStack.Screen name={'MAIN_TAB'} component={MainTab} />
      </MainStack.Group>
      <MainStack.Group>
        <MainStack.Screen name={'TAKE_PHOTO_SCREEN'} component={TakePhotoScreen} />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default MainNavigation;
