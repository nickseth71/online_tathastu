import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 200 }}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <Text style={styles.headerSub}>Manage your account</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>U</Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.userName}>User Name</Text>
                            <Text style={styles.userInfo}>+91 XXXXX XXXXX</Text>
                            <Text style={styles.userInfo}>email@example.com</Text>
                        </View>

                        <TouchableOpacity style={styles.editIcon}>
                            <Icon name="pencil" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statsRow}>
                        <Stat label="Bookings" value="12" icon="ribbon-outline" />
                        <Stat label="Favorites" value="8" icon="heart-outline" />
                        <Stat label="Reviews" value="5" icon="star-outline" />
                    </View>
                </View>

                {/* Membership Card */}
                <View style={styles.membershipCard}>
                    <View style={styles.membershipHeader}>
                        <Text style={styles.membershipTitle}>Gold Member</Text>
                        <Icon name="medal-outline" size={22} color="#fff" />
                    </View>

                    <Text style={styles.benefitText}>Benefits Used</Text>

                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.progressText}>65%</Text>
                </View>

                {/* Menu */}
                <View style={styles.menuCard}>
                    <MenuItem icon="person-outline" label="Edit Profile" />
                    <MenuItem icon="location-outline" label="Saved Addresses" />
                    <MenuItem icon="heart-outline" label="Wishlist" />
                    <MenuItem icon="notifications-outline" label="Notifications" />
                    <MenuItem icon="calendar-outline" label="Panchang & Horoscope" />
                    <MenuItem icon="settings-outline" label="Settings" />
                    <MenuItem icon="help&support" label="Help & Support" />

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

/* Components */
const Stat = ({ icon, value, label }) => (
    <View style={styles.statItem}>
        <Icon name={icon} size={18} color="#f97316" />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const MenuItem = ({ icon, label }) => (
    <TouchableOpacity style={styles.menuItem}>
        <Icon name={icon} size={20} color="#f97316" />
        <Text style={styles.menuText}>{label}</Text>
        <Icon name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
);

/* Styles */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 60,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
    headerSub: {
        color: '#ffe7d1',
        marginTop: 4,
    },

    profileCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: -40,
        borderRadius: 16,
        padding: 16,
        elevation: 4,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f97316',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
    editIcon: {
        backgroundColor: '#f97316',
        padding: 6,
        borderRadius: 20,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
    },
    userInfo: {
        color: '#777',
        fontSize: 12,
        marginTop: 2,
    },

    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
    },

    membershipCard: {
        backgroundColor: '#f97316',
        margin: 16,
        borderRadius: 16,
        padding: 16,
    },
    membershipHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    membershipTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    benefitText: {
        color: '#ffe7d1',
        marginTop: 12,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#ffa94d',
        borderRadius: 8,
        marginTop: 6,
        overflow: 'hidden',
    },
    progressFill: {
        width: '65%',
        height: '100%',
        backgroundColor: '#fff',
    },
    progressText: {
        color: '#fff',
        marginTop: 6,
        fontWeight: '600',
    },

    menuCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        paddingVertical: 8,
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
    },
    menuText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
    },
});
