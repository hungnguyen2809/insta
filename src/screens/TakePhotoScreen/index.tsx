import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useIsFocused } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';
import RNCameraView from 'src/components/RNCameraView';
import { MainTabParamList, RootMainParamList } from 'src/navigations/models';
import { Colors } from 'src/utils';

type TakePhotoScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootMainParamList, 'TAKE_PHOTO_SCREEN'>,
  BottomTabScreenProps<MainTabParamList>
>;

const TakePhotoScreen: React.FC<TakePhotoScreenProps> = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const takePhoto = (photo: TakePictureResponse) => {
    navigation.navigate('HOME_SCREEN', { photo });
  };

  const goBackScreen = () => {
    navigation.navigate('HOME_SCREEN');
  };

  if (isFocused) {
    return (
      <RNCameraView
        optionPhoto={route.params?.option}
        takePhoto={takePhoto}
        onPressBack={goBackScreen}
      />
    );
  } else {
    return <View style={style.awaitCamera} />;
  }
};

export default TakePhotoScreen;

const style = StyleSheet.create({
  awaitCamera: {
    flex: 1,
    backgroundColor: Colors.whitesmoke,
  },
});
