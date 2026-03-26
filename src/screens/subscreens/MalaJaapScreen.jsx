import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';

const MALA_OPTIONS = [
    { id: '1', name: 'राम नाम माला' },
    { id: '2', name: 'माता दी माला' },
    { id: '3', name: 'शिव माला' },
    { id: '4', name: 'हनुमान माला' },
];

export default function MalaJaapScreen() {
    const navigation = useNavigation();

    const handleSelectMala = (item) => {
        navigation.navigate('MalaJaapDetail', { malaName: item.name });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectMala(item)}
        >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>माला जाप चुनें</Text>

            <FlatList
                data={MALA_OPTIONS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff6ee'
    },
    header: {
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 20,
        color: COLORS.APP_BACKGROUND
    },
    card: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    arrow: {
        fontSize: 18
    }
});