import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from 'src/screens/ProfileScreen';
import { ProfileTabParamList } from '..';

const ProfileStack = createNativeStackNavigator<ProfileTabParamList>();

const ProfileTab = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'PROFILE_SCREEN'}>
      <ProfileStack.Group>
        <ProfileStack.Screen name={'PROFILE_SCREEN'} component={ProfileScreen} />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

export default ProfileTab;
