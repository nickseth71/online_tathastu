import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Button,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../theme/colors';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import {
    profileSvg,
    addressSvg,
    wishlistSvg,
    Pencil_SVG,
    Logout_SVG,
    helpSupport_SVG,
    settings_SVG,
    HoroScope_SVG,
    Notification_SVG2,
    Next_SVG,
} from '../constants/SVGImages';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { user, setUser } = useUser();

    const [modalVisible, setModalVisible] = useState(false);
    const [editableUser, setEditableUser] = useState(null);

    useEffect(() => {
        if (!user) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [user]);

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ margin: 20, textAlign: 'center' }}>
                    Redirecting...
                </Text>
            </SafeAreaView>
        );
    }

    const handleSave = async () => {
        await setUser(editableUser);
        await AsyncStorage.setItem('user', JSON.stringify(editableUser));
        setModalVisible(false);
    };

    const logout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('user');
                    setUser(null);
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 200 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <Text style={styles.headerSub}>Manage your account</Text>

                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </Text>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userInfo}>
                                {user.phone || 'No mobile Number'}
                            </Text>
                            <Text style={styles.userInfo}>{user.email}</Text>

                            {user.dob && (
                                <Text style={styles.userInfo}>
                                    DOB: {user.dob}
                                </Text>
                            )}
                            {user.gotra && (
                                <Text style={styles.userInfo}>
                                    Gotra: {user.gotra}
                                </Text>
                            )}
                            {user.rashi && (
                                <Text style={styles.userInfo}>
                                    Rashi: {user.rashi}
                                </Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.editIcon}
                            onPress={() => {
                                setEditableUser({
                                    ...user,
                                    dob: user.dob || '',
                                    gotra: user.gotra || '',
                                    rashi: user.rashi || '',
                                });
                                setModalVisible(true);
                            }}
                        >
                            <SvgXml xml={Pencil_SVG} width={26} height={26} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Membership Card */}
                <View style={styles.membershipCard}>
                    <View style={styles.membershipHeader}>
                        <Text style={styles.membershipTitle}>
                            {user.membership}
                        </Text>
                        <Icon name="medal-outline" size={22} color="#fff" />
                    </View>

                    <Text style={styles.benefitText}>Benefits Used</Text>

                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${user.progress || 0}%` },
                            ]}
                        />
                    </View>

                    <Text style={styles.progressText}>
                        {user.progress || 0}%
                    </Text>
                </View>

                {/* Menu */}
                <View style={styles.menuCard}>
                    <MenuItem
                        iconSvg={Pencil_SVG}
                        label="Edit Profile"
                        onPress={() => {
                            setEditableUser({ ...user });
                            setModalVisible(true);
                        }}
                    />


                    <MenuItem
                        iconSvg={Notification_SVG2}
                        label="Notifications"
                        onPress={() => navigation.navigate('Notification')}
                    />

                    <MenuItem
                        iconSvg={settings_SVG}
                        label="Settings"
                        onPress={() => navigation.navigate('Settings')}
                    />
                    <MenuItem iconSvg={addressSvg} label="Saved Addresses" />
                    <MenuItem iconSvg={wishlistSvg} label="Wishlist" />

                    <MenuItem iconSvg={HoroScope_SVG} label="Panchang & Horoscope" />

                    <MenuItem iconSvg={helpSupport_SVG} label="Help & Support" onPress={() => navigation.navigate('Help&Support')} />

                    <TouchableOpacity
                        style={styles.logoutItem}
                        onPress={logout}
                    >
                        <SvgXml xml={Logout_SVG} width={20} height={20} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Edit Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Edit Profile
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor={"#777"}
                            value={editableUser?.name}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    name: text,
                                }))
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            placeholderTextColor={"#777"}

                            keyboardType="phone-pad"
                            value={editableUser?.phone}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    phone: text,
                                }))
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={"#777"}

                            keyboardType="email-address"
                            value={editableUser?.email}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    email: text,
                                }))
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholderTextColor={"#777"}

                            placeholder="Date of Birth"
                            value={editableUser?.dob}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    dob: text,
                                }))
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Gotra"
                            placeholderTextColor={"#777"}

                            value={editableUser?.gotra}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    gotra: text,
                                }))
                            }
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Rashi"
                            placeholderTextColor={"#777"}

                            value={editableUser?.rashi}
                            onChangeText={text =>
                                setEditableUser(prev => ({
                                    ...prev,
                                    rashi: text,
                                }))
                            }
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancel]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.save]}
                                onPress={handleSave}
                            >
                                <Text style={styles.text}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/* Menu Item */
const MenuItem = ({ iconSvg, label, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <SvgXml xml={iconSvg} width={20} height={20} />
        <Text style={styles.menuText}>{label}</Text>
        <SvgXml xml={Next_SVG} width={16} height={16} />
    </TouchableOpacity>
);

/* Styles */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 60,
    },
    headerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
    headerSub: { color: '#ffe7d1', marginTop: 4 },

    profileCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: -40,
        borderRadius: 16,
        padding: 16,
        elevation: 4,
    },
    profileRow: { flexDirection: 'row', alignItems: 'center' },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f97316',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: { color: '#fff', fontSize: 22, fontWeight: '700' },

    userName: { fontSize: 16, fontWeight: '700' },
    userInfo: { color: '#000', fontSize: 12, marginTop: 2 },

    membershipCard: {
        backgroundColor: '#f97316',
        margin: 16,
        borderRadius: 16,
        padding: 16,
    },
    membershipHeader: { flexDirection: 'row', justifyContent: 'space-between' },
    membershipTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
    benefitText: { color: '#ffe7d1', marginTop: 12 },
    progressBar: {
        height: 8,
        backgroundColor: '#ffa94d',
        borderRadius: 8,
        marginTop: 6,
        overflow: 'hidden',
    },
    progressFill: { height: '100%', backgroundColor: '#fff' },
    progressText: { color: '#fff', marginTop: 6, fontWeight: '600' },

    menuCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 16,
        paddingVertical: 8,
        marginBottom: 30,
    },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
    menuText: { flex: 1, marginLeft: 12, fontSize: 14 },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: '90%',
    },
    modalTitle: { fontWeight: '700', fontSize: 18, marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 6,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginHorizontal: 8,
    },

    cancel: {
        backgroundColor: "#777",
    },

    save: {
        backgroundColor: "#f97316",
    },

    text: {
        color: "#fff",
        fontWeight: "600",
    },
    logoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    logoutText: { marginLeft: 12, fontSize: 14, color: 'red' },
});