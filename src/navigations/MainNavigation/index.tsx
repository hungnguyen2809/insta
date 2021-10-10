import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { Colors } from 'src/utils';
import { RootMainParamList } from '..';
import DiscoverTab from './DiscoverTab';
import HomeTab from './HomeTab';
import NotificationTab from './NotificationTab';
import ProfileTab from './ProfileTab';
import QuickVideoTab from './QuickVideoTab';

interface TabBarIcon {
  color: string;
  focused: boolean;
  size: number;
}

const Tabs = createBottomTabNavigator<RootMainParamList>();

const IconTabHome = ({ color, focused, size }: TabBarIcon) => {
  return <Icons name={focused ? 'home' : 'home-outline'} color={color} size={size} />;
};

const IconTabDiscover = ({ color, focused, size }: TabBarIcon) => {
  return <Icons name={focused ? 'search' : 'search-outline'} color={color} size={size} />;
};

const IconTabQuickVideo = ({ color, focused, size }: TabBarIcon) => {
  return <Icons name={focused ? 'videocam' : 'videocam-outline'} color={color} size={size} />;
};

const IconTabNotification = ({ color, focused, size }: TabBarIcon) => {
  return (
    <Icons name={focused ? 'notifications' : 'notifications-outline'} color={color} size={size} />
  );
};

const IconTabProfile = ({ color, focused, size }: TabBarIcon) => {
  return <Icons name={focused ? 'person' : 'person-outline'} color={color} size={size} />;
};

// const tabShowRoutes = [
//   'HOME_SCREEN',
//   'DISCOVER_SCREEN',
//   'QUICK_VIDEO_SCREEN',
//   'NOTIFICATION_SCREEN',
//   'PROFILE_SCREEN',
// ];

const MainNavigation = () => {
  return (
    <Tabs.Navigator
      initialRouteName={'HOME_TAB'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.black,
        tabBarStyle: { backgroundColor: Colors.white },
      }}>
      <Tabs.Screen name={'HOME_TAB'} component={HomeTab} options={{ tabBarIcon: IconTabHome }} />
      <Tabs.Screen
        name={'DISCOVER_TAB'}
        component={DiscoverTab}
        options={{ tabBarIcon: IconTabDiscover }}
      />
      <Tabs.Screen
        name={'QUICK_VIDEO_TAB'}
        component={QuickVideoTab}
        options={{
          tabBarIcon: IconTabQuickVideo,
          tabBarStyle: { backgroundColor: Colors.black },
          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: Colors.white,
        }}
      />
      <Tabs.Screen
        name={'NOTIFICATION_TAB'}
        component={NotificationTab}
        options={{ tabBarIcon: IconTabNotification }}
      />
      <Tabs.Screen
        name={'PROFILE_TAB'}
        component={ProfileTab}
        options={{ tabBarIcon: IconTabProfile }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigation;
