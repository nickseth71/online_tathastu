import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../../theme/colors';
import {

    Back_Arrow_SVG,
} from '../../constants/SVGImages';

export default function SettingsScreen() {
    const navigation = useNavigation();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={Back_Arrow_SVG} width={34} height={34} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 20 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* Preferences */}
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            {/* <SvgXml xml={Notification_SVG2} width={20} height={20} /> */}
                            <Text style={styles.rowText}>Enable Notifications</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#ccc', true: '#f97316' }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            {/* <SvgXml xml={settings_SVG} width={20} height={20} /> */}
                            <Text style={styles.rowText}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: '#ccc', true: '#f97316' }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Account */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Account</Text>

                <View style={styles.card}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Change Password</Text>
                        {/* <SvgXml xml={Next_SVG} width={16} height={16} /> */}
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Privacy Policy</Text>
                        {/* <SvgXml xml={Next_SVG} width={16} height={16} /> */}
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowText}>Terms & Conditions</Text>
                        {/* <SvgXml xml={Next_SVG} width={16} height={16} /> */}
                    </TouchableOpacity>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
                    {/* <SvgXml xml={Logout_SVG} width={20} height={20} /> */}
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
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

    backText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 6,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },

    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowText: {
        marginLeft: 10,
        fontSize: 14,
    },

    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginHorizontal: 14,
    },

    logoutCard: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoutText: {
        marginLeft: 10,
        color: 'red',
        fontWeight: '600',
    },
});
