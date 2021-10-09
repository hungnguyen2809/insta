import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import HeaderBar from 'src/components/HeaderBar';
import { styles } from './styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors, DeviceUiInfo } from 'src/utils';
import StoryThumbnail from 'src/components/StoryThumbnail';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderBar>
        <View style={styles.wrapHeader}>
          <Text allowFontScaling={false} style={styles.titleHeader}>
            Insta
          </Text>
          <View style={styles.wrapActionRight}>
            <TouchableOpacity activeOpacity={0.8} style={styles.btnAction}>
              <IconsAwesome
                name={'plus-square-o'}
                size={DeviceUiInfo.scale(22)}
                color={Colors.wizardgrey}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btnAction}>
              <Icons
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
