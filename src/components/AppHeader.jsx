import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../constants/SVGImages';

export default function AppHeader({
    title,
    showBack = false,
    rightComponent = null,
    backgroundColor = '#f4850f',
    textColor = '#ffffff',
}) {
    const navigation = useNavigation();

    return (
        <>
            {/* STATUS BAR COLOR */}
            <StatusBar
                barStyle="light-content"
                backgroundColor={backgroundColor}
            />

            <SafeAreaView style={{ backgroundColor }}>
                <View style={[styles.container, { backgroundColor }]}>
                    {/* LEFT */}
                    <View style={styles.left}>
                        {showBack && (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <SvgXml xml={Back_Arrow_SVG} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* CENTER */}
                    <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
                        {title}
                    </Text>

                    {/* RIGHT */}
                    <View style={styles.right}>{rightComponent}</View>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 16,
    },
    left: {
        width: 40,
        alignItems: 'flex-start',
    },
    right: {
        width: 40,
        alignItems: 'flex-end',
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    backText: {
        fontSize: 24,
    },
});

