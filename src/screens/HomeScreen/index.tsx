import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import IconsAwesome from 'react-native-vector-icons/FontAwesome';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { ButtonBase } from 'src/components/BaseComponents';
import HeaderBar from 'src/components/HeaderBar';
import StoryThumbnail from 'src/components/StoryThumbnail';
import { MainTabParamList, RootMainParamList } from 'src/navigations/models';
import NotifiManager from 'src/notifications/NotificationManager';
import { checkPermissionsAudio, checkPermissionsCamera } from 'src/services';
import { Colors, DeviceUiInfo } from 'src/utils';
import { styles } from './styles';

type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HOME_SCREEN'>,
  NativeStackScreenProps<RootMainParamList>
>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onNavigateCreateStory = async () => {
    const permisionCamera = await checkPermissionsCamera();
    const permisionAudio = await checkPermissionsAudio();

    if (permisionAudio && permisionCamera) {
      navigation.navigate('TAKE_PHOTO_SCREEN');
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
        <View>
          <ButtonBase
            title={'Th??ng b??o'}
            onPress={() => {
              NotifiManager.showNotification('Th??ng b??o', 'Vi Th??? Ng???c Huy???n', {
                name: 'Vi Th??? Ng???c Huy???n',
                age: 23,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
