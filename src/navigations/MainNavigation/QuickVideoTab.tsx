import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import QuickVideoScreen from 'src/screens/QuickVideoScreen';
import { QuickVideoTabParamList } from '..';

const QuickVideoStack = createNativeStackNavigator<QuickVideoTabParamList>();

const QuickVideoTab = () => {
  return (
    <QuickVideoStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'QUICK_VIDEO_SCREEN'}>
      <QuickVideoStack.Group>
        <QuickVideoStack.Screen name={'QUICK_VIDEO_SCREEN'} component={QuickVideoScreen} />
      </QuickVideoStack.Group>
    </QuickVideoStack.Navigator>
  );
};

export default QuickVideoTab;
