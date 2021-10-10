import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from 'src/screens/HomeScreen';
import TakePhotoScreen from 'src/screens/TakePhotoScreen';
import { HomeTabParamList } from '..';

const HomeStack = createNativeStackNavigator<HomeTabParamList>();

const HomeTab = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'HOME_SCREEN'}>
      <HomeStack.Group>
        <HomeStack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
      </HomeStack.Group>
      <HomeStack.Group>
        <HomeStack.Screen name={'TAKE_PHOTO'} component={TakePhotoScreen} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeTab;
