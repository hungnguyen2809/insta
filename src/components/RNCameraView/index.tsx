import merge from 'lodash/merge';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera, TakePictureOptions, TakePictureResponse } from 'react-native-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, DeviceUiInfo, Fonts } from 'src/utils';

const PendingView = () => (
  <View style={styles.pendingCamera}>
    <Text style={styles.textPendingCamera}>Waiting</Text>
  </View>
);

interface Props {
  takePhoto: (photo: TakePictureResponse) => void;
  optionPhoto?: TakePictureOptions;
  onPressBack: () => void;
}

const RNCameraView = (props: Props) => {
  const { takePhoto, optionPhoto, onPressBack } = props;

  const insets = useSafeAreaInsets();

  const takePicture = async (camera: RNCamera) => {
    const options: TakePictureOptions = merge(optionPhoto, {
      quality: 1,
      base64: true,
    });
    const picture = await camera.takePictureAsync(options);
    takePhoto(picture);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camrea}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({ camera, status }) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <View style={styles.contentCamera}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressBack}
                style={[styles.buttonBack, { top: insets.top }]}>
                <Image
                  fadeDuration={0}
                  style={styles.iconBack}
                  source={require('src/assets/icons/icons-left.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.buttonTakePhoto}
                onPress={() => takePicture(camera)}>
                <Image
                  fadeDuration={0}
                  style={styles.iconCamera}
                  source={require('src/assets/icons/icons-camera.png')}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default React.memo(RNCameraView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  camrea: {
    flex: 1,
  },
  contentCamera: {
    position: 'relative',
    flex: 1,
  },
  buttonTakePhoto: {
    backgroundColor: Colors.lightgray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: DeviceUiInfo.verticalScale(35),
    left: DeviceUiInfo.ScreenSize.width / 2 - DeviceUiInfo.scale(25),
    width: DeviceUiInfo.scale(50),
    height: DeviceUiInfo.scale(50),
    borderRadius: DeviceUiInfo.scale(50) / 2,
  },
  iconCamera: {
    width: DeviceUiInfo.scale(35),
    height: DeviceUiInfo.scale(35),
    tintColor: Colors.wizardgrey,
  },
  pendingCamera: {
    flex: 1,
    backgroundColor: Colors.whitesmoke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPendingCamera: {
    fontFamily: Fonts.OpenSans,
    fontSize: DeviceUiInfo.scale(16),
    lineHeight: DeviceUiInfo.scale(24),
  },
  iconBack: {
    tintColor: Colors.whitesmoke,
    width: DeviceUiInfo.scale(30),
    height: DeviceUiInfo.scale(30),
  },
  buttonBack: {
    position: 'absolute',
    backgroundColor: Colors.gray,
    left: 20,
    borderRadius: DeviceUiInfo.scale(35) / 2,
    padding: DeviceUiInfo.scale(3),
  },
});
