import { NavigationContainer } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { useAppSelector } from 'src/app/hooks';
import { selectAuthToken } from 'src/redux/auth/slice';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const AppNavigationContainter: React.FC = () => {
  const token = useAppSelector(selectAuthToken);

  const [showLottie, setShowLottie] = useState<boolean>(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    RNBootSplash.hide({ fade: true });
    setTimeout(() => {
      setShowLottie(false);
    }, 2000);
  };

  if (showLottie) {
    return (
      <LottieView source={require('src/assets/lotties/social.json')} autoPlay={true} loop={true} />
    );
  }

  return (
    <NavigationContainer>{token ? <MainNavigation /> : <AuthNavigation />}</NavigationContainer>
  );
};

export default AppNavigationContainter;
