import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'src/utils';
import { styles } from './styles';

const SIZE = 100;

const QuickVideoScreen = () => {
  const progress = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(0, { duration: 5000 });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>QuickVideoScreen</Text>
      <View style={styles.content}>
        <Animated.View
          style={[{ width: SIZE, height: SIZE, backgroundColor: Colors.darkblue }, reanimatedStyle]}
        />
      </View>
    </SafeAreaView>
  );
};

export default QuickVideoScreen;
