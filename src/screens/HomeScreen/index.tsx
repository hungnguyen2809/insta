import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';
import IconsAwesome from 'react-native-vector-icons/FontAwesome';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderBar from 'src/components/HeaderBar';
import StoryThumbnail from 'src/components/StoryThumbnail';
import { HomeTabParamList } from 'src/navigations';
import { checkPermissionsAudio, checkPermissionsCamera } from 'src/services';
import { Colors, DeviceUiInfo } from 'src/utils';
import { styles } from './styles';

type HomeScreenProps = NativeStackScreenProps<HomeTabParamList, 'HOME_SCREEN'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const takePhoto = (photo: TakePictureResponse) => {
    console.log(photo.uri);
  };

  const onNavigateCreateStory = async () => {
    const permisionCamera = await checkPermissionsCamera();
    const permisionAudio = await checkPermissionsAudio();

    if (permisionAudio && permisionCamera) {
      navigation.navigate('TAKE_PHOTO', { takePhoto });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar>
        <View style={styles.wrapHeader}>
          <Text allowFontScaling={false} style={styles.titleHeader}>
            Insta
          </Text>
          <View style={styles.wrapActionRight}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnAction}
              onPress={onNavigateCreateStory}>
              <IconsAwesome
                name={'plus-square-o'}
                size={DeviceUiInfo.scale(22)}
                color={Colors.wizardgrey}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btnAction}>
              <IconsMC
                name={'facebook-messenger'}
                size={DeviceUiInfo.scale(22)}
                color={Colors.wizardgrey}
              />
            </TouchableOpacity>
          </View>
        </View>
      </HeaderBar>
      <View style={styles.contentMain}>
        <View style={styles.wrapStotyThumb}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <StoryThumbnail />
            <StoryThumbnail />
            <StoryThumbnail />
            <StoryThumbnail />
            <StoryThumbnail />
            <StoryThumbnail />
            <StoryThumbnail />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
