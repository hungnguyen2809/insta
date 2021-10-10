import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DiscoverScreen from 'src/screens/DiscoverScreen';
import { DiscoverTabParamList } from '..';

const DiscoverStack = createNativeStackNavigator<DiscoverTabParamList>();

const DiscoverTab = () => {
  return (
    <DiscoverStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'DISCOVER_SCREEN'}>
      <DiscoverStack.Group>
        <DiscoverStack.Screen name={'DISCOVER_SCREEN'} component={DiscoverScreen} />
      </DiscoverStack.Group>
    </DiscoverStack.Navigator>
  );
};

export default DiscoverTab;
