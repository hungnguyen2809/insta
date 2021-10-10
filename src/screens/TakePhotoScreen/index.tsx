import { useIsFocused } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';
import RNCameraView from 'src/components/RNCameraView';
import { HomeTabParamList } from 'src/navigations';
import { Colors } from 'src/utils';

type TakePhotoScreenProps = NativeStackScreenProps<HomeTabParamList, 'TAKE_PHOTO'>;

const TakePhotoScreen = ({ navigation, route }: TakePhotoScreenProps) => {
  const isFocused = useIsFocused();

  const takePhoto = (photo: TakePictureResponse) => {
    if (route.params) {
      route.params.takePhoto(photo);
      navigation.goBack();
    }
  };

  const goBackScreen = () => {
    navigation.goBack();
  };

  if (isFocused) {
    return <RNCameraView takePhoto={takePhoto} onPressBack={goBackScreen} />;
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
