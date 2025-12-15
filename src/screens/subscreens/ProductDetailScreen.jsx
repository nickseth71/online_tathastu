import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';

export default function ProductDetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <AppHeader title="Product Details" showBack />

            <Image source={product.image} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>

                <Text style={styles.description}>
                    This is a premium quality product made with the best materials.
                </Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 280,
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        color: '#777',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 24,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
