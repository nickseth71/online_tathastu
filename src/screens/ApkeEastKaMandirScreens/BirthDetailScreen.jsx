import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../theme/colors';

export default function BirthDetailScreen() {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [place, setPlace] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>जन्म विवरण भरें</Text>

            <TextInput
                placeholder="नाम"
                placeholderTextColor={'#777'}
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="जन्म तिथि (DD/MM/YYYY)"
                style={styles.input}
                placeholderTextColor={'#777'}
                value={date}
                onChangeText={setDate}
            />

            <TextInput
                placeholder="जन्म समय"
                style={styles.input}
                placeholderTextColor={'#777'}
                value={time}
                onChangeText={setTime}
            />

            <TextInput
                placeholder="जन्म स्थान"
                style={styles.input}
                placeholderTextColor={'#777'}
                value={place}
                onChangeText={setPlace}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>सबमिट करें</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: COLORS.APP_BACKGROUND,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
});
