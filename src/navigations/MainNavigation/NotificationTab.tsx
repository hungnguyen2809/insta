import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import NotificationScreen from 'src/screens/NotificationScreen';
import { NotificationTabParamList } from '..';

const NotificationStack = createNativeStackNavigator<NotificationTabParamList>();

const NotificationTab = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'NOTIFICATION_SCREEN'}>
      <NotificationStack.Group>
        <NotificationStack.Screen name={'NOTIFICATION_SCREEN'} component={NotificationScreen} />
      </NotificationStack.Group>
    </NotificationStack.Navigator>
  );
};

export default NotificationTab;
