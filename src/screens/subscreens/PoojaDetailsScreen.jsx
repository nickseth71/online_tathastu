import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {
    Back_Arrow_SVG,
    Benefits_SVG,
    WatchSVG,
} from '../../constants/SVGImages';
import { SvgXml } from 'react-native-svg';

const PoojaDetailsScreen = ({ route, navigation }) => {
    const { pooja } = route.params;
    const [selectedType, setSelectedType] = useState('home');
    return (
        <View style={{ flex: 1 }}>
            {/* Image */}
            <View>
                <Image source={pooja.image} style={styles.image} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <SvgXml xml={Back_Arrow_SVG} />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>

                    <View style={styles.card}>
                        {/* <Text style={styles.title}>{pooja.title}</Text> */}
                        <Text style={styles.desc}>{pooja.desc}</Text>
                        <SvgXml xml={WatchSVG} width={16} height={16} />
                        <Text style={styles.price}>{pooja.price}</Text>
                    </View>

                    {/* About */}
                    {pooja.about && (
                        <View style={styles.card}>
                            <Text style={styles.title}>About This Pooja</Text>
                            <Text style={styles.desc}>{pooja.about}</Text>
                        </View>
                    )}

                    {/* Benefits (Dynamic List) */}
                    {pooja.benefits && (
                        <View style={styles.card}>
                            <Text style={styles.title}>Benefits</Text>

                            {pooja.benefits.map((item, index) => (
                                <View key={index} style={styles.benefitRow}>
                                    <SvgXml xml={Benefits_SVG} width={20} height={20} />
                                    <Text style={styles.benefitText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Booking Type */}
                    <View style={styles.card}>
                        <Text style={styles.title}>Select Booking Type</Text>

                        {/* In-Person */}
                        {/* <TouchableOpacity
                            style={[
                                styles.bookingCard,
                                selectedType === "home" && styles.selectedCard
                            ]}
                            onPress={() => setSelectedType("home")}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>🏠</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.bookingTitle}>In-Person at Home</Text>
                                <Text style={styles.bookingSub}>Pandit visits your location</Text>
                            </View>

                            <Text style={styles.bookingPrice}>₹1800</Text>
                        </TouchableOpacity> */}

                        {/* Virtual */}
                        <TouchableOpacity
                            style={[
                                styles.bookingCard,
                                selectedType === 'virtual' && styles.selectedCard,
                            ]}
                            onPress={() => setSelectedType('virtual')}
                        >
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>📹</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.bookingTitle}>Virtual/Live</Text>
                                <Text style={styles.bookingSub}>Join via video call</Text>
                            </View>

                            <Text style={styles.bookingPrice}>₹1260</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SelectPandit')}
                    >
                        <Text style={styles.buttonText}>Select Date & Time</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default PoojaDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
    },

    backButton: {
        position: 'absolute',
        top: 20,
        left: 12,
        backgroundColor: '#ff7a00',
        padding: 5,
        borderRadius: 20,
    },
    backText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,

        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },

    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
    },

    desc: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        lineHeight: 20,
    },

    price: {
        fontSize: 18,
        color: '#FF6A00',
        marginTop: 12,
        fontWeight: '700',
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },

    benefitText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#666',
    },
    bookingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 14,
        padding: 12,
        marginTop: 12,
    },

    selectedCard: {
        borderColor: '#FF6A00',
        backgroundColor: '#fff7f2',
    },

    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fde8d7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    icon: {
        fontSize: 18,
    },

    bookingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },

    bookingSub: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },

    bookingPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF6A00',
    },

    button: {
        backgroundColor: '#FF4D00',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
