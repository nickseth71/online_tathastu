import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../../constants/SVGImages';

export default function NotificationScreen() {
    const navigation = useNavigation();

    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Booking Confirmed',
            message: 'Your temple booking has been confirmed.',
            read: false,
            time: '2 hrs ago',
        },
        {
            id: '2',
            title: 'Special Offer',
            message: 'Get 20% discount on premium membership.',
            read: true,
            time: '1 day ago',
        },
    ]);

    const markAsRead = (id) => {
        const updated = notifications.map(item =>
            item.id === id ? { ...item, read: true } : item
        );
        setNotifications(updated);
    };

    const deleteNotification = (id) => {
        const filtered = notifications.filter(item => item.id !== id);
        setNotifications(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: item.read ? '#fff' : '#fff7ed' },
            ]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteNotification(item.id)}>

            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={Back_Arrow_SVG} width={34} height={34} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 22 }} />
            </View>

            {/* List */}
            {notifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="notifications-off-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyText}>No notifications yet</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: 16 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.APP_BACKGROUND,
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },

    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
    },

    title: {
        fontSize: 14,
        fontWeight: '700',
    },

    message: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },

    time: {
        fontSize: 11,
        color: '#999',
        marginTop: 6,
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        marginTop: 10,
        color: '#999',
    },
});
