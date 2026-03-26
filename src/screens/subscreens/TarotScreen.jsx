import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { Back_Arrow_SVG } from '../../constants/SVGImages';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const TAROT_CARDS = [
    {
        id: '1',
        title: 'Love',
        backImage: require('../../assets/card-back.png'),
        frontImage: require('../../assets/card-front.png'),
        message: 'आपके जीवन में प्रेम आने वाला है ❤️',
    },
    {
        id: '2',
        title: 'Career',
        backImage: require('../../assets/card-back.png'),
        frontImage: require('../../assets/card-front.png'),
        message: 'करियर में सफलता मिलेगी 🚀',
    },
    {
        id: '3',
        title: 'Health',
        backImage: require('../../assets/card-back.png'),
        frontImage: require('../../assets/card-front.png'),
        message: 'स्वास्थ्य अच्छा रहेगा 💪',
    },
];

export default function TarotScreen() {
    const navigation = useNavigation();
    const [flippedCardId, setFlippedCardId] = useState(null);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.left} onPress={() => navigation.goBack()}>
                    <SvgXml xml={Back_Arrow_SVG} width={28} height={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>भारतीय टैरो कार्ड</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', padding: 15 }}>
                <Text style={styles.title}>अपना कार्ड चुनें</Text>

                {/* 3 Cards Row */}
                <View style={styles.row}>
                    {TAROT_CARDS.map((card) => (
                        <TouchableOpacity
                            key={card.id}
                            style={styles.card}
                            onPress={() => setFlippedCardId(card.id)}
                        >
                            <Image
                                source={
                                    flippedCardId === card.id
                                        ? card.frontImage
                                        : card.backImage
                                }
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Result */}
                {flippedCardId && (
                    <View style={styles.resultBox}>
                        <Text style={styles.resultText}>
                            {TAROT_CARDS.find(c => c.id === flippedCardId)?.message}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff6ee',

    },
    header: {
        height: 64,
        backgroundColor: COLORS.APP_BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginLeft: 10 },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    card: {
        width: width / 3.5,
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultBox: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#FFE8D6',
        borderRadius: 12,
    },
    resultText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
});