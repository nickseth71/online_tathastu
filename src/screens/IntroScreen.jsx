// import React, { useEffect } from 'react';
// import { View, Image, Text, StyleSheet } from 'react-native';

// const IntroScreen = ({ onFinish }) => {
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onFinish();
//         }, 2500);

//         return () => clearTimeout(timer);
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Image
//                 source={require('../assets/guruji.png')}
//                 style={styles.image}
//                 resizeMode="contain"
//             />

//             <Text style={styles.text}>
//                 || काली कल्याणकारी ||
//             </Text>
//         </View>
//     );
// };

// export default IntroScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fa5600',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: '90%',
//         height: '50%',
//         marginRight: 40,
//     },
//     text: {
//         marginBottom: 120,
//         fontSize: 22,
//         fontWeight: '600',
//         color: '#fff',
//     },
// });

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const IntroScreen = ({ onFinish }) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {

        Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 2500,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/guruji.png')}
                style={[
                    styles.image,
                    { transform: [{ scale: scaleAnim }] },
                ]}
                resizeMode="contain"
            />

            <Text style={styles.text}>
                || काली कल्याणकारी ||
            </Text>
        </View>
    );
};

export default IntroScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fa5600',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '50%',
        marginRight: 40,
    },
    text: {
        marginBottom: 120,
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
    },
});