import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import DiscoverScreen from 'src/screens/DiscoverScreen';
import HomeScreen from 'src/screens/HomeScreen';
import NotificationScreen from 'src/screens/NotificationScreen';
import ProfileScreen from 'src/screens/ProfileScreen';
import QuickVideoScreen from 'src/screens/QuickVideoScreen';
import { Colors } from 'src/utils';
import { RootMainParamList } from '..';

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

const MainNavigation = () => {
  return (
    <Tabs.Navigator
      initialRouteName={'HOME_SCREEN'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: Colors.white },
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.black,
      }}>
      <Tabs.Screen
        name={'HOME_SCREEN'}
        component={HomeScreen}
        options={{ tabBarIcon: IconTabHome }}
      />
      <Tabs.Screen
        name={'DISCOVER_SCREEN'}
        component={DiscoverScreen}
        options={{ tabBarIcon: IconTabDiscover }}
      />
      <Tabs.Screen
        name={'QUICK_VIDEO_SCREEN'}
        component={QuickVideoScreen}
        options={{
          tabBarIcon: IconTabQuickVideo,
          tabBarStyle: { backgroundColor: Colors.black },
          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: Colors.white,
        }}
      />
      <Tabs.Screen
        name={'NOTIFICATION_SCREEN'}
        component={NotificationScreen}
        options={{ tabBarIcon: IconTabNotification }}
      />
      <Tabs.Screen
        name={'PROFILE_SCREEN'}
        component={ProfileScreen}
        options={{ tabBarIcon: IconTabProfile }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigation;
