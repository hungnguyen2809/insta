import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, DeviceUiInfo, Fonts } from 'src/utils';

const StoryThumbnail = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <LinearGradient
          style={styles.gardient}
          useAngle={true}
          angle={25}
          colors={[Colors.fuchsia, Colors.hotpink, Colors.khaki, Colors.orange, Colors.yellow]}>
          <View style={styles.borderThumb}>
            <Image
              style={styles.imageThumb}
              source={{
                uri: 'https://res.cloudinary.com/hungnguyen2809/image/upload/v1624759415/online-quiz-dev/avatar/137c4881-d274-48e6-896b-0b0d0cc6554a_14_qcsq40.jpg',
              }}
            />
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
      <Text allowFontScaling={false} style={styles.textName}>
        hvchopper
      </Text>
    </View>
  );
};

export default StoryThumbnail;

const styles = StyleSheet.create({
  container: {
    width: DeviceUiInfo.scale(70),
    height: DeviceUiInfo.scale(90),
    padding: DeviceUiInfo.scale(5),
    marginHorizontal: DeviceUiInfo.scale(5),
  },
  gardient: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: DeviceUiInfo.scale(63),
    height: DeviceUiInfo.scale(63),
    borderRadius: DeviceUiInfo.scale(63) / 2,
  },
  borderThumb: {
    borderColor: Colors.white,
    borderWidth: 3,
    borderRadius: DeviceUiInfo.scale(63),
  },
  imageThumb: {
    width: DeviceUiInfo.scale(55),
    height: DeviceUiInfo.scale(55),
    borderRadius: DeviceUiInfo.scale(55) / 2,
    borderColor: Colors.darkgray,
    borderWidth: 1,
  },
  textName: {
    textAlign: 'center',
    fontFamily: Fonts.OpenSans,
    fontSize: DeviceUiInfo.scale(12),
  },
});
