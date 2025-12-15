import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AppHeader from '../../components/AppHeader';

const screenWidth = Dimensions.get('window').width;

export default function DetailScreen({ route }) {
    const { title, src } = route.params;

    return (
        <View style={styles.container}>
            <AppHeader title={title} showBack={true} />
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={src} style={styles.image} resizeMode="cover" />
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>
                    Here you can add more details about {title}. You can put additional information, descriptions, or other content here.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: screenWidth - 40,
        height: 220,
        borderRadius: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginTop: 12,
        textAlign: 'center',
        color: '#555',
    },
});
