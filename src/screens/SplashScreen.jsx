import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, StatusBar } from 'react-native';
import Sound from 'react-native-sound';

export default function SplashScreen() {

    useEffect(() => {
        Sound.setCategory('Playback');

        const splashSound = new Sound(
            'splashsound.mp3',   // filename ONLY
            Sound.MAIN_BUNDLE,   // path for bundled assets
            (error) => {
                if (error) {
                    console.log('Error loading sound:', error);
                    return;
                }
                splashSound.play((success) => {
                    if (!success) {
                        console.log('Playback failed');
                    }
                    splashSound.release();
                });
            }
        );

        return () => splashSound.release();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#f6fafb"
            />
            <Image
                source={require('../assets/previewImage.png')}
                style={{ width: 300, height: 300 }}
            />
            <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6fafb',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
