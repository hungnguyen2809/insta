import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAppSelector } from 'src/app/hooks';
import { selectAuthToken } from 'src/redux/auth/slice';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

export const AppNavigationContainter = () => {
  const token = useAppSelector(selectAuthToken);

  return (
    <NavigationContainer>{token ? <MainNavigation /> : <AuthNavigation />}</NavigationContainer>
  );
};
