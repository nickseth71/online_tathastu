import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import Sound from 'react-native-sound';
import { COLORS } from '../theme/colors';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    Sound.setCategory('Playback');

    const splashSound = new Sound(
      'splashsound.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('Error loading sound:', error);
          setTimeout(onFinish, 1000);
          return;
        }

        splashSound.setVolume(0.7);
        splashSound.play();


        const timer = setTimeout(() => {
          splashSound.stop(() => {
            splashSound.release();
            onFinish();
          });
        }, 2000);

        return () => {
          clearTimeout(timer);
          splashSound.release();
        };
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.APP_BACKGROUND}
      />

      <Image
        source={require('../assets/previewImage.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.APP_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});